import { YoutubeTranscript } from "youtube-transcript";
import { formatTimestamp, waitSeconds } from "./utils.js";
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

export const fetchTranscript = async (url) => {
  try {
    //Taciq
    const { transcript: fallbackTranscript } =
      await FetchTranscriptFallbackTaciq(url);
    //console.log("Taciq youtube transcript: " + fallbackTranscript);
    if (fallbackTranscript) {
      return { content: fallbackTranscript };
    }
    //Youtube Transcript
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url).catch(
      (error) =>
        console.log("An error occured with youtube transcript: " + error)
    );
    if (transcriptItems && transcriptItems.length >= 0) {
      const formattedTranscript = await formatTranscript(transcriptItems);
      //console.log("Trascript Formatted: " + formattedTranscript);
      return { content: formattedTranscript };
    }

    //Kome ai
    const { transcript: komeTranscript } = await FetchTranscriptFallbackKome(
      url
    );
    return { content: komeTranscript };
  } catch (error) {
    console.warn("Error fetching transcript:", error);
    return { content: null };
  }
};

async function FetchTranscriptFallbackKome(youtubeUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    protocolTimeout: 240000,
  });
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
    await browser.close();
  }
}
async function FetchTranscriptFallbackTaciq(youtubeUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    protocolTimeout: 240000,
  });
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
    await browser.close();
  }
}
