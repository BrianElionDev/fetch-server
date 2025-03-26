import { BaseLLMProvider } from "./base.js";

export class OpenAIProvider extends BaseLLMProvider {
  async processResponse(response) {
    return {
      content: response.choices[0].message.content,
      raw: response,
    };
  }
}
