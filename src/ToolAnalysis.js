import { fetchTranscript } from "./FetchTranscript.js";
import { readFile } from "fs/promises";
import { correctTranscriptErrors, makeLlmPrompt } from "./Llm.js";
let jsonData;

export const makeAnalysis = async ({ url, model }) => {
  const transcript = await fetchTranscript(url);
  const {
    analysis,
    summary,
    transcript: correctedTranscript,
    usage,
  } = await makeLlmPrompt({
    transcript: transcript?.content,
    model: model,
  });
  return {
    correctedTranscript: correctedTranscript,
    transcript: transcript?.content,
    analysis: analysis,
    summary: summary,
    usage: usage,
  };
};
export const makeAnalysisBatch = async ({ model }) => {
  const data = await loadData();

  const results = [];
  console.log("Starting Analysis");
  for (const item of data) {
    const {
      analysis,
      summary,
      transcript: correctedTranscript,
      usage,
    } = await makeLlmPrompt({
      transcript: item.transcript,
      model: model,
    });
    results.push({ analysis, summary, data: item });
    console.log("Corrected Transcript:", correctedTranscript);
  }
  console.log("Analysis Complete");
  return results;
};

export async function loadData() {
  if (!jsonData) {
    try {
      const data = await readFile(
        new URL("./data.json", import.meta.url),
        "utf-8"
      );
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  }
  return jsonData;
}
