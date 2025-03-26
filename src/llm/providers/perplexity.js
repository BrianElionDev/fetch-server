import { BaseLLMProvider } from "./base.js";

export class PerplexityProvider extends BaseLLMProvider {
  async processResponse(response) {
    return {
      content: response.choices[0].message.content,
      raw: response,
    };
  }
}
