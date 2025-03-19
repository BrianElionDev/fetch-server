import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async (url) => {
  const transcript = await fetchTranscriptFromAPI(url);
  const llmResults = await makeLlmPrompt({ transcript: transcript?.content });
  console.log("LLM Results: " + llmResults);
  return { transcript: transcript, analysis: llmResults };
};
