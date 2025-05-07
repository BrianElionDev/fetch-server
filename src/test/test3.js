// import { OpenAIEmbeddings } from "@langchain/openai";
// import { configDotenv } from "dotenv";
// configDotenv();
// const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY,
//   model: "text-embedding-3-small",
// });

import { loadData } from "../utils.js";
import fs from "fs/promises";
import path from "path";

// Load coin mapping cache
const loadCoinMappingCache = async () => {
  const cachePath = path.join(process.cwd(), "src", "coin-mapping-cache.json");
  const cacheData = await fs.readFile(cachePath, "utf-8");
  return JSON.parse(cacheData);
};

// Search CoinGecko API for a coin
const searchCoinGecko = async (query) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();

    if (data.coins && data.coins.length > 0) {
      // Find exact match first
      const exactMatch = data.coins.find(
        (coin) =>
          coin.name === query ||
          coin.symbol === query ||
          coin.id === query.toLowerCase().replace(/\s+/g, "-")
      );

      if (exactMatch) {
        return {
          name: exactMatch.name,
          id: exactMatch.id,
          symbol: exactMatch.symbol,
        };
      }

      // If no exact match, return the first result
      const coin = data.coins[0];
      return {
        name: coin.name,
        id: coin.id,
        symbol: coin.symbol,
      };
    }
    return null;
  } catch (error) {
    console.error("Error searching CoinGecko:", error);
    return null;
  }
};

