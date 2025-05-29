import { readFile } from "fs/promises";
import { LLM_PROVIDERS } from "./llm/config.js";
import { supabase } from "./supabaseClient.js";
import Fuse from "fuse.js";

/**
 * Function to clean code block to avoid json parse error
 *
 * @export
 * @param {*} content
 * @returns {*}
 */
export function cleanCodeBlockIndicators(content) {
  if (!content) return content;

  const codeBlockRegex = /^```(?:json)?\s*([\s\S]*?)```$/;
  const match = content.match(codeBlockRegex);

  if (match) {
    return match[1].trim();
  }

  return content;
}

/**
 * Function to load a file.
 *
 * @export
 * @async
 * @param {*} filePath
 * @returns {*}
 */
export async function loadData(filePath) {
  try {
    const data = await readFile(new URL(filePath, import.meta.url), "utf-8");
    jsonData = JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}
/**
 * Calculates prompt cost
 *
 * @param {{ inputTokens: any; outputTokens: any; llmProvider: any; }} param0
 * @param {*} param0.inputTokens
 * @param {*} param0.outputTokens
 * @param {*} param0.llmProvider
 * @returns {number}
 */
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
/**
 * Format timestamp to "00:00:00"
 *
 * @export
 * @param {*} ms
 * @returns {string}
 */
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
/**
 * Get offsets of a timestamp
 *
 * @export
 * @param {*} timeStamps
 * @returns {{}}
 */
export function getOffsetTimestamps(timeStamps) {
  if (timeStamps == null) return [];
  let timestampsArray = [];
  for (let timeStamp of timeStamps) {
    timeStamp = timeStamp.toString();
    const split = timeStamp.split(":");
    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    const seconds = parseInt(split[2]);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    totalSeconds = parseInt(totalSeconds);
    const positive2sOffset = totalSeconds + 2;
    const positive2sOffsetTime = formatTimestamp(positive2sOffset);
    timestampsArray.push(timeStamp, positive2sOffsetTime);
  }
  return [...new Set([...timestampsArray])];
}
/**
 * Add valid and possible match fields to data
 *
 * @export
 * @async
 * @param {*} data
 * @param {*} link
 * @returns {unknown}
 */
export async function formatValidatedData(data, link) {
  function chooseActionTODO(valid, possible_match, coin_or_project) {
    if (valid) {
      return "NO ACTION";
    }
    if (possible_match == "none") {
      return "DELETE";
    }
    if (possible_match != "none") {
      return "UPDATE";
    }
  }
  try {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format - expected array");
    }

    const { data: record, error } = await supabase
      .from("tests")
      .select("*")
      .eq("link", link);

    if (error) {
      throw new Error(`Supabase query error: ${error.message}`);
    }

    if (!record || record.length == 0 || !record[0]?.llm_answer?.projects) {
      throw new Error(
        "Invalid data structure from database or No records found"
      );
    }

    const projectsDB = record[0].llm_answer.projects;
    const finalData = { ...record[0].llm_answer };
    const finalProjectsArray = [];

    for (const project of projectsDB) {
      const correspondingCoin = data.find(
        (item) => item.coin === project.coin_or_project
      );

      finalProjectsArray.push({
        ...project,
        valid: correspondingCoin?.valid ?? false,
        possible_match: correspondingCoin?.possible_match || "",
        action: chooseActionTODO(
          correspondingCoin?.valid ?? false,
          correspondingCoin?.possible_match || "",
          project.coin_or_project
        ),
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
/**
 * Check timestamps with what is on the transcript
 *
 * @export
 * @param {*} analysis
 * @param {*} transcript
 * @returns {*}
 */
export function validateTimestamps(analysis, transcript) {
  const regex = /(\d{2}:\d{2}:\d{2}\.\d{3})/g;
  const lines = transcript.trim().split("\n");
  let analysisCopy = analysis;
  const dataArray = [];
  lines
    .map((line) => {
      const match = line.match(regex);
      if (match) {
        dataArray.push({
          timestamp: match[0].split(".")[0],
          text: line.replace(match[0], "").trim(),
        });
      }
      return null;
    })
    .filter((item) => item !== null);

  const fuseOptions = {
    threshold: 0.3,
    keys: ["timestamp", "text"],
  };
  for (const project of analysisCopy.projects) {
    const fuse = new Fuse(dataArray, fuseOptions);
    const searchPattern = project.coin_or_project;
    console.log(`Checking for: ${searchPattern}`);
    let matches = fuse.search(searchPattern);
    const matchesTimestamps = matches.map((match) => match.item.timestamp);
    const consistentMatches = findCommonTimestamps(
      getNegativeTimestamps(project.Timestamps),
      matchesTimestamps
    );
    console.log("Consistent matches: " + consistentMatches);
    console.log(
      "Timestamps: " +
        [...consistentMatches, ...matchesTimestamps, ...project.Timestamps]
    );
    console.log("####### \n");

    project.Timestamps = [
      ...new Set(
        [...consistentMatches, ...matchesTimestamps, ...project.Timestamps].map(
          (item) => item.toString()
        )
      ),
    ].slice(0, 5);
  }
  console.log("####### \n \n");
  //console.log("Final validated data: " + JSON.stringify(analysisCopy));
  return analysisCopy;
}
/**
 * Find common timestamps in two array
 *
 * @param {*} list1
 * @param {*} list2
 * @returns {*}
 */
function findCommonTimestamps(list1, list2) {
  const set2 = new Set(list2);
  return list1.filter((ts) => set2.has(ts));
}
/**
 * Get negative timestamps
 *
 * @param {*} timeStamps
 * @returns {{}}
 */
function getNegativeTimestamps(timeStamps) {
  if (timeStamps == null) return [];
  let timestampsArray = [];
  for (let timeStamp of timeStamps) {
    timeStamp = timeStamp.toString();
    const split = timeStamp.split(":");
    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    const seconds = parseInt(split[2]);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    totalSeconds = parseInt(totalSeconds);
    const negative2sOffset = Math.max(0, totalSeconds - 2);
    const negative2sOffsetTime = formatTimestamp(negative2sOffset);
    timestampsArray.push(timeStamp, negative2sOffsetTime);
  }
  return [...new Set([...timestampsArray])];
}

/**
 * Find similar coins to one's from screenshot processing
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function findSimilarCoins(data) {
  let searchPattern = "";
  let dataArray = [];
  const fuseOptions = {
    threshold: 0.5,
    keys: ["content"],
  };
  for (const project of data.projects) {
    searchPattern = project.coin_or_project.replace("_", " ");
    const fuse = new Fuse(project.content.split(/[\s\n]+/), fuseOptions);
    let matches = fuse.search(searchPattern);
    console.log(`Checking for ####: ${searchPattern} \n`);
    console.log(`Found: ${JSON.stringify(matches)} \n`);
    let proj = {
      coin_or_project: project.coin_or_project,
      match: matches.map((item) => item.item),
    };
    dataArray.push(proj);
  }
  return dataArray;
}
