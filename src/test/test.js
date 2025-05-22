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

import { fetchTranscript } from "../FetchTranscript.js";
import { getOffsetTimestamps } from "../utils.js";

/* import { LLMFactory } from "../llm/factory.js";

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
 */
/* const arr = [
  {
    coin: "Bitcoin",
    valid: true,
    possible_match: "",
  },
];
console.log(arr.length);
 */

// const trancript = await fetchTranscript(
//   "https://www.youtube.com/watch?v=M1P0KwqDPTc"
// );
// console.log("Transcript: " + trancript.content);
// const ars = {
//   projects: [
//     {
//       coin_or_project: "Bitcoin",
//       Marketcap: "large",
//       Rpoints: 9,
//       "Total count": 3,
//       category: ["DeFi", "Layer 1"],
//       Timestamps: ["00:01:08", "00:02:22", "00:03:02"],
//     },
//     {
//       coin_or_project: "Axie Infinity",
//       Marketcap: "medium",
//       Rpoints: 8,
//       "Total count": 2,
//       category: ["Gaming"],
//       Timestamps: ["00:00:42", "00:30:16"],
//     },
//     {
//       coin_or_project: "Dogecoin",
//       Marketcap: "large",
//       Rpoints: 7,
//       "Total count": 2,
//       category: ["Meme coins"],
//       Timestamps: ["00:02:36", "00:28:54"],
//     },
//     {
//       coin_or_project: "Chainlink",
//       Marketcap: "large",
//       Rpoints: 10,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:13:47"],
//     },
//     {
//       coin_or_project: "Coinbase",
//       Marketcap: "large",
//       Rpoints: 9,
//       "Total count": 2,
//       category: ["Exchange"],
//       Timestamps: ["00:14:43", "00:23:51"],
//     },
//     {
//       coin_or_project: "Avalanche",
//       Marketcap: "large",
//       Rpoints: 8,
//       "Total count": 2,
//       category: ["Layer 1"],
//       Timestamps: ["00:15:52", "00:16:01"],
//     },
//     {
//       coin_or_project: "Polygon",
//       Marketcap: "large",
//       Rpoints: 8,
//       "Total count": 2,
//       category: ["Layer 2"],
//       Timestamps: ["00:17:07", "00:17:53"],
//     },
//     {
//       coin_or_project: "Injective",
//       Marketcap: "medium",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:18:26"],
//     },
//     {
//       coin_or_project: "Celestia",
//       Marketcap: "medium",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Layer 1"],
//       Timestamps: ["00:19:21"],
//     },
//     {
//       coin_or_project: "Internet Computer",
//       Marketcap: "medium",
//       Rpoints: 7,
//       "Total count": 1,
//       category: ["Layer 1"],
//       Timestamps: ["00:20:36"],
//     },
//     {
//       coin_or_project: "Monad",
//       Marketcap: "small",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Layer 1"],
//       Timestamps: ["00:21:56"],
//     },
//     {
//       coin_or_project: "LayerZero",
//       Marketcap: "medium",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:22:26"],
//     },
//     {
//       coin_or_project: "Beam",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:27:37"],
//     },
//     {
//       coin_or_project: "Immutable",
//       Marketcap: "medium",
//       Rpoints: 10,
//       "Total count": 3,
//       category: ["Gaming"],
//       Timestamps: ["00:27:46", "00:28:09", "00:34:34"],
//     },
//     {
//       coin_or_project: "Gala",
//       Marketcap: "small",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:29:41"],
//     },
//     {
//       coin_or_project: "Ronin",
//       Marketcap: "small",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:30:08"],
//     },
//     {
//       coin_or_project: "Pixels",
//       Marketcap: "small",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:30:20"],
//     },
//     {
//       coin_or_project: "Seedify",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:31:09"],
//     },
//     {
//       coin_or_project: "Echelon Prime",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:32:54"],
//     },
//     {
//       coin_or_project: "Neotokyo",
//       Marketcap: "micro",
//       Rpoints: 10,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:34:00"],
//     },
//     {
//       coin_or_project: "SuperVerse",
//       Marketcap: "small",
//       Rpoints: 10,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:35:19"],
//     },
//     {
//       coin_or_project: "Terse",
//       Marketcap: "micro",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:36:58"],
//     },
//     {
//       coin_or_project: "Rever",
//       Marketcap: "micro",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:37:45"],
//     },
//     {
//       coin_or_project: "Gonzilla",
//       Marketcap: "micro",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:39:23"],
//     },
//     {
//       coin_or_project: "Ready Games",
//       Marketcap: "micro",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:37:45"],
//     },
//     {
//       coin_or_project: "Heroes of Mavia",
//       Marketcap: "micro",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:37:48"],
//     },
//     {
//       coin_or_project: "Shrapnel",
//       Marketcap: "micro",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:38:03"],
//     },
//     {
//       coin_or_project: "Big Time",
//       Marketcap: "micro",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:38:24"],
//     },
//     {
//       coin_or_project: "CUS",
//       Marketcap: "micro",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["Gaming"],
//       Timestamps: ["00:38:53"],
//     },
//     {
//       coin_or_project: "Pepe",
//       Marketcap: "small",
//       Rpoints: 7,
//       "Total count": 1,
//       category: ["Meme coins"],
//       Timestamps: ["00:41:21"],
//     },
//     {
//       coin_or_project: "Bonk",
//       Marketcap: "small",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["Meme coins"],
//       Timestamps: ["00:41:23"],
//     },
//     {
//       coin_or_project: "AIOZ",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["AI"],
//       Timestamps: ["00:41:42"],
//     },
//     {
//       coin_or_project: "Bittensor",
//       Marketcap: "medium",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["AI"],
//       Timestamps: ["00:42:24"],
//     },
//     {
//       coin_or_project: "dYdX",
//       Marketcap: "medium",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:42:54"],
//     },
//     {
//       coin_or_project: "Pudgy Penguins",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["NFT"],
//       Timestamps: ["00:43:11"],
//     },
//     {
//       coin_or_project: "Prisma",
//       Marketcap: "small",
//       Rpoints: 9,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:44:22"],
//     },
//     {
//       coin_or_project: "THORChain",
//       Marketcap: "medium",
//       Rpoints: 8,
//       "Total count": 1,
//       category: ["DeFi"],
//       Timestamps: ["00:44:44"],
//     },
//   ],
//   total_count: 47,
//   total_Rpoints: 305,
// };

// for (const item of ars.projects) {
//   const data = getOffsetTimestamps(item.Timestamps);
//   console.log("Data: " + JSON.stringify(data));
// }
console.log("Unique: "+ [...new Set([00:01:08,00:02:20,00:26:20,00:24:03,00:01:08,00:03:50,00:08:03,00:01:10,00:02:38,00:02:27,00:02:20,00:12:36,00:07:58,00:44:45,00:06:25,00:26:51,00:08:06,00:23:46,00:08:45,00:04:50,00:26:22,00:06:15,00:19:59,00:07:53,00:26:30,00:26:27,00:22:54,00:01:08,00:02:22,00:04:07])])