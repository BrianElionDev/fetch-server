import { YoutubeTranscript } from "youtube-transcript";
import { formatTimestamp } from "./utils.js";

async function formatTranscript(rawTranscript) {
  try {
    const segments =
      typeof rawTranscript === "string"
        ? JSON.parse(rawTranscript)
        : rawTranscript;
    const formattedLines = segments.map((segment) => {
      const text = segment.text
        .replace(/&amp;#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\[Music\]/g, "")
        .trim();
      const timestamp = formatTimestamp(segment.duration + segment.offset);
      return `${timestamp} ${text}`;
    });

    return formattedLines.filter((segment) => segment).join("\n");
  } catch (error) {
    console.error("Error formatting transcript:", error);
    return null;
  }
}

export const fetchTranscript = async (url) => {
  //trying to check if issue was with location
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url);
    const formattedTranscript = await formatTranscript(transcriptItems);
    return { content: formattedTranscript };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return { content: null };
  }
};
