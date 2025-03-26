import axios from "axios";
import express from "express";
import { makeAnalysis } from "./ToolAnalysis.js";
import { CreateNewRecord } from "./SendData.js";
const app = express();

app.use(express.json());

const MAKE_WEBHOOK_SEND_SUBSCRIPTION =
  "https://hook.us2.make.com/9f3n2wwmuy37d7qezcgymil5d6int37b";

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/youtube", async (req, res) => {
  const results = [];
  let pageToken = null;
  const baseURL = "https://www.googleapis.com/youtube/v3/search";
  const { channelId, publishedBefore, publishedAfter, key } = req.query;

  console.log(req.query);
  try {
    do {
      const response = await axios.get(baseURL, {
        params: {
          part: "snippet",
          channelId: channelId,
          maxResults: 50,
          type: "video",
          key: key,
          pageToken: pageToken,
          publishedAfter: publishedAfter,
          publishedBefore: publishedBefore,
          order: "date",
        },
      });

      results.push(...response.data.items);
      pageToken = response.data.nextPageToken || null;
    } while (pageToken);

    res.json(results);
  } catch (error) {
    if (error.response) {
      throw new Error(
        `YouTube API Error: ${error.response.data.error.message}`
      );
    }
    throw error;
  }
});
const sendSubscriptionToMake = async ({
  hubChallenge,
  hubCallback,
  hubLease,
  hubMode,
  hubTopic,
}) => {
  const response = await axios.post(MAKE_WEBHOOK_SEND_SUBSCRIPTION, {
    hubChallenge: hubChallenge,
    hubTopic: hubTopic,
    hubMode: hubMode,
    hubLease: hubLease,
    hubCallback: hubCallback,
  });
};
app.get("/api/youtube/new", async (req, res) => {
  const { publishedAfter, publishedBefore, channelId, key } = req.query;
  try {
    const channelsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "contentDetails",
          id: channelId,
          key: key,
        },
      }
    );

    const uploadsPlaylistId =
      channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
    let results = [];
    let pageToken = null;

    do {
      const playlistResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: uploadsPlaylistId,
            maxResults: 50,
            key: key,
            pageToken: pageToken,
          },
        }
      );

      results.push(...playlistResponse.data.items);
      pageToken = playlistResponse.data.nextPageToken || null;
    } while (pageToken);

    const filteredVideos = results.filter((item) => {
      const publishedAt = new Date(item.snippet.publishedAt);
      const afterDate = publishedAfter ? new Date(publishedAfter) : new Date(0);
      const beforeDate = publishedBefore
        ? new Date(publishedBefore)
        : new Date(8640000000000000);

      return publishedAt >= afterDate && publishedAt <= beforeDate;
    });
    console.log("Total results: " + filteredVideos.length);
    res.json(filteredVideos);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: `YouTube API Error: ${error.response.data.error.message}`,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});
app.get("/api/youtube/single", async (req, res) => {
  const { videoId, key } = req.query;

  if (!videoId) {
    return res.status(400).json({
      error: "Video ID is required",
    });
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "id,snippet,statistics,contentDetails,status",
          id: videoId,
          key: key,
        },
      }
    );

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({
        error: "Video not found",
      });
    }

    const video = response.data.items[0];

    const videoDetails = {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnails: video.snippet.thumbnails,
      duration: video.contentDetails.duration,
      viewCount: video.statistics.viewCount || null,
      likeCount: video.statistics.likeCount || null,
      commentCount: video.statistics.commentCount || null,
      status: {
        privacyStatus: video.status.privacyStatus,
        license: video.status.license,
        embeddable: video.status.embeddable,
      },
    };

    res.json(videoDetails);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: `YouTube API Error: ${error.response.data.error.message}`,
      });
    } else {
      res.status(500).json({
        error: error.message,
      });
    }
  }
});

app.post("/api/analysis/single", async (req, res) => {
  try {
    const { Video_url, Channel_name, Publish_at, Video_title, Model } =
      req.body;
    console.log(`Recieved req: ${Channel_name} ${Video_url} ${Video_title}`);
    const { transcript, analysis, summary } = await makeAnalysis({
      url: Video_url,
      model: Model || "perplexity",
    });
    await CreateNewRecord({
      Video_url: Video_url,
      Channel_name: Channel_name,
      Publish_at: Publish_at,
      Video_title: Video_title,
      Video_transcipt: transcript?.content,
      Llm_answer: analysis,
      Llm_summary: summary,
    });

    res.send("Success");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/analysis/batch", async (req, res) => {
  const videos = req.body.map((item) => ({
    Video_url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    Channel_name: item.snippet.channelTitle,
    Publish_at: item.snippet.publishedAt,
    Video_title: item.snippet.title,
  }));
  const batchId = Date.now().toString();
  const initialResponse = {
    success: true,
    message: "Processing started in background",
    batchId: batchId,
    totalVideos: videos.length,
    startedAt: new Date().toISOString(),
  };
  console.log("Notification: " + JSON.stringify(initialResponse));
  res.json(initialResponse);
  (async () => {
    const results = [];
    const errors = [];

    try {
      console.log(`Processing batch ${batchId} with ${videos.length} videos`);

      for (const video of videos) {
        try {
          const { Video_url, Channel_name, Publish_at, Video_title } = video;
          console.log(`Processing video: ${Video_title}`);

          const { transcript, analysis, summary } = await makeAnalysis(
            Video_url
          );
          await CreateNewRecord({
            Video_url,
            Channel_name,
            Publish_at,
            Video_title,
            Video_transcipt: transcript?.content,
            Llm_answer: analysis,
            Llm_summary: summary,
          });

          results.push({
            url: Video_url,
            title: Video_title,
            status: "success",
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error(`Error processing video ${video.Video_url}:`, error);
          errors.push({
            url: video.Video_url,
            title: video.Video_title,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const finalResponse = {
        batchId: batchId,
        success: true,
        totalVideos: videos.length,
        processed: results.length,
        failed: errors.length,
        results,
        errors,
        completedAt: new Date().toISOString(),
      };

      console.log(
        `Batch ${batchId} processing completed:`,
        JSON.stringify(finalResponse)
      );
    } catch (error) {
      console.error(`Batch ${batchId} processing failed:`, error);
    }
  })();
});

app.listen(3000, () => console.log("Server running on 3000."));

export default app;
