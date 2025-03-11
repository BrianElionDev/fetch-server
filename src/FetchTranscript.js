import { YoutubeTranscript } from "youtube-transcript";
import { SupadataError, Supadata } from "@supadata/js";

const supadata = new Supadata({
  apiKey:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjEifQ.eyJpc3MiOiJuYWRsZXMiLCJpYXQiOiIxNzQxNzAzMDUyIiwicHVycG9zZSI6ImFwaV9hdXRoZW50aWNhdGlvbiIsInN1YiI6ImU3YWFlNzJmNWExODRkYTJhNGUwZWJmMTA1N2IxODZkIn0.pwAz9o5VB_drX2iEAf8NskvkdJblkwGNdfdMt1Rg_98",
});

export const fetchTranscript = async (url) => {
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url);

    return transcriptItems;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return "";
  }
};

export const fetchTranscriptFromAPI = async (youtubeUrl) => {
  try {
    const videoId = youtubeUrl.split("v=")[1];
    const transcript = await supadata.youtube.transcript({
      videoId: videoId,
    });
    return transcript;
  } catch (e) {
    if (e instanceof SupadataError) {
      console.error(e.error);
      console.error(e.message);
      console.error(e.details);
      console.error(e.documentationUrl);
    }
    return "";
  }
};
