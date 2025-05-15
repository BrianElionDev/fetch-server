import { readFile } from "fs/promises";
import { LLM_PROVIDERS } from "./llm/config.js";

export function cleanCodeBlockIndicators(content) {
  if (!content) return content;

  const codeBlockRegex = /^```(?:json)?\s*([\s\S]*?)```$/;
  const match = content.match(codeBlockRegex);

  if (match) {
    return match[1].trim();
  }

  return content;
}

export async function loadData(filePath) {
  try {
    const data = await readFile(new URL(filePath, import.meta.url), "utf-8");
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}
export const calculatePromptCost = ({
  inputTokens,
  outputTokens,
  llmProvider,
}) => {
  const config = LLM_PROVIDERS[llmProvider.toUpperCase()];

  const inputCost = inputTokens * config.promptCost.promptTokenCost;
  const outputCost = outputTokens * config.promptCost.completionCost;
  return inputCost + outputCost;
};
export function formatTimestamp(ms) {
  const hours = Math.floor(ms / 3600)
    .toString()
    .padStart(2, "0");
  ms %= 3600;
  const minutes = Math.floor(ms / 60)
    .toString()
    .padStart(2, "0");
  ms %= 60;
  const seconds = Math.floor(ms / 1)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
export function getOffsetTimestamps(timeStamps) {
  if (timeStamps == null) return [];
  let timestampsArray = [];
  for (let timeStamp of timeStamps) {
    timeStamp = timeStamp.toString();
    console.log(`Timestamp: ${timeStamp}`);
    const split = timeStamp.split(":");
    const hours = split[0];
    const minutes = split[1];
    const seconds = split[2];
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    totalSeconds = parseInt(totalSeconds);
    const negativeOffset = Math.max(0, totalSeconds - 2);
    const positiveOffset = totalSeconds + 2;
    const negativeOffsetTime = formatTimestamp(negativeOffset);
    const positiveOffsetTime = formatTimestamp(positiveOffset);
    console.log(
      `Neg: ${negativeOffsetTime} Act: ${timeStamp} Pos: ${positiveOffsetTime}`
    );
    timestampsArray.push(negativeOffsetTime, timeStamp, positiveOffsetTime);
  }
  return [...new Set([...timestampsArray])];
}
