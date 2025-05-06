from transformers import AutoTokenizer, AutoModelForTokenClassification
import torch
import json
from nltk.corpus import stopwords
import re

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("covalenthq/cryptoNER")
model = AutoModelForTokenClassification.from_pretrained("covalenthq/cryptoNER")

# Load and process coin list
with open('./CoinEmbedding.min.json') as f:
    raw_coins = json.load(f)[0]

coin_data = {}
stop_words = set(stopwords.words('english'))
common_words = {'four', 'safe', 'why', 'would', 'dog', 'house', 'sonic'}

for coin in raw_coins:
    name = coin['n'].strip().lower()
    symbol = coin['s'].strip().lower()
    is_common = name in stop_words or symbol in stop_words or name in common_words or symbol in common_words
    
    coin_data[name] = {'clean_name': coin['n'], 'is_common': is_common}
    coin_data[symbol] = {'clean_name': coin['n'], 'is_common': is_common}

# Your input text
text =""
# --- Entity Extraction from Model ---
inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
with torch.no_grad():
    outputs = model(**inputs)

predictions = outputs.logits.argmax(dim=-1).squeeze().tolist()
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"].squeeze().tolist())
labels = [model.config.id2label[pred] for pred in predictions]

# Process model entities
entities = []
current_entity = None

for token, label in zip(tokens, labels):
    if token in ["[CLS]", "[SEP]", "[PAD]"]:
        continue
    
    if label != "O":
        entity_type = label.split("-")[-1]
        
        if token.startswith("##"):
            if current_entity:
                current_entity["text"] += token.replace("##", "")
        else:
            if label.startswith("B-"):
                if current_entity:
                    entities.append(current_entity)
                current_entity = {"text": token, "type": entity_type}
            else:
                if current_entity:
                    current_entity["text"] += " " + token
    else:
        if current_entity:
            entities.append(current_entity)
            current_entity = None

if current_entity:
    entities.append(current_entity)

# --- Local List Enhancement ---
def find_crypto_mentions(text, coin_data):
    text_lower = text.lower()
    words = re.findall(r'\b[\w\-]+\b', text_lower)
    found_coins = set()
    
    # Single-word matches
    for word in words:
        if word in coin_data and not coin_data[word]['is_common']:
            found_coins.add(coin_data[word]['clean_name'])
    
    # Multi-word phrases
    for n in [2, 3]:
        for i in range(len(words) - n + 1):
            phrase = ' '.join(words[i:i+n])
            if phrase in coin_data and not coin_data[phrase]['is_common']:
                found_coins.add(coin_data[phrase]['clean_name'])
    
    return found_coins

# Merge results
detected_coins = {e['text'].lower() for e in entities if e['type'] == 'CRYPTOCURRENCY'}
local_coins = find_crypto_mentions(text, coin_data)

additional_entities = []
for coin_name in local_coins:
    lname = coin_name.lower()
    if lname not in detected_coins:
        additional_entities.append({
            'text': coin_name,
            'type': 'CRYPTOCURRENCY',
            'source': 'local-list'
        })

# Final deduplication
seen = set()
final_entities = []
for ent in entities + additional_entities:
    key = (ent['text'].lower(), ent['type'])
    if key not in seen:
        seen.add(key)
        final_entities.append(ent)

# Print results
print("\nFiltered Entities:")
for entity in final_entities:
    source = entity.get('source', 'model')
    print(f"- {entity['text']} ({entity['type']}) [Source: {source}]")