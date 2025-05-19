import { readFile } from "fs/promises";
import { LLM_PROVIDERS } from "./llm/config.js";
import { supabase } from "../supabaseClient.js";

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
export async function formatValidatedData(data, link) {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format - expected array");
    }

    const { data: record, error } = await supabase
      .from("knowledge")
      .select("*")
      .eq("link", link)
      .single();

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    if (!record?.llm_answer?.projects) {
      throw new Error("Invalid data structure from database");
    }

    const projectsDB = record.llm_answer.projects;
    const finalData = { ...record.llm_answer };
    const finalProjectsArray = [];

    for (const project of projectsDB) {
      const correspondingCoin = data.find(
        (item) => item.coin === project.coin_or_project
      );

      finalProjectsArray.push({
        ...project,
        valid: correspondingCoin?.valid ?? false,
        possible_match: correspondingCoin?.possible_match || "",
      });
    }

    finalData.projects = finalProjectsArray;
    return finalData;
  } catch (error) {
    console.error("Validation failed:", error);
    throw error;
  }
}
/**
 * Returns a promise that resolves after a specified number of seconds.
 *
 * @param {number} seconds - The number of seconds to wait.
 * @returns {Promise<void>} A promise that resolves after the specified number of seconds.
 */
export function waitSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
