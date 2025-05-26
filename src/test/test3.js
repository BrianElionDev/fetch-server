import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const generateEmbedding = async (inputText, outputFile) => {
  const url = "https://api.openai.com/v1/embeddings";
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input: inputText,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;

    // Write the embedding to a JSON file
    fs.writeFileSync(outputFile, JSON.stringify(embedding, null, 2), "utf-8");
    console.log(`Embedding saved to ${outputFile}`);
  } catch (error) {
    console.error("Error generating embedding:", error.message);
  }
};

// Example usage:
const inputText =
  "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn patterns from data.";
const outputFile = "embedding.json";

generateEmbedding(inputText, outputFile);
