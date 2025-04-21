import { BaseLLMProvider } from "./base.js";
import { calculatePromptCost, cleanCodeBlockIndicators } from "../../utils.js";

export class GrokProvider extends BaseLLMProvider {
  async processResponse(response) {
    return {
      content: cleanCodeBlockIndicators(response.choices[0].message.content),
      raw: response,
      usage: calculatePromptCost({
        inputTokens: response.usage.prompt_tokens,
        outputTokens: response.usage.completion_tokens,
        llmProvider: "grok",
      }),
    };
  }
}
