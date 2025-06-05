import { formatTimestamp, waitSeconds } from '../utility/utils';
import puppeteer, { Page, Browser } from 'puppeteer';
import { YoutubeTranscript } from 'youtube-transcript';
import {
  TranscriptResponse,
  FallbackTranscriptResponse,
} from '../../types/types';
// Define types for transcript responses

async function formatTranscript(
  rawTranscript: string | any[],
): Promise<string | null> {
  try {
    const segments =
      typeof rawTranscript === 'string'
        ? JSON.parse(rawTranscript)
        : rawTranscript;

    const formattedLines = segments.map((segment: any) => {
      const text = segment.text
        .replace(/&amp;#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\[Music\]/g, '')
        .trim();

      const timestamp = formatTimestamp(segment.duration + segment.offset);
      return `${timestamp} ${text}`;
    });

    return formattedLines.filter(Boolean).join('\n');
  } catch (error) {
    console.error('Error formatting transcript:', error);
    return null;
  }
}

export const fetchTranscript = async (
  url: string,
): Promise<TranscriptResponse> => {
  try {
    // Taciq fallback
    const { transcript: fallbackTranscript } =
      await FetchTranscriptFallbackTaciq(url);
    if (fallbackTranscript) {
      return { content: fallbackTranscript };
    }

    // YouTube Transcript
    const transcriptItems = await YoutubeTranscript.fetchTranscript(url).catch(
      (error) => {
        console.log('An error occurred with YouTube transcript: ' + error);
        return null;
      },
    );

    if (transcriptItems && transcriptItems.length >= 0) {
      const formattedTranscript = await formatTranscript(transcriptItems);
      return { content: formattedTranscript };
    }

    // Kome AI fallback
    const { transcript: komeTranscript } =
      await FetchTranscriptFallbackKome(url);
    return { content: komeTranscript };
  } catch (error) {
    console.warn('Error fetching transcript:', error);
    return { content: null };
  }
};

async function FetchTranscriptFallbackKome(
  youtubeUrl: string,
): Promise<FallbackTranscriptResponse> {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      protocolTimeout: 240000,
    });

    const page: Page = await browser.newPage();
    await page.goto('https://kome.ai/tools/youtube-transcript-generator');

    const client = await page.target().createCDPSession();
    await client.send('Browser.grantPermissions', {
      origin: page.url(),
      permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
    });

    await page.locator('[name="url"]').fill(youtubeUrl);
    await waitSeconds(1);
    await page.locator('[aria-label="Generate Transcript"]').click();
    await waitSeconds(1);
    await page.locator('.form_copyButton__suVIn').click();

    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (err) {
        console.error('Failed to read clipboard:', err);
        return 'Failed to read clipboard: ' + (err as Error).message;
      }
    });

    return { transcript: clipboardText };
  } catch (error) {
    console.error('Error during automation (Kome AI): ', error);
    return { transcript: null };
  } finally {
    if (browser) await browser.close();
  }
}

async function FetchTranscriptFallbackTaciq(
  youtubeUrl: string,
): Promise<FallbackTranscriptResponse> {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      protocolTimeout: 240000,
    });

    const page: Page = await browser.newPage();
    await page.goto(
      `https://tactiq.io/tools/run/youtube_transcript?yt=${encodeURIComponent(youtubeUrl)}`,
    );

    const client = await page.target().createCDPSession();
    await client.send('Browser.grantPermissions', {
      origin: page.url(),
      permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
    });

    await page.locator('#copy').click();

    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (err) {
        console.error('Failed to read clipboard:', err);
        return 'Failed to read clipboard: ' + (err as Error).message;
      }
    });

    return { transcript: clipboardText };
  } catch (error) {
    console.error('Error during automation (Tactiq): ', error);
    return { transcript: null };
  } finally {
    if (browser) await browser.close();
  }
}
