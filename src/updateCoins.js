import fs from "fs";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

async function updateCoinList() {
  try {
    const allCoins = [];
    const limit = 1000; // Maximum number of coins to fetch
    const convert = "USD";

    console.log("Fetching coins from CoinMarketCap...");
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          limit: limit,
          convert: convert,
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );

    const coins = response.data.data.map((coin) => ({
      cmc_id: coin.id,
      i: coin.symbol.toLowerCase(), // id
      n: coin.name, // name
      s: coin.symbol.toLowerCase(), // symbol
      r: coin.cmc_rank,
    }));

    console.log(`Successfully fetched ${coins.length} cryptocurrencies`);

    coins.sort((a, b) => a.r - b.r);

    // Create both full and compressed versions
    const fullData = [
      coins.map(({ i, n, s }) => ({ id: i, name: n, symbol: s })),
    ];
    const compressedData = [coins.map(({ i, n, s }) => ({ i, n, s }))];

    // Write both versions
    fs.writeFileSync("src/CoinEmbedding.json", JSON.stringify(fullData));
    fs.writeFileSync(
      "src/CoinEmbedding.min.json",
      JSON.stringify(compressedData)
    );

    console.log(
      `Successfully updated coin lists with ${coins.length} cryptocurrencies`
    );
    console.log("Full version saved to: src/CoinEmbedding.json");
    console.log("Compressed version saved to: src/CoinEmbedding.min.json");
  } catch (error) {
    console.error("Error updating coin list:", error.message);
    if (error.response) {
      console.error("API Response Error:", error.response.data);
    }
  }
}

// Call the function
updateCoinList().catch(console.error);

export { updateCoinList };
