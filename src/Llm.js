import { configDotenv } from "dotenv";
import { loadData } from "./LoadCoinsData.js";
configDotenv();
const API_CONFIG = {
  ENDPOINT: "https://api.perplexity.ai/chat/completions",
  MODEL: "sonar",
  DEFAULT_SYSTEM_PROMPT:
    "Important for coin names provide offical coin name in coinmarketcap. If a coin cannot be found in coinmarketcap then leave it out. Return a json output only of same type as the sample response, Without ``json code indicator.Output should be a valid json There should be no ***note section.RETURN A JSON OUPUT. IT SHOULD BE VALID JSON",
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
  },
  REQUEST_PARAMS: {
    temperature: 0,
    top_p: 0.9,
    search_domain_filter: null,
    return_images: false,
    return_related_questions: false,
    search_recency_filter: "week",
    top_k: 0,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 1,
    response_format: null,
  },
};

async function formatAnalysisPrompt({ transcript }) {
  const coinEmbeddings = "Use coins from coinmarketcap";
  const unformatted = `#ROLE  
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

     * First, verify it matches for misspelled or exists in [${coinEmbeddings}]

     * If it does, replace it with the full official name.

     * If it does not exist, discard it.

   * Always use the full coin names from knowledge.crypto_coins for each coin for uniformity

   * Only take tradable cryptocurrency coins and exclude:

     * Company names (e.g., NVIDIA, MicroStrategy, Deep Seek)

     * Untradable or unknown coins (e.g. Bar chain,Zerro etc.)

     * Categories (e.g., RWA coins, DeFi tokens, Meme coins)

     * Non-tradable assets or project names (e.g., Tbot)  
       If an entry is not found in [${coinEmbeddings}], ignore it."

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

* Only include the coins that exist in [${coinEmbeddings}]

* Ensure the JSON output strictly matches the format provided.

Be precise, follow the structure, and focus on delivering actionable insights.`;
  return JSON.stringify(unformatted);
}

async function fetchCoinAnalysis(formattedPrompt) {
  const body = JSON.stringify({
    model: "sonar",
    messages: [
      {
        role: "system",
        content: API_CONFIG.DEFAULT_SYSTEM_PROMPT,
      },
      { role: "user", content: formattedPrompt },
    ],
    temperature: 0.1,
    top_p: 0.9,
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: body,
  };

  try {
    const response = await fetch(
      "https://api.perplexity.ai/chat/completions",
      options
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const makeLlmPrompt = async ({ transcript }) => {
  try {
    let results;
    if (!transcript) {
      throw new Error("Transcript is required for analysis");
    }

    await fetchCoinAnalysis(
      await formatAnalysisPrompt({ transcript: transcript })
    )
      .then((result) => {
        results = result;
        return results;
      })
      .catch((error) => {
        console.error("Final Error:", error);
        results = null;
        return results;
      });

    try {
      return JSON.parse(results?.choices[0]?.message.content);
    } catch (error) {
      console.error("Unable to parse results!");
      return null;
    }
  } catch (error) {
    console.error("Analysis Failed:", error.message);
    return {
      success: false,
      error: error.message,
      default: { projects: [], total_count: 0, total_Rpoints: 0 },
    };
  }
};
