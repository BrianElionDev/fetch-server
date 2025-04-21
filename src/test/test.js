import { configDotenv } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { supabase } from "../../supabaseClient.js";
import { fetchTranscript } from "../FetchTranscript.js";
import { loadData } from "../ToolAnalysis.js";
import { link } from "fs";
import { makeLlmPrompt } from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";
import { table } from "console";
configDotenv();

async function writeResultsToFile(results, filename) {
  try {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logsDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullPath = path.join(logsDir, `${filename}_${timestamp}.json`);

    // Format the data for better readability
    const formattedData = JSON.stringify(results, null, 2);

    // Write to file
    await fs.writeFile(fullPath, formattedData, "utf8");
    console.log(`Results written to ${fullPath}`);

    return fullPath;
  } catch (error) {
    console.error("Error writing results to file:", error);
    throw error;
  }
}

async function fetchKnowledge() {
  const links = [
    //Across the rubicon
    "https://www.youtube.com/watch?v=CUzz4_a1PPI",
    "https://www.youtube.com/watch?v=tLcTJ__QD54",
    //AlexBecker
    "https://www.youtube.com/watch?v=ZjY7r4HEZfY",
    "https://www.youtube.com/watch?v=xmuJ8n39Kwk",
    "https://www.youtube.com/watch?v=4fQhNVcg6jc",
    //Coin Bureau
    "https://www.youtube.com/watch?v=Qw6NBIgAgQQ",
    "https://www.youtube.com/watch?v=_G1VQLQtlro",
    //Ellio Trades
    "https://www.youtube.com/watch?v=m0XEeejOOkU",
    "https://www.youtube.com/watch?v=openhM5Gurs",
    "https://www.youtube.com/watch?v=mRK8OOal5V4",
  ];
  try {
    if (!Array.isArray(links) || links.length === 0) {
      throw new Error("Please provide an array of links");
    }

    const { data, error } = await supabase
      .from("knowledge")
      .select("*")
      .in("link", links)
      .order("updated_at", { ascending: false });

    if (error) {
      console.log("Error: " + JSON.stringify(error));
      return;
    }

    const results = data.map((item) => ({
      new_id: item.new_id,
      link: item.link,
    }));

    await writeResultsToFile(data, "data_file");
    console.log(data);

    return results;
  } catch (error) {
    console.error("Error in fetchKnowledge:", error);
    throw error;
  }
}

async function fetchWrongData() {
  const { data, error } = await supabase
    .from("knowledge")
    .select(`date, video_title, "channel name"`)
    .neq("channel name", "XU7FUTBOL")
    .gte("date", "2025-03-27T00:00:09+00:00");
  if (error) {
    console.error("Error: " + JSON.stringify(error));
  }
  console.table(data);
}

async function make(videoUrl = "") {
  console.log("Started analysis....");
  const { transcript, analysis, summary } = await makeAnalysis({
    url: "https://www.youtube.com/watch?v=0qitQoWgTaQ",
    model: "perplexity",
  });
  const cleanLlmAnswer = await cleanJsonResponse(analysis);

  console.log("Cleaned: " + JSON.stringify(cleanLlmAnswer));
  return;
  const { data, error } = await supabase
    .from("knowledge")
    .update({ summary: summary, analysis: analysis })
    .eq("link", videoUrl);
  if (error) {
    console.log("Error: " + error);
  }
}
const transcript = await fetchTranscript(
  "https://www.youtube.com/watch?v=xmuJ8n39Kwk"
);

async function cleanJsonResponse(response) {
  const llm_answer = {
    projects:
      Array.isArray(response) && response[0]?.projects
        ? response[0].projects.map((project) => ({
            coin_or_project: project.coin_or_project,
            marketcap: (
              project.Marketcap ||
              project.marketcap ||
              ""
            ).toLowerCase(),
            rpoints: Number(project.Rpoints || project.rpoints || 0),
            total_count: Number(
              project["Total count"] || project.total_count || 0
            ),
            category: Array.isArray(project.category) ? project.category : [],
          }))
        : [],
    total_count: Number(response[0]?.total_count || 0),
    total_rpoints: Number(
      response[0]?.total_Rpoints || response[0]?.total_rpoints || 0
    ),
  };
  return await JSON.parse(JSON.stringify(llm_answer));
}
/* fetchKnowledge()
  .then((results) => {
    if (results) {
      console.log("All videos processed successfully");
    }
  })
  .catch((error) => {
    console.error("Error in main execution:", error);
  });
 */

//fetchWrongData();
//make();
/* const analysisMessages = [
  {
    role: "system",
    content: "You are an intelligent assistant",
  },
  {
    role: "user",
    content: "What colour is the moon?",
  },
];
const grok = LLMFactory.createProvider("grok");
const results = await grok.makeRequest(analysisMessages);
const content = await grok.processResponse(results);
console.log("Results: " + content.content); */

/* const transcriptP = await fetchTranscript(
  "https://www.youtube.com/watch?v=gAUfddboeOo"
);
console.log("Transcript: " + transcriptP); */
/* try{
const {data, error} = await supabase.from("knowledge").insert(cleanedData).limit(2);

if(error){
  console.log(JSON.stringify(error));
}
}catch(error){
  console.log("Error Out: "+ error);
} */

