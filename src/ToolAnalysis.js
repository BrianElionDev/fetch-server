import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async (url) => {
  const transcript = await fetchTranscriptFromAPI(
    "https://www.youtube.com/watch?v=0qitQoWgTaQ"
  );
  const llmResults = await makeLlmPrompt({ transcript: transcript?.content });
  console.log("Json response: " + JSON.stringify(llmResults));
  return { transcript: transcript, analysis: llmResults };
};
