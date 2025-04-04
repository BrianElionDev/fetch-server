import { configDotenv } from "dotenv";
configDotenv();
export const LLM_PROVIDERS = {
  PERPLEXITY: {
    name: "perplexity",
    endpoint: "https://api.perplexity.ai/chat/completions",
    model: "sonar",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    defaultParams: {
      temperature: 0,
      top_p: 0.9,
      search_domain_filter: null,
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "week",
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1,
      response_format: null,
    },
  },
  OPENAI: {
    name: "openai",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    defaultParams: {
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  },
  GROK: {
    name: "grok",
    endpoint: "https://api.x.ai/v1/chat/completions",
    model: "grok-2-latest",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROK_API_KEY}`,
    },
    defaultParams: {
      temperature: 0,
      stream: false,
    },
  },
  GEMINI: {
    name: "gemini",
    endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
  },
};
