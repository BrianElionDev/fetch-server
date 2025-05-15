import axios from "axios";
import express from "express";
import { makeAnalysis, makeAnalysisBatch } from "./ToolAnalysis.js";
import {
  CreateNewRecord,
  CreateNewRecordBatch,
  CreateNewRecordTest,
  CreatOrUpdateRecord,
  UpdateCoinsWithValidatedData,
} from "./SendData.js";
import { validateCoins } from "./Llm.js";
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
    const { transcript, analysis, summary, usage, correctedTranscript } =
      await makeAnalysis({
        url: Video_url,
        model: Model || "grok",
      });

    console.log("Corrected transcript: " + correctedTranscript);
    await CreateNewRecordTest({
      Video_url: Video_url,
      Channel_name: Channel_name,
      Publish_at: Publish_at,
      Video_title: Video_title,
      Video_transcipt: transcript,
      Video_corrected_Transcript: correctedTranscript,
      Llm_answer: analysis,
      Usage: usage,
      Llm_summary: summary,
    });
    res.json({ analysis: analysis });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/analysis/validate", async (req, res) => {
  try {
    const data = req.body;
    console.log(`Recieved req: ` + JSON.stringify(data));
    res.send("Processing response in the background!");
    return;
    const { analysis, usage, default_content, error } = await validateCoins(
      data.projects
    );
    console.log("Analysis: " + analysis);
    await UpdateCoinsWithValidatedData(analysis, data.link || "");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/analysis/test/batch", async (req, res) => {
  const { model } = req.body;

  const results = await makeAnalysisBatch({
    model: model?.toLowerCase() || "grok",
  });
  await CreatOrUpdateRecord({
    data: results,
    model: model?.toLowerCase() || "grok",
  });
  res.json(results);
});

app.listen(3000, () => console.log("Server running on 3000."));
export default app;
