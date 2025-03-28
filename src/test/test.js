import { configDotenv } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { supabase } from "../../supabaseClient.js";
configDotenv();

async function checkIfShort(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails&id=${videoId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.log("Video not found");
      return { isShort: false, error: "No video" };
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;

    const isShort = isVideoShort(contentDetails, snippet);
    return { isShort: isShort, error: null };
  } catch (error) {
    console.error("Error:", error);
    return { isShort: isShort, error: error };
  }
}
async function writeResultsToFile(results, filename) {
  try {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logsDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullPath = path.join(logsDir, `${filename}_${timestamp}.json`);

    // Format the data for better readability
    const formattedData = JSON.stringify(results, null, 2);

    // Write to file
    await fs.writeFile(fullPath, formattedData, "utf8");
    console.log(`Results written to ${fullPath}`);

    return fullPath;
  } catch (error) {
    console.error("Error writing results to file:", error);
    throw error;
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

async function fetchKnowledge() {
  try {
    const { data, error } = await supabase
      .from("knowledge")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(40);

    if (error) {
      console.log("Error: " + JSON.stringify(error));
      return;
    }

    const results = await Promise.all(
      data.map(async (item) => {
        return {
          new_id: item.new_id,
          link: item.link,
        };
      })
    );

    await writeResultsToFile(data, "data_file");
    console.log(data);

    results.forEach((result) => {});

    return results;
  } catch (error) {
    console.error("Error in fetchKnowledge:", error);
  }
}

function getVideoId(videoUrl) {
  try {
    return videoUrl.split("v=")[1];
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
}

async function updateVideo(new_id, isShort) {
  try {
    const { data, error } = await supabase
      .from("knowledge")
      .update({
        video_type: isShort ? "short" : "video",
        temporary_column_for_update: true,
      })
      .eq("new_id", new_id);
    if (error) {
      console.error("Error updating video:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error updating video:", error);
    return null;
  }
}

fetchKnowledge()
  .then((results) => {
    if (results) {
      console.log("All videos processed successfully");
    }
  })
  .catch((error) => {
    console.error("Error in main execution:", error);
  });