/* const analysisMessages = [
  {
    role: "system",
    content: `
      #Context
        You are an intelligent agent in a multi agents environmet who recieves requests and you have to delegate it to other agents.
        You delegate it to other agents and give the special request of what to do. 
      #Agents
      You have several agents at your displosal
        -Data_gathering_agent: Responsisble for data gathering on a specific topic.
        -Communication_agent: It has access to communication channels-: (email and whatsapp). It is responsible for handling  communications.
        -Data_analysis_agent: It analyses data gathered.
      #Objective
      Give a clear step by step overview of how you will you use agents provided to you to achieve the specified task. The steps provided will be used by the individual models as a prompt, so make the prompt detailed to avoid vagueness and confusion.

      #Output
      RETURN A VALID JSON, which has the agent and the task it should do.
    
    `,
  },
  {
    role: "user",
    content: "I need to market a  in kenya.",
  },
]; */
import { readFile } from "fs/promises";
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
export const makeAnalysisBat = async () => {
  const data = await loadData();
  console.log("Starting Analysis");
  const item = data[9];

  const analysisMessages = [
    {
      role: "system",
      content:
        JSON.stringify(`STRICTLY FOLLOW THESE REQUIREMENTS:EXCLUDE JSON CODE INDICATORS . 
      #Context
      You are an AI specialiazing in analysis of video transcripts from youtube, fix transcription errors and return a corrected transcript.
      The transcripts are from youtube and they are about crypto channels.
      
      #What to watch for
      -Correct coin names, usually the transcription has crypto coins which maybe transcribed wrongly, Please correct that.
      -Infer coins mentioned from context where there are multiple coins with the same name, Use coinmarket/coingecko/binance data.

      #Response format
      A valid json:
        {
          "transcript": "Corrected transcript data. At the end add notes: Showing changes made to the initial transcript"
         

        `),
    },
    {
      role: "user",
      content: item.transcript,
    },
  ];
  const perplexity = LLMFactory.createProvider("grok");
  const results = await perplexity.makeRequest(analysisMessages);
  const { content } = await perplexity.processResponse(results);
  updateSupabase({ link: item.link, transcript: content });
  console.log("Results: " + content);
};
makeAnalysisBat();

async function updateSupabase({ link, transcript }) {
  const parsedJ = JSON.parse(transcript);
  const { data, error } = await supabase
    .from("tests")
    .update({
      corrected_transcript: parsedJ.transcript,
      temporaryHasUpdatedTranscript: true,
    })
    .eq("link", link);

  if (error) {
    console.log("Error at: " + JSON.stringify(error));
  }
}

/* const analysisMessages = [
  {
    role: "system",
    content: "You are an intelligent assistant",
  },
  {
    role: "user",
    content: "What colour is the moon?",
  },
];
const grok = LLMFactory.createProvider("grok");
const results = await grok.makeRequest(analysisMessages);
const content = await grok.processResponse(results);
console.log("Results: " + content.content); */
/* const res = `[\n  {\n    \"projects\": [\n      {\n        \"coin_or_project\": \"Bitcoin\",\n        \"Marketcap\": \"large\",\n        \"Rpoints\": 9,\n        \"Total count\": 3,\n        \"category\": [\"DeFi\", \"Layer 1\"]\n      },\n      {\n        \"coin_or_project\": \"Ethereum\",\n        \"Marketcap\": \"large\",\n        \"Rpoints\": 10,\n        \"Total count\": 2,\n        \"category\": [\"DeFi\", \"Layer 1\"]\n      },\n      {\n        \"coin_or_project\": \"Solana\",\n        \"Marketcap\": \"large\",\n        \"Rpoints\": 8,\n        \"Total count\": 4,\n        “category”: [“Layer 1”, “Gaming”]\n      },\n      {\n          “coin_or_project”: “Chainlink”,\n          “Marketcap”: “large”,\n          “Rpoints”: 10,\n          “Total count”: 3,\n          “category”: [“DeFi”,“Oracle”]\n       },\n       {\n         ”coin_or_project”: ”Ripple” ,\n         ”Marketcap”: ”large” ,\n         ”Rpoints”：8，\n         ”Total count”：2，\n         ”category”：[\"Payment\",\"DeFi\"]\n       },\n       {\n           'coin_or_project': 'Binance Coin',\n           'Marketcap': 'large',\n           'Rpoints': 7, \n           'Total count':1, \n           'category':['Exchange']\n       },  \n       { \n            ‘coin_or_project’: ‘Avalanche’ , \n            ‘Marketcap’: ’medium’, \n            ‘Rpoints’: ’6’, \n            ‘Total count’: ’2’,  \n           
 ‘category’:[‘Layer-1’]  \n       },   \n     {    \n             ’coin_or_project’: ’Dogecoin’ ,    \n             ’Marketcap’: ’medium’,     \n             ’Rpoints’:5,     \n             ’Total count:’2,      \n              category:[‘Meme coins’]   \n     }   \n    ],\n    total_count:16,  \n    total_Rpoints:57\n   }\n]`;
console.log(JSON.parse(res)); */
