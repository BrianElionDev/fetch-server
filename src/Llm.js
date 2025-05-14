import { LLMFactory } from "./llm/factory.js";
import { configDotenv } from "dotenv";

import { loadData } from "./LoadCoinsData.js";
import axios from "axios";
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

#IMPORTANT
At the bottom of each transcript there is a section for "Coins", this is the list of coins mentioned in the transcript. Use this list in your analysis. DONOT LEAVE ANYTHING OUT.

#INSTRUCTIONS
1. The transcript ${transcript}
3. At the end of the transcript there is a seCtion for "Coins", use this list of coins to do the analysis, also each of the coins in this section must be in the final output.
3. At the end of the transcript the section coins has coin names and timestamps extract the timestamps and use them in the final output.
4. Count the mentions of each coin.(Exclude the counting the coins in "Coins" section at the bottom of each transcript, as this will lead to double counting).
5. Analyze the sentiment (positive, neutral, or negative) and assign Rpoints (1-10 scale, where 10 is best).
7. Classify the coin by market capitalization (large, medium, small, micro).
8. Calculate the total_count of all coins/projects mentioned.
9. Ensure the JSON output exactly matches the required format.


Note:coin_or_project is the coin full name

#OUTPUT FORMAT

[{"projects":[{"coin_or_project":"Chainlink","Marketcap":"large","Rpoints":10,"Total count":1,"category":["Gaming","Meme coins","Layer 2"],"Timestamps":[]},{"coin_or_project":"Bitcoin","Marketcap":"large","Rpoints":9,"Total count":3,"category":["DeFi","Layer 1"],"Timestamps":[]}],"total_count":16,"total_Rpoints":57}]
**Notes**

* Only include the coins mentioned at the bottom of each transcript.
* Ensure the JSON output strictly matches the format provided.
Be precise, follow the structure, and focus on delivering actionable insights.`;
  return JSON.stringify(unformatted);
}
async function formatSummaryPrompt({ transcript }) {
  const formatted = `You are **Cipher**, an AI assistant specializing in analyzing cryptocurrency content and providing clear, concise, and structured summaries of investment-related discussions.

#### **Task:**

You will be given a **YouTube video transcript** ${transcript} related to cryptocurrency markets. Your job is to **extract key insights** and generate a structured summary that is **informative, easy to scan, and user-friendly**.
At the end ot the transcript their is a section "Coins",  this are the valid crypto coins in the transcript, use only this coins in you summary.

#### **Guidelines:**

✅ **Identify and extract:**

* All cryptocurrency coins mentioned (There should be a section at the end with the list of coins mentioned in the transcript,  use this as a guide )

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
export const correctTranscriptErrors = async ({ transcript }) => {
  if (!transcript) return;
  try {
    //Important step - GET entiere list of coins from CryptoNer
    const entities = await getEntitiesNer({ transcript: transcript });
    //
    const llmProvider = LLMFactory.createProvider("grok");
    const crypto_coins_local = await loadData();
    const analysisMessages = [
      {
        role: "system",
        content: `
    # ROLE: Crypto Transcript Editor
    You are an expert cryptocurrency transcript editor. Correct ONLY crypto-related errors while preserving all other content exactly.

    ## CORE RULES (STRICTLY FOLLOW)
    1. PRESERVE FORMAT: Maintain original spacing, timestamps, and speaker labels
    2. NO MEANING CHANGES: Never alter non-crypto terms/phrases
    3. MINIMAL CHANGES: Only edit crypto-related errors
    4. OUTPUT FORMAT: 
       - [Corrected Transcript]
    ## CRYPTO IDENTIFICATION PROTOCOL
    1. Here is a preliminary analysis of coins mentioned ${JSON.stringify(
      entities
    )}
    2. Analyze the context of the crypto coins in the list, to check if they were mentioned in the transcript
    3. IMPORTANT, the liSt of coins is not an exhasustive list. Try to find all the coins mentioned in the transcript, and add them to the list of coins at the end of the transcript.
    4. DO NOT IDENTIDY BROAD CATEGORIES (e.g., "crypto","meme coin", "RWA coins",  "blockchain", "NFTs") as coins.
    5. After identifying crypto coins, indacate the timestamps it was mentioned. NOTE: Provide a maximum of 3 timestamps for each coin.
    ## CRYPTO CORRECTION PROTOCOL
    ### Identify Candidates
    - Find ALL crypto mentions using:
      1. Your knowledge of crypto coins 
      2. Possible crypto coins from the transcript 
      2. Common symbols (BTC, ETH)
      3. Common misspellings (e.g., "bit coin" → "Bitcoin")
      4. Common abbreviations (e.g., "ETH" → "Ethereum")
      5. Common phrases (e.g., "chain link" → "Chainlink")
      5. Common symbols (e.g., "eth" → "ethereum")
      6. Common slang (e.g., "doge" → "Dogecoin")
      7. Split words ("chain link" → "Chainlink", " "doge coin" → "Dogecoin", "bit coin" → "Bitcoin") 
      8. Do not have duplicates in your list of coins ie ethereum and ETH, BTC and Bitcoin...  
      9. Do not have symbols instead use the coin name ie no MATIC use polygon, ETH use Ethereum...
      9. Cross-reference with provided list: ${JSON.stringify(
        crypto_coins_local
      )}

    
    ## OUTPUT TEMPLATE (USE EXACTLY)
    [BEGIN CORRECTED TRANSCRIPT]
    [Original transcript with ONLY crypto corrections]
    [COINS: 
    ALL THE COINS MENTIONED IN THE TRANSCRIPT LISTED IN THE ORDER 
     1. COINS 1 [Timestamps this coin was mentioned]
     2. COINS 2 [Timestamps this coin was mentioned]
    ]
    [END CORRECTED TRANSCRIPT]

    # TRANSCRIPT TO CORRECT
     ${transcript}
`,
      },
      {
        role: "user",
        content: `
                # TRANSCRIPT TO CORRECT
                  ${transcript}`.trim(),
      },
    ];
    const response = await llmProvider.makeRequest(analysisMessages);
    const processedResponse = await llmProvider.processResponse(response);

    return {
      transcript: processedResponse.content,
      usage: processedResponse.usage,
      default_content: processedResponse.raw,
      entities: entities,
      error: null,
    };
  } catch (error) {
    console.log("Error at llm prompt: " + error);
    return { transcript: null, usage: 0, default_content: null, error: error };
  }
};
export const getEntitiesNer = async ({ transcript }) => {
  if (!transcript) return;
  try {
    const response = axios.post(
      `${process.env.CRYPTO_NER_API_ENDPOINT}/detect`,
      {
        text: transcript,
      }
    );
    const { data } = await response;
    const { entities } = data;
    return entities;
  } catch (error) {
    console.error("Error at NER API:", error);
    return [];
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
