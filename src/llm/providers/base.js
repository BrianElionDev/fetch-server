export class BaseLLMProvider {
  constructor(config) {
    this.config = config;
  }

  async makeRequest(messages) {
    const options = {
      method: "POST",
      headers: this.config.headers,
      body: JSON.stringify({
        model: this.config.model,
        messages,
        ...this.config.defaultParams,
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
