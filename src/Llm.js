export const makeLlmPrompt = async ({
  transcript,
  coinEmbeddings = "Use coins from coinmarket cap or coingecko",
}) => {
  //
  const formattedPrompt = `#ROLE  
You are an expert in all cryptocurrency coins, cryptocurrency trends etc.

#OBJECTIVE  
Your task is to read transcripts from any social media source (e.g., YouTube, X, webpages), identify all cryptocurrency coins mentioned, and provide accurate investment recommendations.

#CONTEXT  
This task is crucial for making profitable investment decisions in cryptocurrency coins.

#INSTRUCTIONS

1. Read the provided Transcript ${transcript}

2. Identify and list each and every cryptocurrency coin name or symbol mentioned  (both existing, mentioned and proposed) and

     Don't leave out the major coins mentioned.

    "Only take cryptocurrency coins and exclude:

   * Company names (e.g., NVIDIA, MicroStrategy, Deep Seek)

   * Categories (e.g., RWA coins, DeFi tokens, Meme coins)

   * Non-tradable assets or project names (e.g., Tbot)  

3. Data validation

   * If a coin is referenced with a name, with a ticker or symbol (e.g., BTC, MOG, ETH) , in short form (e.g., eth) or If an unofficial or misspelled coin name appears,

     * First, verify it matches for misspelled or exists in ${coinEmbeddings}.

     * If it does, replace it with the full official name.

     * If it does not exist, discard it.

   * Always use the full coin names from ${coinEmbeddings} for each coin for uniformity

   * Only take tradable cryptocurrency coins and exclude:

     * Company names (e.g., NVIDIA, MicroStrategy, Deep Seek)

     * Untradable or unknown coins (e.g. Bar chain,Zerro etc.)

     * Categories (e.g., RWA coins, DeFi tokens, Meme coins)

     * Non-tradable assets or project names (e.g., Tbot)  
       If an entry is not found in ${coinEmbeddings}, ignore it."

   * Match and filter all the coins against ${coinEmbeddings} to ensure validity of the coin name and get the coins full name.

4. Count the mentions of each coin.

5. Analyze the sentiment (positive, neutral, or negative) and assign Rpoints (1-10 scale, where 10 is best).

6. Categorize the coin based on CoinMarketCap categories (e.g., DeFi, Layer 1, Gaming).

7. Classify the coin by market capitalization (large, medium, small, micro).

8. Calculate the total_count of all coins/projects mentioned.

9. Ensure the JSON output exactly matches the required format. Only include coins validated through ${coinEmbeddings} Exclude all unrecognized names, companies, and categories."

Note:coin_or_project is the coin full name

#OUTPUT FORMAT

[ { "projects": [ { "coin_or_project": "Chainlink", "Marketcap": "large", "Rpoints": 10, "Total count": 1, "category": ["Gaming", "Meme coins", "Layer 2"] }, { "coin_or_project": "Bitcoin", "Marketcap": "large", "Rpoints": 9, "Total count": 3, "category": ["DeFi", "Layer 1"] } ], "total_count": 16, "total_Rpoints": 57 } ]  

**Notes**

* Accuracy is critical—filter out any invalid or unverified coins/projects.

* Only include the coins that exist in knowledge.crypto_coins

* Ensure the JSON output strictly matches the format provided.

Be precise, follow the structure, and focus on delivering actionable insights.`;
  const systemPrompt = `You are an Ai specializing in analyzing crypto coins`;
  const prompt = "What is the current sentiment of bitcoin";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    },
    body: `{"model":"sonar","messages":[{"role":"system","content":"${
      systemPrompt
        ? systemPrompt
        : "You are an Ai specializing in analyzing crypto coins"
    }"},{"role":"user","content":"${prompt}"}],"max_tokens":1024,"temperature":0.1,"top_p":0.9,"search_domain_filter":null,"return_images":false,"return_related_questions":false,"search_recency_filter":"day","top_k":0,"stream":false,"presence_penalty":0,"frequency_penalty":1,"response_format":null}`,
  };

  await fetch("https://api.perplexity.ai/chat/completions", options)
    .then((response) => response.json())
    .then((response) => {
      console.log("##############################################################################################################");
      console.log("LLm response: " + JSON.stringify(response));

      return response;
    })
    .catch((err) => console.error(err));
};
