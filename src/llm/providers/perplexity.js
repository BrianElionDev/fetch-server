import { BaseLLMProvider } from "./base.js";
import { cleanCodeBlockIndicators } from "../../utils.js";

export class PerplexityProvider extends BaseLLMProvider {
  async processResponse(response) {
    console.log(
      "Perplexity only analysis: " +
        JSON.stringify(response.choices[0].message.content)
    );
    return {
      content: cleanCodeBlockIndicators(response.choices[0].message.content),
      raw: response,
    };
  }
}
