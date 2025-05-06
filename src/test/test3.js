import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

import { fetchTranscript } from "../FetchTranscript.js";
import { LLMFactory } from "../llm/factory.js";

// Ensure .env is loaded properly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, '../../.env') });

// Target video URL
const VIDEO_URL = "https://youtu.be/ednbinYuoy0?si=oVQdtPS7pdVENCBg";

// Include all LLM providers you have API keys for
const LLM_PROVIDERS = ["grok", "openai", "perplexity", "gemini"];

// For logging results
async function writeResultsToFile(results, filename) {
  try {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logsDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullPath = path.join(logsDir, `${filename}_${timestamp}.json`);

    // Format the data for better readability
    const formattedData = JSON.stringify(results, null, 2);

    // Write to file
    await fs.writeFile(fullPath, formattedData, "utf8");
    console.log(`Results written to ${fullPath}`);

    return fullPath;
  } catch (error) {
    console.error("Error writing results to file:", error);
    throw error;
  }
}

// Robust crypto detection prompt
function getCryptoDetectionPrompt(transcript) {
  return `
#ROLE
You are an expert financial analyst specializing in the cryptocurrency market with comprehensive knowledge of all existing cryptocurrencies, tokens, and blockchain projects.

#OBJECTIVE
Analyze the provided [TRANSCRIPT] from a cryptocurrency-related video and identify ALL unique cryptocurrency coins, tokens, and their ticker symbols mentioned if anything is mentioned more than once, only return it once in the list.

#INSTRUCTIONS
1. Read the complete transcript carefully.
2. Identify ALL mentions of:
   - Cryptocurrency coins by name (e.g., Bitcoin, Ethereum, Solana)
   - Cryptocurrency tokens by name (e.g., Uniswap, Chainlink)
   - Ticker symbols (e.g., BTC, ETH, SOL, LINK)
   - Alternative/common names for cryptocurrencies (e.g., "BNB" for Binance Coin)
   - Layer-1 and Layer-2 blockchain platforms with native tokens (e.g., Cardano, Polygon)
   - Meme coins (e.g., Dogecoin, Shiba Inu, PEPE)
   - DeFi tokens (e.g., AAVE, COMP)
   - Stablecoins (e.g., USDT, USDC, DAI)
   - Recently launched or trending tokens mentioned
   - Any misspelled or phonetically similar references to known cryptocurrencies

3. For each identified coin/token:
   - List the full official name if mentioned (e.g., "Bitcoin" rather than just "BTC")
   - If both are mentioned, prefer the most widely recognized identifier which is the full name of the coin rather than the ticker symbol.

4. Do NOT include:
   - General blockchain terms not referencing specific coins (e.g., "DeFi" as a category)
   - Company names unless they have a directly associated tradable token (e.g., exclude "Coinbase" but include "Binance Coin")
   - Blockchain platforms mentioned only as technology without reference to their native token
   - People names, channel names, or generic financial terms
   - Words that might accidentally match a ticker but aren't used in that context

#TRANSCRIPT
${transcript}

#OUTPUT FORMAT
Return ONLY a valid JSON array of strings, with each string being a cryptocurrency name, if a ticker symbol is mentioned, only return the name of the coin not the ticker symbol to avoid duplicates.
Example: ["Bitcoin", "Solana", "DOGE", "Chainlink"]

Ensure your response is ONLY the JSON array without any surrounding text, explanation, or markdown formatting.
`;
}