// Find coin in cache by name
const findCoinInCache = async (coinName, cache) => {
  // Common coin mappings to ensure correct matches
  const commonCoinMappings = {
    // Bitcoin and its variants
    Bitcoin: { name: "Bitcoin", id: "bitcoin", symbol: "btc" },
    BTC: { name: "Bitcoin", id: "bitcoin", symbol: "btc" },
    "Bit Coin": { name: "Bitcoin", id: "bitcoin", symbol: "btc" },
    "Bitcoin Cash": { name: "Bitcoin Cash", id: "bitcoin-cash", symbol: "bch" },
    BCH: { name: "Bitcoin Cash", id: "bitcoin-cash", symbol: "bch" },
    "Bitcoin SV": { name: "Bitcoin SV", id: "bitcoin-cash-sv", symbol: "bsv" },
    BSV: { name: "Bitcoin SV", id: "bitcoin-cash-sv", symbol: "bsv" },

    // Ethereum and its ecosystem
    Ethereum: { name: "Ethereum", id: "ethereum", symbol: "eth" },
    ETH: { name: "Ethereum", id: "ethereum", symbol: "eth" },
    "Ethereum Classic": {
      name: "Ethereum Classic",
      id: "ethereum-classic",
      symbol: "etc",
    },
    ETC: { name: "Ethereum Classic", id: "ethereum-classic", symbol: "etc" },

    // Major Layer 1s
    Solana: { name: "Solana", id: "solana", symbol: "sol" },
    SOL: { name: "Solana", id: "solana", symbol: "sol" },
    Cardano: { name: "Cardano", id: "cardano", symbol: "ada" },
    ADA: { name: "Cardano", id: "cardano", symbol: "ada" },
    Polkadot: { name: "Polkadot", id: "polkadot", symbol: "dot" },
    DOT: { name: "Polkadot", id: "polkadot", symbol: "dot" },
    Avalanche: { name: "Avalanche", id: "avalanche-2", symbol: "avax" },
    AVAX: { name: "Avalanche", id: "avalanche-2", symbol: "avax" },
    Polygon: { name: "Polygon", id: "matic-network", symbol: "matic" },
    MATIC: { name: "Polygon", id: "matic-network", symbol: "matic" },
    Cosmos: { name: "Cosmos", id: "cosmos", symbol: "atom" },
    ATOM: { name: "Cosmos", id: "cosmos", symbol: "atom" },
    "NEAR Protocol": { name: "NEAR Protocol", id: "near", symbol: "near" },
    NEAR: { name: "NEAR Protocol", id: "near", symbol: "near" },
    Arbitrum: { name: "Arbitrum", id: "arbitrum", symbol: "arb" },
    ARB: { name: "Arbitrum", id: "arbitrum", symbol: "arb" },
    Optimism: { name: "Optimism", id: "optimism", symbol: "op" },
    OP: { name: "Optimism", id: "optimism", symbol: "op" },

    // Major DeFi and Exchange tokens
    Binance: { name: "BNB", id: "binancecoin", symbol: "bnb" },
    BNB: { name: "BNB", id: "binancecoin", symbol: "bnb" },
    Ripple: { name: "XRP", id: "ripple", symbol: "xrp" },
    XRP: { name: "XRP", id: "ripple", symbol: "xrp" },
    Chainlink: { name: "Chainlink", id: "chainlink", symbol: "link" },
    LINK: { name: "Chainlink", id: "chainlink", symbol: "link" },
    Uniswap: { name: "Uniswap", id: "uniswap", symbol: "uni" },
    UNI: { name: "Uniswap", id: "uniswap", symbol: "uni" },
    Aave: { name: "Aave", id: "aave", symbol: "aave" },
    Maker: { name: "Maker", id: "maker", symbol: "mkr" },
    MKR: { name: "Maker", id: "maker", symbol: "mkr" },
    Compound: { name: "Compound", id: "compound", symbol: "comp" },
    COMP: { name: "Compound", id: "compound", symbol: "comp" },
    Curve: { name: "Curve DAO Token", id: "curve-dao-token", symbol: "crv" },
    CRV: { name: "Curve DAO Token", id: "curve-dao-token", symbol: "crv" },

    // Popular altcoins
    Dogecoin: { name: "Dogecoin", id: "dogecoin", symbol: "doge" },
    DOGE: { name: "Dogecoin", id: "dogecoin", symbol: "doge" },
    Litecoin: { name: "Litecoin", id: "litecoin", symbol: "ltc" },
    LTC: { name: "Litecoin", id: "litecoin", symbol: "ltc" },
    Tron: { name: "TRON", id: "tron", symbol: "trx" },
    TRX: { name: "TRON", id: "tron", symbol: "trx" },
    "Shiba Inu": { name: "Shiba Inu", id: "shiba-inu", symbol: "shib" },
    SHIB: { name: "Shiba Inu", id: "shiba-inu", symbol: "shib" },
    Pepe: { name: "Pepe", id: "pepe", symbol: "pepe" },
    Stellar: { name: "Stellar", id: "stellar", symbol: "xlm" },
    XLM: { name: "Stellar", id: "stellar", symbol: "xlm" },
    Monero: { name: "Monero", id: "monero", symbol: "xmr" },
    XMR: { name: "Monero", id: "monero", symbol: "xmr" },
    Filecoin: { name: "Filecoin", id: "filecoin", symbol: "fil" },
    FIL: { name: "Filecoin", id: "filecoin", symbol: "fil" },

    // Stablecoins
    Tether: { name: "Tether", id: "tether", symbol: "usdt" },
    USDT: { name: "Tether", id: "tether", symbol: "usdt" },
    "USD Coin": { name: "USD Coin", id: "usd-coin", symbol: "usdc" },
    USDC: { name: "USD Coin", id: "usd-coin", symbol: "usdc" },
    DAI: { name: "Dai", id: "dai", symbol: "dai" },
    TrueUSD: { name: "TrueUSD", id: "true-usd", symbol: "tusd" },
    TUSD: { name: "TrueUSD", id: "true-usd", symbol: "tusd" },
    FRAX: { name: "Frax", id: "frax", symbol: "frax" },

    // Gaming and Metaverse
    "The Sandbox": { name: "The Sandbox", id: "the-sandbox", symbol: "sand" },
    SAND: { name: "The Sandbox", id: "the-sandbox", symbol: "sand" },
    Decentraland: { name: "Decentraland", id: "decentraland", symbol: "mana" },
    MANA: { name: "Decentraland", id: "decentraland", symbol: "mana" },
    "Axie Infinity": {
      name: "Axie Infinity",
      id: "axie-infinity",
      symbol: "axs",
    },
    AXS: { name: "Axie Infinity", id: "axie-infinity", symbol: "axs" },
    GALA: { name: "Gala", id: "gala", symbol: "gala" },
    Illuvium: { name: "Illuvium", id: "illuvium", symbol: "ilv" },
    ILV: { name: "Illuvium", id: "illuvium", symbol: "ilv" },
    Enjin: { name: "Enjin Coin", id: "enjincoin", symbol: "enj" },
    ENJ: { name: "Enjin Coin", id: "enjincoin", symbol: "enj" },

    // Additional tokens
    Sui: { name: "Sui", id: "sui", symbol: "sui" },
    Celestia: { name: "Celestia", id: "celestia", symbol: "tia" },
    TIA: { name: "Celestia", id: "celestia", symbol: "tia" },
    Brett: { name: "Brett", id: "brett", symbol: "brett" },
    Ultra: { name: "Ultra", id: "ultra", symbol: "uos" },
    UOS: { name: "Ultra", id: "ultra", symbol: "uos" },
    SingularityNET: {
      name: "SingularityNET",
      id: "singularitynet",
      symbol: "agix",
    },
    AGIX: { name: "SingularityNET", id: "singularitynet", symbol: "agix" },
    zkLink: { name: "zkLink", id: "zklink", symbol: "zkl" },
    ZKL: { name: "zkLink", id: "zklink", symbol: "zkl" },
    "Official Trump": { name: "Trump", id: "trump", symbol: "trump" },
    Trump: { name: "Trump", id: "trump", symbol: "trump" },
    "Trump Digital Trading Card": {
      name: "Trump",
      id: "trump",
      symbol: "trump",
    },
    "Trump NFT": { name: "Trump", id: "trump", symbol: "trump" },
    "Trump Token": { name: "Trump", id: "trump", symbol: "trump" },
  };

  // First check if it's a common coin with a known mapping
  if (commonCoinMappings[coinName]) {
    return commonCoinMappings[coinName];
  }

  // If not found in common mappings, search in cache with exact match
  const foundInCache = cache.find(
    (coin) =>
      coin.name === coinName || // Exact name match
      coin.symbol === coinName || // Exact symbol match
      coin.id === coinName.toLowerCase().replace(/\s+/g, "-") // Exact id match
  );

  if (foundInCache) {
    return foundInCache;
  }

  console.log("Searching for", coinName);
  // If not found in cache, search CoinGecko
  const coinGeckoResult = await searchCoinGecko(coinName);
  if (coinGeckoResult) {
    return coinGeckoResult;
  }

  return null;
};

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Queue system for API requests
class RequestQueue {
  constructor(delayMs = 2000) {
    this.queue = [];
    this.processing = false;
    this.delayMs = delayMs;
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { request, resolve, reject } = this.queue.shift();
      try {
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
      await delay(this.delayMs);
    }

    this.processing = false;
  }
}

