import { BaseLLMProvider } from "./base.js";
import { cleanCodeBlockIndicators } from "../../utils.js";

export class GrokProvider extends BaseLLMProvider {
  async processResponse(response) {
    return {
      content: cleanCodeBlockIndicators(response.choices[0].message.content),
      raw: response,
    };
  }
}
