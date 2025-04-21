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