// Create a global request queue
const requestQueue = new RequestQueue(3000); // 3 second delay between requests

// Get coin categories from CoinGecko with retry logic
const getCoinGeckoCategories = async (coinId, retries = 3, delayMs = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(
        `Fetching categories for ${coinId} (attempt ${i + 1}/${retries})`
      );

      const result = await requestQueue.add(async () => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("RATE_LIMITED");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      });

      console.log(
        `Successfully fetched categories for ${coinId}:`,
        result.categories
      );

      if (result.categories && result.categories.length > 0) {
        return result.categories.map((category) => ({
          name: category,
          id: category.toLowerCase().replace(/\s+/g, "-"),
        }));
      }
      return [];
    } catch (error) {
      console.error(`Attempt ${i + 1} failed for ${coinId}:`, error.message);
      if (error.message === "RATE_LIMITED") {
        const backoffDelay = delayMs * Math.pow(2, i); // Exponential backoff
        console.log(
          `Rate limited for ${coinId}, retrying in ${backoffDelay}ms...`
        );
        await delay(backoffDelay);
        continue;
      }
      if (i === retries - 1) {
        console.error(`All retry attempts failed for coin: ${coinId}`);
        return [];
      }
    }
  }
  return [];
};

// Transform category to required format
const transformCategory = async (category, coinId) => {
  // If we have a coinId, try to get categories from CoinGecko
  if (coinId) {
    console.log(`Attempting to fetch CoinGecko categories for ${coinId}`);
    const coinGeckoCategories = await getCoinGeckoCategories(coinId);
    if (coinGeckoCategories.length > 0) {
      console.log(
        `Using CoinGecko categories for ${coinId}:`,
        coinGeckoCategories
      );
      return coinGeckoCategories;
    }
    console.log(
      `No CoinGecko categories found for ${coinId}, falling back to local mapping`
    );
  }

  // Fallback to our category mapping if CoinGecko categories are not available
  const categoryMap = {
    "Layer 1": { name: "Layer 1", id: "layer-1" },
    "Layer 1 (L1)": { name: "Layer 1 (L1)", id: "layer-1-(l1)" },
    Meme: { name: "Meme", id: "meme" },
    Oracle: { name: "Oracle", id: "oracle" },
    Payment: { name: "Payment", id: "payment" },
    "Exchange Token": { name: "Exchange Token", id: "exchange-token" },
    DeFi: { name: "DeFi", id: "defi" },
    "Decentralized Finance (DeFi)": {
      name: "Decentralized Finance (DeFi)",
      id: "decentralized-finance-(defi)",
    },
    RWA: { name: "Real World Assets", id: "real-world-assets" },
    "Real World Assets (RWA)": {
      name: "Real World Assets (RWA)",
      id: "real-world-assets-(rwa)",
    },
    AI: { name: "AI", id: "ai" },
    "Artificial Intelligence (AI)": {
      name: "Artificial Intelligence (AI)",
      id: "artificial-intelligence-(ai)",
    },
    Storage: { name: "Storage", id: "storage" },
    "Smart Contract Platform": {
      name: "Smart Contract Platform",
      id: "smart-contract-platform",
    },
  };

  const transformedCategories = category.map(
    (cat) =>
      categoryMap[cat] || {
        name: cat,
        id: cat.toLowerCase().replace(/\s+/g, "-"),
      }
  );
  console.log(
    `Using local category mapping for ${coinId}:`,
    transformedCategories
  );
  return transformedCategories;
};

