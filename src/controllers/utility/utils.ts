import { readFile } from 'fs/promises';
import { LLM_PROVIDERS } from '../../config/llm.config';
import { supabase } from '../../config/supabase';
import path from 'path';

export function cleanCodeBlockIndicators(content: string): string {
  if (!content) return content;

  const codeBlockRegex = /^```(?:json)?\s*([\s\S]*?)```$/;
  const match = content.match(codeBlockRegex);

  if (match) {
    return match[1].trim();
  }

  return content;
}
export async function loadData(filePath: string): Promise<any> {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = await readFile(absolutePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
}

export const calculatePromptCost = ({
  inputTokens,
  outputTokens,
  llmProvider,
}: {
  inputTokens: number;
  outputTokens: number;
  llmProvider: string;
}): number => {
  const config =
    LLM_PROVIDERS[llmProvider.toUpperCase() as keyof typeof LLM_PROVIDERS];

  const inputCost = inputTokens * (config?.promptCost?.promptTokenCost ?? 1);
  const outputCost = outputTokens * (config.promptCost?.completionCost ?? 1);
  return inputCost + outputCost;
};

export function formatTimestamp(ms: number): string {
  const hours = Math.floor(ms / 3600)
    .toString()
    .padStart(2, '0');
  ms %= 3600;
  const minutes = Math.floor(ms / 60)
    .toString()
    .padStart(2, '0');
  ms %= 60;
  const seconds = Math.floor(ms / 1)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function getOffsetTimestamps(timeStamps: string[]): string[] {
  if (!timeStamps) return [];
  let timestampsArray: string[] = [];
  for (const timeStamp of timeStamps) {
    const split = timeStamp.toString().split(':');
    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    const seconds = parseInt(split[2]);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    totalSeconds = parseInt(totalSeconds.toString());
    const positive2sOffset = totalSeconds + 2;
    const positive2sOffsetTime = formatTimestamp(positive2sOffset);
    const positive1sOffset = totalSeconds + 1;
    const positive1sOffsetTime = formatTimestamp(positive1sOffset);
    timestampsArray.push(positive1sOffsetTime, positive2sOffsetTime);
  }
  return [...new Set([...timestampsArray])];
}

export function convertTimestampToSeconds(timeStamp: string): number {
  const split = timeStamp.toString().split(':');
  const hours = parseInt(split[0]);
  const minutes = parseInt(split[1]);
  const seconds = parseInt(split[2]);
  return hours * 3600 + minutes * 60 + seconds;
}

export async function formatValidatedData(
  data: any,
  link: string,
): Promise<any> {
  function chooseActionTODO(valid: boolean, possible_match: string): string {
    if (valid) {
      return 'NO ACTION';
    }
    if (possible_match === 'none') {
      return 'DELETE';
    }
    return 'UPDATE';
  }

  try {
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format - expected array ');
    }
    if (!link) {
      throw new Error('Project link is missing');
    }

    const { data: record, error } = await supabase
      .from('tests')
      .select('*')
      .eq('link', link);

    if (error) {
      console.log(`Supabase query error: ${error.message}`);
      throw new Error(`Supabase query error: ${error.message}`);
    }

    if (!record || record.length === 0 || !record[0]?.llm_answer?.projects) {
      throw new Error(
        'Invalid data structure from database or No records found',
      );
    }

    const projectsDB = record[0].llm_answer.projects;
    const finalData = { ...record[0].llm_answer };
    const finalProjectsArray = [];

    for (const project of projectsDB) {
      const correspondingCoin = data.find(
        (item: any) => item.coin === project.coin_or_project,
      );

      finalProjectsArray.push({
        ...project,
        valid: correspondingCoin?.valid ?? false,
        possible_match: correspondingCoin?.possible_match || '',
        action: chooseActionTODO(
          correspondingCoin?.valid ?? false,
          correspondingCoin?.possible_match || '',
        ),
        found_in: correspondingCoin?.found_in || '',
      });
    }

    finalData.projects = finalProjectsArray;
    return finalData;
  } catch (error) {
    console.log('Validation failed:', error);
  }
}

export function waitSeconds(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export async function validateTimestamps(
  analysis: any,
  transcript: string,
): Promise<any> {
  let Fuse;
  try {
    Fuse = (await import('fuse.js')).default;
  } catch (err) {
    console.error('Failed to load fuse.js:', err);
    throw new Error('Failed to load Fuse.js library');
  }
  const regex = /(\d{2}:\d{2}:\d{2}\.\d{3})/g;
  const lines = transcript.trim().split('\n');
  const dataArray: { timestamp: string; text: string }[] = [];

  lines.forEach((line) => {
    const match = line.match(regex);
    if (match) {
      dataArray.push({
        timestamp: match[0].split('.')[0],
        text: line.replace(match[0], '').trim(),
      });
    }
  });

  const fuseOptions = {
    threshold: 0.3,
    keys: ['timestamp', 'text'],
  };

  for (const project of analysis.projects) {
    const fuse = new Fuse(dataArray, fuseOptions);
    const searchPattern = project.coin_or_project;
    const matches = fuse.search(searchPattern);
    //Todo replace any casted type
    const matchesTimestamps = matches.map((match: any) => match.item.timestamp);
    const consistentMatches = findCommonTimestamps(
      getNegativeTimestamps(project.Timestamps),
      matchesTimestamps,
    );

    project.Timestamps = [
      ...new Set(
        [...consistentMatches, ...matchesTimestamps, ...project.Timestamps].map(
          (item) => item.toString(),
        ),
      ),
    ].slice(0, 5);
  }

  return analysis;
}

function findCommonTimestamps(list1: string[], list2: string[]): string[] {
  const set2 = new Set(list2);
  return list1.filter((ts) => set2.has(ts));
}

function getNegativeTimestamps(timeStamps: string[]): string[] {
  if (!timeStamps) return [];
  let timestampsArray: string[] = [];
  for (let timeStamp of timeStamps) {
    timeStamp = timeStamp.toString();
    const split = timeStamp.split(':');
    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    const seconds = parseInt(split[2]);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    totalSeconds = parseInt(totalSeconds.toString());
    const negative2sOffset = Math.max(0, totalSeconds - 2);
    const negative2sOffsetTime = formatTimestamp(negative2sOffset);
    timestampsArray.push(timeStamp, negative2sOffsetTime);
  }
  return [...new Set([...timestampsArray])];
}

export async function findSimilarCoins(data: any): Promise<any[]> {
  let Fuse;
  try {
    Fuse = (await import('fuse.js')).default;
  } catch (err) {
    console.error('Failed to load fuse.js:', err);
    throw new Error('Failed to load Fuse.js library');
  }
  const dataArray: any[] = [];
  const fuseOptions = {
    threshold: 0.5,
    keys: ['content'],
  };

  for (const project of data.projects) {
    const searchPattern = project.coin_or_project.replace('_', ' ');
    const words = project.content.split(/[\s\n]+/);
    const fuse = new Fuse(words, fuseOptions);
    const matches = fuse.search(searchPattern);

    dataArray.push({
      coin_or_project: project.coin_or_project,
      //Todo replace any casted type
      match: matches.map((item: any) => item.item),
    });
  }

  return dataArray;
}
