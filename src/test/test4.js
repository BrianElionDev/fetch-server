import { createClient } from "@supabase/supabase-js";
import axios from "axios";

// Supabase configuration
const SUPABASE_PROJECT_URL = "http://localhost:8000";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q";
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get coins that need category updates from the database
 */
async function getCoinsNeedingCategories() {
  const { data, error } = await supabase
    .from("temporary_coin_mappings")
    .select("*")
    .eq("hasUpdatedCategories", false)
    .eq("hasTriedFetching", false)
    .limit(1);

  if (error) {
    console.error("Error fetching coins:", error);
    return null;
  }

  return data[0] || null;
}
async function isThereCoinsNeedingCategories() {
  const { data, error } = await supabase
    .from("temporary_coin_mappings")
    .select("*")
    .eq("hasUpdatedCategories", false)
    .eq("hasTriedFetching", false);
  if (data.length > 0) {
    return true;
  }
  if (error) {
    console.error("Error fetching coins:", error);
    return false;
  }
  return false;
}

/**
 * Update a coin's categories in the database
 */
async function updateCoinCategories(coinId, categories) {
  try {
    const { error } = await supabase
      .from("temporary_coin_mappings")
      .update({
        categories: categories,
        hasUpdatedCategories: true,
        isProcessing: false,
        lastAttemptedAt: new Date().toISOString(),
      })
      .eq("coin_id", coinId);

    if (error) {
      console.error(`Error updating categories for ${coinId}:`, error);
    }
    console.log(`Successfully updated categories for ${coinId}`);
    return true;
  } catch (err) {
    console.error(`Exception updating categories for ${coinId}:`, err);
    return false;
  }
}
async function updateCoinStatusForFetchedCoins(coinId) {
  try {
    const { error } = await supabase
      .from("temporary_coin_mappings")
      .update({
        hasTriedFetching: true,
        isProcessing: false,
        lastAttemptedAt: new Date().toISOString(),
      })
      .eq("coin_id", coinId);

    if (error) {
      console.error(`Error updating categories for ${coinId}:`, error);
      return false;
    }
  } catch (err) {
    console.error(`Exception updating categories for ${coinId}:`, err);
    return false;
  }
}
async function updateCoinStatusForCoinInQueue(coinId) {
  try {
    const { error } = await supabase
      .from("temporary_coin_mappings")
      .update({
        isProcessing: true,
      })
      .eq("coin_id", coinId);

    if (error) {
      console.error(`Error updating categories for ${coinId}:`, error);
      return false;
    }
  } catch (err) {
    console.error(`Exception updating categories for ${coinId}:`, err);
    return false;
  }
}

async function fetchCoinGeckoCategories(coinId) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
    const categories = response.data.categories;
    if (categories && categories.length > 0) {
      return {
        data: categories.map((category) => ({
          name: category,
          id: category.toLowerCase().replace(/\s+/g, "-"),
        })),
        error: null,
      };
    }
    return { data: [], error: null };
  } catch (error) {
    if (error.response?.headers["retry-after"]) {
      const retryAfter = error.response.headers["retry-after"];
      const delayTime = parseRetryAfter(retryAfter);
      console.log(`Retrying in ${delayTime} ms...`);
      await delay(delayTime);
      return fetchCoinGeckoCategories(coinId); // Retry
    } else {
      console.log("Error in fetchCoinCategories" + error);
      return { data: null, error: error };
    }
  }
}

/**
 * Parse retry after as interger and converts to microseconds
 */

function parseRetryAfter(retryAfter) {
  if (isNaN(retryAfter)) {
    console.error("Undefined retry after!");
    return;
  }
  return parseInt(retryAfter) * 1000;
}

async function fetchAndUpdateCoinCategories() {
  while (isThereCoinsNeedingCategories()) {
    let coin = await getCoinsNeedingCategories();
    console.log("Fetching categories for: " + JSON.stringify(coin));
    await updateCoinStatusForCoinInQueue(coin.coin_id);
    const { data: coingeckoCategories, error } = await fetchCoinGeckoCategories(
      coin.coin_id
    );
    if (error) {
      console.warn("Unable to process coin categories for: ");
      await updateCoinStatusForFetchedCoins(coin.coin_id);
      continue;
    }
    console.log("Coin category: " + JSON.stringify(coingeckoCategories));
    await updateCoinCategories(coin.coin_id, coingeckoCategories);
  }
}
fetchAndUpdateCoinCategories();