const main = async () => {
  const coinCache = await loadCoinMappingCache();

  const data = {
    projects: [
      {
        rpoints: 9,
        category: ["Layer 1"],
        marketcap: "large",
        total_count: 5,
        coin_or_project: "Bitcoin",
      },
      {
        rpoints: 10,
        category: ["Layer 1"],
        marketcap: "large",
        total_count: 25,
        coin_or_project: "Ethereum",
      },
      {
        rpoints: 10,
        category: ["Layer 1"],
        marketcap: "large",
        total_count: 25,
        coin_or_project: "Pinlink",
      },
      {
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "large",
        total_count: 3,
        coin_or_project: "Solana",
      },
      {
        rpoints: 7,
        category: ["Layer 1"],
        marketcap: "medium",
        total_count: 5,
        coin_or_project: "Cardano",
      },
      {
        rpoints: 8,
        category: ["Meme"],
        marketcap: "medium",
        total_count: 2,
        coin_or_project: "Dogecoin",
      },
      {
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "medium",
        total_count: 2,
        coin_or_project: "Avalanche",
      },
      {
        rpoints: 10,
        category: ["Oracle"],
        marketcap: "medium",
        total_count: 1,
        coin_or_project: "Chainlink",
      },
      {
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "Sui",
      },
      {
        rpoints: 7,
        category: ["Payment"],
        marketcap: "large",
        total_count: 1,
        coin_or_project: "XRP",
      },
      {
        rpoints: 7,
        category: ["Exchange Token"],
        marketcap: "large",
        total_count: 1,
        coin_or_project: "BNB",
      },
      {
        rpoints: 8,
        category: ["DeFi"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "Acala",
      },
      {
        rpoints: 8,
        category: ["RWA"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "Ondo",
      },
      {
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "medium",
        total_count: 1,
        coin_or_project: "NEAR Protocol",
      },
      {
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "medium",
        total_count: 1,
        coin_or_project: "Internet Computer",
      },
      {
        rpoints: 9,
        category: ["AI"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "Bittensor",
      },
      {
        rpoints: 9,
        category: ["AI", "Storage"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "AIOZ Network",
      },
      {
        rpoints: 8,
        category: ["DeFi"],
        marketcap: "small",
        total_count: 1,
        coin_or_project: "Destra Network",
      },
    ],
    total_count: 53,
    total_rpoints: 140,
  };

  // Transform the data with rate limiting
  const transformedData = {
    projects: await Promise.all(
      data.projects.map(async (project, index) => {
        console.log(`\nProcessing project: ${project.coin_or_project}`);
        const coin = await findCoinInCache(project.coin_or_project, coinCache);
        console.log(`Found coin data:`, coin);

        if (!coin) {
          console.log(`No coin data found for ${project.coin_or_project}`);
          return {
            rpoints: project.rpoints,
            category: project.category.map((cat) => ({
              name: cat,
              id: cat.toLowerCase().replace(/\s+/g, "-"),
            })),
            marketcap: project.marketcap,
            total_count: project.total_count,
            coin: null,
          };
        }

        const categories = await transformCategory(project.category, coin.id);
        console.log(
          `Final categories for ${project.coin_or_project}:`,
          categories
        );

        return {
          rpoints: project.rpoints,
          category: categories,
          marketcap: project.marketcap,
          total_count: project.total_count,
          coin: {
            name: coin.name,
            id: coin.id,
            symbol: coin.symbol,
          },
        };
      })
    ),
    total_count: data.total_count,
    total_rpoints: data.total_rpoints,
  };

  console.log(JSON.stringify(transformedData, null, 2));
};

main().catch(console.error);
