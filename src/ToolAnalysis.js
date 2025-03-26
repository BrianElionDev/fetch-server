import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async ({ url, model }) => {
  const transcript = await fetchTranscriptFromAPI(url);
  const { analysis, summary } = await makeLlmPrompt({
    transcript: transcript?.content,
    model: model,
  });

  console.log("Analysis", JSON.stringify(analysis));
  return { transcript: transcript, analysis: analysis, summary: summary };
};
