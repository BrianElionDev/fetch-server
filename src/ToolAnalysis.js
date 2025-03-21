import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async (url) => {
  const transcript = await fetchTranscriptFromAPI(url);
  const { analysis, summary } = await makeLlmPrompt({
    transcript: transcript?.content,
  });
  return { transcript: transcript, analysis: analysis, summary: summary };
};
