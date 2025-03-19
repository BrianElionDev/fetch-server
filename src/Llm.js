import dotenv from "dotenv";
import { loadData } from "./LoadCoinsData";
dotenv.config();
const API_CONFIG = {
  ENDPOINT: "https://api.perplexity.ai/chat/completions",
  MODEL: "sonar",
  DEFAULT_SYSTEM_PROMPT:
    "You are an AI specializing in analyzing crypto coins.Important for coin names provide offical coin name in coinmarketcap. If a coin cannot be found in coinmarketcap then leave it out. Return a json output only of same type as the sample response, Without ``json code indicator.Output should be a valid json",
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: `Bearer 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`, // Store key in .env
  },
  REQUEST_PARAMS: {
    temperature: 0.2,
    top_p: 0.9,
    search_recency_filter: "week",
    frequency_penalty: 1,
  },
};

async function formatAnalysisPrompt({ transcript }) {
  const coinEmbeddings = await loadData();
  return `#ROLE  
You are an expert in all cryptocurrency coins, cryptocurrency trends etc.

#OBJECTIVE  
Your task is to read transcripts from any social media source (e.g., YouTube, X, webpages), identify all cryptocurrency coins mentioned, and provide accurate investment recommendations.

#CONTEXT  
This task is crucial for making profitable investment decisions in cryptocurrency coins.

#INSTRUCTIONS

1. Read the provided Transcript [${transcript}]

2. Identify and list each and every cryptocurrency coin name or symbol mentioned  (both existing, mentioned and proposed) and

     Don't leave out the major coins mentioned.

    "Only take cryptocurrency coins and exclude:

   * Company names (e.g., NVIDIA, MicroStrategy, Deep Seek)

   * Categories (e.g., RWA coins, DeFi tokens, Meme coins)

   * Non-tradable assets or project names (e.g., Tbot)  

3. Data validation

   * If a coin is referenced with a name, with a ticker or symbol (e.g., BTC, MOG, ETH) , in short form (e.g., eth) or If an unofficial or misspelled coin name appears,

     * First, verify it matches for misspelled or exists in [${jsonData}]

     * If it does, replace it with the full official name.

     * If it does not exist, discard it.

   * Always use the full coin names from knowledge.crypto_coins for each coin for uniformity

   * Only take tradable cryptocurrency coins and exclude:

     * Company names (e.g., NVIDIA, MicroStrategy, Deep Seek)

     * Untradable or unknown coins (e.g. Bar chain,Zerro etc.)

     * Categories (e.g., RWA coins, DeFi tokens, Meme coins)

     * Non-tradable assets or project names (e.g., Tbot)  
       If an entry is not found in [${jsonData}], ignore it."

   * Match and filter all the coins against knowledge.crypto_coins to ensure validity of the coin name and get the coins full name.

4. Count the mentions of each coin.

5. Analyze the sentiment (positive, neutral, or negative) and assign Rpoints (1-10 scale, where 10 is best).

6. Categorize the coin based on CoinMarketCap categories (e.g., DeFi, Layer 1, Gaming).

7. Classify the coin by market capitalization (large, medium, small, micro).

8. Calculate the total_count of all coins/projects mentioned.

9. Ensure the JSON output exactly matches the required format. Only include coins validated through knowledge.crypto_coins Exclude all unrecognized names, companies, and categories."

Note:coin_or_project is the coin full name

#OUTPUT FORMAT

[ { "projects": [ { "coin_or_project": "Chainlink", "Marketcap": "large", "Rpoints": 10, "Total count": 1, "category": ["Gaming", "Meme coins", "Layer 2"] }, { "coin_or_project": "Bitcoin", "Marketcap": "large", "Rpoints": 9, "Total count": 3, "category": ["DeFi", "Layer 1"] } ], "total_count": 16, "total_Rpoints": 57 } ]  

**Notes**

* Accuracy is critical—filter out any invalid or unverified coins/projects.

* Only include the coins that exist in [${jsonData}]

* Ensure the JSON output strictly matches the format provided.

Be precise, follow the structure, and focus on delivering actionable insights.`;
}

async function fetchCoinAnalysis(params) {
  try {
    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: "POST",
      headers: API_CONFIG.HEADERS,
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          { role: "system", content: API_CONFIG.DEFAULT_SYSTEM_PROMPT },
          { role: "user", content: await formatAnalysisPrompt(params) },
        ],
        ...API_CONFIG.REQUEST_PARAMS,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Analysis Error:", error.message);
    throw new Error("Failed to process cryptocurrency analysis");
  }
}

export const makeLlmPrompt = async ({
  transcript,
  coinEmbeddings = "Use coins from coinmarket cap or coingecko",
}) => {
  try {
    if (!transcript) {
      throw new Error("Transcript is required for analysis");
    }

    const response = await fetchCoinAnalysis({ transcript, coinEmbeddings });
    const result = response.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("Invalid API response structure");
    }

    return result;
  } catch (error) {
    console.error("Analysis Failed:", error.message);
    return {
      success: false,
      error: error.message,
      default: { projects: [], total_count: 0, total_Rpoints: 0 },
    };
  }
};
