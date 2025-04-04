import { YoutubeTranscript } from "youtube-transcript";
import { SupadataError, Supadata } from "@supadata/js";
import dotenv from "dotenv";
dotenv.config();

const supadata = new Supadata({
  apiKey: process.env.SUPADATA_API_KEY,
});

async function formatTranscript(rawTranscript) {
  try {
    const segments =
      typeof rawTranscript === "string"
        ? JSON.parse(rawTranscript)
        : rawTranscript;
    const cleanText = segments
      .map((segment) => {
        return segment.text
          .replace(/&amp;#39;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/\[Music\]/g, "")
          .trim();
      })
      .filter((text) => text)
      .join(" ");

    return cleanText;
  } catch (error) {
    console.error("Error formatting transcript:", error);
    return null;
  }
}

export const fetchTranscript = async (url) => {
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url);
    const rawTranscript = await formatTranscript(transcriptItems);
    return { content: rawTranscript };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return { content: null };
  }
};

export const fetchTranscriptFromAPI = async (youtubeUrl) => {
  try {
    const videoId = youtubeUrl.split("v=")[1];
    const transcript = await supadata.youtube.transcript({
      videoId: videoId,
      text: true,
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
