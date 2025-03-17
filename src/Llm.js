import dotenv from "dotenv";
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

function formatAnalysisPrompt({ transcript, coinEmbeddings }) {
  return `# ROLE  
You are an expert in cryptocurrency analysis and market trends.

# OBJECTIVE  
Analyze social media transcripts to identify cryptocurrencies and provide structured investment insights.

# CONTEXT  
Transcript: ${transcript}

# INSTRUCTIONS
1. Identify all mentioned cryptocurrencies using ${coinEmbeddings}
2. Validate against known coins/projects
3. Exclude companies, categories, and non-tradable assets
4. Analyze sentiment, market cap, and categories
5. Output structured JSON format

# OUTPUT FORMAT
[{
  "projects": [{
    "coin_or_project": "Chainlink",
    "Marketcap": "large",
    "Rpoints": 10,
    "Total count": 1,
    "category": ["Gaming", "Layer 2"]
  }],
  "total_count": 1,
  "total_Rpoints": 10
}]`;
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
          { role: "user", content: formatAnalysisPrompt(params) },
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
