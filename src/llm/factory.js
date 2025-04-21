import { LLM_PROVIDERS } from "./config.js";
import { PerplexityProvider } from "./providers/perplexity.js";
import { OpenAIProvider } from "./providers/openai.js";
import { GeminiProvider } from "./providers/gemini.js";
import { GrokProvider } from "./providers/grok.js";

export class LLMFactory {
  static createProvider(providerName) {
    const config = LLM_PROVIDERS[providerName.toUpperCase()];
    if (!config) {
      throw new Error(`Unsupported LLM provider: ${providerName}`);
    }

    switch (providerName.toLowerCase()) {
      case "perplexity":
        return new PerplexityProvider(config);
      case "openai":
        return new OpenAIProvider(config);
      case "gemini":
        return new GeminiProvider(config);
      case "grok":
        return new GrokProvider(config);
      default:
        throw new Error(`No implementation for provider: ${providerName}`);
    }
  }
}
