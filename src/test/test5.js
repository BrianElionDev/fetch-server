/* import { loadData } from "../LoadCoinsData.js";
import { transcript, commonEnglishWords } from "./test2.js";
let arrayCoinSymbolSet = new Set([]);
let transcriptSet = new Set([]);
let stopwordsSet = new Set([]);

//Coin data
let coinData = await loadData();
coinData = coinData[0].map((coin) => `${coin.i}_${coin.n}`);
coinData.forEach((coin_key) => {
  const coinSymbol = coin_key.split("_");
  for (const token of coinSymbol) {
    arrayCoinSymbolSet.add(token.toLowerCase());
  }
});

//Transcript:
let transcriptArray = transcript.split(" ");
transcriptArray.forEach((text) => {
  const coinSymbol = text.split("_");
  for (const token of coinSymbol) {
    transcriptSet.add(token.toLowerCase());
  }
});

//Filter:
commonEnglishWords.forEach((text) => {
  stopwordsSet.add(text.toLowerCase());
});

//SET OPERATIONS
let possibleMatchSet = transcriptSet.intersection(arrayCoinSymbolSet);
let filteredMatchSet = possibleMatchSet.difference(stopwordsSet);
console.log("Logger: " + JSON.stringify([...filteredMatchSet]));
 */

/* import { loadData } from "../LoadCoinsData.js";
import { transcript, commonEnglishWords } from "./test2.js";

const stopwordsSet = new Set(
  commonEnglishWords.map((word) => word.toLowerCase())
);

async function processCryptoMatching() {
  const coinData = (await loadData())[0];
  const coinPhrasesSet = new Set();

  for (const coin of coinData) {
    const cleanSymbol = coin.i.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanSymbol) coinPhrasesSet.add(cleanSymbol);
    const cleanName = coin.n.toLowerCase().replace(/[^a-z0-9\s]/g, "");
    if (cleanName) coinPhrasesSet.add(cleanName);
  }

  const transcriptClean = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const tokens = transcriptClean
    .split(/\s+/)
    .filter((token) => token.length > 0);
  const matches = new Set();
  const maxN = 5;

  for (let n = 1; n <= maxN; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      const ngram = tokens.slice(i, i + n);
      const spaced = ngram.join(" ");
      const spaceless = ngram.join("");

      if (n === 1 && stopwordsSet.has(spaced)) continue;

      if (coinPhrasesSet.has(spaced) || coinPhrasesSet.has(spaceless)) {
        matches.add(spaced);
      }
    }
  }

  console.log("Matched Phrases: ", JSON.stringify([...matches]));
} */

//processCryptoMatching();
import { correctTranscriptErrors, processCryptoMatching } from "../Llm.js";
import { transcript } from "./test2.js";
correctTranscriptErrors({ transcript: transcript });
