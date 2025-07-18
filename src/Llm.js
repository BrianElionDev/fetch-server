import { LLMFactory } from "./llm/factory.js";
import { configDotenv } from "dotenv";

import { loadData } from "./LoadCoinsData.js";
import axios from "axios";
import Fuse from "fuse.js";
import { supabase } from "./supabaseClient.js";
import { formatValidatedData, waitSeconds } from "./utils.js";
configDotenv();
const PROMPT_CONFIG = {
  DEFAULT_SYSTEM_PROMPT_COIN_ANALYSIS:
    "STRICTLY FOLLOW THESE REQUIREMENTS:EXCLUDE JSON CODE INDICATORS (``` ```). Return a VALID JSON output matching the exact structure of the sample response, without any additional text, code block indicators, or explanatory notes. RETURN A DOUBLE QUOTED JSON.  Ensure: 1) Direct JSON parsing 2) Proper data types 3) No trailing commas 4) No undefined values 5) Correct array/object nesting 6) Consistent formatting",
  DEFAULT_SYSTEM_PROMPT_COIN_SUMMARY:
    "You are an intelligent ai to do anlaysis of youtube video transcrript and give a summary. Return summary of the same format as specified. DO NOT ADD ANY NOTES OR OVERVIEW. RETURN THE SPECIFIED SUMMARY FORMAT ",
};
//Helper functions
export async function getTranscriptContent(link) {
  const { data: analysisData, error } = await supabase
    .from("tests")
    .select("*")
    .eq("link", link)
    .eq("model", "grok");

  if (error) {
    console.log("Error at getTranscriptContent: " + JSON.stringify(error));
    return;
  }

  let analysis = analysisData[0].llm_answer;
  let transcript = analysisData[0].transcript;

  const fuseOptions = {
    threshold: 0.6,
    keys: ["text"],
  };

  let finalProjectsArray = [];

  for (let project of analysis.projects) {
    let matchedArray = [];
    const fuse = new Fuse(transcript.split(" "), fuseOptions);
    const matches = fuse.search(project.coin_or_project.split(" ")[0]);
    //console.log("\n \nChecking for: " + project.coin_or_project);
    if (project.coin) {
      let matchesFromSymbol = fuse.search(project.coin.symbol);
      //console.log("Checking symbol: " + project.coin.symbol);
      matchesFromSymbol = matchesFromSymbol
        .map((match) => match.item)
        .slice(0, 40)
        .join(",");
      //console.log("Matched from symbol: " + matchesFromSymbol + "####");
      matchedArray.push(matchesFromSymbol);
    }
    const matchedContent = matches
      .map((match) => match.item)
      .slice(0, 40)
      .join(",");
    matchedArray.push(matchedContent);
    finalProjectsArray.push({
      ...project,
      transcript_content: matchedArray.join(" ").replace(/\r\n/g, " "),
    });
  }

  return {
    ...analysis,
    projects: finalProjectsArray,
  };
}
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
3. At the end of the transcript the section coins has coin id, coin names and timestamps extract the timestamps and use them in the final output. If timestamp has format 00:00:00.000, it contains micro seconds. Exclude microseconds in you final output. Timestamp should be in the format 00:00:00.
4. Count the mentions of each coin.(Exclude the counting the coins in "Coins" section at the bottom of each transcript, as this will lead to double counting).
5. Analyze the sentiment (positive, neutral, or negative) and assign Rpoints (1-10 scale, where 10 is best).
7. Classify the coin by market capitalization (large, medium, small, micro).
8. Calculate the total_count of all coins/projects mentioned.
9. Ensure the JSON output exactly matches the required format.


Note:coin_or_project is the coin full name

#OUTPUT FORMAT

{"projects":[{"coin_or_project":"Bitcoin","Marketcap":"large","Rpoints":10,"Total count":1,"category":["Gaming","Meme coins","Layer 2"],"Timestamps":[]},{"coin_or_project":"Avalanche","Marketcap":"large","Rpoints":9,"Total count":3,"category":["DeFi","Layer 1"],"Timestamps":[]}],"total_count":16,"total_Rpoints":57}
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

