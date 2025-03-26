import { configDotenv } from "dotenv";
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
      .select("new_id, link")
      .order("updated_at", { ascending: false })
      .eq("temporary_column_for_update", false)
      .limit(40);

    if (error) {
      console.log("Error: " + JSON.stringify(error));
      return;
    }

    const results = await Promise.all(
      data.map(async (item) => {
        const videoId = getVideoId(item.link);
        const { isShort, error } = await checkIfShort(videoId);
        return {
          new_id: item.new_id,
          link: item.link,
          isShort: isShort,
          error: error,
        };
      })
    );

    results.forEach((result) => {
      console.log(
        `Video ID: ${result.new_id}, Link: ${result.link}, Is Short: ${result.isShort}`
      );
      if (result.error) {
        console.log("Found an error: " + JSON.stringify(result.error));
        return;
      }
      updateVideo(result.new_id, result.isShort);
    });

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
