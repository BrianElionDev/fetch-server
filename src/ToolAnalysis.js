import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async (url) => {
  const transcript = await fetchTranscriptFromAPI(url);
  // console.log("Transcript: "+ JSON.stringify(transcript));
  const llmResults = await makeLlmPrompt({ transcript: transcript?.content });
  console.log("LLM Results: " + llmResults);
  //return llmResults;
};
