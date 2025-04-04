import { BaseLLMProvider } from "./base.js";
import { cleanCodeBlockIndicators } from "../../utils.js";

export class GeminiProvider extends BaseLLMProvider {
  async processResponse(response) {
    return {
      content: cleanCodeBlockIndicators(
        response.candidates[0].content.parts[0].text
      ),
      raw: response,
    };
  }

  async makeRequest(messages) {
    const options = {
      method: "POST",
      headers: this.config.headers,
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${messages[0].role} ${messages[0].content} ${messages[1].role} ${messages[1].content}`,
              },
            ],
          },
        ],
      }),
    };

    try {
      const response = await fetch(this.config.endpoint, options);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`${this.config.name} API Error:`, error);
      throw error;
    }
  }
}
