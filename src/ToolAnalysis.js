import { fetchTranscript, fetchTranscriptFromAPI } from "./FetchTranscript.js";
import { makeLlmPrompt } from "./Llm.js";

export const makeAnalysis = async ({ url, model }) => {
  console.log("URL", url);
  const transcript = await fetchTranscriptFromAPI(url);
  console.log("Transcript", transcript);
  const { analysis, summary } = await makeLlmPrompt({
    transcript: transcript?.content,
    model: model,
  });

  console.log("Analysis", JSON.stringify(analysis));
  return { transcript: transcript, analysis: analysis, summary: summary };
};
