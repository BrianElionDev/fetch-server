import { YoutubeTranscript } from "youtube-transcript";
import { SupadataError, Supadata } from "@supadata/js";
import dotenv from "dotenv";
dotenv.config();

const supadata = new Supadata({
  apiKey: process.env.SUPADATA_API_KEY,
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
      text: true,
    });
    console.log("Transcript: " + transcript);
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
