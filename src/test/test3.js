import { fetchTranscript } from "../FetchTranscript.js";
import { correctTranscriptErrors } from "../Llm.js";

const transcriptUrl = "https://www.youtube.com/watch?v=6rdsSTZkG_k";
const transcript = await fetchTranscript(transcriptUrl);
const {
  transcript: correctedTranscript,
  usage,
  default_content,
  entities,
  error,
} = await correctTranscriptErrors({
  transcript: transcript.content,
});
console.log("Transcript:", correctedTranscript);
