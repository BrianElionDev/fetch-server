import { formatValidatedData } from "../utils.js";

const data = [
  {
    coin: "Bitcoin",
    valid: true,
    found_in: "screenshot",
  },
  {
    coin: "Dogecoin",
    valid: true,
    possible_match: "Dogecoin (DOGE)",
    found_in: "screenshot",
  },
  {
    coin: "Axie Infinity",
    valid: true,
    possible_match: "axi Infinity",
    found_in: "trascript",
  },
  {
    coin: "Ethereum",
    valid: true,
    possible_match: "Ethereum",
    found_in: "screenshot",
  },
  {
    coin: "Solana",
    valid: true,
    possible_match: "Solana",
    found_in: "screenshot",
  },
  {
    coin: "Chainlink",
    valid: true,
    possible_match: "ChainLink",
    found_in: "screenshot",
  },
  {
    coin: "Coinbase",
    valid: true,
    possible_match: "Coinbase",
    found_in: "screenshot",
  },
  {
    coin: "Avalanche",
    valid: true,
    possible_match: "Avalanche",
    found_in: "screenshot",
  },
  {
    coin: "Polygon",
    valid: true,
    possible_match: "Polygon",
    found_in: "screenshot",
  },
  {
    coin: "Injective",
    valid: true,
    possible_match: "Injective",
    found_in: "screenshot",
  },
  {
    coin: "Celestia",
    valid: true,
    possible_match: "Celestia",
    found_in: "screenshot",
  },
  {
    coin: "Internet Computer",
    valid: true,
    possible_match: "Internet Computer",
    found_in: "screenshot",
  },
  {
    coin: "LayerZero",
    valid: true,
    possible_match: "Layer Zero",
    found_in: "screenshot",
  },
  {
    coin: "Beam",
    valid: true,
    possible_match: "Beam",
    found_in: "screenshot",
  },
  {
    coin: "Immutable X",
    valid: true,
    possible_match: "ImmutableX",
    found_in: "screenshot",
  },
  {
    coin: "Gala",
    valid: true,
    possible_match: "Gala",
    found_in: "screenshot",
  },
  {
    coin: "Ronin",
    valid: true,
    possible_match: "Ronin",
    found_in: "screenshot",
  },
  {
    coin: "Pixels",
    valid: true,
    possible_match: "Pixels Online",
    found_in: "screenshot",
  },
  {
    coin: "Cify",
    valid: false,
    possible_match: "Seedify",
    found_in: "screenshot",
  },
  {
    coin: "Prime",
    valid: true,
    possible_match: "PRIME",
    found_in: "screenshot",
  },
  {
    coin: "Neotokyo",
    valid: true,
    possible_match: "Neo Tokyo",
    found_in: "screenshot",
  },
  {
    coin: "SuperVerse",
    valid: true,
    possible_match: "SuperVerse",
    found_in: "screenshot",
  },
  {
    coin: "Imposters",
    valid: true,
    possible_match: "Impostors",
    found_in: "screenshot",
  },
  {
    coin: "Terse",
    valid: false,
    possible_match: "Treeverse",
    found_in: "screenshot",
  },
  {
    coin: "Rever",
    valid: false,
    possible_match: "Treeverse",
    found_in: "screenshot",
  },
  {
    coin: "Gonzilla",
    valid: true,
    possible_match: "Gunzilla",
    found_in: "screenshot",
  },
  {
    coin: "Ready Games",
    valid: true,
    possible_match: "Ready Games",
    found_in: "screenshot",
  },
  {
    coin: "Heroes of Mavia",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Shrapnel",
    valid: true,
    possible_match: "Shrapnel",
    found_in: "screenshot",
  },
  {
    coin: "Big Time",
    valid: true,
    possible_match: "BIGTIME",
    found_in: "screenshot",
  },
  {
    coin: "Trapnel",
    valid: true,
    possible_match: "Shrapnel",
    found_in: "screenshot",
  },
  {
    coin: "Eluvium",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Cus",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Mavia",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Wagi",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Pepe",
    valid: true,
    possible_match: "Pepe",
    found_in: "screenshot",
  },
  {
    coin: "Bon",
    valid: true,
    possible_match: "Bonk",
    found_in: "screenshot",
  },
  {
    coin: "AIOZ",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Bittensor",
    valid: true,
    possible_match: "Bittensor",
    found_in: "screenshot",
  },
  {
    coin: "dYdX",
    valid: true,
    possible_match: "dYdX",
    found_in: "screenshot",
  },
  {
    coin: "Pudgy Penguins",
    valid: true,
    possible_match: "Pudgy Penguins",
    found_in: "screenshot",
  },
  {
    coin: "Prisma",
    valid: true,
    possible_match: "Prisma",
    found_in: "screenshot",
  },
  {
    coin: "THORChain",
    valid: true,
    possible_match: "RUNE",
    found_in: "screenshot",
  },
];

