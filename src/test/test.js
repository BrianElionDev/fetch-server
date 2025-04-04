import { configDotenv } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { supabase } from "../../supabaseClient.js";
import { fetchTranscript } from "../FetchTranscript.js";
import { makeAnalysis } from "../ToolAnalysis.js";
import { link } from "fs";
import { LLMFactory } from "../llm/factory.js";
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