//Helper functions
export async function processCryptoMatching(transcript) {
  const coinData = await loadData();
  let commonEnglishWords = [
    "the",
    "of",
    "and",
    "a",
    "to",
    "in",
    "is",
    "you",
    "that",
    "it",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "I",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "then",
    "them",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "go",
    "see",
    "number",
    "no",
    "way",
    "could",
    "people",
    "my",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part",
  ];
  const coinPhrasesSet = new Set();
  const stopwordsSet = new Set(
    commonEnglishWords.map((word) => word.toLowerCase())
  );
  for (const coin of coinData) {
    const cleanSymbol = coin.i.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanSymbol) coinPhrasesSet.add(cleanSymbol);
    const cleanName = coin.n.toLowerCase().replace(/[^a-z0-9\s]/g, "");
    if (cleanName) coinPhrasesSet.add(cleanName);
  }

  const transcriptClean = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const tokens = transcriptClean
    .split(/\s+/)
    .filter((token) => token.length > 0);
  const matches = new Set();
  const maxN = 5;

  for (let n = 1; n <= maxN; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      const ngram = tokens.slice(i, i + n);
      const spaced = ngram.join(" ");
      const spaceless = ngram.join("");

      if (n === 1 && stopwordsSet.has(spaced)) continue;

      if (coinPhrasesSet.has(spaced) || coinPhrasesSet.has(spaceless)) {
        matches.add(spaced);
      }
    }
  }

  console.log("Matched Phrases: ", JSON.stringify([...matches]));
  return [...matches];
}