/* const formatted = await formatValidatedData(
  data,
  "https://www.youtube.com/watch?v=openhM5Gurs"
); */
const jsrStr = `[\n  {\n    \"coin\": \"Bitcoin\",\n    \"valid\": true,\n    \"possible_match\": \"Bitcoin\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Dogecoin\",\n    \"valid\": true,\n    \"possible_match\": \"Dogecoin (DOGE)\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Axie Infinity\",\n    \"valid\": true,\n    \"possible_match\": \"axi Infinity\",\n    \"found_in\": \"trascript\"\n  },\n  {\n    \"coin\": \"Ethereum\",\n    \"valid\": true,\n    \"possible_match\": \"Ethereum\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Solana\",\n    \"valid\": true,\n    \"possible_match\": \"Solana\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Chainlink\",\n    \"valid\": true,\n    \"possible_match\": \"ChainLink\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Coinbase\",\n    \"valid\": true,\n    \"possible_match\": \"Coinbase\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Avalanche\",\n    \"valid\": true,\n    \"possible_match\": \"Avalanche\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Polygon\",\n    \"valid\": true,\n    \"possible_match\": \"Polygon\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Injective\",\n    \"valid\": true,\n    \"possible_match\": \"Injective\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Celestia\",\n    \"valid\": true,\n    \"possible_match\": \"Celestia\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Internet Computer\",\n    \"valid\": true,\n    \"possible_match\": \"Internet Computer\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"LayerZero\",\n    \"valid\": true,\n    \"possible_match\": \"Layer Zero\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Beam\",\n    \"valid\": true,\n    \"possible_match\": \"Beam\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Immutable X\",\n    \"valid\": true,\n    \"possible_match\": \"ImmutableX\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Gala\",\n    \"valid\": true,\n    \"possible_match\": \"Gala\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Ronin\",\n    \"valid\": true,\n    \"possible_match\": \"Ronin\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Pixels\",\n    \"valid\": true,\n    \"possible_match\": \"Pixels Online\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Cify\",\n    \"valid\": true,\n    \"possible_match\": \"Seedify\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Prime\",\n    \"valid\": true,\n    \"possible_match\": \"PRIME\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Neotokyo\",\n    \"valid\": true,\n    \"possible_match\": \"Neo Tokyo\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"SuperVerse\",\n    \"valid\": true,\n    \"possible_match\": \"SuperVerse\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Imposters\",\n    \"valid\": true,\n    \"possible_match\": \"Impostors\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Terse\",\n    \"valid\": false,\n    \"possible_match\": \"Treeverse\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Rever\",\n    \"valid\": false,\n    \"possible_match\": \"Treeverse\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Gonzilla\",\n    \"valid\": true,\n    \"possible_match\": \"Gunzilla\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Ready Games\",\n    \"valid\": true,\n    \"possible_match\": \"Ready Games\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Heroes of Mavia\",\n    \"valid\": true,\n    \"possible_match\": \"Heroes of mavia\",\n    \"found_in\": \"trascript\"\n  },\n  {\n    \"coin\": \"Shrapnel\",\n    \"valid\": true,\n    \"possible_match\": \"Shrapnel\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Big Time\",\n    \"valid\": true,\n    \"possible_match\": \"BIGTIME\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Trapnel\",\n    \"valid\": false,\n    \"possible_match\": \"Shrapnel\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Eluvium\",\n    \"valid\": false,\n    \"possible_match\": \"none\",\n    \"found_in\": \"none\"\n  },\n  {\n    \"coin\": \"Cus\",\n    \"valid\": false,\n    \"possible_match\": \"none\",\n    \"found_in\": \"none\"\n  },\n  {\n    \"coin\": \"Mavia\",\n    \"valid\": true,\n    \"possible_match\": \"Heroes of mavia\",\n    \"found_in\": \"trascript\"\n  },\n  {\n    \"coin\": \"Wagi\",\n    \"valid\": false,\n    \"possible_match\": \"none\",\n    \"found_in\": \"none\"\n  },\n  {\n    \"coin\": \"Pepe\",\n    \"valid\": true,\n    \"possible_match\": \"Pepe\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Bon\",\n    \"valid\": true,\n    \"possible_match\": \"Bonk\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"AIOZ\",\n    \"valid\": false,\n    \"possible_match\": \"none\",\n    \"found_in\": \"none\"\n  },\n  {\n    \"coin\": \"Bittensor\",\n    \"valid\": true,\n    \"possible_match\": \"Bittensor\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"dYdX\",\n    \"valid\": true,\n    \"possible_match\": \"DyDx (DYDX)\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Pudgy Penguins\",\n    \"valid\": true,\n    \"possible_match\": \"Pudgy Penguins\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"Prisma\",\n    \"valid\": true,\n    \"possible_match\": \"Prisma\",\n    \"found_in\": \"screenshot\"\n  },\n  {\n    \"coin\": \"THORChain\",\n    \"valid\": true,\n    \"possible_match\": \"RUNE\",\n    \"found_in\": \"screenshot\"\n  }\n]`;
console.log(JSON.parse(jsrStr));
