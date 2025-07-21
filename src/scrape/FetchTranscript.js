import { YoutubeTranscript } from "./dist/youtube-transcript.esm.js";
import { formatTimestamp, waitSeconds } from "../utils.js";
import puppeteer from "puppeteer";

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

export const fetchTranscript = async (url, browser) => {
  try {
    try {
      //Youtube Transcript
      const transcriptItems = await YoutubeTranscript.fetchTranscript(url);
      if (transcriptItems && transcriptItems.length > 0) {
        const formattedTranscript = await formatTranscript(transcriptItems);
        return { content: formattedTranscript };
      }
    } catch (error) {
      console.warn("Error getting transcript with plugin: " + error);
    }

    try {
      //Fallback Taciq
      const { transcript: fallbackTranscript } =
        await FetchTranscriptFallbackTaciq(url, browser);
      const lines = fallbackTranscript?.split("\n");
      const filteredLines = lines.filter(
        (line) => !line.includes("# tactiq.io")
      );
      if (fallbackTranscript) {
        return { content: `${filteredLines.join("\n")}` };
      }
    } catch (error) {
      console.warn("An error occured with Taciq automation: " + error);
    }
    //Fallback Kome ai
    const { transcript: komeTranscript } = await FetchTranscriptFallbackKome(
      url
    );
    return { content: komeTranscript };
  } catch (error) {
    console.warn("Error fetching transcript:", error);
    return { content: null };
  }
};

async function FetchTranscriptFallbackKome(youtubeUrl, browser) {
  const page = await browser.newPage();
  await page.goto("https://kome.ai/tools/youtube-transcript-generator");
  const client = await page.target().createCDPSession();
  await client.send("Browser.grantPermissions", {
    origin: page.url(),
    permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
  });
  try {
    await page.locator('[name="url"]').fill(youtubeUrl);
    await waitSeconds(1);
    await page.locator('[aria-label="Generate Transcript"]').click();
    await waitSeconds(1);
    await page.locator(".form_copyButton__suVIn").click();
    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (err) {
        console.error("Failed to read clipboard:", err);
        return "Failed to read clipboard: " + err.message;
      }
    });
    return { transcript: clipboardText };
  } catch (error) {
    console.error("Error during automation: ", error);
    return { transcript: null };
  } finally {
    await page.close();
  }
}
export async function FetchTranscriptFallbackTaciq(youtubeUrl, browser) {
  const page = await browser.newPage();
  await page.goto(
    `https://tactiq.io/tools/run/youtube_transcript?yt=${encodeURIComponent(
      youtubeUrl
    )}`
  );
  const client = await page.target().createCDPSession();
  await client.send("Browser.grantPermissions", {
    origin: page.url(),
    permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
  });
  try {
    await page.locator("#copy").click();
    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (err) {
        console.error("Failed to read clipboard:", err);
        return "Failed to read clipboard: " + err.message;
      }
    });
    return { transcript: clipboardText };
  } catch (error) {
    console.error("Error during automation: ", error);
    return { transcript: null };
  } finally {
    await page.close();
  }
}
