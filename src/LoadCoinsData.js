import { readFile } from "fs/promises";

let jsonData;

export async function loadData() {
  if (!jsonData) {
    try {
      const data = await readFile(
        new URL("./CoinEmbedding.json", import.meta.url),
        "utf-8"
      );
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  }
  return jsonData;
}
