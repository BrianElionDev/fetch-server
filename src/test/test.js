// JavaScript example to query Supabase for similarity search on embedding vectors

import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";

// Initialize Supabase client with your project's URL and anon key
const supabaseUrl = "https://dfrauevntbdiozvgybxp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmF1ZXZudGJkaW96dmd5YnhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njc3MTYyOCwiZXhwIjoyMDYyMzQ3NjI4fQ.RoEt93ViTJWY8AEnH_kwQMIilkzAZjXuphD3597SCB0";
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Finds similar items based on embedding vector
 * @param {number[]} queryEmbedding - The new embedding vector to search for
 * @param {number} matchCount - Number of closest matches to return
 * @returns {Promise<Array>} - Array of matching rows with similarity scores
 */
async function findSimilarEmbeddings(queryEmbedding, matchCount = 5) {
  // pgvector supports <-> operator for Euclidean distance
  // or you can use cosine distance if you stored cosine normalized vectors
  // Example SQL: select *, embedding <-> '[1,2,3]' as distance from table order by distance limit 5;

  const embeddingStr = `[${queryEmbedding.join(",")}]`;

  const { data, error } = await supabase.rpc("match_embeddings", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    console.error("Error querying similarity:", error);
    return [];
  }
  return data;
}

export async function loadData() {
  try {
    const data = await readFile(
      new URL("../embedding.json", import.meta.url),
      "utf-8"
    );
    let jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}

const data = await loadData();
console.log(JSON.stringify(data));
const similar = await findSimilarEmbeddings(data, 2);
console.log("Similiar: " + similar.length);