// Main analysis function
async function analyzeCryptoMentions(videoUrl) {
  console.log(`\n-------------- Crypto Mention Analysis --------------`);
  console.log(`Video URL: ${videoUrl}`);
  
  // Step 1: Fetch transcript
  console.log(`\nFetching transcript...`);
  let transcript;
  try {
    transcript = await fetchTranscript(videoUrl);
    // Handle potential non-string response
    if (!transcript) {
      console.error("Failed to fetch transcript: Empty response");
      return null;
    }
    // Check if it's an object with text property (some APIs return this format)
    if (typeof transcript === 'object' && transcript !== null) {
      if (transcript.text) {
        transcript = transcript.text;
      } else {
        console.log("Transcript received as object:", transcript);
        transcript = JSON.stringify(transcript); // Convert to string
      }
    }
    console.log(`Transcript fetched successfully (${typeof transcript === 'string' ? transcript.length : 'unknown'} characters)`);
  } catch (error) {
    console.error(`Error fetching transcript:`, error);
    return null;
  }

  // Step 2: Analyze with different LLMs
  const results = {};

  for (const provider of LLM_PROVIDERS) {
    console.log(`\nAnalyzing with ${provider.toUpperCase()}...`);
    try {
      const llm = LLMFactory.createProvider(provider);
      if (!llm) {
        console.warn(`⚠️ Provider ${provider} not available in LLMFactory`);
        results[provider] = { error: "Provider not available", coins: [] };
        continue;
      }

      const prompt = getCryptoDetectionPrompt(transcript);
      const analysisMessages = [
        {
          role: "system",
          content: "You are an AI specialized in cryptocurrency identification. Follow instructions precisely."
        },
        {
          role: "user",
          content: prompt
        }
      ];

      const llmResponse = await llm.makeRequest(analysisMessages);
      const processedResponse = await llm.processResponse(llmResponse);

      // Extract content from response object or use directly if it's a string
      let responseContent = processedResponse;
      if (typeof processedResponse === 'object' && processedResponse !== null) {
        responseContent = processedResponse.content || JSON.stringify(processedResponse);
      }

      // Clean up the response to extract just the JSON array
        let jsonString = responseContent.trim();
      if (jsonString.includes('```json')) {
        jsonString = jsonString.split('```json')[1].split('```')[0].trim();
      } else if (jsonString.includes('```')) {
        jsonString = jsonString.split('```')[1].split('```')[0].trim();
      }

      let coins = [];
      try {
        // Try to parse JSON response
        const parsed = JSON.parse(jsonString);
        if (Array.isArray(parsed)) {
          coins = parsed.filter(item => typeof item === 'string' && item.trim() !== '');
          coins = [...new Set(coins)].sort(); // Remove duplicates and sort
          } else {
          throw new Error("Response is not an array");
        }
        
        results[provider] = { coins };
        console.log(`✅ ${provider.toUpperCase()} identified ${coins.length} coins: ${coins.join(', ')}`);
      } catch (parseError) {
        console.error(`⚠️ Failed to parse JSON from ${provider}:`, parseError.message);
        results[provider] = { 
          error: `JSON parse error: ${parseError.message}`, 
          coins: [],
          raw_response: responseContent
        };
      }
    } catch (error) {
      console.error(`⚠️ Error with ${provider}:`, error.message);
      results[provider] = { error: error.message, coins: [] };
    }
  }

  return results;
}

// Results comparison helper
function generateComparisonMatrix(results) {
  if (!results) return "No results available";
  
  // Collect all unique coins across all providers
  const allCoins = new Set();
  Object.values(results).forEach(result => {
    if (result.coins && Array.isArray(result.coins)) {
      result.coins.forEach(coin => allCoins.add(coin));
    }
  });
  
  const coinsList = [...allCoins].sort();
  const providers = Object.keys(results);
  
  // Create header
  let matrix = "| Cryptocurrency | " + providers.map(p => p.toUpperCase()).join(" | ") + " |\n";
  matrix += "|" + "-".repeat(15) + "|" + providers.map(() => "-".repeat(12)).join("|") + "|\n";
  
  // Create rows
  coinsList.forEach(coin => {
    let row = `| ${coin} | `;
    providers.forEach(provider => {
      const hasError = results[provider].error !== undefined;
      const foundCoin = results[provider].coins && results[provider].coins.includes(coin);
      row += (hasError ? "ERROR" : (foundCoin ? "✅" : "❌")) + " | ";
    });
    matrix += row + "\n";
  });
  
  return matrix;
}

// Main execution
async function main() {
  console.log("Starting cryptocurrency mention analysis test");
  
  // Analyze the video
  const results = await analyzeCryptoMentions(VIDEO_URL);

  if (results) {
    console.log("\n-------------- Results Summary --------------");
    // Write to file for persistence
    await writeResultsToFile(results, "crypto_mentions_analysis");
    
    // Print comparison table
    console.log("\nCryptocurrency Mention Comparison Matrix:");
    console.log(generateComparisonMatrix(results));
    
    // Calculate statistics
    const providers = Object.keys(results);
    const errorCount = providers.filter(p => results[p].error).length;
    const successCount = providers.length - errorCount;
    
    console.log(`\nAnalysis completed with ${successCount}/${providers.length} successful LLM calls`);
    
    if (errorCount > 0) {
      console.log("\nDetailed Errors:");
      providers.forEach(p => {
        if (results[p].error) {
          console.log(`- ${p.toUpperCase()}: ${results[p].error}`);
        }
      });
    }
  } else {
    console.log("❌ Analysis failed - could not fetch transcript");
  }
}

// Execute
main().catch(error => {
  console.error("Unhandled error in main execution:", error);
}); 