export const correctTranscriptErrors = async ({ transcript }) => {
  if (!transcript) return;
  try {
    //Important step - GET entiere list of coins from CryptoNer
    //const entities = await getEntitiesNer({ transcript: transcript });
    const entities = await processCryptoMatching(transcript);
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
1. Here is a possible crypto tokens match list${entities
          .map((entity, index) => `[${index}: ${entity}]`)
          .join("\n")}
2. Analyze the context of the crypto coins in the list to check if they were mentioned in the transcript
3. IMPORTANT, the list of coins is not an exhaustive list. Try to find all the coins mentioned in the transcript and add them to the list of coins at the end of the transcript.
4. DO NOT IDENTIFY BROAD CATEGORIES (e.g., "crypto", "meme coin", "RWA coins", "blockchain", "NFTs") as coins.
5. After identifying crypto coins, indicate the precise timestamps they were mentioned. NOTE: Provide a maximum of 3 timestamps for each coin. If a timestamp has the format 00:00:00.000, it contains microseconds. Exclude microseconds in your final output (No rounding off). Timestamp should be in the format 00:00:00.
## CRYPTO CORRECTION PROTOCOL
### Identify Candidates
- Find ALL crypto mentions using:
  1. Your knowledge of crypto coins 
  2. Possible crypto coins from the transcript 
  3. Common symbols (BTC, ETH)
  4. Common misspellings (e.g., "bit coin" → "Bitcoin")
  5. Common abbreviations (e.g., "ETH" → "Ethereum")
  6. Common phrases (e.g., "chain link" → "Chainlink")
  7. Common symbols (e.g., "eth" → "Ethereum")
  8. Common slang (e.g., "doge" → "Dogecoin")
  9. Split words ("chain link" → "Chainlink", "doge coin" → "Dogecoin", "bit coin" → "Bitcoin") 
  10. Do not have duplicates in your list of coins i.e., Ethereum and ETH, BTC and Bitcoin...  
  11. Do not have symbols; instead, use the coin name i.e., no MATIC use Polygon, ETH use Ethereum...
  12. Cross-reference with provided list: [${crypto_coins_local
    .map(
      (item) =>
        `  "ID": "${item.i}", "Name": "${item.n}", "Symbol": "${item.s}"`
    )
    .join(",\n")}
    ]
## OUTPUT TEMPLATE (USE EXACTLY)

[BEGIN CORRECTED TRANSCRIPT]
[Original transcript with ONLY crypto corrections]
[COINS: 
ALL THE COINS MENTIONED IN THE TRANSCRIPT LISTED IN THE ORDER
 1. ID: coin identifier from the local list(ID: NAME: SYMBOL: ). if not in the list(ID: NAME: SYMBOL: ). then have the name as the identifier) - COIN  [Timestamps this coin was mentioned(timstamp should be accurate to where the coin was mentioned. Also the timestamp should not be duplicated for a single project)] :- [Reason for choosing project]
 2. ID: coin identifier from the local list(ID: NAME: SYMBOL: ). if not in the list(ID: NAME: SYMBOL: ). then have the name as the identifier) - COIN  [Timestamps this coin was mentioned(timstamp should be accurate to where the coin was mentioned. Also the timestamp should not be duplicated for a single project)] :- [Reason for choosing project]
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
    console.log(
      "Response from corrected transcript: " + processedResponse.content
    );
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
export const validateCoins = async (link, screenshotContent) => {
  if (!link || !screenshotContent) return;
  try {
    const transcriptContent = await getTranscriptContent(link);

    console.log("Transcript content: " + JSON.stringify(transcriptContent));

    const { analysis: analysisValidated } =
      await validateCoinsAgainstTrascriptContent(
        transcriptContent,
        screenshotContent
      );

    const formattedAnalysis = await formatValidatedData(
      analysisValidated,
      link || ""
    );
    return {
      analysis: formattedAnalysis,
    };
  } catch (error) {
    console.log("Error occured at validateCoins: " + JSON.stringify(error));
    return { analysis: null, usage: 0, default_content: null, error: error };
  }
};
export const validateCoinsAgainstTrascriptContent = async (
  transcriptContent,
  screenshotContent
) => {
  if (!transcriptContent || !screenshotContent) return;
  screenshotContent = screenshotContent;
  try {
    const crypto_coins_local = await loadData();
    const llmProvider = LLMFactory.createProvider("openai");
    const analysisMessagesScreenshot = [
      {
        role: "system",
        content: `You are an intelligent AI agent. Your task is to validate if a crypto coin appears in content blocks.

##IMPORTANT:
You are checking coins against screenshot content and a local list of crypto tokens:
- Coin: A coin/token you are trying to check for
- Content: Text content extracted from screenshots
- Local list of crypto tokens: Reference data for validation
`,
      },
      {
        role: "user",
        content: `
##Instructions
1. For each coin-content pair, check if the specified coin/token name appears in its corresponding "Content" section.

2. PRIMARY VALIDATION LOGIC:
   - If the coin/token name is found in the Content → VALID (return true)
   - If the coin/token name is NOT found in the Content → INVALID (return false)
   - The coin/token should be a specific token and not a category.
   - If the actual token is mentioned the identify it as valid and in the possible match indicate the coin/token name + token symbol.
   - If the coin/token name is a crypto term and not a crypto token (e.g., NFT, BLOCKCHAIN, AI, ALTCOINS) → INVALID (return false)

3. CLOSE MATCH IDENTIFICATION:
   - When a coin/token is invalid (not found in Content), look for a similar pronounced or written token in the content. If their is no similar pronounced or written token then possible match = "none"
   - Identify the closest possible match from what's actually mentioned in the Content.
   - If the coin/token name is a crypto term and not a crypto token ie NFT, BLOCKCHAIN, AI, ALTCOINS... possible_match →  'none'
   - Account for pronunciation errors, partial names, or similar-sounding coins
   - The possible match should be a specific token and not a category.
   - IMPORTANT It should be close in pronunciation or transcription to the coin/token we are checking.


4. ADDITIONAL VALIDATION RULES:
   - The coin/token must be a legitimate cryptocurrency (check against local list or your knowledge)
   - COIN CATEGORY NAMES ARE INVALID (e.g., NFT, AI COINS, ALT COINS)
   - Context matters: ensure the mention refers to the actual cryptocurrency, not unrelated usage

5. MATCHING FLEXIBILITY:
   - Partial matches are valid (e.g., "pixels" for "Pixels Online")
   - Symbol matching is not required if the name matches
   - Account for common spelling variations

6. The Content is the authoritative source - what's actually shown in the Content determines validity.

##Task

###Local List
${JSON.stringify(crypto_coins_local)}

${transcriptContent.projects
  .map(
    (project) => `
      Coin: ${project.coin_or_project?.replace(/_/g, " ")},
      Content: ${screenshotContent.projects
        .filter(
          (proj) =>
            proj.coin_or_project?.replace(/_/g, " ") == project.coin_or_project
        )
        .map((proj) => proj.content)}
`
  )
  .join("\n \n")}

      ##Output Format
      The output format should be an array of objects:

      [{
        "coin": "", // The coin/token name being validated
        "valid": true or false, // TRUE if the coin/token name appears in its corresponding Content, FALSE if not found
        "possible_match": "", // If coin/token is invalid (not found in Content), identify the closest crypto-related term that IS actually mentioned in the screenshot content. If coin/token is valid or no close match exists, return "none"
        "found_in": "screenshot", // Always "screenshot" since we're analyzing Content, or "none" if no possible_match found
        "reason": "" // If invalid, give a short note of why it is invalid
      }]
`,
      },
    ];
    const analysisMessagesTranscript = [
      {
        role: "system",
        content: `You are an intelligent AI agent. Your task is to validate if a crypto coin/token appears in content blocks.

      ##IMPORTANT:
      You are checking coins from the transcript against a local list of crypto tokens:
      - Coin: A coin/token you are trying to check for
      - Content: A chunk of the transcript where a coin/token is mentioned
      - Local list of crypto tokens: Reference data for validation
      `,
      },
      {
        role: "user",
        content: `
      ##Instructions
      1. For each coin-content pair, check if the specified coin/token name appears in its corresponding "Content" section (transcript extract).

      2. PRIMARY VALIDATION LOGIC:
        - If the coin/token name is found in the content section → VALID (return true)
        - If the coin/token name is NOT found in the content section → INVALID (return false)
        - The coin/token should be a specific token and not a category.
        - If the coin/token token is mentioned the identify it as valid and in the possible match indicate the coin/token name + token symbol.
        - If the coin/token name is a crypto term and not a crypto token ie NFT, BLOCKCHAIN, AI, ALTCOINS... → INVALID (return false)

      3. CLOSE MATCH IDENTIFICATION:
        - When a coin/token is invalid (not found in content), look for similar or related crypto terms in the content
        - Identify the closest possible match from what's actually mentioned in the content
        - IMPORTANT It should be close to the coin/token we are checking.
        - The possible match should be a specific token and not a category.
        - If the coin/token name is a crypto term and not a crypto token ie NFT, BLOCKCHAIN, AI, ALTCOINS... possible_match →  'none'
        - Account for pronunciation errors, partial names, or similar-sounding coins

      4. ADDITIONAL VALIDATION RULES:
        - The coin/token must be a legitimate cryptocurrency (check against local list or your knowledge)
        - COIN CATEGORY NAMES ARE INVALID (e.g., NFT, AI COINS, ALT COINS)
        - Context matters: ensure the mention refers to the actual cryptocurrency, not unrelated usage

      5. MATCHING FLEXIBILITY:
        - Partial matches are valid (e.g., "pixels" for "Pixels Online")
        - Symbol matching is not required if the name matches
        - Account for common pronunciation/spelling variations

      6. The content section is the authoritative source - what's actually said in the transcript determines validity.

      ##Task

      ###Local List
      ${JSON.stringify(crypto_coins_local)}

      ${transcriptContent.projects
        .map(
          (project) => `
      Coin: ${project.coin_or_project?.replace(/_/g, " ")},
      Content: "${project.transcript_content}"
      `
        )
        .join("\n")}

      ##Output Format
      The output format should be an array of objects:

      [{
        "coin": "", // The coin/token name being validated
        "valid": true or false, // TRUE if the coin/token name appears in its corresponding content section, FALSE if not found
        "possible_match": "", // If coin/token is invalid (not found in content), identify the closest crypto-related term that IS actually mentioned in the content section. If coin/token is valid or no close match exists, return "none"
        "found_in": "transcript" // Always "transcript" since we're analyzing transcript content, or "none" if no possible_match found
        "reason": ""If invalid give a short note of why it is invalid.
      }]
`,
      },
    ];
    const screenshotResponse = await llmProvider.makeRequest(
      analysisMessagesScreenshot
    );
    await waitSeconds(30);
    const transcriptResponse = await llmProvider.makeRequest(
      analysisMessagesTranscript
    );

    let processedResponseScreenshot = await llmProvider.processResponse(
      screenshotResponse
    );
    let processedResponseTranscript = await llmProvider.processResponse(
      transcriptResponse
    );

    processedResponseScreenshot = await JSON.parse(
      processedResponseScreenshot.content
    );
    processedResponseTranscript = await JSON.parse(
      processedResponseTranscript.content
    );
    console.log(
      "Processed screenshot content: " +
        JSON.stringify(processedResponseScreenshot)
    );
    const mergedItems = processedResponseScreenshot.map((screenshotItem) => {
      if (screenshotItem.valid) {
        return screenshotItem;
      }
      const transcriptItem = processedResponseTranscript.find(
        (item) => item.coin === screenshotItem.coin
      );

      if (transcriptItem && transcriptItem.valid) {
        return transcriptItem;
      }
      return screenshotItem;
    });

    return {
      analysis: mergedItems,
      usage: transcriptResponse.usage,
      default_content: 0,
      error: null,
    };
  } catch (error) {
    console.log("Error at validateCoinsAgainstTrascriptContent: " + error);
    return { analysis: null, usage: 0, default_content: null, error: error };
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
