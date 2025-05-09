import { LLMFactory } from "./llm/factory.js";
import { configDotenv } from "dotenv";
import { loadData } from "./LoadCoinsData.js";
configDotenv();
const PROMPT_CONFIG = {
  DEFAULT_SYSTEM_PROMPT_COIN_ANALYSIS:
    "STRICTLY FOLLOW THESE REQUIREMENTS:EXCLUDE JSON CODE INDICATORS (``` ```). Return a VALID JSON output matching the exact structure of the sample response, without any additional text, code block indicators, or explanatory notes. RETURN A DOUBLE QUOTED JSON.  Ensure: 1) Direct JSON parsing 2) Proper data types 3) No trailing commas 4) No undefined values 5) Correct array/object nesting 6) Consistent formatting",
  DEFAULT_SYSTEM_PROMPT_COIN_SUMMARY:
    "You are an intelligent ai to do anlaysis of youtube video transcrript and give a summary. Return summary of the same format as specified. DO NOT ADD ANY NOTES OR OVERVIEW. RETURN THE SPECIFIED SUMMARY FORMAT ",
};
//Format promt
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
async function formatSummaryPrompt({ transcript }) {
  const formatted = `You are **Cipher**, an AI assistant specializing in analyzing cryptocurrency content and providing clear, concise, and structured summaries of investment-related discussions.

#### **Task:**

You will be given a **YouTube video transcript** ${transcript} related to cryptocurrency markets. Your job is to **extract key insights** and generate a structured summary that is **informative, easy to scan, and user-friendly**.

#### **Guidelines:**

✅ **Identify and extract:**

* All cryptocurrency coins mentioned

* Investment recommendations

* Price predictions or targets

* Risk warnings or disclaimers

✅ **Generate a structured summary (300-500 words) with:**

* **Crypto Market Overview:** Briefly state the market sentiment and trends.

* **Key Investment Insights:** Highlight major investment takeaways (e.g., Bitcoin outlook, altcoin trends, stocks, or DeFi opportunities).

* **Notable Predictions & Risks:** Clearly separate facts from speculative forecasts.

* **Actionable Advice (if applicable):** Summarize key recommendations from the discussion.

#### **Rules to Follow:**

* Keep the tone **neutral and objective**.

* Use **bullet points** or short paragraphs for easy readability.

* Clearly **separate facts from opinions/predictions**.

* Avoid unnecessary repetition or overly technical details.
#OUTPUT FORMAT
## Crypto Market Overview
The current cryptocurrency market sentiment is mixed, with some investors feeling pessimistic due to recent declines, while others are optimistic about future prospects. Regulatory changes in the U.S. are seen as a positive development, potentially leading to increased mainstream adoption and investment opportunities. The recent decision by the Office of the Comptroller of the Currency (OCC) to allow U.S. banks to engage in crypto activities without prior approval is a significant step forward[1][2][3].

## Key Investment Insights

- **Regulatory Shifts:** The OCC's decision to permit banks to engage in crypto activities marks a significant shift in regulatory stance, potentially increasing institutional involvement and mainstream acceptance[1][2].
- **SEC and CFTC Developments:** The SEC is moving towards clearer regulations, with a focus on fostering innovation rather than enforcement. The CFTC is also expanding its role in crypto regulation, potentially leading to more commodities being classified as such[5].
- **FDIC's New Stance:** The FDIC is adopting a more crypto-friendly approach, aiming to facilitate innovation while maintaining banking security[5].
- **Bitcoin and Stablecoins:** The U.S. government is focusing on building a Bitcoin reserve without using taxpayer funds, which could impact market dynamics[4].

## Notable Predictions & Risks

- **Market Volatility:** The market remains volatile, with recent price fluctuations in response to regulatory announcements[1][4].
- **Regulatory Risks:** Despite positive changes, regulatory battles are not over, and further clarity is needed from other agencies like the Federal Reserve[2].
- **Innovation Opportunities:** Clearer regulations could lead to an explosion of innovation in DeFi and tokenized assets[5].

## Actionable Advice

- **Stay Informed:** Investors should remain vigilant about regulatory changes and their potential impact on the market.
- **Diversification:** Consider diversifying investments across different cryptocurrencies and assets to manage risk.
- **Long-Term Outlook:** The long-term outlook for crypto remains bullish, driven by regulatory clarity and increased institutional participation[5].

## Cryptocurrency Coins Mentioned

- **Bitcoin (BTC)**
- **Ethereum (ETH)**
- **XRP**
- **Dogecoin (DOGE)**
- **Cardano (ADA)**

## Risk Warnings or Disclaimers

- Regulatory changes can significantly impact market volatility and investment outcomes.
- Too much or too little regulation can hinder innovation or lead to abuse.
- Investors should conduct thorough research before making investment decisions.
Please follow the summary output format!
`;

  return JSON.stringify(formatted);
}
//Format response
async function formatSummaryResponse(response) {
  let cleanedPrompt = response
    .replace(/\[\d+\]/g, "")
    .replace(/\[Transcript\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  cleanedPrompt = cleanedPrompt.replace(/#{1,6}\s*(.*)/g, (match, heading) => {
    return `## ${heading.trim()}`;
  });
  cleanedPrompt = cleanedPrompt.replace(/[•●]\s/g, "- ");
  return cleanedPrompt;
}
const correctTranscriptErrors = async ({ transcript }) => {
  if (!transcript) return;
  try {
    const llmProvider = LLMFactory.createProvider("grok");
    const analysisMessages = [
      {
        role: "system",
        content: `Do Analysis of the transcript, and correct the errors in the transcript.
          #CONTEXT
          The transcript is from a youtube video. The transcript may contain errors, such as wrong names, wrong words, etc.
          The transcript is about cryptocurrency coins, often their names are misspelled or wrong. Your purpose is to correct this errors and return the corrected transcript. Try to infer which coin they were mentioning, if they are multiple with the same name.
          #INSTRUCTIONS
          -Correct the errors in the transcript.
          -Do not change the meaning of the transcript.
          -Do not add any extra information to the transcript.
          -Do not remove any information from the transcript.
          -Do not change the format of the transcript.
          -Do not change the order of the transcript.
          #Important
          -Return the corrected transcript .
          -DO NOT RETURN NOTES OR COMMENTS, I NEED THE TRANSCRIPT ONLY!S.
            `,
      },
      {
        role: "user",
        content: transcript,
      },
    ];
    const response = await llmProvider.makeRequest(analysisMessages);
    const processedResponse = await llmProvider.processResponse(response);

    return {
      transcript: processedResponse.content,
      usage: processedResponse.usage,
      error: null,
    };
  } catch (error) {
    console.log("Error at llm prompt: " + error);
    return { transcript: null, usage: 0, error: error };
  }
};

export const makeLlmPrompt = async ({ transcript, model }) => {
  const llmProvider = LLMFactory.createProvider(model);
  try {
    if (!transcript) {
      throw new Error("Transcript is required for analysis");
    }
    const {
      transcript: correctedTranscript,
      usage: transcriptCorrectionUsage,
      error: transcriptError,
    } = await correctTranscriptErrors({ transcript });

    // Analysis request
    const analysisMessages = [
      {
        role: "system",
        content: PROMPT_CONFIG.DEFAULT_SYSTEM_PROMPT_COIN_ANALYSIS,
      },
      {
        role: "user",
        content: await formatAnalysisPrompt(
          { transcript: correctedTranscript } || transcript
        ),
      },
    ];

    // Summary request
    const summaryMessages = [
      {
        role: "system",
        content: PROMPT_CONFIG.DEFAULT_SYSTEM_PROMPT_COIN_SUMMARY,
      },
      {
        role: "user",
        content: await formatSummaryPrompt(
          { transcript: correctedTranscript } || transcript
        ),
      },
    ];

    const [analysisResponse, summaryResponse] = await Promise.all([
      llmProvider.makeRequest(analysisMessages),
      llmProvider.makeRequest(summaryMessages),
    ]);

    const { content: analysisContent, usage: analysisUsage } =
      await llmProvider.processResponse(analysisResponse);
    const { content: summaryContent, usage: summaryUsage } =
      await llmProvider.processResponse(summaryResponse);

    const analysis = await JSON.parse(analysisContent);
    const summary = await formatSummaryResponse(summaryContent);
    return {
      analysis,
      summary,
      transcript: correctedTranscript,
      usage: analysisUsage + summaryUsage + transcriptCorrectionUsage,
    };
  } catch (error) {
    console.error("Analysis Failed:", error.message);
    return { analysis: null, summary: null, usage: 0 };
  }
};
