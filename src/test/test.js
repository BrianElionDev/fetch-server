import { configDotenv } from "dotenv";
configDotenv();
console.log("Perplexity: " + process.env.PERPLEXITY_API_KEY);
