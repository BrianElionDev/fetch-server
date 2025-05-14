/* import fs from "fs";
import path from "path";
import { pipeline } from "@xenova/transformers";

// 1. Trie Implementation for Fast Matching
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
    this.crypto = null;
  }
}

class CryptoMatcher {
  constructor(cryptos) {
    this.root = new TrieNode();
    for (const crypto of cryptos) {
      this.insert(crypto.symbol.toLowerCase(), crypto);
      this.insert(crypto.name.toLowerCase(), crypto);
    }
  }

  insert(word, crypto) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
    node.crypto = crypto;
  }

  search(text) {
    const results = new Map();
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, " ");

    for (let i = 0; i < cleanText.length; i++) {
      let node = this.root;
      let buffer = "";
      for (let j = i; j < cleanText.length; j++) {
        const char = cleanText[j];
        if (!node.children.has(char)) break;
        node = node.children.get(char);
        buffer += char;
        if (node.isEnd) {
          const existing = results.get(node.crypto.id);
          if (!existing || buffer.length > existing.matchLength) {
            results.set(node.crypto.id, {
              ...node.crypto,
              matchLength: buffer.length,
            });
          }
        }
      }
    }
    return Array.from(results.values());
  }
}

// 2. Local Crypto Data Loader
const COIN_CORRECTIONS = {
  btc: { id: "btc", name: "bitcoin", symbol: "btc" },
  eth: { id: "eth", name: "ethereum", symbol: "eth" },
};

async function fetchCryptoList() {
  try {
    const filePath = path.join(process.cwd(), "src", "CoinEmbedding.min.json");
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return fileData[0]
      .map((coin) => ({
        id: coin.i,
        name: coin.n.toLowerCase(),
        symbol: coin.s.toLowerCase(),
      }))
      .map((coin) => COIN_CORRECTIONS[coin.symbol] || coin);
  } catch (error) {
    console.error("Using fallback crypto list");
    return Object.values(COIN_CORRECTIONS);
  }
}

// 3. Live Crypto Data Fetcher
async function getLiveCryptos() {
  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list?include_platform=false",
        { timeout: 5000 }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return data.map((coin) => ({
        id: coin.id,
        name: coin.name.toLowerCase(),
        symbol: coin.symbol.toLowerCase(),
      }));
    } catch (error) {
      if (++retries === MAX_RETRIES) {
        console.error("Failed to fetch live crypto data:", error);
        return [];
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// 4. Contextual Validation with NLP
let nerPipeline = null;

async function detectWithContext(text, cryptos) {
  try {
    if (!nerPipeline) {
      nerPipeline = await pipeline("ner", "Xenova/bert-base-ner");
    }

    const cryptoNames = new Set(cryptos.map((c) => c.name));
    const cryptoSymbols = new Set(cryptos.map((c) => c.symbol));

    const results = await nerPipeline(text);
    const matched = new Map();

    // Merge tokenized words
    let currentEntity = null;
    for (const entity of results) {
      if (entity.entity.startsWith("B-ORG")) {
        currentEntity = entity.word;
      } else if (entity.entity.startsWith("I-ORG") && currentEntity) {
        currentEntity += entity.word.replace(/^##/, "");
      } else {
        if (currentEntity) {
          const cleanEntity = currentEntity.toLowerCase();
          if (cryptoNames.has(cleanEntity) || cryptoSymbols.has(cleanEntity)) {
            const crypto = cryptos.find(
              (c) => c.name === cleanEntity || c.symbol === cleanEntity
            );
            if (crypto) matched.set(crypto.id, crypto);
          }
          currentEntity = null;
        }
      }
    }

    return Array.from(matched.values());
  } catch (error) {
    console.error("NER processing failed:", error);
    return [];
  }
}

// 5. Optimal Detection Integration
async function optimalDetection(transcript) {
  try {
    // Step 1: Local Trie Matching
    const localCryptos = await fetchCryptoList();
    const trieMatches = new CryptoMatcher(localCryptos).search(transcript);

    // Step 2: Live Data Augmentation
    const liveCryptos = await getLiveCryptos();
    const liveMatches = new CryptoMatcher(liveCryptos).search(transcript);

    // Step 3: Context Validation with Merged Data
    const mergedCryptos = [...localCryptos, ...liveCryptos];
    const nerResults = await detectWithContext(transcript, mergedCryptos);

    // Merge and Deduplicate
    const resultMap = new Map();
    [...trieMatches, ...liveMatches, ...nerResults].forEach((crypto) => {
      if (!resultMap.has(crypto.id)) {
        resultMap.set(crypto.id, crypto);
      }
    });

    return Array.from(resultMap.values());
  } catch (error) {
    console.error("Detection pipeline failed:", error);
    return [];
  }
}

// Usage Example
(async () => {
  const sampleTranscript = `Bitcoin and ETH are volatile. Consider SOL and AVAX for long-term growth.`;
  const results = await optimalDetection(sampleTranscript);
  console.log("Detected Cryptocurrencies:", results);
})();
 */

import { LLMFactory } from "../llm/factory.js";

const llmProvider = LLMFactory.createProvider("openai");
const analysisMessages = [
  {
    role: "system",
    content: `You are an intelligent ai agent. You task is to validate if a crypto coin appears in a text block.`,
  },
  {
    role: "user",
    content: `
    ##Instructions
    1. Your task is to verify if a coin exists in a block of text (marked by the keyword content).
    2. If the coin exists the return true, If it does not then return false. Also Identify if the coin was wrongly identified.
    3. Identify closest match to the coin checking from the list. At times the coin checking may be wrong. The true data is  on the content.
    4. At times the match might be not close, try to infer which coin was wrongly picked.
    3. The content of the text is the most accurate record. 
    ##Task
    Coin checking: [Terse]
    Content: [
    -1- AlL
2 Highlights
• #
Coin
• Pump.fun C
• Categories
Polkadot Ecosystem
Price
1h
24h
$103,682
- 0.0%
• 0.9%
Ethereum ETH
GunZilla
Illuvium
Treeverse
Akash
Sidus
$2,649.83
• 0.7%
# 3
X XRP XRP
- 7.5%
~ 3.9%
* 4
$2.60
$1
• 0.3%
• 0.0%
Tether USDT
BNB BNB
= Solana SOL
- 0.0%
$658.75
- 0.5%
$181.84
- 0.8%
스 1.4%
- 5.9%
7d
- 7.4%
• 44.8%
- 21.8%
- 0.0%
- 9.0%
~ 24.6%
« Customize
Last 7 Days
24h Volume
Market Cap
$31,865,751,727 $2,059,484,876,195
$37,379,161,575
$319,887,295,386
$5,296,108,532
$80,467,164,910
$1,504,438,380
$6,751,663,198
$151,834,909,192
$150,333,073,372 Mfumen
$96,100,096,724
$94,419,490,344
wirtet
不
    ]

  #Output format: The output format should be: 

  [{
    "coin": "",
    "valid: true or false depending on if it is valid,
    "possible_match": "This is a coin which is available in the text block but is not the one trying to match for. In some cases the coin to be matched may be mistakenly identified. If there coin is not valid then indicated here the text in the content section which resembles the coin we are checking for. "
  }]
    
    `,
  },
];
const response = await llmProvider.makeRequest(analysisMessages);
const processedResponse = await llmProvider.processResponse(response);

console.log("Processed Response:", processedResponse.content);
