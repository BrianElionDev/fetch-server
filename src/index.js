import axios from "axios";
import express from "express";
import { makeAnalysis, makeAnalysisBatch } from "./ToolAnalysis.js";
import {
  CreateNewRecordKnowledgeTable,
  CreateNewRecordTestTable,
  CreatOrUpdateRecord,
  UpdateCoinsWithValidatedData,
  UpdateCoinsWithValidatedDataTests,
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
const getYoutubeVideoMetadata = async (youtubeUrl) => {
  if (!youtubeUrl) {
    console.error("Video ID is required");
    return;
  }

  let videoId = youtubeUrl.split("?v=")[1];
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "id,snippet,statistics,contentDetails,status",
          id: videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    if (!response.data.items || response.data.items.length === 0) {
      console.error("Video not found");
      return;
    }

    const video = response.data.items[0];

    const videoDetails = {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
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

    return videoDetails;
  } catch (error) {
    console.error("An error ocurred!" + JSON.stringify(error));
  }
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
app.post("/api/youtube/single", async (req, res) => {
  const { youtubeUrl } = req.body;
  const videoMetadata = await getYoutubeVideoMetadata(youtubeUrl);
  res.json(videoMetadata);
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
    await CreateNewRecordKnowledgeTable({
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

    if (data?.projects.length == 0 || !Array.isArray(data.projects)) {
      res.status(500).send("Error validating analysis. Projects are missing!");
      console.error("Error validating analysis. Projects are missing!");
      return;
    }
    res.send("Processing in background. We will notify you once done!");
    const { analysis, usage, default_content, error } = await validateCoins(
      data.projects
    );
    console.log("Analysis: " + analysis);
    await UpdateCoinsWithValidatedDataTests(analysis, data.link || "");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/analysis/test/single", async (req, res) => {
  try {
    const { Video_url, Model } = req.body;
    const {
      channelTitle: Channel_name,
      publishedAt: Publish_at,
      title: Video_title,
    } = await getYoutubeVideoMetadata(Video_url);
    console.log(`Recieved req: ${Channel_name} ${Video_url} ${Video_title}`);
    res.send(
      "Recieved request. Processing in the background. We will notify you once done."
    );
    const { transcript, analysis, summary, usage, correctedTranscript } =
      await makeAnalysis({
        url: Video_url,
        model: Model || "grok",
      });
    await CreateNewRecordTestTable({
      Video_url: Video_url,
      Channel_name: Channel_name,
      Publish_at: Publish_at,
      Video_title: Video_title,
      Video_transcipt: transcript,
      Video_corrected_Transcript: correctedTranscript,
      Llm_answer: analysis,
      Usage: usage,
      Llm_summary: summary,
      Model: Model || "grok",
    });
    axios
      .post("https://crypto-ner-production.up.railway.app/take_screenshots", {
        youtube_url: Video_url || "",
        projects_json: JSON.stringify(analysis) || {},
      })
      .catch((error) => {
        console.log("Error at processing request: " + error);
      });
  } catch (error) {
    console.error("Error processing request:", error);
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
