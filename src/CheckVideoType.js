import { configDotenv } from "dotenv";

configDotenv();

export async function checkIfShort(videoUrl) {
  const videoId = getVideoId(videoUrl);
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY_CHECK_FOR_SHORTS}&part=snippet,contentDetails&id=${videoId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.error("Video not found");
      return "video";
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;

    const isShort = isVideoShort(contentDetails, snippet);
    return isShort ? "short" : "video";
  } catch (error) {
    console.error("Error:", error);
    return "video";
  }
}

function isVideoShort(contentDetails, snippet) {
  const durationSeconds = parseISO8601Duration(contentDetails.duration);
  const isShortDuration = durationSeconds <= 60;
  return isShortDuration;
}

function parseISO8601Duration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function getVideoId(videoUrl) {
  try {
    return videoUrl.split("v=")[1];
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
}
