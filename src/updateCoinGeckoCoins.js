import fs from "fs";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

async function updateCoinList() {
  try {
    const allCoins = [];
    const perPage = 250; // CoinGecko allows max 250 per page
    const totalPages = 20; // 250 * 20 = 5000 coins
    const currency = "usd";

    console.log("Fetching coins from CoinGecko...");

    // Fetch coins in batches due to API pagination
    for (let page = 1; page <= totalPages; page++) {
      console.log(`Fetching page ${page}/${totalPages}...`);

      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: currency,
            order: "market_cap_desc",
            per_page: perPage,
            page: page,
            sparkline: false,
          },
          headers: {
            // CoinGecko API v3 may not require an API key for this endpoint
            // Uncomment if using Pro API
            // "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
          },
        }
      );

      // Add delay between requests to avoid rate limiting
      if (page < totalPages) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const pageCoins = response.data.map((coin, index) => ({
        cg_id: coin.id,
        i: coin.symbol.toLowerCase(), // id
        n: coin.name, // name
        s: coin.symbol.toLowerCase(), // symbol
        r: (page - 1) * perPage + index + 1, // calculate rank based on pagination
      }));

      allCoins.push(...pageCoins);
      console.log(`Added ${pageCoins.length} coins from page ${page}`);
    }

    console.log(`Successfully fetched ${allCoins.length} cryptocurrencies`);

    allCoins.sort((a, b) => a.r - b.r);

    // Create both full and compressed versions
    const fullData = [
      allCoins.map(({ i, n, s }) => ({ id: i, name: n, symbol: s })),
    ];
    const compressedData = [allCoins.map(({ i, n, s }) => ({ i, n, s }))];

    // Create a mapping object for easy coin lookup
    const coinMapping = {};
    allCoins.forEach((coin) => {
      // Use CoinGecko ID as the key for the mapping
      coinMapping[coin.cg_id] = {
        id: coin.i,
        name: coin.n,
        symbol: coin.s,
      };

      // Also add entries with symbol as key for convenience
      // Note: This might overwrite coins with the same symbol
      coinMapping[coin.s] = {
        id: coin.i,
        name: coin.n,
        symbol: coin.s,
        cg_id: coin.cg_id,
      };
    });

    // Write all versions
    fs.writeFileSync("src/CoinEmbedding.json", JSON.stringify(fullData));
    fs.writeFileSync(
      "src/CoinEmbedding.min.json",
      JSON.stringify(compressedData)
    );
    fs.writeFileSync("src/CoinMapping.json", JSON.stringify(coinMapping));

    console.log(
      `Successfully updated coin lists with ${allCoins.length} cryptocurrencies`
    );
    console.log("Full version saved to: src/CoinEmbedding.json");
    console.log("Compressed version saved to: src/CoinEmbedding.min.json");
    console.log("Mapping object saved to: src/CoinMapping.json");
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
