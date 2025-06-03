import Fuse from "fuse.js";
import { validateCoins, validateCoinsAgainstTrascriptContent } from "../Llm.js";
import { supabase } from "../supabaseClient.js";
import { formatValidatedData } from "../utils.js";
import { UpdateCoinsWithValidatedDataTests } from "../SendData.js";

export function checkScreenshotContentAgainstTranscriptContent(
  treascriptAnalysis,
  screenshotContent
) {
  const fuseOptions = {
    threshold: 0.2,
    minMatchCharLength: 4,
    keys: ["text"],
  };
  for (let project of screenshotContent.projects) {
    for (let searchPattern of project.content.split(",")) {
      const projectTranscript = treascriptAnalysis.projects.filter(
        (proj) => proj.coin_or_project == project.coin_or_project
      );
      /* const fuse = new Fuse(dataArray, fuseOptions);
      const searchPattern = timestamp;
      let matches = fuse.search(searchPattern);
      matches = matches.map((match) => match.item.text).join(" "); */
      console.log(
        `Checking data from: Screenshot ${JSON.stringify(
          projectTranscript[0]?.coin_or_project
        )} and data from TranscriptContent: ${searchPattern}`
      );
    }
  }
  analysisCopy.projects = finalProjectsArray;
  console.log("####### \n \n");
  // console.log("Final validated data: " + JSON.stringify(analysisCopy));
  return analysisCopy;
}
const data = {
  projects: [
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:26:20",
        "00:26:22",
        "00:24:03",
        "00:24:05",
        "00:01:08",
        "00:01:10",
        "00:03:50",
        "00:03:52",
        "00:08:03",
        "00:08:05",
      ],
      total_count: 3,
      possible_match: "Bitcoin (BTC)",
      coin_or_project: "Bitcoin",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "large",
      timestamps: [
        "00:40:43",
        "00:40:45",
        "00:02:34",
        "00:02:36",
        "00:02:31",
        "00:02:33",
        "00:05:02",
        "00:05:04",
        "00:23:52",
        "00:23:54",
      ],
      total_count: 3,
      possible_match: "Dogecoin (DOGE)",
      coin_or_project: "Dogecoin",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "large",
      timestamps: [
        "00:30:13",
        "00:30:15",
        "00:00:42",
        "00:00:44",
        "00:06:21",
        "00:06:23",
        "00:20:06",
        "00:20:08",
      ],
      total_count: 3,
      possible_match: "Ronin",
      coin_or_project: "Axie Infinity",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1", "DeFi"],
      marketcap: "large",
      timestamps: [
        "00:13:17",
        "00:13:19",
        "00:11:46",
        "00:11:48",
        "00:44:45",
        "00:44:47",
        "00:24:03",
        "00:24:05",
        "00:09:35",
        "00:09:37",
      ],
      total_count: 3,
      possible_match: "Ethereum",
      coin_or_project: "Ethereum",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:16:52",
        "00:16:54",
        "00:11:44",
        "00:11:46",
        "00:13:15",
        "00:13:17",
        "00:40:32",
        "00:40:34",
        "00:16:59",
        "00:17:01",
      ],
      total_count: 3,
      possible_match: "Solana",
      coin_or_project: "Solana",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 10,
      category: ["DeFi", "Oracles"],
      marketcap: "large",
      timestamps: [
        "00:14:06",
        "00:14:08",
        "00:13:47",
        "00:13:49",
        "00:16:50",
        "00:16:52",
        "00:16:53",
        "00:16:55",
        "00:17:26",
        "00:17:28",
      ],
      total_count: 3,
      possible_match: "ChainLink",
      coin_or_project: "Chainlink",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Exchange"],
      marketcap: "large",
      timestamps: [
        "00:15:04",
        "00:15:06",
        "00:24:08",
        "00:24:10",
        "00:23:49",
        "00:23:51",
        "00:40:30",
        "00:40:32",
        "00:24:05",
        "00:24:07",
      ],
      total_count: 3,
      possible_match: "Coinbase",
      coin_or_project: "Coinbase",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:16:07",
        "00:16:09",
        "00:15:52",
        "00:15:54",
        "00:15:56",
        "00:16:41",
        "00:16:43",
        "00:16:24",
        "00:16:26",
      ],
      total_count: 3,
      possible_match: "Avalanche",
      coin_or_project: "Avalanche",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Layer 2"],
      marketcap: "large",
      timestamps: [
        "00:17:35",
        "00:17:37",
        "00:17:07",
        "00:17:09",
        "00:17:43",
        "00:17:45",
        "00:17:52",
        "00:17:54",
        "00:18:05",
        "00:18:07",
      ],
      total_count: 3,
      possible_match: "Polygon",
      coin_or_project: "Polygon",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["DeFi"],
      marketcap: "large",
      timestamps: [
        "00:18:46",
        "00:18:48",
        "00:19:13",
        "00:19:15",
        "00:18:51",
        "00:18:53",
        "00:18:47",
        "00:18:49",
        "00:18:24",
        "00:18:26",
      ],
      total_count: 3,
      possible_match: "Injective (INJ)",
      coin_or_project: "Injective",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:20:13",
        "00:20:15",
        "00:19:21",
        "00:19:23",
        "00:20:25",
        "00:20:27",
        "00:20:04",
        "00:20:06",
        "00:19:38",
        "00:19:40",
      ],
      total_count: 3,
      possible_match: "Celestia (TIA)",
      coin_or_project: "Celestia",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:20:36",
        "00:20:38",
        "00:21:17",
        "00:21:19",
        "00:26:18",
        "00:26:20",
        "00:26:22",
        "00:26:23",
        "00:26:25",
      ],
      total_count: 3,
      possible_match: "Internet Computer (ICP)",
      coin_or_project: "Internet Computer",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Cross-chain"],
      marketcap: "large",
      timestamps: [
        "00:22:40",
        "00:22:42",
        "00:22:23",
        "00:22:25",
        "00:28:57",
        "00:28:59",
        "00:29:00",
        "00:29:02",
        "00:29:03",
        "00:29:05",
      ],
      total_count: 3,
      possible_match: "Layer Zero",
      coin_or_project: "LayerZero",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:29:04",
        "00:29:06",
        "00:30:56",
        "00:30:58",
        "00:28:19",
        "00:28:21",
        "00:19:10",
        "00:19:12",
        "00:27:46",
        "00:27:48",
      ],
      total_count: 3,
      possible_match: "Beam",
      coin_or_project: "Beam",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming", "Layer 2"],
      marketcap: "large",
      timestamps: [
        "00:28:36",
        "00:28:38",
        "00:28:12",
        "00:28:14",
        "00:03:57",
        "00:03:59",
        "00:28:17",
        "00:28:19",
        "00:30:10",
        "00:30:12",
      ],
      total_count: 3,
      possible_match: "ImmutableX",
      coin_or_project: "Immutable X",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:30:54",
        "00:30:56",
        "00:29:39",
        "00:29:41",
        "00:11:44",
        "00:11:46",
        "00:13:15",
        "00:13:17",
        "00:40:32",
        "00:40:34",
      ],
      total_count: 3,
      possible_match: "Gala",
      coin_or_project: "Gala",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:30:42",
        "00:30:44",
        "00:30:52",
        "00:30:54",
        "00:30:13",
        "00:30:15",
        "00:30:05",
        "00:30:07",
        "00:26:10",
        "00:26:12",
      ],
      total_count: 3,
      possible_match: "Ronin",
      coin_or_project: "Ronin",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:37:45",
        "00:37:47",
        "00:39:39",
        "00:39:41",
        "00:33:39",
        "00:33:41",
        "00:33:42",
        "00:33:44",
        "00:33:45",
        "00:33:47",
      ],
      total_count: 3,
      possible_match: "Pixels Online",
      coin_or_project: "Pixels",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Gaming", "Launchpad"],
      marketcap: "small",
      timestamps: [
        "00:34:53",
        "00:34:55",
        "00:31:09",
        "00:31:11",
        "00:31:59",
        "00:32:01",
        "00:31:07",
        "00:34:50",
        "00:34:52",
      ],
      total_count: 3,
      possible_match: "Seedify",
      coin_or_project: "Cify",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:34:10",
        "00:34:12",
        "00:32:52",
        "00:32:54",
        "00:27:48",
        "00:27:50",
        "00:03:47",
        "00:03:49",
        "00:07:55",
        "00:07:57",
      ],
      total_count: 3,
      possible_match: "PRIME",
      coin_or_project: "Prime",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:34:13",
        "00:34:15",
        "00:03:15",
        "00:03:17",
        "00:34:00",
        "00:34:02",
        "00:35:01",
        "00:35:03",
        "00:43:11",
        "00:43:13",
      ],
      total_count: 3,
      possible_match: "Neo Tokyo",
      coin_or_project: "Neotokyo",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:35:56",
        "00:35:58",
        "00:35:29",
        "00:35:31",
        "00:35:17",
        "00:35:19",
        "00:35:24",
        "00:35:26",
        "00:36:43",
        "00:36:45",
      ],
      total_count: 3,
      possible_match: "SuperVerse (SUPER)",
      coin_or_project: "SuperVerse",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:36:32",
        "00:36:34",
        "00:35:17",
        "00:35:19",
        "00:36:14",
        "00:36:16",
        "00:36:26",
        "00:36:28",
        "00:36:52",
        "00:36:54",
      ],
      total_count: 3,
      possible_match: "Impostors",
      coin_or_project: "Imposters",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:36:32",
        "00:36:34",
        "00:36:57",
        "00:36:59",
        "00:42:02",
        "00:42:04",
        "00:16:43",
        "00:16:45",
        "00:23:33",
        "00:23:35",
      ],
      total_count: 3,
      possible_match: "Treeverse",
      coin_or_project: "Terse",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:38:43",
        "00:38:45",
        "00:02:32",
        "00:02:34",
        "00:06:45",
        "00:06:47",
        "00:10:02",
        "00:10:04",
        "00:39:19",
        "00:39:21",
      ],
      total_count: 3,
      possible_match: "Treeverse",
      coin_or_project: "Rever",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:23",
        "00:39:25",
        "00:37:19",
        "00:37:21",
        "00:37:22",
        "00:37:24",
        "00:37:25",
        "00:37:27",
      ],
      total_count: 3,
      possible_match: "Gunzilla",
      coin_or_project: "Gonzilla",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:45",
        "00:37:47",
        "00:09:39",
        "00:09:41",
        "00:37:28",
        "00:37:30",
        "00:37:31",
        "00:37:33",
        "00:37:34",
        "00:37:36",
      ],
      total_count: 3,
      possible_match: "Ready Games",
      coin_or_project: "Ready Games",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:48",
        "00:37:50",
        "00:37:37",
        "00:37:39",
        "00:37:40",
        "00:37:42",
        "00:37:43",
        "00:37:45",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Heroes of Mavia",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:38:03",
        "00:38:05",
        "00:39:24",
        "00:39:26",
        "00:38:00",
        "00:38:02",
        "00:37:46",
        "00:37:48",
        "00:37:49",
        "00:37:51",
      ],
      total_count: 3,
      possible_match: "Shrapnel",
      coin_or_project: "Shrapnel",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:38:22",
        "00:38:24",
        "00:38:26",
        "00:38:28",
        "00:38:40",
        "00:38:42",
        "00:38:29",
        "00:38:31",
      ],
      total_count: 3,
      possible_match: "BIGTIME",
      coin_or_project: "Big Time",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:38:03",
        "00:38:05",
        "00:39:24",
        "00:39:26",
        "00:38:26",
        "00:38:28",
        "00:38:24",
        "00:38:04",
        "00:38:06",
      ],
      total_count: 3,
      possible_match: "Shrapnel",
      coin_or_project: "Trapnel",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:25",
        "00:39:27",
        "00:38:13",
        "00:38:15",
        "00:38:16",
        "00:38:18",
        "00:38:19",
        "00:38:21",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Eluvium",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:42:22",
        "00:42:24",
        "00:38:53",
        "00:38:55",
        "00:41:42",
        "00:41:44",
        "00:39:31",
        "00:39:33",
        "00:33:54",
        "00:33:56",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Cus",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:48",
        "00:37:50",
        "00:38:31",
        "00:38:33",
        "00:38:34",
        "00:38:36",
        "00:38:37",
        "00:38:39",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Mavia",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:33",
        "00:39:35",
        "00:31:53",
        "00:31:55",
        "00:38:40",
        "00:38:42",
        "00:38:43",
        "00:38:45",
        "00:38:46",
        "00:38:48",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Wagi",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "medium",
      timestamps: [
        "00:41:32",
        "00:41:34",
        "00:02:57",
        "00:02:59",
        "00:38:49",
        "00:38:51",
        "00:38:52",
        "00:38:54",
        "00:38:55",
        "00:38:57",
      ],
      total_count: 3,
      possible_match: "Pepe",
      coin_or_project: "Pepe",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Meme coins"],
      marketcap: "small",
      timestamps: [
        "00:40:23",
        "00:40:25",
        "00:38:58",
        "00:39:00",
        "00:39:01",
        "00:39:03",
        "00:39:04",
        "00:39:06",
      ],
      total_count: 3,
      possible_match: "Bonk",
      coin_or_project: "Bon",
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 9,
      category: ["AI"],
      marketcap: "medium",
      timestamps: [
        "00:39:07",
        "00:39:09",
        "00:39:10",
        "00:39:12",
        "00:39:13",
        "00:39:15",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "AIOZ",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["AI"],
      marketcap: "medium",
      timestamps: [
        "00:39:16",
        "00:39:18",
        "00:39:19",
        "00:39:21",
        "00:39:22",
        "00:39:24",
      ],
      total_count: 3,
      possible_match: "Bittensor (TAO)",
      coin_or_project: "Bittensor",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "large",
      timestamps: [
        "00:43:01",
        "00:43:03",
        "00:39:25",
        "00:39:27",
        "00:39:28",
        "00:39:30",
        "00:39:31",
        "00:39:33",
      ],
      total_count: 3,
      possible_match: "DyDx (DYDX)",
      coin_or_project: "dYdX",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["NFT"],
      marketcap: "medium",
      timestamps: [
        "00:43:34",
        "00:43:36",
        "00:43:27",
        "00:43:29",
        "00:43:16",
        "00:43:18",
        "00:40:17",
        "00:40:19",
        "00:39:34",
        "00:39:36",
      ],
      total_count: 3,
      possible_match: "Pudgy Penguins",
      coin_or_project: "Pudgy Penguins",
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "small",
      timestamps: [
        "00:44:24",
        "00:44:26",
        "00:44:22",
        "00:39:43",
        "00:39:45",
        "00:39:46",
        "00:39:48",
        "00:39:49",
        "00:39:51",
      ],
      total_count: 3,
      possible_match: "Prisma",
      coin_or_project: "Prisma",
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "medium",
      timestamps: [
        "00:39:52",
        "00:39:54",
        "00:39:55",
        "00:39:57",
        "00:39:58",
        "00:40:00",
      ],
      total_count: 3,
      possible_match: "RUNE",
      coin_or_project: "THORChain",
    },
  ],
  total_count: 129,
  total_rpoints: 325,
};
const screenshotContent = {
  projects: [
    {
      coin_or_project: "Neotokyo",
      content:
        "Bitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse\nImmutable, NeoTokyo\nSolana, ChainLink, Coinbase, Avalanche, Monad, Injective, Celestia, Internet Computer, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse\nBitcoin (BTC)\nBitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX), Pudgy Penguins\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash, BitTensor, DyDx, Pudgy Penguins",
      usage: 0.0266,
    },
    {
      coin_or_project: "Dogecoin",
      content:
        "Nothing in the image contains any cryptocurrency coin names or symbols.\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nNothing found.\nDogecoin (DOGE)\nBitcoin (BTC)\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor",
      usage: 0.015,
    },
    {
      coin_or_project: "Imposters",
      content:
        "Bitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Monad, Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polkadot, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse",
      usage: 0.023,
    },
    {
      coin_or_project: "Prisma",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), GALA, Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Galla, Ronin (RON), Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash, Bittensor (TAO), dYdX, Pudgy Penguins, SOL Eco, Avax Eco, Cosmos Eco, Prisma, RUNE\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Galia, Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash (AKT), Bittensor (TAO), dYdX, Pudgy Penguins, SOL Eco, Avax Eco, Cosmos Eco, Prisma, RUNE\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, SOL Eco, Avax Eco, Cosmos Eco, Prism (PRISM), RUNE\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk",
      usage: 0.0295,
    },
    {
      coin_or_project: "Cus",
      content:
        "Bitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nBitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash, Bittensor (TAO)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash, Bittensor\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.024,
    },
    {
      coin_or_project: "Ethereum",
      content:
        "Solana\nSolana\nSolana\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, Ethernity, SIDUS, Pepe, Bonk, Akash (AKT), Bittensor (TAO), dYdX (DYDX), Pudgy Penguins, Prisma, RUNE\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana\nSolana\nSolana\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash, Bittensor, dYdX, Pudgy Penguins, Prisma, RUNE",
      usage: 0.0264,
    },
    {
      coin_or_project: "Axie_Infinity",
      content:
        "Blockstack (STX)\nBitcoin (BTC), STX\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nBitcoin (BTC)",
      usage: 0.0152,
    },
    {
      coin_or_project: "Celestia",
      content:
        "Celestia (TIA), Bitcoin (BTC), Ethereum (ETH)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia",
      usage: 0.0153,
    },
    {
      coin_or_project: "Cify",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Monad, Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse",
      usage: 0.0255,
    },
    {
      coin_or_project: "LayerZero",
      content:
        "Monad\nBTC, ETH, SOL\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBTC, ETH, SOL\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nSolana, Chainlink, Coinbase, Avalanche, Polygon, Injective, Celestia, Monad, Internet Computer, Layer Zero, Beam, ImmutableX\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)\nBTC, ETH, SOL\nBNB (BNB), XRP (XRP), Solana (SOL), USDC (USDC), Lido Staked Ether (STETH), Cardano (ADA), Dogecoin (DOGE), Avalanche (AVAX), Polkadot (DOT), TRON (TRX), Polygon (MATIC), Chainlink (LINK)",
      usage: 0.0276,
    },
    {
      coin_or_project: "Internet_Computer",
      content:
        "Internet Computer (ICP), Bitcoin (BTC), Ethereum (ETH)\nInternet Computer (ICP), BTC, ETH\nInternet Computer (ICP)\nInternet Computer (ICP)\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)",
      usage: 0.0172,
    },
    {
      coin_or_project: "Ronin",
      content:
        "Bitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Monad, Internet Computer, Layer Zero, Beam, ImmutableX, Gala\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, Chainlink, Coinbase, Avalanche, Polygon, Celestia, Injective, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin",
      usage: 0.0268,
    },
    {
      coin_or_project: "Eluvium",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel",
      usage: 0.0249,
    },
    {
      coin_or_project: "Trapnel",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Galla, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME",
      usage: 0.0281,
    },
    {
      coin_or_project: "Bittensor",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), PRIME, Seedify (SFUND), Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.0192,
    },
    {
      coin_or_project: "dYdX",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash (AKT), Bittensor (TAO), DyDx (DYDX)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX)",
      usage: 0.0262,
    },
    {
      coin_or_project: "Gala",
      content:
        "Nothing in the visible portion of the image contains any cryptocurrency coin names or symbols.\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nNothing in the visible portion of the image clearly displays any cryptocurrency coin names or symbols.\nSolana\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Celestia, Injective, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA)\nSolana\nSolana",
      usage: 0.0229,
    },
    {
      coin_or_project: "Immutable_X",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nBeam (BEAM), Fetch.ai (FET), Internet Computer (ICP), aelf (ELF), Hedera (HBAR), Cardano (ADA), NEO (NEO), ApeCoin (APE), KuCoin (KCS), VeChain (VET)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Celestia, Injective, Monad, Internet Computer, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX",
      usage: 0.0271,
    },
    {
      coin_or_project: "Injective",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon\nInjective (INJ), BTC, ETH\nInjective (INJ), BTC, ETH\nInjective (INJ), BTC, ETH\nInjective (INJ), BTC, ETH\nInjective (INJ), BTC, ETH\nInjective (INJ), BTC, ETH\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), Bitcoin (BTC), Ethereum (ETH)\nInjective (INJ), BTC, ETH",
      usage: 0.025,
    },
    {
      coin_or_project: "Avalanche",
      content:
        "Solana, ChainLink, Coinbase, Avalanche\nSolana (SOL), BTC, ETH\nSolana (SOL), BTC, ETH\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche",
      usage: 0.0225,
    },
    {
      coin_or_project: "Wagi",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Galla, Ronin, PRIME, Seedify, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME",
      usage: 0.0296,
    },
    {
      coin_or_project: "Pudgy_Penguins",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), BitTensor (TAO), dYdX (DYDX), Pudgy Penguins\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bitdao (BIT), DyDx (DYDX), Pudgy Penguins\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Monad, Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK), Akash (AKT), Bittensor (TAO), DyDx (DYDX), Pudgy Penguins\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Layer Zero, Monad, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash, Bittensor, DyDx, Pudgy Penguins\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash (AKT), Bittensor (TAO), DyDx (DYDX), Pudgy Penguins\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk, Akash (AKT), Bittensor (TAO), DyDx (DYDX), Pudgy Penguins\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.0267,
    },
    {
      coin_or_project: "Terse",
      content:
        "Solana, ChainLink, Coinbase, Avalanche\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nBitcoin (BTC)\nSolana, Chainlink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse",
      usage: 0.0257,
    },
    {
      coin_or_project: "AIOZ",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase, Avalanche, Polygon (MATIC), Injective, Celestia, Internet Computer (ICP), Layer Zero, Monad, Beam, ImmutableX (IMX), Gala, Ronin (RON), Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Monad, Beam, ImmutableX (IMX), GALA, Ronin (RON), Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Monad, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), GALA, Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche, Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Monad, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.0191,
    },
    {
      coin_or_project: "THORChain",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Bonk (BONK)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe (PEPE), Bonk (BONK)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Bonk (BONK)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Bonk (BONK)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Bonk (BONK)",
      usage: 0.0196,
    },
    {
      coin_or_project: "Solana",
      content:
        "There are no cryptocurrency coin names or symbols visible in the image.\nNothing in the visible portion of the image provides cryptocurrency coin names or symbols.\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana\nSolana, ChainLink, Coinbase, Avalanche\nSolana\nSolana\nSolana",
      usage: 0.0246,
    },
    {
      coin_or_project: "Pixels",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games\nBitcoin (BTC)\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS, Pepe, Bonk\nBitcoin (BTC)\nBitcoin (BTC)",
      usage: 0.0223,
    },
    {
      coin_or_project: "Shrapnel",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel (SHRAP)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online",
      usage: 0.0311,
    },
    {
      coin_or_project: "Prime",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME\nBitcoin (BTC)\nBitcoin (BTC), Ethereum (ETH)\nBitcoin (BTC)\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam",
      usage: 0.0248,
    },
    {
      coin_or_project: "Coinbase",
      content:
        "Bitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nI do not see any cryptocurrency coin names or symbols in the visible portion of the image.\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nThere are no cryptocurrency coin names or symbols visible in the image.\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana, Chainlink, Coinbase\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nSolana, ChainLink, Coinbase\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor",
      usage: 0.0257,
    },
    {
      coin_or_project: "Rever",
      content:
        "Bitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), Bitcoin (BTC), Ethereum (ETH)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, Ethereum, Bitcoin (BTC)",
      usage: 0.0194,
    },
    {
      coin_or_project: "Ready_Games",
      content:
        "Bitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games\nBitcoin (BTC)\nSolana\nBitcoin (BTC)\nBitcoin (BTC)",
      usage: 0.018,
    },
    {
      coin_or_project: "Mavia",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online",
      usage: 0.0249,
    },
    {
      coin_or_project: "Beam",
      content:
        "Solana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nInjective (INJ), BTC, ETH\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam\nInjective (INJ), BTC, ETH\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin",
      usage: 0.0264,
    },
    {
      coin_or_project: "Pepe",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzila, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nBitcoin (BTC)\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), Chainlink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Galla, Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.0212,
    },
    {
      coin_or_project: "Big_Time",
      content:
        "Solana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero (ZRO), Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Galla, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Gala, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treverse, Gunzilla, Ready Games, Pixels Online, Shrapnel",
      usage: 0.0253,
    },
    {
      coin_or_project: "Gonzilla",
      content:
        "Bitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nBitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)",
      usage: 0.0209,
    },
    {
      coin_or_project: "Bitcoin",
      content:
        "Bitcoin (BTC), Ethereum (ETH)\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nBitcoin (BTC)\nBTC, ETH\nBitcoin, Ethereum, Solana, Chainlink, Avalanche, Injective, Celestia, Akash, Bittensor\nBTC, ETH\nBitcoin (BTC), Ethereum (ETH)",
      usage: 0.0174,
    },
    {
      coin_or_project: "Chainlink",
      content:
        "Polygon\nSolana, ChainLink\nSolana, ChainLink, Coinbase, Avalanche\nPolygon\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink\nSolana, ChainLink\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink, Coinbase, Avalanche\nSolana, ChainLink",
      usage: 0.0248,
    },
    {
      coin_or_project: "SuperVerse",
      content:
        "SuperVerse (SUPER), SuperFarm (SUPER)\nSolana (SOL), Chainlink (LINK), Coinbase (COIN), Avalanche (AVAX), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER)\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Galla, Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER)\nBitcoin (BTC)\nSuperVerse (SUPER), SuperFarm DAO\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Monad, Injective (INJ), Celestia (TIA), Internet Computer (ICP), Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER)\nSuperVerse (SUPER)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse",
      usage: 0.0222,
    },
    {
      coin_or_project: "Bon",
      content:
        "Nothing found.\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Galla, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nSolana, ChainLink, Coinbase, Avalanche, Polygon, Injective, Celestia, Internet Computer, Monad, Layer Zero, Beam, ImmutableX, Galla, Ronin, Seedify, PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS\nn/a\nSolana (SOL), ChainLink (LINK), Coinbase (COIN), Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online, Shrapnel, BIGTIME, SIDUS",
      usage: 0.0238,
    },
    {
      coin_or_project: "Heroes_of_Mavia",
      content:
        "Bitcoin (BTC)\nBitcoin (BTC)\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam (BEAM), ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (AVAX), Polygon (MATIC), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse (SUPER), Treeverse, Gunzilla, Ready Games, Pixels Online\nSolana (SOL), ChainLink (LINK), Coinbase, Avalanche (VAX), Polygon (MATIC), Injective (INJ), Celestia (TIA), Internet Computer (ICP), Monad, Layer Zero, Beam, ImmutableX (IMX), Gala (GALA), Ronin (RON), Seedify (SFUND), PRIME, Neo Tokyo, Impostors, SuperVerse, Treeverse, Gunzilla, Ready Games, Pixels Online\nBitcoin (BTC)",
      usage: 0.0166,
    },
    {
      coin_or_project: "Polygon",
      content:
        "Polygon\nPolygon\nSolana, ChainLink, Coinbase, Avalanche, Polygon\nSolana, ChainLink, Coinbase, Avalanche, Polygon\nPolygon\nSolana, ChainLink, Coinbase, Avalanche, Polygon\nPolygon\nSolana, ChainLink, Coinbase, Avalanche, Polygon\nPolygon\nSolana, ChainLink, Coinbase, Avalanche, Polygon",
      usage: 0.0245,
    },
  ],
  link: "https://www.youtube.com/watch?v=openhM5Gurs",
};
const transcriptContent = {
  projects: [
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:26:20",
        "00:26:22",
        "00:24:03",
        "00:24:05",
        "00:01:08",
        "00:01:10",
        "00:03:50",
        "00:03:52",
        "00:08:03",
        "00:08:05",
      ],
      total_count: 3,
      possible_match: "Bitcoin (BTC)",
      coin_or_project: "Bitcoin",
      transcript_content: [
        "Bitcoin continues to grow usually actually the gains of salana really see here it hasn't pumped very much its plays feels like a waste that's my profits into some other exotic L1 if I supports the channel and I appreciate you guys so check out nordvpn sponsor of today's video and let's get back to some good old fashion cryptocoins back to the point here I personally think that the zero Infinity bucket is worth allocating altcoins will continue to grow especially early on in the bull run and quite Frank Al the risk if Bitcoin doesn't continue to grow is it could drop dramatically I mean bitcoin's up 3x I would still continue to live and creates a higher ceiling for the rest of",
        "altcoins will continue to grow really well if you look here soul is low was like three bucks it's up at like get really carried away but this is my you guys so check out nordvpn sponsor of Bitcoin continues to grow usually especially early on in the bull run and quite Frank Al the risk if Bitcoin doesn't continue to grow is it could huge bags of both of these tokens and I form of Rick Ellis I highly encourage",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "large",
      timestamps: [
        "00:40:43",
        "00:40:45",
        "00:02:34",
        "00:02:36",
        "00:02:31",
        "00:02:33",
        "00:05:02",
        "00:05:04",
        "00:23:52",
        "00:23:54",
      ],
      total_count: 3,
      possible_match: "Dogecoin (DOGE)",
      coin_or_project: "Dogecoin",
      transcript_content: [
        "a Dogecoin moment at some point in the chart of all charts however that is Bon and since I said that Bon has gone coinbase again this is proof that the salana ecosystem is absolutely on fire okay absolutely on fire heepe I still think is the Daner meme by so many orders of magnitudes hoping that the Frog gets its legs under it and has like future I don't know I could be wrong it's still up a bit here from where I called it only 37% not crazy here but noses up at gains here not after a if I were to say so it's my favorite AI concept which to me screams that they're",
        "future I don't know I could be wrong December 7th 2020 the price of axi actually kind of a benefit when you zoom with a webcam and this bright light and on such a ripper it's up 3.1 6X and okay absolutely on fire heepe I still orders of magnitudes hoping that the Frog gets its legs under it and has like a Dogecoin moment at some point in the it's still up a bit here from where I called it only 37% not crazy here but it's up right it's up we don't turn our noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains now the other thing that is a strategy coin I don't have a ton of AI coins but making a video game and that they will ethereum and Bitcoin I think Rune is",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "large",
      timestamps: [
        "00:30:13",
        "00:30:15",
        "00:00:42",
        "00:00:44",
        "00:06:21",
        "00:06:23",
        "00:20:06",
        "00:20:08",
      ],
      total_count: 3,
      possible_match: "Ronin",
      coin_or_project: "Axie Infinity",
      transcript_content: [
        "xchain but Ronin has axi Infinity which explaining to you why I'm buying what be in my opinion required viewing you Celestia essentially giving you free about 2.1x since we called it here on like immutable has like hundreds of games that are coming to the immutable was the most successful crypto game of all time and they also have now pixels now the thing about the Ronin ecosystem on there but it is a very interesting and totally unique way to approach gaming and again there's a lot of different approaches here I'm not playing gatekeeper I'm just saying again if we are to get this Raging Bull this has been probably the best content doing here and I hope hope they continue neotokyo has almost certainly fulfilled astronomical prices they tend to pump succeed in their mission again any game no fancy chips required and they believe",
        "tokens air drops so if you're staking the channel Ronin again similar to Gala like immutable has like hundreds of games that are coming to the immutable xchain but Ronin has axi Infinity which was the most successful crypto game of all time and they also have now pixels is it caters largely they have a huge gaming and again there's a lot of of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit Market launchpads will go bananas they streak I've ever been on and I only to crush it as you can see their fully and dump and you want to kind of stay succeeding is good for all of the games that the Casual gaming route is the way with a webcam and this bright light and",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1", "DeFi"],
      marketcap: "large",
      timestamps: [
        "00:13:17",
        "00:13:19",
        "00:11:46",
        "00:11:48",
        "00:44:45",
        "00:44:47",
        "00:24:03",
        "00:24:05",
        "00:09:35",
        "00:09:37",
      ],
      total_count: 3,
      possible_match: "Ethereum",
      coin_or_project: "Ethereum",
      transcript_content: [
        "ethereum counterparts and that's a see everywhere where you see the massive don't think the market goes and revisits significant the salana ecosystem is that people are valuing uh the coins in the salana ecosystem as equal to their massive narrative so like I said I'll be chain link again chain link is one of from my treasury bills and it's been an in 2019 and 2020 and in 2021 it went on be a fool to fade this kind of strength diluted valuation here is almost a",
        "sell-offs that happened all the way up technicolored risk ranking chart here significant the salana ecosystem is that people are valuing uh the coins in the salana ecosystem as equal to their ethereum counterparts and that's a massive narrative so like I said I'll be the most important protocols in the in a very good situation but they're in a new cycle next we have Celestia now billion so they only have you know small",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:16:52",
        "00:16:54",
        "00:11:44",
        "00:11:46",
        "00:13:15",
        "00:13:17",
        "00:40:32",
        "00:40:34",
        "00:16:59",
        "00:17:01",
      ],
      total_count: 3,
      possible_match: "Solana",
      coin_or_project: "Solana",
      transcript_content: [
        "here because Solana Luna and avax were I want you to take the ideas here the stock market I've been aping coinbase Avalanche as you guys know I've been a hyped layer one ecosystems and it is actually the gains of salana really really well if you look here soul is about 73% off its high Avalanche through most of the markets about 74% off its alltime high it was almost identical in its percent draw down from alltime high there's some muscle memory in the charts like the trio of 2021 obviously Luna nuked and doesn't really exist anymore but salana and avac when salana makes a consider that polygon and their obviously we talked about it here at that you can't even imagine next this is",
        "like the trio of 2021 obviously Luna mental models of how I'm finding and like a madman since about $60 here $65 big Avalanche bull throughout the years slightly off of Blue Chip it's not a about 73% off its high Avalanche through actual movements Avalanche is a really interesting evm Tech again the layer one ecosystem has a ton of competition there are so many chains now but I just think there's some muscle memory in the charts here because Solana Luna and avax were nuked and doesn't really exist anymore but salana and avac when salana makes a actually participated in the early token actually the first project that I'm",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 10,
      category: ["DeFi", "Oracles"],
      marketcap: "large",
      timestamps: [
        "00:14:06",
        "00:14:08",
        "00:13:47",
        "00:13:49",
        "00:16:50",
        "00:16:52",
        "00:16:53",
        "00:16:55",
        "00:17:26",
        "00:17:28",
      ],
      total_count: 3,
      possible_match: "ChainLink",
      coin_or_project: "Chainlink",
      transcript_content: [
        "chain link chain link is effectively popping up right now so you know it's at which arguably might be seen as too much protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through part of most if not all of Defi and it maybe a 10x or so from here maybe a 15x the fall of CZ and FTX they are the last easy to do for my bank I have sort of my bucket actually has been updated because comment on for that reason I cannot tell coins within those ecosystems get hot",
        "part of most if not all of Defi and it x's and the downside and this is how I'm too soon but it just shows you how protocols if you have dexes that are feeding in prices well they're using an Oracle and that is coming in through chain link chain link is effectively almost guaranteed to be here for the man standing and they are the white is when I covered it on the channel and Fiat and crypto worlds separated and coinbase has been ripping salana has you how risky they are or talk about again I don't know what those coins are",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Exchange"],
      marketcap: "large",
      timestamps: [
        "00:15:04",
        "00:15:06",
        "00:24:08",
        "00:24:10",
        "00:23:49",
        "00:23:51",
        "00:40:30",
        "00:40:32",
        "00:24:05",
        "00:24:07",
      ],
      total_count: 3,
      possible_match: "Coinbase",
      coin_or_project: "Coinbase",
      transcript_content: [
        "coinbase position just cuz it's really their caves and start screaming it was pouring my heart and soul into making YouTuber coin like I'm going to be so the gains so far are 321 per or 4.21 Oracle and that is coming in through that would mean that we're about 2.1x over my call and I keep adding to my easy to do for my bank I have sort of my Fiat and crypto worlds separated and bills and into coinbase stock largely this is the only stock you're going to see here but it trades like a crypto so of course if you want something more passive these are things you can just buy and know they're going to be here years from now and probably going to grow with the cycle now we get into big Avalanche bull throughout the years the way I've gone through and explained",
        "easy to do for my bank I have sort of my all a dream this was the biggest bull which arguably might be seen as too much chain link chain link is effectively that would mean that we're about 2.1x over my call and I keep adding to my coinbase position just cuz it's really Fiat and crypto worlds separated and buy and know they're going to be here I was first on avax in 2021 one I was video here because if you're new to",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:16:07",
        "00:16:09",
        "00:15:52",
        "00:15:54",
        "00:15:56",
        "00:16:41",
        "00:16:43",
        "00:16:24",
        "00:16:26",
      ],
      total_count: 3,
      possible_match: "Avalanche",
      coin_or_project: "Avalanche",
      transcript_content: [
        "avalanche again Avalanche is to me the so make sure you put the Bell get ahead of everyone else but only if and the avax ecosystem coins like Joe and some other Crazy Ones to the frame here Joe's like the Unis swap of next in line after salana as far as most of the markets about 74% off its way up to alltime high in a similar nuked and doesn't really exist anymore now polygon markets itself as a layer have a massive run in 2024 with the rest first to overcome your prior highs in",
        "next in line after salana as far as November of 2022 notification on because everything I put and the avax ecosystem coins like Joe and some other Crazy Ones to the frame here Joe's like the Unis swap of avalanche again Avalanche is to me the alltime high it was almost identical in fashion and if you really study the but salana and avac when salana makes a two but it really kind of in practice is the new cycle and this chart is far more effort orders of magnitude more",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Layer 2"],
      marketcap: "large",
      timestamps: [
        "00:17:35",
        "00:17:37",
        "00:17:07",
        "00:17:09",
        "00:17:43",
        "00:17:45",
        "00:17:52",
        "00:17:54",
        "00:18:05",
        "00:18:07",
      ],
      total_count: 3,
      possible_match: "Polygon",
      coin_or_project: "Polygon",
      transcript_content: [
        "polygon is beyond that it's also really we need to gamble in stocks in real through these coins I want to be very this industry could get sued by the right if there's some apocalyptic out to be a massive Money Maker so reply definitely in that lower crypto risk so these two will probably make their risk goated L1 if you don't have polygon right so they have this chain but together this is part of the three-headed dragon of gaming and good Tech and I know this from my developer friends which throughout 2021 strides and in my opinion their ZK Tech really next gen so it's something to consider that polygon and their technology keeps evolving and they're about to evolve from the madic token to the pole token again showing their firm transition to you can see its prior alltime high was let's get to the fun stuff okay beam",
        "good Tech and I know this from my estate in assets of some kind if you clear I will explain my logic as to why government founder could die you never that would be a blessing and I think way up to alltime high in a similar now polygon markets itself as a layer is of course also on this list and a but together this is part of the three-headed dragon of gaming and polygon is beyond that it's also really developer friends which throughout 2021 the pole token about 24 bucks here and today it is Merit Circle again they were called",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["DeFi"],
      marketcap: "large",
      timestamps: [
        "00:18:46",
        "00:18:48",
        "00:19:13",
        "00:19:15",
        "00:18:51",
        "00:18:53",
        "00:18:47",
        "00:18:49",
        "00:18:24",
        "00:18:26",
      ],
      total_count: 3,
      possible_match: "Injective (INJ)",
      coin_or_project: "Injective",
      transcript_content: [
        "injective in fact we were one of the community that inevitably if you're ethereum and everything in the salana could go revisit those 2023 lows so I'm getting through them the second one is the fall of CZ and FTX they are the last buy and know they're going to be here ecosystem has a ton of competition there this case you want to trust the strength understand that strength begets strength and obviously we've talked about first people to cover injective at the beginning of the 2021 run at the end of sale and was able to get tokens at 70 of its chart simply cannot be denied I",
        "ecosystem Has Gone Bananas I started just showing you your max downside but man standing and they are the white years from now and probably going to are so many chains now but I just think has started to become best-in-class and understand that strength begets strength and obviously we've talked about injective in fact we were one of the first people to cover injective at the beginning of the 2021 run at the end of",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:20:13",
        "00:20:15",
        "00:19:21",
        "00:19:23",
        "00:20:25",
        "00:20:27",
        "00:20:04",
        "00:20:06",
        "00:19:38",
        "00:19:40",
      ],
      total_count: 3,
      possible_match: "Celestia (TIA)",
      coin_or_project: "Celestia",
      transcript_content: [
        "Celestia essentially giving you free explaining to you why I'm buying what be in my opinion required viewing you shows you that there's true demand here you're staking Celestia you'll get a ton of these projects that are launching on tokens air drops so if you're staking the Tia coin then you could be eligible for some aird drops again this is all 16% APR so you stake you get some gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy about this chart is I don't think I've seen a worst looking chart in my whole chart of all charts however that is circulating that's like I don't know 80 directly competing with the likes of not be shocked if this thing ends up probably some of them will be closer to to now I personally think the zero crypto goes to zero I'll keep eating category makes it astronomically High xchain but Ronin has axi Infinity which",
        "tokens air drops so if you're staking you're staking Celestia you'll get a ton of these projects that are launching on Celestia essentially giving you free the Tia coin then you could be eligible for some aird drops again this is all Celestial rewards and then you get some actually kind of a benefit when you zoom total supply of 510 they have 450 circulating that's like I don't know 80 or 90% there and so there's not a lot of inflation and this thing went through this crazy crazy dump where effectively soul and stuff who knows anyway I have catching some serious hype waves if we 5x plays in my opinion having too much Infinity bucket has odds that in a bull I'll keep surviving and my life won't be X they are also on this list as you know the entire category will reprice under with a webcam and this bright light and",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Layer 1"],
      marketcap: "large",
      timestamps: [
        "00:20:36",
        "00:20:38",
        "00:21:17",
        "00:21:19",
        "00:26:18",
        "00:26:20",
        "00:26:22",
        "00:26:23",
        "00:26:25",
      ],
      total_count: 3,
      possible_match: "Internet Computer (ICP)",
      coin_or_project: "Internet Computer",
      transcript_content: [
        "is internet computer and what's crazy is that I'm hearing that there's going the Tia coin then you could be eligible gigabrain plays of the cycle I'm certainly hoping it is now the last one about this chart is I don't think I've seen a worst looking chart in my whole immutable X becomes the first gaming different approaches here I'm not",
        "about this chart is I don't think I've these projects are going to win now in gigabrain plays of the cycle I'm certainly hoping it is now the last one is internet computer and what's crazy seen a worst looking chart in my whole its all-time high which I think of as its 2023 low that my friends is a huge token to crack the top 10 in crypto playing gatekeeper I'm just saying think is the Daner meme by so many",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Cross-chain"],
      marketcap: "large",
      timestamps: [
        "00:22:40",
        "00:22:42",
        "00:22:23",
        "00:22:25",
        "00:28:57",
        "00:28:59",
        "00:29:00",
        "00:29:02",
        "00:29:03",
        "00:29:05",
      ],
      total_count: 3,
      possible_match: "Layer Zero",
      coin_or_project: "LayerZero",
      transcript_content: [
        "understand what layer zero is as this is the more dangerous it is that it could life like it is easily the worst looking absolutely absurd it probably won't do because I don't really know what the risk is cuz I don't know what the price is risk is heavily correlated to price if you don't know what the price is you can't determine the risk but anyway this is an upand cominging project that a lot likely to be one of the biggest token launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating with them on some other stuff again crypto barbell where on one side of the",
        "likely to be one of the biggest token drop in price of course if you flip that that well it's just like there's just a risk is cuz I don't know what the price your list definitely go ahead and follow it the next is layer zero again this is going to be one of the biggest coins in the the whole ecosystem and you can actually likely qualify for their understand what layer zero is as this is launches in the whole industry coming up soon shout out to the layer zero team because I've actually been collaborating with them on some other stuff again barbell I have lower risk stuff stuff I months ago and so I take cyber security perspective here it's at $2.6 billion content helps the maximum amount of",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:29:04",
        "00:29:06",
        "00:30:56",
        "00:30:58",
        "00:28:19",
        "00:28:21",
        "00:19:10",
        "00:19:12",
        "00:27:46",
        "00:27:48",
      ],
      total_count: 3,
      possible_match: "Beam",
      coin_or_project: "Beam",
      transcript_content: [
        "beam becomes a top 25 coin or something few hours got almost 1,000 responses and for Celestia some additional Alpha here today's video and let's get back to some odds of it doing one or the other and million they are actively invested in I think it might happen here and if it does happen then that might mean that like that again understanding that crypto is about categories niches as a massive gaming bull I'm very see a mutable X make this massive run are a publisher they have several games and they had a massive destructive run down from their all-time high their all-time high was like 70 cents they're",
        "is that I'm hearing that there's going if you don't know what the price is you it would be worth like a quad zillion bucket actually has been updated because video here because if you're new to good old fashion cryptocoins back to the you're ready for either outcome that's some of the best games in the space and I think it might happen here and if it does happen then that might mean that beam becomes a top 25 coin or something like that again understanding that crypto is about categories niches excited that immutable X is continuing down from their all-time high their downside is about 60% % they haven't",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming", "Layer 2"],
      marketcap: "large",
      timestamps: [
        "00:28:36",
        "00:28:38",
        "00:28:12",
        "00:28:14",
        "00:03:57",
        "00:03:59",
        "00:28:17",
        "00:28:19",
        "00:30:10",
        "00:30:12",
      ],
      total_count: 3,
      possible_match: "ImmutableX",
      coin_or_project: "Immutable X",
      transcript_content: [
        "immutable X becomes the first gaming is internet computer and what's crazy some of the best games in the space and they will continue to grow as gaming continues to grow my hope is that token to crack the top 10 in crypto market so this would take take a massive",
        "token to crack the top 10 in crypto about this chart is I don't think I've its all-time high which I think of as its 2023 low that my friends is a huge they will continue to grow as gaming continues to grow my hope is that immutable X becomes the first gaming gaming run but I don't think it's insane up to six figures over the last few",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:30:54",
        "00:30:56",
        "00:29:39",
        "00:29:41",
        "00:11:44",
        "00:11:46",
        "00:13:15",
        "00:13:17",
        "00:40:32",
        "00:40:34",
      ],
      total_count: 3,
      possible_match: "Gala",
      coin_or_project: "Gala",
      transcript_content: [
        "Gala there's quite a few games that are $160 that my friends is not a 100x that mental models of how I'm finding and or 90% there and so there's not a lot of here's all the pieces and as you can see Ronin has performed pretty well of about 3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton of active users right now again very few games on Ronin there's a few games on connected with beam actually launching on it subnet as well as dozens and dozens of Investments by the Merit one of the most legit trading card games will mean that focusing and distributing say is turn post notifications on on actually the first project that I'm",
        "connected with beam actually launching analyzing coins in this market which I was the most successful crypto game of fill Lino player base and so there's a different approaches here I'm not that has a lot I think to do with pixels of active users right now again very few games on Ronin there's a few games on Gala there's quite a few games that are on it subnet as well as dozens and dozens of Investments by the Merit my bets within that niche in my opinion superverse and understand that as hard LaunchPad had they burnt a ton of their you have a 75% correction and a 12x you",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:30:42",
        "00:30:44",
        "00:30:52",
        "00:30:54",
        "00:30:13",
        "00:30:15",
        "00:30:05",
        "00:30:07",
        "00:26:10",
        "00:26:12",
      ],
      total_count: 3,
      possible_match: "Ronin",
      coin_or_project: "Ronin",
      transcript_content: [
        "Ronin has performed pretty well of about and I called out axi Infiniti on community is getting so big and so many games that are coming to the immutable online which has 400,000 active users now the thing about the Ronin ecosystem is it caters largely they have a huge fill Lino player base and so there's a lot of emerging economy Dynamics going here's all the pieces and as you can see 3.4x since we covered on the channel and that has a lot I think to do with pixels online which is this game that has a ton games on Ronin there's a few games on content helps the maximum amount of attention and excitement surrounding it community is the biggest and most lot coming in 2024 that you cannot see understand the 360 view R rever gonzilla is something that probably won't last",
        "3.4x since we covered on the channel and people know about the strength of this here's all the pieces and as you can see Ronin has performed pretty well of about that has a lot I think to do with pixels online which is this game that has a ton Gala there's quite a few games that are people but again it's not a team sport and when anything succeeds in gaming the powerful in the crypto gaming space I've yellow is high that means you know you",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "medium",
      timestamps: [
        "00:37:45",
        "00:37:47",
        "00:39:39",
        "00:39:41",
        "00:33:39",
        "00:33:41",
        "00:33:42",
        "00:33:44",
        "00:33:45",
        "00:33:47",
      ],
      total_count: 3,
      possible_match: "Pixels Online",
      coin_or_project: "Pixels",
      transcript_content: [
        "ready games pixels online and I'll also strides and in my opinion their ZK Tech and you instantly have those tokens you here you all got to understand it is you created all kinds of projects one and if I'm right about this crypto cycle and dump and you want to kind of stay radar and I'm not going to talk too much you get into any new token and understand the 360 view R rever gonzilla add in Heroes of mavia here again these are all super highquality gaming projects I've invested into most of them not all of them and again I'll follow up with more information when the time is relevant but I'm making a 2024 video I want you guys to know what I'm thinking some time and grind a game and maybe end",
        "and with that said let's get to my can flip and make 20K 50k sometimes even Community member actually created a being the one which crypto gaming breaks away from them until they dump like about them cuz I don't want to create you get into any new token and understand the 360 view R rever gonzilla ready games pixels online and I'll also add in Heroes of mavia here again these relevant but I'm making a 2024 video I up earning some crazy amounts of tokens",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Gaming", "Launchpad"],
      marketcap: "small",
      timestamps: [
        "00:34:53",
        "00:34:55",
        "00:31:09",
        "00:31:11",
        "00:31:59",
        "00:32:01",
        "00:31:07",
        "00:34:50",
        "00:34:52",
      ],
      total_count: 3,
      possible_match: "Seedify",
      coin_or_project: "Cify",
      transcript_content: [
        "or Becker but like cify someone created what the point of life is because you magic of launchpads but it only works here that I have founded and I cannot neotokyo has almost certainly fulfilled gaming come to intermingle to share actually launch to the neotokyo holders in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo almost and it is very much so the place crypto gaming community members have controlled in any way by neotokyo or me a Launchpad so that citizens could get access to projects before they launch and projects often times choose to want working really hard on it but all I can not all of them and again I'll follow up covered cus in depth they're adding a maybe a 15x or an 80% correction medium",
        "a Launchpad so that citizens could get right now anything above 32,000 to me is haven't talked to your friends in months during Peak bowl season so again cify is knowledge to build to launch stuff and created all kinds of projects one controlled in any way by neotokyo or me or Becker but like cify someone created access to projects before they launch and projects often times choose to want going to put on here that's unreleased with more information when the time is this Raw video file is now almost an",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:34:10",
        "00:34:12",
        "00:32:52",
        "00:32:54",
        "00:27:48",
        "00:27:50",
        "00:03:47",
        "00:03:49",
        "00:07:55",
        "00:07:57",
      ],
      total_count: 3,
      possible_match: "PRIME",
      coin_or_project: "Prime",
      transcript_content: [
        "prices or anything like that as a know $43,000 Mark or so you know if it been absolutely ripping and this is how like immutable has like hundreds of with the channel here in 2023 you know neotokyo now this is a project that is mine obviously there are three projects here that I have founded and I cannot comment on for that reason I cannot tell you how risky they are or talk about Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the crypto gaming Illuminati the networking actually launch to the neotokyo holders they have their own subnet on Avalanche on browser gameplay totally democratized I'm not bringing attention to any of",
        "Founder but what I can tell you is that gets back Above This 425 or specifically my long-term conviction bucket looks now games that are coming to the immutable mine obviously there are three projects prices or anything like that as a neotokyo has almost certainly fulfilled its highest aspiration of becoming the crypto gaming Illuminati the networking Club where the power Brokers of crypto gaming come to intermingle to share knowledge to build to launch stuff and that's why tons of projects want to in this case immutable immutable X has has succeeded in every way of becoming the fruits of those labors now to be during the Bull Run come out at I certainly certainly hope that they",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:34:13",
        "00:34:15",
        "00:03:15",
        "00:03:17",
        "00:34:00",
        "00:34:02",
        "00:35:01",
        "00:35:03",
        "00:43:11",
        "00:43:13",
      ],
      total_count: 3,
      possible_match: "Neo Tokyo",
      coin_or_project: "Neotokyo",
      transcript_content: [
        "neotokyo has almost certainly fulfilled xchain but Ronin has axi Infinity which again if we are to get this Raging Bull this has been probably the best content doing here and I hope hope they continue here that I have founded and I cannot prices or anything like that as a Founder but what I can tell you is that its highest aspiration of becoming the crypto gaming Illuminati the networking gaming come to intermingle to share actually launch to the neotokyo holders in this case immutable immutable X has recently joined literally every gaming project here is a part of neotokyo almost and it is very much so the place crypto gaming community members have or Becker but like cify someone created astronomical prices they tend to pump succeed in their mission again any game no fancy chips required and they believe didn't want to do gaming for some reason",
        "above 43 44 this dip is over right this Market launchpads will go bananas they streak I've ever been on and I only to crush it as you can see their fully prices or anything like that as a Founder but what I can tell you is that neotokyo has almost certainly fulfilled its highest aspiration of becoming the crypto gaming Illuminati the networking knowledge to build to launch stuff and created all kinds of projects one controlled in any way by neotokyo or me or Becker but like cify someone created a Launchpad so that citizens could get access to projects before they launch and projects often times choose to want and dump and you want to kind of stay succeeding is good for all of the games that the Casual gaming route is the way",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:35:56",
        "00:35:58",
        "00:35:29",
        "00:35:31",
        "00:35:17",
        "00:35:19",
        "00:35:24",
        "00:35:26",
        "00:36:43",
        "00:36:45",
      ],
      total_count: 3,
      possible_match: "SuperVerse (SUPER)",
      coin_or_project: "SuperVerse",
      transcript_content: [
        "superverse and understand that as hard 2018 to alltime high in 2021 1, 64 days I was first on avax in 2021 one I was connected with beam actually launching my bets within that niche in my opinion like this make sure that it's turned on connecting fiber between everything that been spreading the good word about ruin this reveal because we've been working really hard on it but all I can say is turn post notifications on on as you see me working on content as much LaunchPad had they burnt a ton of their you have a 75% correction and a 12x you",
        "as you see me working on content as much so cheap it's so easy and best of all it are most likely to succeed next we have you see in front of you in the crypto crypto gaming since 2018 I don't want to ruin this reveal because we've been working really hard on it but all I can say is turn post notifications on on superverse and understand that as hard to unreleased projects I want to be supply they have tons of games in their just have to understand the risk scale",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:36:32",
        "00:36:34",
        "00:35:17",
        "00:35:19",
        "00:36:14",
        "00:36:16",
        "00:36:26",
        "00:36:28",
        "00:36:52",
        "00:36:54",
      ],
      total_count: 3,
      possible_match: "Impostors",
      coin_or_project: "Imposters",
      transcript_content: [
        "imposters mainstream again these its percent draw down from alltime high are probably going to do well as opposed deserve a slot in anyone's gaming in this case immutable immutable X has the fruits of those labors now to be form of Rick Ellis I highly encourage you to watch this interview where Rick Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take projects are my primary focus and if you believe in what I'm doing then all I ask you to do is turn your notifications on lot coming in 2024 that you cannot see that you can't even imagine next this is",
        "projects are my primary focus and if you drop like 70% and still only be touching into the launch pads you can actually portfolio once again my philosophy on recently joined literally every gaming of the project that is very much so the week after week month after month year clear imposters is currently an nft form you to watch this interview where Rick web 3 gaming and his plan to take imposters mainstream again these believe in what I'm doing then all I ask you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a actually the first project that I'm researching and understanding token",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:36:32",
        "00:36:34",
        "00:36:57",
        "00:36:59",
        "00:42:02",
        "00:42:04",
        "00:16:43",
        "00:16:45",
        "00:23:33",
        "00:23:35",
      ],
      total_count: 3,
      possible_match: "Treeverse",
      coin_or_project: "Terse",
      transcript_content: [
        "imposters mainstream again these its percent draw down from alltime high are probably going to do well as opposed deserve a slot in anyone's gaming in this case immutable immutable X has the fruits of those labors now to be form of Rick Ellis I highly encourage you to watch this interview where Rick Ellis list the new head of imposters actually explains why he's so bullish on web 3 gaming and his plan to take projects are my primary focus and if you believe in what I'm doing then all I ask you to do is turn your notifications on lot coming in 2024 that you cannot see that you can't even imagine next this is",
        "projects are my primary focus and if you drop like 70% and still only be touching into the launch pads you can actually portfolio once again my philosophy on recently joined literally every gaming of the project that is very much so the week after week month after month year clear imposters is currently an nft form you to watch this interview where Rick web 3 gaming and his plan to take imposters mainstream again these believe in what I'm doing then all I ask you to do is turn your notifications on for those projects because there is a lot coming in 2024 that you cannot see and if I'm right about this crypto cycle being the one which crypto gaming breaks through to the mainstream well there's a actually the first project that I'm researching and understanding token",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:38:43",
        "00:38:45",
        "00:02:32",
        "00:02:34",
        "00:06:45",
        "00:06:47",
        "00:10:02",
        "00:10:04",
        "00:39:19",
        "00:39:21",
      ],
      total_count: 3,
      possible_match: "Treeverse",
      coin_or_project: "Rever",
      transcript_content: [
        "forever so if you're looking to spend crypto gaming community members have shrapnel is one of the hottest gaming succeed in their mission again any game is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making up to six figures over the last few months farming their big time tokens it is something that probably won't last some time and grind a game and maybe end up earning some crazy amounts of tokens I highly suggest you check out big time covered cus in depth they're adding a the risk rating for all the ones in",
        "some time and grind a game and maybe end mention you add in Bitcoin and eth you and obviously we've talked about market cap the top 10 is 13 here so it and you instantly have those tokens you here you all got to understand it is you created all kinds of projects one and if I'm right about this crypto cycle ready games pixels online and I'll also tokens they have one of the sickest succeeding is good for all of the games play an MMO RPG and players are making months farming their big time tokens it is something that probably won't last forever so if you're looking to spend up earning some crazy amounts of tokens I highly suggest you check out big time and of course we have cus again I've covered cus in depth they're adding a LaunchPad had they burnt a ton of their supply they have tons of games in their",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:23",
        "00:39:25",
        "00:37:19",
        "00:37:21",
        "00:37:22",
        "00:37:24",
        "00:37:25",
        "00:37:27",
      ],
      total_count: 3,
      possible_match: "Gunzilla",
      coin_or_project: "Gonzilla",
      transcript_content: [
        "you're seeing with gonzilla like you're now the thing about the Ronin ecosystem launches in a bull market can go the ultimate Peak is the higher risk and gaming come to intermingle to share X's since we covered them here on the no fancy chips required and they believe games are going for immersive AAA like seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not here some are going for more casual games like cus mobile games like maavia or wagi and then you also have more economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just the risk rating for all the ones in maybe a 15x or an 80% correction medium",
        "with eluvium another one that's on my in the cosmos ecosystem both of these is it caters largely they have a huge absolutely dummy High I'm talking 10 20 knowledge to build to launch stuff and radar and I'm not going to talk too much channel absolutely Smokey no jokey gains that the Casual gaming route is the way games are going for immersive AAA like you're seeing with gonzilla like you're seeing with shrapnel like you're seeing list for 2024 I don't know why it's not here some are going for more casual economic games like you saw out of axi right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you just have to understand the risk scale",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:45",
        "00:37:47",
        "00:09:39",
        "00:09:41",
        "00:37:28",
        "00:37:30",
        "00:37:31",
        "00:37:33",
        "00:37:34",
        "00:37:36",
      ],
      total_count: 3,
      possible_match: "Ready Games",
      coin_or_project: "Ready Games",
      transcript_content: [
        "ready games pixels online and I'll also strides and in my opinion their ZK Tech and you instantly have those tokens you here you all got to understand it is you created all kinds of projects one and if I'm right about this crypto cycle and dump and you want to kind of stay radar and I'm not going to talk too much you get into any new token and understand the 360 view R rever gonzilla add in Heroes of mavia here again these are all super highquality gaming projects I've invested into most of them not all of them and again I'll follow up with more information when the time is relevant but I'm making a 2024 video I want you guys to know what I'm thinking some time and grind a game and maybe end",
        "and with that said let's get to my can flip and make 20K 50k sometimes even Community member actually created a being the one which crypto gaming breaks away from them until they dump like about them cuz I don't want to create you get into any new token and understand the 360 view R rever gonzilla ready games pixels online and I'll also add in Heroes of mavia here again these relevant but I'm making a 2024 video I up earning some crazy amounts of tokens",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:48",
        "00:37:50",
        "00:37:37",
        "00:37:39",
        "00:37:40",
        "00:37:42",
        "00:37:43",
        "00:37:45",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Heroes of Mavia",
      transcript_content: [
        "add in Heroes of mavia here again these has started to become best-in-class and price is reflected you can think of this online which is this game that has a ton and you alone out there in the crypto love so that's why I'm hyperfocused on Launchpad again this is not owned or crypto gaming since 2018 I don't want to to be buying these projects right out of any artificial hype about them but I you get into any new token and understand the 360 view R rever gonzilla ready games pixels online and I'll also a 90% correction this is big big risk",
        "are all super highquality gaming really next gen so it's something to as 0.0043 or something like that so of active users right now again very few more in single days and that is the markets once you choose to buy some gaming because as a niche I'm convinced whole lot in store for these projects release is totally damaging to the project and you do not if you're not one of the early investors you do not want to be buying these projects right out of the gate almost all new token projects just want you to know that these are you get into any new token and projects I've invested into most of them not all of them and again I'll follow up with more information when the time is relevant but I'm making a 2024 video I want you guys to know what I'm thinking",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:38:03",
        "00:38:05",
        "00:39:24",
        "00:39:26",
        "00:38:00",
        "00:38:02",
        "00:37:46",
        "00:37:48",
        "00:37:49",
        "00:37:51",
      ],
      total_count: 3,
      possible_match: "Shrapnel",
      coin_or_project: "Shrapnel",
      transcript_content: [
        "shrapnel is one of the hottest gaming was Bitcoin went about 3x over its prior to keep your eyes on and I have no about 2.1x since we called it here on here that I have founded and I cannot these holders these Diamond hands these about for 2024 next we have shrapnel tokens they have one of the sickest looking games they're competing in the Big Show which is firstperson Shooters succeed in their mission again any game is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making up to six figures over the last few forever so if you're looking to spend covered cus in depth they're adding a X's since we covered them here on the",
        "tokens they have one of the sickest reason to believe that polygon won't the channel Ronin again similar to Gala gaming coin which we hope hope breaks power Brokers to be a part of their about for 2024 next we have shrapnel shrapnel is one of the hottest gaming looking games they're competing in the Big Show which is firstperson Shooters succeeding is good for all of the games play an MMO RPG and players are making some time and grind a game and maybe end and of course we have cus again I've covered cus in depth they're adding a LaunchPad had they burnt a ton of their supply they have tons of games in their channel absolutely Smokey no jokey gains",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:38:22",
        "00:38:24",
        "00:38:26",
        "00:38:28",
        "00:38:40",
        "00:38:42",
        "00:38:29",
        "00:38:31",
      ],
      total_count: 3,
      possible_match: "BIGTIME",
      coin_or_project: "Big Time",
      transcript_content: [
        "next big time again I never put calls on huge bags of both of these tokens and I less than 30% of their token circulating form of Rick Ellis I highly encourage release but I will for your I certainly certainly hope that they trapal big time so I just have na here but again big time and trapnel are two of the best looking games in the industry right now big time is one that is something that probably won't last and of course we have cus again I've",
        "trapal big time so I just have na here here of total three which went from insane next one up is injective and in so it really is a tiny uh circulating Bell notification on for superverse just you to watch this interview where Rick understanding just put these on your next big time again I never put calls on but again big time and trapnel are two of the best looking games in the industry right now big time is one that months farming their big time tokens it is something that probably won't last forever so if you're looking to spend some time and grind a game and maybe end up earning some crazy amounts of tokens I highly suggest you check out big time seeing with shrapnel like you're seeing",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:38:03",
        "00:38:05",
        "00:39:24",
        "00:39:26",
        "00:38:26",
        "00:38:28",
        "00:38:24",
        "00:38:04",
        "00:38:06",
      ],
      total_count: 3,
      possible_match: "Shrapnel",
      coin_or_project: "Trapnel",
      transcript_content: [
        "shrapnel is one of the hottest gaming was Bitcoin went about 3x over its prior to keep your eyes on and I have no about 2.1x since we called it here on here that I have founded and I cannot these holders these Diamond hands these about for 2024 next we have shrapnel tokens they have one of the sickest looking games they're competing in the Big Show which is firstperson Shooters succeed in their mission again any game is very interesting because if you're actually farming within the game you can play an MMO RPG and players are making up to six figures over the last few forever so if you're looking to spend covered cus in depth they're adding a X's since we covered them here on the",
        "tokens they have one of the sickest reason to believe that polygon won't the channel Ronin again similar to Gala gaming coin which we hope hope breaks power Brokers to be a part of their about for 2024 next we have shrapnel shrapnel is one of the hottest gaming looking games they're competing in the Big Show which is firstperson Shooters succeeding is good for all of the games play an MMO RPG and players are making some time and grind a game and maybe end and of course we have cus again I've covered cus in depth they're adding a LaunchPad had they burnt a ton of their supply they have tons of games in their channel absolutely Smokey no jokey gains",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:25",
        "00:39:27",
        "00:38:13",
        "00:38:15",
        "00:38:16",
        "00:38:18",
        "00:38:19",
        "00:38:21",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Eluvium",
      transcript_content: [
        "with eluvium another one that's on my in the cosmos ecosystem both of these is it caters largely they have a huge absolutely dummy High I'm talking 10 20 knowledge to build to launch stuff and radar and I'm not going to talk too much channel absolutely Smokey no jokey gains that the Casual gaming route is the way games are going for immersive AAA like you're seeing with gonzilla like you're seeing with shrapnel like you're seeing list for 2024 I don't know why it's not here some are going for more casual economic games like you saw out of axi right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you just have to understand the risk scale",
        "list for 2024 I don't know why it's not but I'm going to give you a general idea are they are their own layer ones and amount of people excited about this about them cuz I don't want to create to onboard billions of users again games are going for immersive AAA like you're seeing with gonzilla like you're seeing with shrapnel like you're seeing with eluvium another one that's on my here some are going for more casual Infiniti and you're seeing the same",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 8,
      category: ["Gaming"],
      marketcap: "small",
      timestamps: [
        "00:42:22",
        "00:42:24",
        "00:38:53",
        "00:38:55",
        "00:41:42",
        "00:41:44",
        "00:39:31",
        "00:39:33",
        "00:33:54",
        "00:33:56",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Cus",
      transcript_content: [
        "focuses going forward there's also a bit it goes on a four-year cycle it has interest and excitement and drama that potentially become massive massive tensor that's kind of like the leading one I don't have a big bag of it because it literally doesn't know how to dip it's just been going absolutely bananas that if cool apps start launching on top something extra there's dexes like dydx an early investor into called Prisma I transformative place to be and I'm",
        "tensor that's kind of like the leading three good years and then one terrible will continue driving crazy amounts of potentially become massive massive focuses going forward there's also a bit one I don't have a big bag of it because it literally doesn't know how to dip it's just been going absolutely bananas of benser the tow token that could be believe they'll continue to crush it and if I were to say so it's my favorite AI coin I don't have a ton of AI coins but I do believe Ai and gaming will be the driving narratives of this bull run okay I could see Americans getting personally think Prisma will have a excited to continue to show you the",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:37:48",
        "00:37:50",
        "00:38:31",
        "00:38:33",
        "00:38:34",
        "00:38:36",
        "00:38:37",
        "00:38:39",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Mavia",
      transcript_content: [
        "add in Heroes of mavia here again these has started to become best-in-class and price is reflected you can think of this online which is this game that has a ton and you alone out there in the crypto love so that's why I'm hyperfocused on Launchpad again this is not owned or crypto gaming since 2018 I don't want to to be buying these projects right out of any artificial hype about them but I you get into any new token and understand the 360 view R rever gonzilla ready games pixels online and I'll also a 90% correction this is big big risk",
        "are all super highquality gaming really next gen so it's something to as 0.0043 or something like that so of active users right now again very few more in single days and that is the markets once you choose to buy some gaming because as a niche I'm convinced whole lot in store for these projects release is totally damaging to the project and you do not if you're not one of the early investors you do not want to be buying these projects right out of the gate almost all new token projects just want you to know that these are you get into any new token and projects I've invested into most of them not all of them and again I'll follow up with more information when the time is relevant but I'm making a 2024 video I want you guys to know what I'm thinking",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 7,
      category: ["Gaming"],
      marketcap: "micro",
      timestamps: [
        "00:39:33",
        "00:39:35",
        "00:31:53",
        "00:31:55",
        "00:38:40",
        "00:38:42",
        "00:38:43",
        "00:38:45",
        "00:38:46",
        "00:38:48",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "Wagi",
      transcript_content: [
        "or wagi and then you also have more and totally unique way to approach of the bull market and so if you get to at the end of a cycle when most coins I think are ones you should be actually farming within the game you can X's since we covered them here on the no fancy chips required and they believe you're seeing with gonzilla like you're games like cus mobile games like maavia economic games like you saw out of axi Infiniti and you're seeing the same thing out of pixels online next I'm just the risk rating for all the ones in maybe a 15x or an 80% correction medium",
        "economic games like you saw out of axi this is going to be an absolutely gaming and again there's a lot of play an MMO RPG and players are making channel absolutely Smokey no jokey gains that the Casual gaming route is the way with eluvium another one that's on my games like cus mobile games like maavia or wagi and then you also have more Infiniti and you're seeing the same thing out of pixels online next I'm just right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you just have to understand the risk scale",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 7,
      category: ["Meme coins"],
      marketcap: "medium",
      timestamps: [
        "00:41:32",
        "00:41:34",
        "00:02:57",
        "00:02:59",
        "00:38:49",
        "00:38:51",
        "00:38:52",
        "00:38:54",
        "00:38:55",
        "00:38:57",
      ],
      total_count: 3,
      possible_match: "Pepe",
      coin_or_project: "Pepe",
      transcript_content: [
        "that are not goated like Pepe and Bon that's literally more than 100x it's n salana ecosystem is absolutely on fire seek medical help degenerate this is you gains from buying literal abysmal meme want to see when they create their leading meme coins if you're early to those you could maybe ride on a real rocket ride here and so that's the dgen next level stuff is buying meme coins those ones are so absurdly risky it's not even worth discussing here you really you really just need help you need help you need Jesus next we have main focus here is aosh I have my own that if cool apps start launching on top project that could hit 100 eth plus I",
        "those ones are so absurdly risky it's it's over 99% down from its all-time into the launch pads you can actually need to see a doctor okay you need to next level stuff is buying meme coins that are not goated like Pepe and Bon not even worth discussing here you really you really just need help you need help you need Jesus next we have the AI Niche and I'm telling you guys my main focus here is aosh I have my own validator on aosh so you can delegate to it it's called ELO trades new go ahead and delegate towards it I think AOS is of benser the tow token that could be think pudgy Penguins would be that crazy",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["Meme coins"],
      marketcap: "small",
      timestamps: [
        "00:40:23",
        "00:40:25",
        "00:38:58",
        "00:39:00",
        "00:39:01",
        "00:39:03",
        "00:39:04",
        "00:39:06",
      ],
      total_count: 3,
      possible_match: "Bonk",
      coin_or_project: "Bon",
      transcript_content: [
        "Bon and since I said that Bon has gone hope will be a life-changing amount of 16% APR so you stake you get some now the thing about the Ronin ecosystem speaking of the memes I told you I only have two meme positions that is Pepe and on such a ripper it's up 3.1 6X and rumor has it it's going to get listed on coinbase again this is proof that the salana ecosystem is absolutely on fire okay absolutely on fire heepe I still think is the Daner meme by so many a Dogecoin moment at some point in the noses up at gains here not after a leading meme coins if you're early to think his vision is going to take him",
        "on such a ripper it's up 3.1 6X and money but it's time to get real here and all to you for free and I'm trying to Celestial rewards and then you get some is it caters largely they have a huge with a webcam and this bright light and speaking of the memes I told you I only have two meme positions that is Pepe and Bon and since I said that Bon has gone rumor has it it's going to get listed on okay absolutely on fire heepe I still future I don't know I could be wrong it's up right it's up we don't turn our noses up at gains here not after a three-year bare Market we do not turn our noses up at gains even small gains now the other thing that is a strategy those you could maybe ride on a real one I don't have a big bag of it because somewhere crazy so if there's a next nft",
      ],
    },
    {
      valid: false,
      action: "DELETE",
      rpoints: 9,
      category: ["AI"],
      marketcap: "medium",
      timestamps: [
        "00:39:07",
        "00:39:09",
        "00:39:10",
        "00:39:12",
        "00:39:13",
        "00:39:15",
      ],
      total_count: 3,
      possible_match: "none",
      coin_or_project: "AIOZ",
      transcript_content: [
        "they were really bad they were terrible first to overcome your prior highs in like that again understanding that into the top 10 next we have cify as you opinion this could be one of the highest projects and that's why neotokyo has ecosystem and they are up almost 10 full X's since we covered them here on the channel absolutely Smokey no jokey gains here out of cus their goal is to focus to onboard billions of users again list for 2024 I don't know why it's not Infiniti and you're seeing the same",
        "I am not taking advice from you guys the new cycle and this chart is know cify is a Launchpad these trades if you guys have been rocking performing gaming tokens of the cycle been so successful is it is an far more effort orders of magnitude more the gate almost all new token projects ecosystem and they are up almost 10 full X's since we covered them here on the channel absolutely Smokey no jokey gains here out of cus their goal is to focus everyone has their own strategy some here some are going for more casual thing out of pixels online next I'm just",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 9,
      category: ["AI"],
      marketcap: "medium",
      timestamps: [
        "00:39:16",
        "00:39:18",
        "00:39:19",
        "00:39:21",
        "00:39:22",
        "00:39:24",
      ],
      total_count: 3,
      possible_match: "Bittensor (TAO)",
      coin_or_project: "Bittensor",
      transcript_content: [
        "not working anyway back to the show all was the most successful crypto game of its highest aspiration of becoming the on browser gameplay totally democratized no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again everyone has their own strategy some could have a 20 to 50x but you could see you have a 75% correction and a 12x you",
        "right let's get into it this is going to all time and they also have now pixels crypto gaming Illuminati the networking here out of cus their goal is to focus on browser gameplay totally democratized no fancy chips required and they believe that the Casual gaming route is the way to onboard billions of users again everyone has their own strategy some a 90% correction this is big big risk just have to understand the risk scale",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "large",
      timestamps: [
        "00:43:01",
        "00:43:03",
        "00:39:25",
        "00:39:27",
        "00:39:28",
        "00:39:30",
        "00:39:31",
        "00:39:33",
      ],
      total_count: 3,
      possible_match: "DyDx (DYDX)",
      coin_or_project: "dYdX",
      transcript_content: [
        "decentralized Futures like dydx could create more liquidity and form a bottom muted rewards we're not talking about let Americans on anymore so become interesting again it doesn't pump very hard but I think their new version of their protocol which shares fees is quite interesting for me the nft play besides obviously neotokyo and imposters the nft play that is most likely to pull a board ape this cycle is pudgy penguins and that's because lucanet the CEO is an absolute Beast I'm a friend of his and I recently previewed this pudgy World game project which to me is giga bullish value for this 2024 portfolio overview",
        "I think the bleed is over and it's time 100 X's here like if Celestia goes 100x let Americans on anymore so decentralized Futures like dydx could become interesting again it doesn't pump very hard but I think their new version of their protocol which shares fees is quite interesting for me the nft play think his vision is going to take him project that could hit 100 eth plus I think pudgy Penguins would be that crazy one again they've traded as low as 4 eth this year they're up quite a bit but concept which to me screams that they're",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["NFT"],
      marketcap: "medium",
      timestamps: [
        "00:43:34",
        "00:43:36",
        "00:43:27",
        "00:43:29",
        "00:43:16",
        "00:43:18",
        "00:40:17",
        "00:40:19",
        "00:39:34",
        "00:39:36",
      ],
      total_count: 3,
      possible_match: "Pudgy Penguins",
      coin_or_project: "Pudgy Penguins",
      transcript_content: [
        "think pudgy Penguins would be that crazy to go back up or at least you have a portfolio once again my philosophy on those ones are so absurdly risky it's of benser the tow token that could be become interesting again it doesn't pump the nft play that is most likely to pull project that could hit 100 eth plus I one again they've traded as low as 4 eth this year they're up quite a bit but they just keep delivering and they recently previewed this pudgy World concept which to me screams that they're making a video game and that they will transition from being a consumer packaged Goods project to being a video cuz gaming to me is the thing I believe",
        "one again they've traded as low as 4 eth good idea that the trend will continue gaming is that it will eventually create a board ape this cycle is pudgy penguins project that could hit 100 eth plus I think pudgy Penguins would be that crazy this year they're up quite a bit but",
      ],
    },
    {
      valid: true,
      action: "NO ACTION",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "small",
      timestamps: [
        "00:44:24",
        "00:44:26",
        "00:44:22",
        "00:39:43",
        "00:39:45",
        "00:39:46",
        "00:39:48",
        "00:39:49",
        "00:39:51",
      ],
      total_count: 3,
      possible_match: "Prisma",
      coin_or_project: "Prisma",
      transcript_content: [
        "personally think Prisma will have a want you don't want to just be chasing general plan I'm going to try to stick tensor that's kind of like the leading whenever they get hot you'll see the or you didn't want to do AI you wanted finally two D5 plays one of which I was an early investor into called Prisma I really nice future again I'm an early investor I plan to hold those tokens for additional yield on top very interesting project as well as Rune which allows you to do onchain swaps between things like ethereum and Bitcoin I think Rune is kind of in its own category so Prisma excited to continue to show you the",
        "really nice future again I'm an early when things are up up and away that to my plan as much as I can it's also coins within those ecosystems get hot to play in specific ecosystems this is finally two D5 plays one of which I was an early investor into called Prisma I personally think Prisma will have a investor I plan to hold those tokens for light throughout this journey if I",
      ],
    },
    {
      valid: false,
      action: "UPDATE",
      rpoints: 8,
      category: ["DeFi"],
      marketcap: "medium",
      timestamps: [
        "00:39:52",
        "00:39:54",
        "00:39:55",
        "00:39:57",
        "00:39:58",
        "00:40:00",
      ],
      total_count: 3,
      possible_match: "RUNE",
      coin_or_project: "THORChain",
      transcript_content: [
        "obviously we talked about it here at back up if they are to make it back up games on Ronin there's a few games on coins next we got Prime again this is it's going to succeed and its success that you can't even imagine next this is and of course we have cus again I've games are going for immersive AAA like you're seeing with gonzilla like you're seeing with shrapnel like you're seeing with eluvium another one that's on my list for 2024 I don't know why it's not here some are going for more casual right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you just have to understand the risk scale",
        "one where we started doing this was 185k Gala there's quite a few games that are one of the most legit trading card games will mean that focusing and distributing say is turn post notifications on on actually the first project that I'm seeing with shrapnel like you're seeing going to be real this risk rating again the risk rating for all the ones in yellow is high that means you know you could have a 20 to 50x but you could see a 90% correction this is big big risk right the medium highs you're seeing maybe a 15x or an 80% correction medium you have a 75% correction and a 12x you just have to understand the risk scale",
      ],
    },
  ],
  total_count: 129,
  total_rpoints: 325,
};
const transcript = `# tactiq.io free youtube transcript
# 38 CRYPTO COINS THAT WILL MAKE MILLIONAIRES IN 2024!! (Last Chance)
# https://www.youtube.com/watch/openhM5Gurs

00:00:00.160 it's time for my most important video of
00:00:02.440 the year or potentially my most
00:00:04.480 important video for the next four years
00:00:06.839 and that's because today I'm going to be
00:00:08.360 giving you a complete overview of my
00:00:11.120 portfolio for 2024 I'm going to be
00:00:13.920 explaining to you why I'm buying what
00:00:16.000 I'm buying the odds that I see of this
00:00:18.600 bet working out and of course my plan to
00:00:21.640 eventually sell these assets for what I
00:00:23.640 hope will be a life-changing amount of
00:00:25.439 money but it's time to get real here and
00:00:28.039 talk about the brass tax I'm going to be
00:00:30.000 going into the hot narratives gaming AI
00:00:32.960 layer ones and helping you pull apart
00:00:35.280 and understand exactly why I believe
00:00:38.120 these projects are going to win now in
00:00:40.120 December of 2020 I did a similar video
00:00:42.840 and I called out axi Infiniti on
00:00:45.399 December 7th 2020 the price of axi
00:00:48.120 Infiniti was about
00:00:50.120 55 and it went on to Peak here at
00:00:54.199 $160 that my friends is not a 100x that
00:00:57.120 is a
00:00:58.039 300X now beyond that you you know that
00:01:00.559 I've called some of the absolute biggest
00:01:02.640 most face melting gainers of 2023 a year
00:01:06.360 in which most people told us that
00:01:08.320 Bitcoin and all of crypto was going to
00:01:10.320 zero Bitcoin will go to zero and we
00:01:13.479 proved them wrong in fact I do believe
00:01:15.720 that this channel has nailed it more so
00:01:17.799 than almost any other in the entire
00:01:19.640 crypto space but it's time to get real
00:01:21.920 all of this crypto stuff is a massive
00:01:24.400 risk that's why there's the potential
00:01:26.880 upside for literally life-changing gains
00:01:29.280 in the short amount of time when you
00:01:31.360 compare it to any other industry that
00:01:33.159 also means you got to be prepared for
00:01:35.200 that downside even the best projects in
00:01:37.479 this space could crash 70 80 90% in fact
00:01:41.399 some of these projects are so degenerate
00:01:43.159 that you must seek medical help if you
00:01:45.280 want to actually buy them literally the
00:01:47.119 only way you'll be able to view yourself
00:01:48.680 if you lose money here is with clown
00:01:50.799 makeup and a wig so if we're going to do
00:01:52.759 this crypto thing you got to put on your
00:01:54.479 big boy pants you got to take
00:01:56.200 responsibility for each and every coin
00:01:58.520 you buy and most important importantly
00:02:00.119 you have to have a plan why are you
00:02:01.880 buying it what do you believe the
00:02:03.200 valuation for this asset could be and
00:02:05.880 when at what price points will you sell
00:02:08.318 this thing because if you can't answer
00:02:10.000 those questions you are forever going to
00:02:12.040 be fish food to the sharks swimming
00:02:14.239 around you in the crypto waterers now
00:02:16.480 let's talk about the first thing which
00:02:17.920 is why right now is actually really good
00:02:20.400 timing now Bitcoin does this thing where
00:02:22.239 it goes on a four-year cycle it has
00:02:24.280 three good years and then one terrible
00:02:26.000 year the problem is that most people get
00:02:27.840 in when Bitcoin is at the Apex of that
00:02:30.440 one candle they get in at the top when
00:02:32.319 everybody's screaming about crypto how
00:02:34.360 they made all this money Dogecoin
00:02:36.040 Millionaires and so on and so forth the
00:02:38.280 higher Bitcoin and crypto goes in price
00:02:40.159 the more dangerous it is that it could
00:02:42.000 drop in price of course if you flip that
00:02:44.000 around the lower it goes the safer it is
00:02:46.560 to buy and the more likely you are to
00:02:48.159 get the good price close to the bottom
00:02:50.239 and that's why we were buying as soon as
00:02:52.159 we saw some good indications out of the
00:02:54.159 FED when they stepped in and started
00:02:55.879 saving banks in March that's when we
00:02:57.879 hopped in here and said hey look I think
00:02:59.800 think that these bailouts are going to
00:03:01.400 create more liquidity and form a bottom
00:03:03.799 I think the bleed is over and it's time
00:03:05.280 to start allocating even though it feels
00:03:06.920 uncomfortable and it will feel
00:03:08.879 uncomfortable even in these bull runs
00:03:11.080 there are crazy dips as my buddy Alex
00:03:13.720 Becker would say my co-founder in
00:03:15.319 neotokyo this is a chart you're going to
00:03:17.159 see everywhere where you see the massive
00:03:19.360 sell-offs that happened all the way up
00:03:21.400 during the 2017 rally the fact is that
00:03:24.000 bull runs are actually the time to buy
00:03:26.239 the dip bare markets are where you sell
00:03:28.879 the rally if you think about it the
00:03:30.560 overall trend is up so you want to buy
00:03:32.760 as it comes down cuz you know it's going
00:03:34.519 to go back up or at least you have a
00:03:36.120 good idea that the trend will continue
00:03:38.680 remember the trend is your friend and
00:03:40.640 the same is true of the bare Market
00:03:42.120 while things are macro going down you
00:03:44.040 want to sell them as they rally up cuz
00:03:45.760 that's your chance to get out at a good
00:03:47.560 price now I wanted to add in here that
00:03:50.200 Bitcoin is now in a dip and the whole
00:03:52.519 Market has pretty much taken a massive
00:03:54.599 dip well not every coin of course beam
00:03:57.360 and immutable X are still crushing it
00:03:59.120 but you you know most of the coins here
00:04:01.079 have taken a bit of a dip there's plenty
00:04:02.760 of coins in the red here over the last
00:04:04.319 few days and honestly it's kind of
00:04:06.159 popping up right now so you know it's at
00:04:07.879 42,000 if it gets back above this you
00:04:10.120 know $43,000 Mark or so you know if it
00:04:12.400 gets back Above This 425 or specifically
00:04:15.319 above 43 44 this dip is over right this
00:04:18.320 is going to to new highs for the year
00:04:20.399 what I want to impress upon you is this
00:04:22.280 dips are effectively the thing that you
00:04:24.280 want you don't want to just be chasing
00:04:26.199 when things are up up and away that
00:04:27.800 might feel like the best time to invest
00:04:29.800 it certainly is the most exciting but
00:04:31.479 what you really want to wait for are the
00:04:33.120 times that it's not exciting again so if
00:04:35.320 this dip gets worse goes down into the
00:04:37.160 30s or so maybe even the low3s that
00:04:40.240 would not be the end of times now it
00:04:42.320 would be very concerning if we go below
00:04:44.320 you know 31,000 or 32,000 that is a very
00:04:47.479 sensitive area and might signal a much
00:04:50.320 more difficult time for Bitcoin ahead
00:04:52.680 really all of crypto but in the case of
00:04:55.000 right now anything above 32,000 to me is
00:04:58.240 a massive massive opportunity if it
00:05:00.639 comes down and the more uncomfortable it
00:05:02.759 gets the more the Bears come out of
00:05:04.360 their caves and start screaming it was
00:05:06.280 all a dream this was the biggest bull
00:05:08.039 trap in the history of the world well
00:05:10.199 that to me my friends is the time that
00:05:11.919 all be looking to smash the buy button
00:05:14.039 but again I'm not doing too much right
00:05:15.440 now I've been buying throughout 2023 and
00:05:17.680 so I'm pretty well positioned here
00:05:19.039 coming into 2024 but I hope this video
00:05:21.400 helps you out a lot and back to the
00:05:23.039 analysis so the point is right now we
00:05:25.080 are still in this three candle which is
00:05:27.080 right before the two most parabolic
00:05:29.000 years the two best years of the Bitcoin
00:05:31.440 cycle that is if the cycle is to
00:05:33.520 continue to play out the way it worked
00:05:35.199 before now a lot of people don't believe
00:05:36.840 in this cycle stuff but get this you
00:05:39.199 want to see something crazy from the
00:05:40.880 all-time low in 2015 to the all-time
00:05:43.680 high in 2017 it was exactly
00:05:46.520 1,64 days from the all-time high in 2017
00:05:50.039 to the all-time low in 2018 it was
00:05:52.560 exactly 364 days from all-time low in
00:05:56.319 2018 to alltime high in 2021 1, 64 days
00:06:00.880 again exactly the time from low to high
00:06:04.520 and then once again from all-time high
00:06:06.639 in November of 2021 to alltime low in
00:06:09.400 November of 2022
00:06:12.360 364 days honestly some things are
00:06:15.599 Stranger Than Fiction and Bitcoin very
00:06:17.960 well might be one of those maybe we're
00:06:19.880 all in a simulation maybe this is all
00:06:21.520 some collective delusion maybe there are
00:06:23.599 no coins at all what I do know is that
00:06:25.919 as long as this Bitcoin cycle continues
00:06:27.680 to show itself and prove itself out as
00:06:30.199 it has once again in 2023 I feel like I
00:06:33.479 would be a damn fool not to bet hard on
00:06:37.120 the industry that I log into and talk
00:06:39.680 about and obsess over every single day
00:06:41.800 so that's what I'm doing but make no
00:06:43.680 mistake this is risky business and
00:06:45.840 everything you buy into could be
00:06:47.560 manipulated crash the founders could end
00:06:49.759 up not being honorable or doing the
00:06:51.599 right thing the code could get hacked
00:06:53.680 stuff is very very risky and you assume
00:06:56.599 a 70 to 100% loss whenever you buy
00:06:59.840 anything in this crypto space the
00:07:02.039 trade-off here is you're trading a 70%
00:07:04.360 downside for a potential thousand or
00:07:07.280 10,000% upside that's 10 to 100x upside
00:07:11.160 versus a near total loss those are
00:07:13.400 better odds than you're going to get in
00:07:14.560 Vegas almost any day of the week and for
00:07:16.319 that reason I'm all in on crypto
00:07:18.319 gambling to make my life better and if
00:07:20.319 you're here in crypto right now watching
00:07:21.680 a video like this you need to slam down
00:07:23.879 some hard to swallow pills and
00:07:25.440 understand that you're gambling too well
00:07:27.120 to be fair we all need to gamble that's
00:07:29.080 what the Fiat system forces us to do cuz
00:07:31.240 your money turns to dust in your wallet
00:07:33.319 your labor is not worth anything anymore
00:07:35.199 we need to gamble in stocks in real
00:07:37.000 estate in assets of some kind if you
00:07:39.479 want to get ahead and to me crypto is
00:07:41.599 the one that I know and it's the one
00:07:42.879 that I think is the most generous and
00:07:44.319 most likely to help people Achieve
00:07:46.080 Financial Freedom so I'm gambling here
00:07:47.960 and with that said let's get to my
00:07:49.199 portfolio for 2024 of course we should
00:07:51.520 add that Michael sailor the biggest bull
00:07:53.080 on Wall Street believes Bitcoin will hit
00:07:54.520 a
00:07:55.479 $350,000 price in 2024 now that would
00:07:58.360 mean that Bitcoin is about 10x from here
00:08:01.159 of course what we saw over the last one
00:08:03.560 was Bitcoin went about 3x over its prior
00:08:06.199 all-time high now if Bitcoin goes to
00:08:07.840 350k that would mean it would do a 5x
00:08:10.360 over its prior all-time high whereas
00:08:12.240 last cycle it did about a 3 and 1/2x
00:08:14.400 over its prior alltime high so it's
00:08:16.120 going way higher and that would mean
00:08:18.039 that what we'd see out of total three
00:08:19.599 meaning the altcoins would probably be
00:08:21.759 even more dramatic right we saw a gain
00:08:24.240 here of total three which went from
00:08:26.280 about 300 billion up to 1.3 trillion
00:08:30.039 this was about a 212% gain or almost a
00:08:32.880 3X out of the altcoins now if we go 50%
00:08:35.519 more that means we could see about a 4X
00:08:37.799 out of the altcoins from prior all-time
00:08:39.958 high and that would mean altcoins alone
00:08:42.200 would be at $4.5 trillion doll not to
00:08:45.040 mention you add in Bitcoin and eth you
00:08:47.200 have crypto scratching its head on
00:08:49.040 nearly $1 trillion in market value that
00:08:52.399 my friends is the size of gold and that
00:08:55.040 my friends is a whole new ball game as
00:08:57.000 they would say and as always I solicited
00:08:58.720 the community I said I'm doing my 2024
00:09:00.800 portfolio video this week what coins
00:09:02.600 should I include and I literally in a
00:09:04.560 few hours got almost 1,000 responses and
00:09:07.839 they were really bad they were terrible
00:09:09.399 I am not taking advice from you guys
00:09:11.200 ever again I don't know what you're
00:09:12.600 trying to do to me but please God stop
00:09:14.760 trying to give me Alpha because it is
00:09:16.079 not working anyway back to the show all
00:09:18.240 right let's get into it this is going to
00:09:19.800 be a complete breakdown of the 2024
00:09:22.360 portfolio and I'm not going to give you
00:09:24.160 exact percentage size of these tokens
00:09:27.000 but I'm going to give you a general idea
00:09:28.800 on how I'm organizing my portfolio as a
00:09:31.160 whole and then I'm going to give you the
00:09:32.920 actual products within each category and
00:09:35.399 this is going to be an absolutely
00:09:36.800 monstrous amount of information so get
00:09:39.560 ready smash that like button and make
00:09:41.519 sure you're subscribed with the Bell
00:09:43.279 notification on each video we've come
00:09:45.680 out with over the past few weeks I've
00:09:47.800 been trying to make sure that they are
00:09:49.120 so loaded with information that they are
00:09:51.760 effectively unmissable okay the first
00:09:54.279 one where we started doing this was 185k
00:09:56.880 views we're going to have our first
00:09:58.200 video Hit 200k K views in what feels
00:10:00.600 like years I'm sure it has been and
00:10:02.600 every single video here I've been
00:10:04.040 pouring my heart and soul into making
00:10:05.519 sure that they are jam-packed with Alpa
00:10:07.640 so make sure you put the Bell
00:10:09.600 notification on because everything I put
00:10:11.880 out on this channel going forward will
00:10:13.560 be in my opinion required viewing you
00:10:16.560 absolutely must watch this stuff if you
00:10:18.640 want to be ahead of crypto no channel is
00:10:21.360 covering these niches and these
00:10:22.920 movements like I am and I'm giving this
00:10:25.160 all to you for free and I'm trying to
00:10:27.200 make sure that I don't waste any of your
00:10:28.720 time here so hit that Bell notification
00:10:31.120 and you will be in my opinion way ahead
00:10:33.760 of everyone else but again as I go
00:10:35.680 through these coins I want to be very
00:10:37.279 clear I will explain my logic as to why
00:10:40.200 I like these coins but in the end this
00:10:42.360 community is getting so big and so many
00:10:44.440 people know about the strength of this
00:10:46.079 community that inevitably if you're
00:10:47.880 following the coins here only on this
00:10:50.000 list then you're always going to be late
00:10:52.000 I want you to take the ideas here the
00:10:54.240 mental models of how I'm finding and
00:10:56.519 analyzing coins in this market which I
00:10:58.440 explained in detail and I want you to
00:11:00.720 apply them on your own and that way you
00:11:02.279 can be ahead instead of buying a
00:11:04.200 YouTuber coin like I'm going to be
00:11:05.839 covering here it's going to allow you to
00:11:07.600 get ahead of everyone else but only if
00:11:10.000 you do these things and do the hard work
00:11:11.480 on your own with that said I hope this
00:11:13.440 information helps you now starting at
00:11:15.279 the top we have salana okay this is a
00:11:18.399 risk ranking and by the way you see my
00:11:19.760 technicolored risk ranking chart here
00:11:21.399 again this is completely made up right
00:11:23.880 I'm just trying to give you a sense here
00:11:25.200 of where the the bigger risks are uh
00:11:27.720 blue chips and the medium and the medium
00:11:29.560 highs those are just going to be lower
00:11:31.560 gains there's still a ton of risk in
00:11:33.200 those coins right everything has risk in
00:11:35.279 this industry could get sued by the
00:11:37.040 government founder could die you never
00:11:38.880 know crazy world lot of smells Anything
00:11:41.079 Could Happen okay but anyway enough of
00:11:42.720 that salana you guys know my thesis here
00:11:44.399 salana is the best competitor to
00:11:46.079 ethereum and everything in the salana
00:11:48.560 ecosystem Has Gone Bananas I started
00:11:50.920 giving you guys salana in the teens in
00:11:53.240 the low 20s and it has absolutely
00:11:55.279 crushed it it peaked I think at about
00:11:56.880 $75 um I'm just calling my ET call here
00:11:59.480 17 though I know I talked about it
00:12:01.079 around the 13 range I just think I was
00:12:02.680 more forceful around the $17 range and
00:12:04.880 so the gains so far are 321 per or 4.21
00:12:08.320 x's and the downside and this is how I'm
00:12:10.959 calculating this the downside is the
00:12:13.440 2023 low so the low value in 2023 I
00:12:17.079 don't think the market goes and revisits
00:12:18.839 those I think that's a hard bottom and
00:12:21.040 so my logic is your downside in this
00:12:23.760 category is effectively the current
00:12:25.320 value and that is divided by the or the
00:12:27.959 the 2023 low divided by the current
00:12:30.480 value and that allows you to see
00:12:32.000 effectively how low you could go if we
00:12:33.600 revisit those lows which is possible
00:12:35.639 right if there's some apocalyptic
00:12:36.959 scenario and Bitcoin just shreds through
00:12:38.720 32k and everything turns out to be a
00:12:41.480 massive bull trap and kappo was right
00:12:44.440 well I guess this is possible right we
00:12:46.199 could go revisit those 2023 lows so I'm
00:12:48.120 just showing you your max downside but
00:12:50.399 just know essentially salana has taken
00:12:51.839 on this super Blue Chip status as a
00:12:53.600 testament to that projects like gito
00:12:55.519 which are essentially like Lio or Flash
00:12:58.320 Bots in the salana ecosystem are being
00:13:00.800 valued at multi-billion dollars that's
00:13:02.839 $3 billion fdv for a project like jeto
00:13:06.079 which arguably might be seen as too much
00:13:08.560 too soon but it just shows you how
00:13:10.839 significant the salana ecosystem is that
00:13:13.079 people are valuing uh the coins in the
00:13:15.199 salana ecosystem as equal to their
00:13:17.519 ethereum counterparts and that's a
00:13:18.959 massive narrative so like I said I'll be
00:13:21.199 rotating profits from trades into salana
00:13:23.920 as part of my strategy and that is one
00:13:25.680 that I keep getting laughed at in the
00:13:26.959 YouTube comments so if you want to keep
00:13:28.480 laughing at me go ahead I appreciate it
00:13:30.720 every time I've been laughed at and
00:13:32.000 mocked for my choices that I'm making
00:13:33.920 publicly here for you all it's turned
00:13:35.839 out to be a massive Money Maker so reply
00:13:38.360 guys eat your heart out because you are
00:13:40.480 my best indicator that I'm doing
00:13:42.040 something right I know it's a hard pill
00:13:43.680 to swallow but we have a lot of coins to
00:13:45.360 get through so we are going to start
00:13:46.680 getting through them the second one is
00:13:47.800 chain link again chain link is one of
00:13:49.800 the most important protocols in the
00:13:51.560 entire space they're integrating with
00:13:53.839 swift that's right the banking Swift
00:13:56.160 they are one of the most legitimate ways
00:13:58.040 to communicate between chains and
00:14:00.279 protocols if you have dexes that are
00:14:02.360 feeding in prices well they're using an
00:14:04.680 Oracle and that is coming in through
00:14:06.360 chain link chain link is effectively
00:14:08.240 part of most if not all of Defi and it
00:14:11.560 is a blue chip by all standards again
00:14:14.399 Blue Chips they have a potential for
00:14:16.279 maybe a 10x or so from here maybe a 15x
00:14:19.720 in a very good situation but they're
00:14:22.199 also lower risk they're not going to
00:14:23.959 dump as fast they have much more
00:14:25.639 significant holder bases and chain link
00:14:27.680 is definitely a blue Blue Chip to have
00:14:29.680 on your radar it's part of my portfolio
00:14:31.720 and if you want a more passive portfolio
00:14:33.519 things like salana and chain link are
00:14:35.160 definitely in that lower crypto risk
00:14:38.160 almost guaranteed to be here for the
00:14:40.120 next several years if not on into the
00:14:41.920 future next we have coinbase as you know
00:14:43.800 I'm a big bull on coinbase stock after
00:14:46.240 the fall of CZ and FTX they are the last
00:14:48.880 man standing and they are the white
00:14:50.440 knight of crypto publicly listed on the
00:14:52.480 stock market I've been aping coinbase
00:14:54.639 like a madman since about $60 here $65
00:14:58.320 is when I covered it on the channel and
00:15:00.079 that would mean that we're about 2.1x
00:15:02.600 over my call and I keep adding to my
00:15:04.720 coinbase position just cuz it's really
00:15:06.440 easy to do for my bank I have sort of my
00:15:08.680 Fiat and crypto worlds separated and
00:15:11.199 it's a really nice easy thing to do that
00:15:12.880 I've been rotating out of my treasury
00:15:14.360 bills and into coinbase stock largely
00:15:17.160 from my treasury bills and it's been an
00:15:18.639 insane play I also think coinbase is a
00:15:21.519 blue chip in that it's not going to do
00:15:23.000 more than a 10x here in fact if it hits
00:15:25.160 $1,000 I would be kind of mind blown I
00:15:28.120 think that that's possible in like a
00:15:29.759 total blowoff top but really I'm just
00:15:31.759 hoping it makes new highs around $500 to
00:15:33.920 $1,000 at the end of the cycle in 20125
00:15:37.440 that would be a blessing and I think
00:15:39.240 that that is a peak price for coinbase
00:15:41.560 this is the only stock you're going to
00:15:42.600 see here but it trades like a crypto so
00:15:44.399 of course if you want something more
00:15:45.440 passive these are things you can just
00:15:46.880 buy and know they're going to be here
00:15:48.519 years from now and probably going to
00:15:49.720 grow with the cycle now we get into
00:15:51.160 something a little more spicy which is
00:15:52.440 Avalanche as you guys know I've been a
00:15:54.040 big Avalanche bull throughout the years
00:15:56.360 I was first on avax in 2021 one I was
00:15:59.360 one of the first YouTubers to bring avax
00:16:01.399 and the avax ecosystem coins like Joe
00:16:03.920 and some other Crazy Ones to the frame
00:16:05.600 here Joe's like the Unis swap of
00:16:07.839 avalanche again Avalanche is to me the
00:16:09.920 next in line after salana as far as
00:16:12.079 hyped layer one ecosystems and it is
00:16:14.720 slightly off of Blue Chip it's not a
00:16:16.120 blue chip it's a medium risk and just to
00:16:18.800 show you here it's been tracking
00:16:20.399 actually the gains of salana really
00:16:22.199 really well if you look here soul is
00:16:24.360 about 73% off its high Avalanche through
00:16:27.560 most of the markets about 74% off its
00:16:29.720 alltime high it was almost identical in
00:16:32.079 its percent draw down from alltime high
00:16:33.839 for the entirety of the bare market and
00:16:35.759 so these two will probably make their
00:16:37.600 way up to alltime high in a similar
00:16:39.519 fashion and if you really study the
00:16:41.440 actual movements Avalanche is a really
00:16:43.399 interesting evm Tech again the layer one
00:16:46.360 ecosystem has a ton of competition there
00:16:48.519 are so many chains now but I just think
00:16:50.519 there's some muscle memory in the charts
00:16:52.160 here because Solana Luna and avax were
00:16:54.959 like the trio of 2021 obviously Luna
00:16:57.399 nuked and doesn't really exist anymore
00:16:59.199 but salana and avac when salana makes a
00:17:01.519 really big run avac seems to want to
00:17:03.120 play catchup and look what is a medium
00:17:05.000 risk goated L1 if you don't have polygon
00:17:07.839 now polygon markets itself as a layer
00:17:09.679 two but it really kind of in practice is
00:17:11.640 a layer one though they are starting to
00:17:13.319 connect the dots here with their cdk
00:17:15.439 right so they have this chain
00:17:16.919 development kit where they effectively
00:17:18.439 allow people to launch their own ZK EVMS
00:17:21.119 now this is very next gen and it's in
00:17:23.079 fact the technology that underpins the
00:17:24.959 newest initiative from immutable X which
00:17:27.119 is of course also on this list and a
00:17:29.280 project that we'll talk about shortly
00:17:31.120 but together this is part of the
00:17:32.840 three-headed dragon of gaming and
00:17:35.320 polygon is beyond that it's also really
00:17:37.480 good Tech and I know this from my
00:17:39.120 developer friends which throughout 2021
00:17:41.559 really didn't like the technology that
00:17:43.480 underpinned polygon they've made big
00:17:45.640 strides and in my opinion their ZK Tech
00:17:48.480 has started to become best-in-class and
00:17:50.360 really next gen so it's something to
00:17:52.039 consider that polygon and their
00:17:53.720 technology keeps evolving and they're
00:17:55.600 about to evolve from the madic token to
00:17:57.679 the pole token
00:17:59.080 again showing their firm transition to
00:18:01.159 ZK rollup technology this is something
00:18:03.880 to keep your eyes on and I have no
00:18:05.360 reason to believe that polygon won't
00:18:07.400 have a massive run in 2024 with the rest
00:18:10.039 of the market again this thing went on
00:18:11.799 300X it was trading between 1 and 5
00:18:14.400 cents when I was covering it like crazy
00:18:17.080 in 2019 and 2020 and in 2021 it went on
00:18:21.039 its hallowed run up to $3 it's pretty
00:18:24.159 insane next one up is injective and in
00:18:26.240 this case you want to trust the strength
00:18:27.880 of the chart look at this this is one of
00:18:29.799 the best performing assets of the entire
00:18:32.000 market and one of the few that has
00:18:33.799 actually broken its prior all-time high
00:18:35.840 you can see its prior alltime high was
00:18:37.120 about 24 bucks here and today it is
00:18:39.480 sitting at $26 this is the way that you
00:18:42.400 understand that strength begets strength
00:18:45.000 and obviously we've talked about
00:18:46.159 injective in fact we were one of the
00:18:47.520 first people to cover injective at the
00:18:49.080 beginning of the 2021 run at the end of
00:18:51.120 2020 we covered injective at 70 I
00:18:54.000 actually participated in the early token
00:18:56.640 sale and was able to get tokens at 70
00:18:59.320 here and we rode this thing up as a
00:19:01.080 community up to $22 absolutely
00:19:03.559 astronomical but look it takes a very
00:19:05.960 special type of team to be one of the
00:19:07.440 first to overcome your prior highs in
00:19:09.159 the new cycle and this chart is
00:19:10.960 screaming that it wants to remain strong
00:19:13.120 so again injective is a defi protocol is
00:19:15.760 part of the cosmos ecosystem and you'd
00:19:17.760 be a fool to fade this kind of strength
00:19:19.640 in a new cycle next we have Celestia now
00:19:21.960 Celestia is like a nerds Paradise again
00:19:25.240 in the cosmos ecosystem both of these
00:19:27.280 are they are their own layer ones and
00:19:29.559 again I put them as medium high because
00:19:31.200 they are newer Kids on the Block they
00:19:32.640 are not as established as Avalanche they
00:19:34.320 are not as established as polygon they
00:19:36.000 do not have as many fundamentals driving
00:19:38.280 them in fact Celestia's brand new and
00:19:40.320 trading like an absolute beast but at
00:19:42.080 the same time I think Celestia's Tech is
00:19:44.360 very exciting to people and the strength
00:19:46.840 of its chart simply cannot be denied I
00:19:49.000 mean essentially it doesn't really know
00:19:50.240 how to take a dip it's absolutely crazy
00:19:52.120 obviously we talked about it here at
00:19:53.480 about four bucks I had people talking to
00:19:55.520 me about it at $2 but I missed that move
00:19:57.880 and as you you can see the strength is
00:19:59.280 just undeniable even when Bitcoin had
00:20:01.039 this dip it just exploded upwards it
00:20:03.080 shows you that there's true demand here
00:20:04.600 for Celestia some additional Alpha here
00:20:06.840 is that I'm hearing that there's going
00:20:07.960 to be a ton of Celestia airdrops so if
00:20:10.280 you're staking Celestia you'll get a ton
00:20:12.120 of these projects that are launching on
00:20:13.480 Celestia essentially giving you free
00:20:15.320 tokens air drops so if you're staking
00:20:16.960 the Tia coin then you could be eligible
00:20:19.200 for some aird drops again this is all
00:20:21.280 early Alpha but in addition they have a
00:20:23.200 16% APR so you stake you get some
00:20:25.840 Celestial rewards and then you get some
00:20:27.559 free tokens on top of it if this thing
00:20:29.559 moons like crazy it could be one of the
00:20:31.919 gigabrain plays of the cycle I'm
00:20:34.280 certainly hoping it is now the last one
00:20:36.159 is internet computer and what's crazy
00:20:38.039 about this chart is I don't think I've
00:20:39.080 seen a worst looking chart in my whole
00:20:40.679 life like it is easily the worst looking
00:20:43.200 chart of all charts however that is
00:20:45.640 actually kind of a benefit when you zoom
00:20:47.559 in you realize that almost all their
00:20:49.240 tokens are in market right they have a
00:20:51.120 total supply of 510 they have 450
00:20:53.360 circulating that's like I don't know 80
00:20:54.960 or 90% there and so there's not a lot of
00:20:57.400 inflation and this thing went through
00:20:59.080 this crazy crazy dump where effectively
00:21:01.640 everyone got mad and sold and its
00:21:03.440 reputation went down but meanwhile they
00:21:05.600 kept developing stuff and it's got this
00:21:07.600 decentralized storage play that I
00:21:10.240 actually think makes it slightly
00:21:11.720 different than other layer ones it's not
00:21:13.559 directly competing with the likes of
00:21:15.000 soul and stuff who knows anyway I have
00:21:17.480 some internet computer in my portfolio
00:21:19.480 cuz I think there's a chance and if you
00:21:20.960 see here it hasn't pumped very much its
00:21:22.720 low was like three bucks it's up at like
00:21:24.440 5.6 it's not even 2x off its lows and
00:21:27.159 get this the all time high was
00:21:29.000 $700 right it's sitting here at $5
00:21:32.279 that's literally more than 100x it's n
00:21:34.640 it's over 99% down from its all-time
00:21:37.159 high so if it does go back and tickle
00:21:38.880 its all-time high which I think of as
00:21:40.520 absolutely absurd it probably won't do
00:21:42.520 that well it's just like there's just a
00:21:44.279 lot of room for this thing to go that
00:21:45.880 these are the charts that if they get
00:21:47.200 going could mean business if they get
00:21:49.640 serious again I have a very small amount
00:21:51.279 of my portfolio but I figured it was
00:21:53.000 worth a bet in case this thing does wake
00:21:54.960 up next there's a project called monad
00:21:56.840 it is not released yet it's in my uh
00:21:59.480 unreleased and I just gave it a risk
00:22:01.320 because I don't really know what the
00:22:02.240 risk is cuz I don't know what the price
00:22:03.600 is risk is heavily correlated to price
00:22:06.400 if you don't know what the price is you
00:22:07.520 can't determine the risk but anyway this
00:22:09.440 is an upand cominging project that a lot
00:22:11.720 of people are hyped about and I would
00:22:13.559 not be shocked if this thing ends up
00:22:15.919 catching some serious hype waves if we
00:22:18.080 do get this bull run that we're all
00:22:19.559 really hoping for this is one to have on
00:22:21.559 your list definitely go ahead and follow
00:22:23.880 it the next is layer zero again this is
00:22:26.400 going to be one of the biggest coins in
00:22:27.840 the the whole ecosystem and you can
00:22:29.559 actually likely qualify for their
00:22:31.279 airdrop if you're using their Stargate
00:22:33.760 Finance defi application which allows
00:22:35.840 you to bridge assets between different
00:22:37.840 chains I highly encourage you to
00:22:40.559 understand what layer zero is as this is
00:22:42.400 likely to be one of the biggest token
00:22:43.679 launches in the whole industry coming up
00:22:45.600 soon shout out to the layer zero team
00:22:47.400 because I've actually been collaborating
00:22:48.679 with them on some other stuff again
00:22:51.039 stuff that will be announced in 2024 now
00:22:53.279 I want to be clear those are like the
00:22:54.640 big coins those are the big pieces of
00:22:56.400 tech out here that I want you to be
00:22:58.039 aware of and most of those are lowerer
00:22:59.960 risk and we'll have most likely pretty
00:23:01.919 muted rewards we're not talking about
00:23:03.919 100 X's here like if Celestia goes 100x
00:23:06.720 it would be worth like a quad zillion
00:23:08.559 dollars that's not going to happen those
00:23:09.919 are maybe 10 to 20x plays at the max but
00:23:13.600 probably some of them will be closer to
00:23:15.240 5x plays in my opinion having too much
00:23:18.120 of your crypto portfolio tied up in 5x
00:23:20.559 plays feels like a waste that's my
00:23:23.200 particular approach and to explain this
00:23:24.600 in a little more depth I'm breaking out
00:23:26.320 my portfolio breakdown which is in the
00:23:28.720 end I have a lot of money in Treasures
00:23:30.520 which I'm actually rotating quite a bit
00:23:31.720 of money out of there because I believe
00:23:33.279 interest rates have peaked and that risk
00:23:35.240 is going to be the new thing to allocate
00:23:37.039 towards that's my particular approach
00:23:39.200 but in the end I have what's called a
00:23:40.480 crypto barbell where on one side of the
00:23:42.039 barbell I have lower risk stuff stuff I
00:23:44.520 know is going to be there for a very
00:23:46.960 long time stuff like Bitcoin stuff like
00:23:49.000 coinbase stock stuff that I don't need
00:23:51.200 to wake up in the middle of the night
00:23:52.840 sweating and think has it all gone to
00:23:55.000 zero has it all just evaporated into
00:23:57.200 dust yeah yes this is the high
00:23:58.840 conviction long-term bucket and in that
00:24:01.320 high conviction long-term bucket we have
00:24:03.080 Bitcoin we have ethereum we have salana
00:24:05.240 and we have coinbase stock and that
00:24:06.919 bucket actually has been updated because
00:24:08.640 coinbase has been ripping salana has
00:24:10.559 been absolutely ripping and this is how
00:24:12.400 my long-term conviction bucket looks now
00:24:14.760 I'm actually rotating profits whenever I
00:24:16.640 do take them into salana that's my
00:24:18.400 personal approach again I might rotate
00:24:20.400 profits into some other exotic L1 if I
00:24:22.799 get really carried away but this is my
00:24:24.880 general plan I'm going to try to stick
00:24:26.240 to my plan as much as I can it's also
00:24:28.200 really important to make plans and write
00:24:29.880 them down because the emotion of the
00:24:31.240 market will carry you off into La La
00:24:33.600 Land if you let it and if you write
00:24:35.159 stuff down you can at least sober up for
00:24:37.000 a second and pull yourself out of the
00:24:39.000 Psychedelic Bull Run acid trip that has
00:24:41.760 long since left planet Earth and you're
00:24:44.120 contemplating whether a dogcoin on
00:24:46.039 butthole chain can be worth $10 trillion
00:24:48.760 because you saw a tick tocker made a Tik
00:24:50.960 Tock about it and you're just wondering
00:24:53.080 what the point of life is because you
00:24:55.000 haven't talked to your friends in months
00:24:56.440 and you stare at a screen all day
00:24:57.720 trading crypto coins that's what the
00:24:59.399 bull Run's like all right you lose your
00:25:01.399 godamn marbles so keep it together all
00:25:03.600 right keep it together and write stuff
00:25:05.399 down all right a little break from the
00:25:06.640 video here because if you're new to
00:25:07.960 crypto you need to have a VPN and that's
00:25:10.559 why I'm extremely proud to partner with
00:25:12.159 nordvpn and be one of their leading
00:25:14.720 Partners in the whole crypto space
00:25:16.399 because if you don't have a VPN you're
00:25:17.960 literally like a lamb to the slaughter
00:25:19.760 here your IP address will start showing
00:25:21.720 up on crypto sites which even though the
00:25:23.760 blockchain is secure those sites could
00:25:25.880 be compromised and your IP address
00:25:28.159 effectively you could become a Target so
00:25:31.039 you want to make sure that you avoid
00:25:32.960 that situation with a product that only
00:25:34.799 cost $3 per month but what's great is
00:25:37.240 you get a massive discount if you use my
00:25:39.360 link below again I was hacked a few
00:25:42.039 months ago and so I take cyber security
00:25:44.760 extremely seriously like I've said many
00:25:47.240 times before you can be forgiven for a
00:25:49.440 lot of mistakes in crypto a lot of them
00:25:51.320 are understandable in fact even ogs make
00:25:53.840 mistakes but one thing you will not be
00:25:55.640 forgiven for is not having a VP VN it's
00:25:58.399 so cheap it's so easy and best of all it
00:26:01.240 supports the channel and I appreciate
00:26:02.760 you guys so check out nordvpn sponsor of
00:26:04.880 today's video and let's get back to some
00:26:06.919 good old fashion cryptocoins back to the
00:26:08.880 point here I personally think that the
00:26:10.679 zero Infinity bucket is worth allocating
00:26:13.159 to now I personally think the zero
00:26:15.159 Infinity bucket has odds that in a bull
00:26:17.840 run make sense because in a bull run if
00:26:20.200 Bitcoin continues to grow usually
00:26:22.440 altcoins will continue to grow
00:26:24.720 especially early on in the bull run and
00:26:27.159 quite Frank Al the risk if Bitcoin
00:26:28.919 doesn't continue to grow is it could
00:26:30.760 drop dramatically I mean bitcoin's up 3x
00:26:33.200 on the year so I mean the thing could
00:26:34.840 drop like 70% and still only be touching
00:26:38.399 its 2023 low that my friends is a huge
00:26:41.960 amount of downside but if you're upside
00:26:44.120 is you know somewhat limited compared to
00:26:46.440 the 100x opportunities out there and
00:26:48.600 those 100x opportunities are likely to
00:26:51.200 hold and grow if Bitcoin holds and grows
00:26:53.880 then to me the crazy Bull Run logic is
00:26:56.240 you want to be allocated in some way to
00:26:58.679 these altcoins the zero Infinity bucket
00:27:00.840 knowing that it goes to zero or the damn
00:27:02.360 Moon and you're comfortable with the
00:27:04.000 odds of it doing one or the other and
00:27:06.000 you're ready for either outcome that's
00:27:07.640 where I'm at again make your own
00:27:09.159 decisions I have enough fiat currency I
00:27:11.360 have enough cash in my world that if my
00:27:13.559 crypto goes to zero I'll keep eating
00:27:15.440 I'll keep surviving and my life won't be
00:27:17.360 changed obviously it would suck ass but
00:27:20.000 I would still continue to live and
00:27:21.880 survive and pay rent a lot of people
00:27:23.720 aren't in that same boat so you have to
00:27:25.440 make the decisions based on your own
00:27:27.080 Financial decisions I'm not going to be
00:27:29.000 there to pay your rent or to feed your
00:27:31.120 kids if you can't do it you got to take
00:27:32.880 care of your own period okay so
00:27:35.600 let's get to the fun stuff okay beam
00:27:37.480 Merit Circle again they were called
00:27:39.039 Merit Circle I covered them at about 40
00:27:41.440 cents and they've shot up here to what
00:27:44.159 was the equivalent of $2 but when they
00:27:46.240 did a 1 to 100 split on beam now the
00:27:48.640 price is reflected you can think of this
00:27:50.240 as 0.0043 or something like that so
00:27:52.679 they've done about a 4.4x since I
00:27:54.480 covered them absolutely smoking those
00:27:56.760 gains and they are one of the most
00:27:58.360 important coins in the crypto gaming
00:28:00.720 space they have a ton of Investments
00:28:02.720 they have a treasury of nearly $100
00:28:04.679 million they are actively invested in
00:28:06.919 some of the best games in the space and
00:28:09.080 they are now partnered with immutable X
00:28:10.840 to bring some cool technology to the
00:28:12.919 immutable X ZK evm speaking of immutable
00:28:15.600 X they are also on this list as you know
00:28:17.720 I an immutable X seed investor I'm a
00:28:19.880 massive investor in beam and I have huge
00:28:22.760 huge bags of both of these tokens and I
00:28:25.440 am so happy to see them climbing the
00:28:27.480 ranks with absolutely Reckless abandon
00:28:29.960 here and I have no reason to doubt that
00:28:32.240 they will continue to grow as gaming
00:28:34.080 continues to grow my hope is that
00:28:36.519 immutable X becomes the first gaming
00:28:38.519 token to crack the top 10 in crypto
00:28:41.320 market caps and just for some
00:28:42.919 perspective here it's at $2.6 billion
00:28:45.399 market cap the top 10 is 13 here so it
00:28:49.279 would have to five or 6 x from here to
00:28:52.360 overcome the Doge and to me that would
00:28:54.840 have to do that you know against the
00:28:56.320 market so this would take take a massive
00:28:58.279 gaming run but I don't think it's insane
00:29:00.320 I think it might happen here and if it
00:29:02.320 does happen then that might mean that
00:29:04.399 beam becomes a top 25 coin or something
00:29:07.200 like that again understanding that
00:29:08.919 crypto is about categories niches
00:29:11.720 storylines and if one coin from a
00:29:13.559 category makes it astronomically High
00:29:15.720 the entire category will reprice under
00:29:17.919 it so the higher immutable goes that
00:29:20.080 creates a higher ceiling for the rest of
00:29:21.679 the gaming ecosystem to flourish in so
00:29:24.000 as a massive gaming bull I'm very
00:29:26.080 excited that immutable X is continuing
00:29:28.000 to crush on the way up and that to me
00:29:30.480 paves the way it blazes a trail for all
00:29:32.720 of gaming to repic under it so as you
00:29:34.840 see a mutable X make this massive run
00:29:37.200 know that it's bullish for all of gaming
00:29:39.559 that's the facts Gala as we've said they
00:29:41.799 are a publisher they have several games
00:29:43.880 and they had a massive destructive run
00:29:46.360 down from their all-time high their
00:29:47.960 all-time high was like 70 cents they're
00:29:50.039 currently at three here so on their way
00:29:52.159 back up if they are to make it back up
00:29:53.919 could do astronomical gains again their
00:29:56.159 downside is about 60% % they haven't
00:29:57.880 pumped too hard here as you can see
00:29:59.480 these other ones have pumped much harder
00:30:01.039 they're up much more significantly but
00:30:03.080 about 2.1x since we called it here on
00:30:05.679 the channel Ronin again similar to Gala
00:30:08.200 they have some games far less games here
00:30:10.279 like immutable has like hundreds of
00:30:12.000 games that are coming to the immutable
00:30:13.760 xchain but Ronin has axi Infinity which
00:30:16.240 was the most successful crypto game of
00:30:18.200 all time and they also have now pixels
00:30:20.279 online which has 400,000 active users
00:30:23.320 now the thing about the Ronin ecosystem
00:30:25.080 is it caters largely they have a huge
00:30:26.919 fill Lino player base and so there's a
00:30:29.200 lot of emerging economy Dynamics going
00:30:31.240 on there but it is a very interesting
00:30:33.159 and totally unique way to approach
00:30:35.039 gaming and again there's a lot of
00:30:36.679 different approaches here I'm not
00:30:38.279 playing gatekeeper I'm just saying
00:30:40.200 here's all the pieces and as you can see
00:30:42.039 Ronin has performed pretty well of about
00:30:44.159 3.4x since we covered on the channel and
00:30:46.399 that has a lot I think to do with pixels
00:30:48.159 online which is this game that has a ton
00:30:50.240 of active users right now again very few
00:30:52.640 games on Ronin there's a few games on
00:30:54.559 Gala there's quite a few games that are
00:30:56.159 connected with beam actually launching
00:30:57.679 on it subnet as well as dozens and
00:30:59.799 dozens of Investments by the Merit
00:31:01.840 Circle Dow and then you have a mutable X
00:31:04.080 which is kind of like the big daddy
00:31:05.240 gaming coin which we hope hope breaks
00:31:07.159 into the top 10 next we have cify as you
00:31:09.200 know cify is a Launchpad these
00:31:11.440 launchpads as the market gets super hot
00:31:13.880 again if we are to get this Raging Bull
00:31:15.480 Market launchpads will go bananas they
00:31:17.480 will go absolutely crazy because they
00:31:19.960 will give you early access to tokens
00:31:21.880 before they hit the market and token
00:31:23.559 launches in a bull market can go
00:31:25.200 absolutely dummy High I'm talking 10 20
00:31:28.840 50 100x 200x and more in the peak heat
00:31:33.279 of the bull market and so if you get
00:31:34.760 into the launch pads you can actually
00:31:36.720 buy allocations to these new projects
00:31:39.559 sometimes just 500 bucks sometimes a few
00:31:41.440 thousand doll but if things go 20x 50x
00:31:45.000 and you instantly have those tokens you
00:31:47.440 can flip and make 20K 50k sometimes even
00:31:50.760 more in single days and that is the
00:31:53.440 magic of launchpads but it only works
00:31:55.600 during Peak bowl season so again cify is
00:31:57.960 kind of the leading gaming Launchpad I
00:31:59.960 have a ton of cify tokens I cover them
00:32:02.440 first at 60 cents here and so you're
00:32:04.240 looking at almost a 6X since I covered
00:32:06.880 them again you are welcome team elot
00:32:09.720 trades if you guys have been rocking
00:32:10.799 with the channel here in 2023 you know
00:32:13.240 this has been probably the best content
00:32:15.159 streak I've ever been on and I only
00:32:17.120 intend to keep pushing harder because
00:32:19.120 getting bullish early in the cycle is
00:32:21.519 lower risk whereas getting bullish at
00:32:23.399 the ultimate Peak is the higher risk and
00:32:26.279 I personally hope I can get the most
00:32:27.559 amount of people excited about this
00:32:29.159 Market at an early stage when most coins
00:32:32.080 are probably going to do well as opposed
00:32:33.919 to at the end of a cycle when most coins
00:32:36.519 are set up to absolutely implode that is
00:32:39.919 the best way to do it and I hope this
00:32:42.080 content helps the maximum amount of
00:32:44.000 people but again it's not a team sport
00:32:45.799 here you all got to understand it is you
00:32:48.559 and you alone out there in the crypto
00:32:50.240 markets once you choose to buy some
00:32:52.120 coins next we got Prime again this is
00:32:54.639 one of the most legit trading card games
00:32:57.039 here in the space you have a $119 2023
00:33:00.279 low and uh their their current value is
00:33:02.679 almost 9 bucks these guys are backed by
00:33:04.600 a16z they're super duper legit and in my
00:33:07.760 opinion this could be one of the highest
00:33:09.799 performing gaming tokens of the cycle
00:33:11.760 I'm definitely a big fan of what they're
00:33:13.360 doing here and I hope hope they continue
00:33:15.480 to crush it as you can see their fully
00:33:17.279 diluted valuation here is almost a
00:33:19.120 billion so they only have you know small
00:33:21.080 amount of their token circulating like
00:33:22.639 less than 30% of their token circulating
00:33:24.679 so it really is a tiny uh circulating
00:33:26.760 Market market cap and there will be
00:33:28.200 token emissions here something to
00:33:29.840 consider but they are one of the most
00:33:31.279 advanced ecosystems and they definitely
00:33:32.960 deserve a slot in anyone's gaming
00:33:34.440 portfolio once again my philosophy on
00:33:36.799 gaming is that it will eventually create
00:33:39.240 mainstream hits the industry will
00:33:41.080 continue to have some of the most
00:33:42.679 attention and excitement surrounding it
00:33:44.720 and when anything succeeds in gaming the
00:33:46.840 rest of the tokens will get a lot of
00:33:48.159 love so that's why I'm hyperfocused on
00:33:50.200 gaming because as a niche I'm convinced
00:33:52.080 it's going to succeed and its success
00:33:54.360 will mean that focusing and distributing
00:33:56.159 my bets within that niche in my opinion
00:33:58.159 are most likely to succeed next we have
00:34:00.360 neotokyo now this is a project that is
00:34:02.200 mine obviously there are three projects
00:34:03.720 here that I have founded and I cannot
00:34:06.120 comment on for that reason I cannot tell
00:34:08.320 you how risky they are or talk about
00:34:10.359 prices or anything like that as a
00:34:12.199 Founder but what I can tell you is that
00:34:13.800 neotokyo has almost certainly fulfilled
00:34:16.440 its highest aspiration of becoming the
00:34:18.960 crypto gaming Illuminati the networking
00:34:21.399 Club where the power Brokers of crypto
00:34:23.480 gaming come to intermingle to share
00:34:25.800 knowledge to build to launch stuff and
00:34:28.480 that's why tons of projects want to
00:34:30.079 actually launch to the neotokyo holders
00:34:32.520 in this case immutable immutable X has
00:34:34.440 recently joined literally every gaming
00:34:36.560 project here is a part of neotokyo
00:34:38.879 almost and it is very much so the place
00:34:41.399 to be if you are a power broker in
00:34:43.359 crypto gaming community members have
00:34:45.199 created all kinds of projects one
00:34:47.359 Community member actually created a
00:34:48.918 Launchpad again this is not owned or
00:34:51.079 controlled in any way by neotokyo or me
00:34:53.079 or Becker but like cify someone created
00:34:55.839 a Launchpad so that citizens could get
00:34:57.640 access to projects before they launch
00:34:59.359 and projects often times choose to want
00:35:01.839 to come to neotokyo because they want
00:35:03.960 these holders these Diamond hands these
00:35:05.880 power Brokers to be a part of their
00:35:07.720 projects and that's why neotokyo has
00:35:09.400 been so successful is it is an
00:35:11.000 absolutely phenomenal experiment that
00:35:12.880 has succeeded in every way of becoming
00:35:14.640 the networking Club of web 3 gaming now
00:35:17.119 imposters is the game of the superverse
00:35:19.440 now I do want to be very clear the best
00:35:21.839 advice I can give you is to go put the
00:35:24.000 Bell notification on for superverse just
00:35:26.520 like this make sure that it's turned on
00:35:29.400 because superverse will be shedding its
00:35:31.440 skin and revealing an entirely new phase
00:35:34.000 of the project that is very much so the
00:35:36.000 connecting fiber between everything that
00:35:38.680 you see in front of you in the crypto
00:35:40.599 gaming space there is no doubt that this
00:35:42.640 community is the biggest and most
00:35:44.560 powerful in the crypto gaming space I've
00:35:46.839 been spreading the good word about
00:35:48.359 crypto gaming since 2018 I don't want to
00:35:51.400 ruin this reveal because we've been
00:35:53.040 working really hard on it but all I can
00:35:54.280 say is turn post notifications on on
00:35:56.079 superverse and understand that as hard
00:35:58.599 as you see me working on content as much
00:36:00.640 as you see me getting ahead of these
00:36:01.960 Trends in the industry year after year
00:36:04.400 week after week month after month year
00:36:06.359 after year cycle after cycle I'm putting
00:36:09.079 far more effort orders of magnitude more
00:36:11.200 into these projects and you'll soon see
00:36:12.839 the fruits of those labors now to be
00:36:14.520 clear imposters is currently an nft form
00:36:17.680 and the studio behind Impostors has
00:36:19.720 recently hired an absolute legend in the
00:36:22.319 form of Rick Ellis I highly encourage
00:36:24.680 you to watch this interview where Rick
00:36:26.520 Ellis list the new head of imposters
00:36:28.640 actually explains why he's so bullish on
00:36:30.640 web 3 gaming and his plan to take
00:36:32.520 imposters mainstream again these
00:36:34.359 projects are my primary focus and if you
00:36:36.720 believe in what I'm doing then all I ask
00:36:38.640 you to do is turn your notifications on
00:36:40.560 for those projects because there is a
00:36:42.440 lot coming in 2024 that you cannot see
00:36:45.000 and if I'm right about this crypto cycle
00:36:47.160 being the one which crypto gaming breaks
00:36:49.040 through to the mainstream well there's a
00:36:50.800 whole lot in store for these projects
00:36:52.200 that you can't even imagine next this is
00:36:54.280 actually the first project that I'm
00:36:55.359 going to put on here that's unreleased
00:36:57.000 this is called terse and when it comes
00:36:58.680 to unreleased projects I want to be
00:36:59.920 completely clear the hype before the
00:37:01.960 release is totally damaging to the
00:37:04.079 project and you do not if you're not one
00:37:06.200 of the early investors you do not want
00:37:08.040 to be buying these projects right out of
00:37:09.760 the gate almost all new token projects
00:37:12.000 during the Bull Run come out at
00:37:13.720 astronomical prices they tend to pump
00:37:15.960 and dump and you want to kind of stay
00:37:17.760 away from them until they dump like
00:37:19.560 crazy but again that depends on when
00:37:21.400 they come out and when the tokens
00:37:22.599 release but I will for your
00:37:24.520 understanding just put these on your
00:37:25.880 radar and I'm not going to talk too much
00:37:27.319 about them cuz I don't want to create
00:37:28.480 any artificial hype about them but I
00:37:30.520 just want you to know that these are
00:37:31.640 projects that are coming next year that
00:37:33.160 I think are ones you should be
00:37:34.200 researching and understanding token
00:37:36.400 launches are very very tumultuous and
00:37:39.040 you should definitely be careful when
00:37:40.560 you get into any new token and
00:37:42.400 understand the 360 view R rever gonzilla
00:37:45.200 ready games pixels online and I'll also
00:37:48.000 add in Heroes of mavia here again these
00:37:50.040 are all super highquality gaming
00:37:51.640 projects I've invested into most of them
00:37:53.839 not all of them and again I'll follow up
00:37:55.800 with more information when the time is
00:37:57.079 relevant but I'm making a 2024 video I
00:37:59.560 want you guys to know what I'm thinking
00:38:00.760 about for 2024 next we have shrapnel
00:38:03.200 shrapnel is one of the hottest gaming
00:38:05.040 tokens they have one of the sickest
00:38:06.800 looking games they're competing in the
00:38:08.359 Big Show which is firstperson Shooters
00:38:10.240 they have their own subnet on Avalanche
00:38:12.200 I certainly certainly hope that they
00:38:13.680 succeed in their mission again any game
00:38:15.480 succeeding is good for all of the games
00:38:17.400 and I'm very hyped on what they're doing
00:38:19.280 definitely part of my 20124 portfolio
00:38:22.200 next big time again I never put calls on
00:38:24.160 trapal big time so I just have na here
00:38:26.040 but again big time and trapnel are two
00:38:28.200 of the best looking games in the
00:38:29.640 industry right now big time is one that
00:38:31.560 is very interesting because if you're
00:38:33.440 actually farming within the game you can
00:38:35.440 play an MMO RPG and players are making
00:38:38.119 up to six figures over the last few
00:38:40.400 months farming their big time tokens it
00:38:42.599 is something that probably won't last
00:38:43.960 forever so if you're looking to spend
00:38:45.760 some time and grind a game and maybe end
00:38:47.680 up earning some crazy amounts of tokens
00:38:49.520 I highly suggest you check out big time
00:38:52.000 and of course we have cus again I've
00:38:53.920 covered cus in depth they're adding a
00:38:56.000 LaunchPad had they burnt a ton of their
00:38:58.079 supply they have tons of games in their
00:39:00.119 ecosystem and they are up almost 10 full
00:39:03.079 X's since we covered them here on the
00:39:05.040 channel absolutely Smokey no jokey gains
00:39:08.359 here out of cus their goal is to focus
00:39:10.560 on browser gameplay totally democratized
00:39:13.599 no fancy chips required and they believe
00:39:15.720 that the Casual gaming route is the way
00:39:17.160 to onboard billions of users again
00:39:19.160 everyone has their own strategy some
00:39:20.880 games are going for immersive AAA like
00:39:23.000 you're seeing with gonzilla like you're
00:39:24.240 seeing with shrapnel like you're seeing
00:39:25.640 with eluvium another one that's on my
00:39:27.560 list for 2024 I don't know why it's not
00:39:29.520 here some are going for more casual
00:39:31.040 games like cus mobile games like maavia
00:39:33.359 or wagi and then you also have more
00:39:35.680 economic games like you saw out of axi
00:39:37.640 Infiniti and you're seeing the same
00:39:39.119 thing out of pixels online next I'm just
00:39:41.200 going to be real this risk rating again
00:39:43.200 the risk rating for all the ones in
00:39:44.440 yellow is high that means you know you
00:39:46.240 could have a 20 to 50x but you could see
00:39:48.440 a 90% correction this is big big risk
00:39:51.880 right the medium highs you're seeing
00:39:53.599 maybe a 15x or an 80% correction medium
00:39:56.560 you have a 75% correction and a 12x you
00:39:58.960 just have to understand the risk scale
00:40:00.680 here and again this is not very sciency
00:40:02.839 I just literally pulled these numbers
00:40:04.119 out again this is like astrology for men
00:40:06.319 here embrace it we're just looking to
00:40:08.040 the stars but we're hoping that we get
00:40:09.599 something right I've caught a lot right
00:40:11.079 over the years it doesn't mean that I
00:40:12.720 have special powers okay I'm just a dude
00:40:15.040 with a webcam and this bright light and
00:40:17.359 a neon sign and a pudgy penguin toy okay
00:40:20.000 speaking of the memes I told you I only
00:40:21.560 have two meme positions that is Pepe and
00:40:23.400 Bon and since I said that Bon has gone
00:40:25.240 on such a ripper it's up 3.1 6X and
00:40:29.160 rumor has it it's going to get listed on
00:40:30.640 coinbase again this is proof that the
00:40:32.760 salana ecosystem is absolutely on fire
00:40:35.640 okay absolutely on fire heepe I still
00:40:38.319 think is the Daner meme by so many
00:40:40.079 orders of magnitudes hoping that the
00:40:41.599 Frog gets its legs under it and has like
00:40:43.440 a Dogecoin moment at some point in the
00:40:45.200 future I don't know I could be wrong
00:40:46.839 it's still up a bit here from where I
00:40:48.920 called it only 37% not crazy here but
00:40:51.800 it's up right it's up we don't turn our
00:40:53.520 noses up at gains here not after a
00:40:55.359 three-year bare Market we do not turn
00:40:57.280 our noses up at gains even small gains
00:40:59.240 now the other thing that is a strategy
00:41:00.680 here and this is so degenerate this is
00:41:02.520 seek medical help degenerate this is you
00:41:04.520 need to see a doctor okay you need to
00:41:07.240 see a doctor if you're doing this
00:41:09.280 there's something wrong with you but if
00:41:10.560 you do want this level of 100x 200x
00:41:12.880 gains from buying literal abysmal meme
00:41:15.280 coins then what you want to do is look
00:41:17.040 for the alternate l1s like Avalanche
00:41:19.839 like Cosmos ecosystem chains and you
00:41:21.920 want to see when they create their
00:41:23.640 leading meme coins if you're early to
00:41:25.760 those you could maybe ride on a real
00:41:27.720 rocket ride here and so that's the dgen
00:41:30.319 next level stuff is buying meme coins
00:41:32.160 that are not goated like Pepe and Bon
00:41:34.319 those ones are so absurdly risky it's
00:41:35.880 not even worth discussing here you
00:41:37.640 really you really just need help you
00:41:38.920 need help you need Jesus next we have
00:41:40.720 the AI Niche and I'm telling you guys my
00:41:42.760 main focus here is aosh I have my own
00:41:44.920 validator on aosh so you can delegate to
00:41:46.839 it it's called ELO trades new go ahead
00:41:49.160 and delegate towards it I think AOS is
00:41:51.480 doing something that almost nobody is
00:41:53.400 they're allowing for subletting of GPU
00:41:55.880 power again AI will continue to make
00:41:58.520 massive news throughout this cycle every
00:42:00.400 few months there's a new AI explosion of
00:42:02.839 interest and excitement and drama that
00:42:04.680 will continue driving crazy amounts of
00:42:06.640 attention excitement and investment into
00:42:09.440 AI cryptocoins that means that things
00:42:11.599 like AOS which allow you to lease
00:42:13.760 computing power which is the driver of
00:42:15.920 AI right now compute power is what this
00:42:18.040 is all about things like aosh will
00:42:20.400 potentially become massive massive
00:42:22.559 focuses going forward there's also a bit
00:42:24.480 tensor that's kind of like the leading
00:42:25.839 one I don't have a big bag of it because
00:42:27.480 it literally doesn't know how to dip
00:42:28.720 it's just been going absolutely bananas
00:42:30.480 it literally will not dip but I do think
00:42:32.640 that if cool apps start launching on top
00:42:34.920 of benser the tow token that could be
00:42:37.559 something to look for again aosh is
00:42:39.960 something I've been holding for years I
00:42:41.720 believe they'll continue to crush it and
00:42:43.359 if I were to say so it's my favorite AI
00:42:45.359 coin I don't have a ton of AI coins but
00:42:47.200 I do believe Ai and gaming will be the
00:42:48.880 driving narratives of this bull run
00:42:50.760 onward if you're looking for a little
00:42:52.079 something extra there's dexes like dydx
00:42:54.800 okay I could see Americans getting
00:42:56.240 frustrated not having access to Futures
00:42:58.520 Trading because none of the exchanges
00:43:00.520 let Americans on anymore so
00:43:01.880 decentralized Futures like dydx could
00:43:04.240 become interesting again it doesn't pump
00:43:05.839 very hard but I think their new version
00:43:07.359 of their protocol which shares fees is
00:43:08.880 quite interesting for me the nft play
00:43:11.680 besides obviously neotokyo and imposters
00:43:14.040 the nft play that is most likely to pull
00:43:16.359 a board ape this cycle is pudgy penguins
00:43:18.880 and that's because lucanet the CEO is an
00:43:21.480 absolute Beast I'm a friend of his and I
00:43:23.720 think his vision is going to take him
00:43:25.359 somewhere crazy so if there's a next nft
00:43:27.960 that is pudgy Penguins you're looking at
00:43:29.680 to me the only thing I see as a pfp
00:43:32.599 project that could hit 100 eth plus I
00:43:34.559 think pudgy Penguins would be that crazy
00:43:36.319 one again they've traded as low as 4 eth
00:43:38.480 this year they're up quite a bit but
00:43:40.440 they just keep delivering and they
00:43:41.839 recently previewed this pudgy World
00:43:43.599 concept which to me screams that they're
00:43:45.800 making a video game and that they will
00:43:47.720 transition from being a consumer
00:43:49.559 packaged Goods project to being a video
00:43:51.720 game project which to me is giga bullish
00:43:54.119 cuz gaming to me is the thing I believe
00:43:55.720 in the most most next if we're talking
00:43:57.240 about ways that you can enhance your
00:43:58.839 2024 portfolio you're going to want to
00:44:00.680 look at rotations this is when certain
00:44:02.520 ecosystems like salana Ava Cosmos
00:44:04.920 whenever they get hot you'll see the
00:44:06.319 coins within those ecosystems get hot
00:44:08.520 again I don't know what those coins are
00:44:10.040 I'm not bringing attention to any of
00:44:11.280 them in specific but let's just say you
00:44:13.280 didn't want to do gaming for some reason
00:44:14.920 or you didn't want to do AI you wanted
00:44:16.640 to play in specific ecosystems this is
00:44:18.920 one way to do it I'll end here with
00:44:20.440 finally two D5 plays one of which I was
00:44:22.599 an early investor into called Prisma I
00:44:24.839 personally think Prisma will have a
00:44:26.440 really nice future again I'm an early
00:44:28.400 investor I plan to hold those tokens for
00:44:30.160 a significant amount of time and see how
00:44:31.720 the project performs it's still pretty
00:44:33.760 under the radar as well this is in the
00:44:35.839 liquid staking token narrative where you
00:44:38.079 can stake your stake eth and get
00:44:40.200 additional yield on top very interesting
00:44:42.359 project as well as Rune which allows you
00:44:44.000 to do onchain swaps between things like
00:44:45.760 ethereum and Bitcoin I think Rune is
00:44:47.920 kind of in its own category so Prisma
00:44:50.000 and Rune are the two that I like for
00:44:52.160 defi if I was to pick a defi coin okay
00:44:55.440 this Raw video file is now almost an
00:44:57.040 hour and 10 minutes if you guys feel
00:44:59.280 like I delivered a tremendous amount of
00:45:01.160 value for this 2024 portfolio overview
00:45:04.000 the way I've gone through and explained
00:45:05.480 why I'm in each one of these coins the
00:45:07.280 risk involved the upside the downside
00:45:09.240 the left side the right side then smash
00:45:10.880 that like button and make sure you
00:45:12.040 subscribe with that Bell notification on
00:45:14.040 I believe that this is going to be one
00:45:15.280 of the most incredible Cycles we've ever
00:45:17.000 seen but of course there is a risk it
00:45:18.960 doesn't play out if it does however I'm
00:45:21.040 confident that gaming will be the most
00:45:22.680 transformative place to be and I'm
00:45:24.440 excited to continue to show you the
00:45:26.000 light throughout this journey if I
00:45:27.359 missed your favorite token you know what
00:45:28.559 to do leave me a comment in the comment
00:45:29.920 section below if you enjoyed this video
00:45:31.599 check out this one that I made just a
00:45:33.240 few days ago which goes even into more
00:45:35.559 detail on some alt coins that I love as
00:45:37.960 always I'm elot trades and I'll see you
00:45:39.680 very soon on the next
00:45:50.280 episode
`;
//const dataWithTranscriptContent = await getTranscriptContent(data, transcript);
/* const { analysis } = await validateCoinsAgainstTrascriptContent(
  transcriptContent,
  screenshotContent
);
 */
/* const { analysis } = await validateCoins(transcript, data, screenshotContent);
console.log("Json data: " + analysis);
 */

/* const { data: analysisData, error } = await supabase
  .from("tests")
  .select("*")
  .limit(5);

console.log("Json data from supabase: " + analysisData); */

const tempData = [
  {
    coin: "Bitcoin",
    valid: true,
    possible_match: "Bitcoin",
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
    valid: true,
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
    valid: true,
    possible_match: "Heroes of mavia",
    found_in: "trascript",
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
    valid: true,
    possible_match: "Heroes of mavia",
    found_in: "trascript",
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
let link = "";
/* const formatted = await formatValidatedData(
  tempData,
  "https://www.youtube.com/watch?v=openhM5Gurs"
); */
let finAlaysis = {
  analysis: {
    projects: [
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Layer 1"],
        marketcap: "large",
        timestamps: [
          "00:26:20",
          "00:26:22",
          "00:24:03",
          "00:24:05",
          "00:01:08",
          "00:01:10",
          "00:03:50",
          "00:03:52",
          "00:08:03",
          "00:08:05",
        ],
        total_count: 3,
        possible_match: "Bitcoin",
        coin_or_project: "Bitcoin",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Meme coins"],
        marketcap: "large",
        timestamps: [
          "00:40:43",
          "00:40:45",
          "00:02:34",
          "00:02:36",
          "00:02:31",
          "00:02:33",
          "00:05:02",
          "00:05:04",
          "00:23:52",
          "00:23:54",
        ],
        total_count: 3,
        possible_match: "Dogecoin",
        coin_or_project: "Dogecoin",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "large",
        timestamps: [
          "00:30:13",
          "00:30:15",
          "00:00:42",
          "00:00:44",
          "00:06:21",
          "00:06:23",
          "00:20:06",
          "00:20:08",
        ],
        total_count: 3,
        possible_match: "axi Infinity",
        coin_or_project: "Axie Infinity",
        found_in: "trascript",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Layer 1", "DeFi"],
        marketcap: "large",
        timestamps: [
          "00:13:17",
          "00:13:19",
          "00:11:46",
          "00:11:48",
          "00:44:45",
          "00:44:47",
          "00:24:03",
          "00:24:05",
          "00:09:35",
          "00:09:37",
        ],
        total_count: 3,
        possible_match: "Ethereum",
        coin_or_project: "Ethereum",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Layer 1"],
        marketcap: "large",
        timestamps: [
          "00:16:52",
          "00:16:54",
          "00:11:44",
          "00:11:46",
          "00:13:15",
          "00:13:17",
          "00:40:32",
          "00:40:34",
          "00:16:59",
          "00:17:01",
        ],
        total_count: 3,
        possible_match: "Solana",
        coin_or_project: "Solana",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 10,
        category: ["DeFi", "Oracles"],
        marketcap: "large",
        timestamps: [
          "00:14:06",
          "00:14:08",
          "00:13:47",
          "00:13:49",
          "00:16:50",
          "00:16:52",
          "00:16:53",
          "00:16:55",
          "00:17:26",
          "00:17:28",
        ],
        total_count: 3,
        possible_match: "ChainLink",
        coin_or_project: "Chainlink",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Exchange"],
        marketcap: "large",
        timestamps: [
          "00:15:04",
          "00:15:06",
          "00:24:08",
          "00:24:10",
          "00:23:49",
          "00:23:51",
          "00:40:30",
          "00:40:32",
          "00:24:05",
          "00:24:07",
        ],
        total_count: 3,
        possible_match: "Coinbase",
        coin_or_project: "Coinbase",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Layer 1"],
        marketcap: "large",
        timestamps: [
          "00:16:07",
          "00:16:09",
          "00:15:52",
          "00:15:54",
          "00:15:56",
          "00:16:41",
          "00:16:43",
          "00:16:24",
          "00:16:26",
        ],
        total_count: 3,
        possible_match: "Avalanche",
        coin_or_project: "Avalanche",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Layer 2"],
        marketcap: "large",
        timestamps: [
          "00:17:35",
          "00:17:37",
          "00:17:07",
          "00:17:09",
          "00:17:43",
          "00:17:45",
          "00:17:52",
          "00:17:54",
          "00:18:05",
          "00:18:07",
        ],
        total_count: 3,
        possible_match: "Polygon",
        coin_or_project: "Polygon",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["DeFi"],
        marketcap: "large",
        timestamps: [
          "00:18:46",
          "00:18:48",
          "00:19:13",
          "00:19:15",
          "00:18:51",
          "00:18:53",
          "00:18:47",
          "00:18:49",
          "00:18:24",
          "00:18:26",
        ],
        total_count: 3,
        possible_match: "Injective",
        coin_or_project: "Injective",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Layer 1"],
        marketcap: "large",
        timestamps: [
          "00:20:13",
          "00:20:15",
          "00:19:21",
          "00:19:23",
          "00:20:25",
          "00:20:27",
          "00:20:04",
          "00:20:06",
          "00:19:38",
          "00:19:40",
        ],
        total_count: 3,
        possible_match: "Celestia",
        coin_or_project: "Celestia",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Layer 1"],
        marketcap: "large",
        timestamps: [
          "00:20:36",
          "00:20:38",
          "00:21:17",
          "00:21:19",
          "00:26:18",
          "00:26:20",
          "00:26:22",
          "00:26:23",
          "00:26:25",
        ],
        total_count: 3,
        possible_match: "Internet Computer",
        coin_or_project: "Internet Computer",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Cross-chain"],
        marketcap: "large",
        timestamps: [
          "00:22:40",
          "00:22:42",
          "00:22:23",
          "00:22:25",
          "00:28:57",
          "00:28:59",
          "00:29:00",
          "00:29:02",
          "00:29:03",
          "00:29:05",
        ],
        total_count: 3,
        possible_match: "Layer Zero",
        coin_or_project: "LayerZero",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Gaming"],
        marketcap: "medium",
        timestamps: [
          "00:29:04",
          "00:29:06",
          "00:30:56",
          "00:30:58",
          "00:28:19",
          "00:28:21",
          "00:19:10",
          "00:19:12",
          "00:27:46",
          "00:27:48",
        ],
        total_count: 3,
        possible_match: "Beam",
        coin_or_project: "Beam",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Gaming", "Layer 2"],
        marketcap: "large",
        timestamps: [
          "00:28:36",
          "00:28:38",
          "00:28:12",
          "00:28:14",
          "00:03:57",
          "00:03:59",
          "00:28:17",
          "00:28:19",
          "00:30:10",
          "00:30:12",
        ],
        total_count: 3,
        possible_match: "ImmutableX",
        coin_or_project: "Immutable X",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "medium",
        timestamps: [
          "00:30:54",
          "00:30:56",
          "00:29:39",
          "00:29:41",
          "00:11:44",
          "00:11:46",
          "00:13:15",
          "00:13:17",
          "00:40:32",
          "00:40:34",
        ],
        total_count: 3,
        possible_match: "Gala",
        coin_or_project: "Gala",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "medium",
        timestamps: [
          "00:30:42",
          "00:30:44",
          "00:30:52",
          "00:30:54",
          "00:30:13",
          "00:30:15",
          "00:30:05",
          "00:30:07",
          "00:26:10",
          "00:26:12",
        ],
        total_count: 3,
        possible_match: "Ronin",
        coin_or_project: "Ronin",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "medium",
        timestamps: [
          "00:37:45",
          "00:37:47",
          "00:39:39",
          "00:39:41",
          "00:33:39",
          "00:33:41",
          "00:33:42",
          "00:33:44",
          "00:33:45",
          "00:33:47",
        ],
        total_count: 3,
        possible_match: "Pixels Online",
        coin_or_project: "Pixels",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming", "Launchpad"],
        marketcap: "small",
        timestamps: [
          "00:34:53",
          "00:34:55",
          "00:31:09",
          "00:31:11",
          "00:31:59",
          "00:32:01",
          "00:31:07",
          "00:34:50",
          "00:34:52",
        ],
        total_count: 3,
        possible_match: "Seedify",
        coin_or_project: "Cify",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:34:10",
          "00:34:12",
          "00:32:52",
          "00:32:54",
          "00:27:48",
          "00:27:50",
          "00:03:47",
          "00:03:49",
          "00:07:55",
          "00:07:57",
        ],
        total_count: 3,
        possible_match: "PRIME",
        coin_or_project: "Prime",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:34:13",
          "00:34:15",
          "00:03:15",
          "00:03:17",
          "00:34:00",
          "00:34:02",
          "00:35:01",
          "00:35:03",
          "00:43:11",
          "00:43:13",
        ],
        total_count: 3,
        possible_match: "Neo Tokyo",
        coin_or_project: "Neotokyo",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:35:56",
          "00:35:58",
          "00:35:29",
          "00:35:31",
          "00:35:17",
          "00:35:19",
          "00:35:24",
          "00:35:26",
          "00:36:43",
          "00:36:45",
        ],
        total_count: 3,
        possible_match: "SuperVerse",
        coin_or_project: "SuperVerse",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:36:32",
          "00:36:34",
          "00:35:17",
          "00:35:19",
          "00:36:14",
          "00:36:16",
          "00:36:26",
          "00:36:28",
          "00:36:52",
          "00:36:54",
        ],
        total_count: 3,
        possible_match: "Impostors",
        coin_or_project: "Imposters",
        found_in: "screenshot",
      },
      {
        valid: false,
        action: "UPDATE",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:36:32",
          "00:36:34",
          "00:36:57",
          "00:36:59",
          "00:42:02",
          "00:42:04",
          "00:16:43",
          "00:16:45",
          "00:23:33",
          "00:23:35",
        ],
        total_count: 3,
        possible_match: "Treeverse",
        coin_or_project: "Terse",
        found_in: "screenshot",
      },
      {
        valid: false,
        action: "UPDATE",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:38:43",
          "00:38:45",
          "00:02:32",
          "00:02:34",
          "00:06:45",
          "00:06:47",
          "00:10:02",
          "00:10:04",
          "00:39:19",
          "00:39:21",
        ],
        total_count: 3,
        possible_match: "Treeverse",
        coin_or_project: "Rever",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:39:23",
          "00:39:25",
          "00:37:19",
          "00:37:21",
          "00:37:22",
          "00:37:24",
          "00:37:25",
          "00:37:27",
        ],
        total_count: 3,
        possible_match: "Gunzilla",
        coin_or_project: "Gonzilla",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:37:45",
          "00:37:47",
          "00:09:39",
          "00:09:41",
          "00:37:28",
          "00:37:30",
          "00:37:31",
          "00:37:33",
          "00:37:34",
          "00:37:36",
        ],
        total_count: 3,
        possible_match: "Ready Games",
        coin_or_project: "Ready Games",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:37:48",
          "00:37:50",
          "00:37:37",
          "00:37:39",
          "00:37:40",
          "00:37:42",
          "00:37:43",
          "00:37:45",
        ],
        total_count: 3,
        possible_match: "Heroes of mavia",
        coin_or_project: "Heroes of Mavia",
        found_in: "trascript",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:38:03",
          "00:38:05",
          "00:39:24",
          "00:39:26",
          "00:38:00",
          "00:38:02",
          "00:37:46",
          "00:37:48",
          "00:37:49",
          "00:37:51",
        ],
        total_count: 3,
        possible_match: "Shrapnel",
        coin_or_project: "Shrapnel",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:38:22",
          "00:38:24",
          "00:38:26",
          "00:38:28",
          "00:38:40",
          "00:38:42",
          "00:38:29",
          "00:38:31",
        ],
        total_count: 3,
        possible_match: "BIGTIME",
        coin_or_project: "Big Time",
        found_in: "screenshot",
      },
      {
        valid: false,
        action: "UPDATE",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:38:03",
          "00:38:05",
          "00:39:24",
          "00:39:26",
          "00:38:26",
          "00:38:28",
          "00:38:24",
          "00:38:04",
          "00:38:06",
        ],
        total_count: 3,
        possible_match: "Shrapnel",
        coin_or_project: "Trapnel",
        found_in: "screenshot",
      },
      {
        valid: false,
        action: "DELETE",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:39:25",
          "00:39:27",
          "00:38:13",
          "00:38:15",
          "00:38:16",
          "00:38:18",
          "00:38:19",
          "00:38:21",
        ],
        total_count: 3,
        possible_match: "none",
        coin_or_project: "Eluvium",
        found_in: "",
      },
      {
        valid: false,
        action: "DELETE",
        rpoints: 8,
        category: ["Gaming"],
        marketcap: "small",
        timestamps: [
          "00:42:22",
          "00:42:24",
          "00:38:53",
          "00:38:55",
          "00:41:42",
          "00:41:44",
          "00:39:31",
          "00:39:33",
          "00:33:54",
          "00:33:56",
        ],
        total_count: 3,
        possible_match: "none",
        coin_or_project: "Cus",
        found_in: "",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:37:48",
          "00:37:50",
          "00:38:31",
          "00:38:33",
          "00:38:34",
          "00:38:36",
          "00:38:37",
          "00:38:39",
        ],
        total_count: 3,
        possible_match: "Heroes of mavia",
        coin_or_project: "Mavia",
        found_in: "trascript",
      },
      {
        valid: false,
        action: "DELETE",
        rpoints: 7,
        category: ["Gaming"],
        marketcap: "micro",
        timestamps: [
          "00:39:33",
          "00:39:35",
          "00:31:53",
          "00:31:55",
          "00:38:40",
          "00:38:42",
          "00:38:43",
          "00:38:45",
          "00:38:46",
          "00:38:48",
        ],
        total_count: 3,
        possible_match: "none",
        coin_or_project: "Wagi",
        found_in: "",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 7,
        category: ["Meme coins"],
        marketcap: "medium",
        timestamps: [
          "00:41:32",
          "00:41:34",
          "00:02:57",
          "00:02:59",
          "00:38:49",
          "00:38:51",
          "00:38:52",
          "00:38:54",
          "00:38:55",
          "00:38:57",
        ],
        total_count: 3,
        possible_match: "Pepe",
        coin_or_project: "Pepe",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["Meme coins"],
        marketcap: "small",
        timestamps: [
          "00:40:23",
          "00:40:25",
          "00:38:58",
          "00:39:00",
          "00:39:01",
          "00:39:03",
          "00:39:04",
          "00:39:06",
        ],
        total_count: 3,
        possible_match: "Bonk",
        coin_or_project: "Bon",
        found_in: "screenshot",
      },
      {
        valid: false,
        action: "DELETE",
        rpoints: 9,
        category: ["AI"],
        marketcap: "medium",
        timestamps: [
          "00:39:07",
          "00:39:09",
          "00:39:10",
          "00:39:12",
          "00:39:13",
          "00:39:15",
        ],
        total_count: 3,
        possible_match: "none",
        coin_or_project: "AIOZ",
        found_in: "",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 9,
        category: ["AI"],
        marketcap: "medium",
        timestamps: [
          "00:39:16",
          "00:39:18",
          "00:39:19",
          "00:39:21",
          "00:39:22",
          "00:39:24",
        ],
        total_count: 3,
        possible_match: "Bittensor",
        coin_or_project: "Bittensor",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["DeFi"],
        marketcap: "large",
        timestamps: [
          "00:43:01",
          "00:43:03",
          "00:39:25",
          "00:39:27",
          "00:39:28",
          "00:39:30",
          "00:39:31",
          "00:39:33",
        ],
        total_count: 3,
        possible_match: "DyDx",
        coin_or_project: "dYdX",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["NFT"],
        marketcap: "medium",
        timestamps: [
          "00:43:34",
          "00:43:36",
          "00:43:27",
          "00:43:29",
          "00:43:16",
          "00:43:18",
          "00:40:17",
          "00:40:19",
          "00:39:34",
          "00:39:36",
        ],
        total_count: 3,
        possible_match: "Pudgy Penguins",
        coin_or_project: "Pudgy Penguins",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["DeFi"],
        marketcap: "small",
        timestamps: [
          "00:44:24",
          "00:44:26",
          "00:44:22",
          "00:39:43",
          "00:39:45",
          "00:39:46",
          "00:39:48",
          "00:39:49",
          "00:39:51",
        ],
        total_count: 3,
        possible_match: "Prisma",
        coin_or_project: "Prisma",
        found_in: "screenshot",
      },
      {
        valid: true,
        action: "NO ACTION",
        rpoints: 8,
        category: ["DeFi"],
        marketcap: "medium",
        timestamps: [
          "00:39:52",
          "00:39:54",
          "00:39:55",
          "00:39:57",
          "00:39:58",
          "00:40:00",
        ],
        total_count: 3,
        possible_match: "RUNE",
        coin_or_project: "THORChain",
        found_in: "screenshot",
      },
    ],
    total_count: 129,
    total_rpoints: 325,
  },
};

//UpdateCoinsWithValidatedDataTests();
//console.log(Array.isArray(tempData));

const screenshotAnalysis = [
  {
    coin: "Bitcoin",
    valid: true,
    possible_match: "Bitcoin",
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
    valid: false,
    possible_match: "none",
    found_in: "none",
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
    possible_match: "Injective (INJ)",
    found_in: "screenshot",
  },
  {
    coin: "Celestia",
    valid: true,
    possible_match: "Celestia (TIA)",
    found_in: "screenshot",
  },
  {
    coin: "Internet Computer",
    valid: true,
    possible_match: "Internet Computer (ICP)",
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
    possible_match: "ImmutableX (IMX)",
    found_in: "screenshot",
  },
  {
    coin: "Gala",
    valid: true,
    possible_match: "Gala (GALA)",
    found_in: "screenshot",
  },
  {
    coin: "Ronin",
    valid: true,
    possible_match: "Ronin (RON)",
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
    valid: true,
    possible_match: "Seedify (SFUND)",
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
    possible_match: "SuperVerse (SUPER)",
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
    valid: true,
    possible_match: "Treeverse",
    found_in: "screenshot",
  },
  {
    coin: "Rever",
    valid: true,
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
    possible_match: "Pepe (PEPE)",
    found_in: "screenshot",
  },
  {
    coin: "Bon",
    valid: true,
    possible_match: "Bonk (BONK)",
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
    possible_match: "Bittensor (TAO)",
    found_in: "screenshot",
  },
  {
    coin: "dYdX",
    valid: true,
    possible_match: "DyDx (DYDX)",
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
const transcriptAnalysis = [
  {
    coin: "Bitcoin",
    valid: true,
    possible_match: "Bitcoin",
    found_in: "trascript",
  },
  {
    coin: "Dogecoin",
    valid: true,
    possible_match: "Dogecoin",
    found_in: "trascript",
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
    possible_match: "ethereum",
    found_in: "trascript",
  },
  {
    coin: "Solana",
    valid: true,
    possible_match: "Solana",
    found_in: "trascript",
  },
  {
    coin: "Chainlink",
    valid: true,
    possible_match: "chain link",
    found_in: "trascript",
  },
  {
    coin: "Coinbase",
    valid: true,
    possible_match: "coinbase",
    found_in: "trascript",
  },
  {
    coin: "Avalanche",
    valid: true,
    possible_match: "Avalanche",
    found_in: "trascript",
  },
  {
    coin: "Polygon",
    valid: true,
    possible_match: "polygon",
    found_in: "trascript",
  },
  {
    coin: "Injective",
    valid: true,
    possible_match: "injective",
    found_in: "trascript",
  },
  {
    coin: "Celestia",
    valid: true,
    possible_match: "Celestia",
    found_in: "trascript",
  },
  {
    coin: "Internet Computer",
    valid: true,
    possible_match: "internet computer",
    found_in: "trascript",
  },
  {
    coin: "LayerZero",
    valid: true,
    possible_match: "layer zero",
    found_in: "trascript",
  },
  {
    coin: "Beam",
    valid: true,
    possible_match: "beam",
    found_in: "trascript",
  },
  {
    coin: "Immutable X",
    valid: true,
    possible_match: "immutable X",
    found_in: "trascript",
  },
  {
    coin: "Gala",
    valid: true,
    possible_match: "Gala",
    found_in: "trascript",
  },
  {
    coin: "Ronin",
    valid: true,
    possible_match: "Ronin",
    found_in: "trascript",
  },
  {
    coin: "Pixels",
    valid: true,
    possible_match: "pixels online",
    found_in: "trascript",
  },
  {
    coin: "Cify",
    valid: true,
    possible_match: "cify",
    found_in: "trascript",
  },
  {
    coin: "Prime",
    valid: true,
    possible_match: "Prime",
    found_in: "trascript",
  },
  {
    coin: "Neotokyo",
    valid: true,
    possible_match: "neotokyo",
    found_in: "trascript",
  },
  {
    coin: "SuperVerse",
    valid: true,
    possible_match: "superverse",
    found_in: "trascript",
  },
  {
    coin: "Imposters",
    valid: true,
    possible_match: "imposters",
    found_in: "trascript",
  },
  {
    coin: "Terse",
    valid: false,
    possible_match: "imposters",
    found_in: "trascript",
  },
  {
    coin: "Rever",
    valid: false,
    possible_match: "forever",
    found_in: "trascript",
  },
  {
    coin: "Gonzilla",
    valid: true,
    possible_match: "gonzilla",
    found_in: "trascript",
  },
  {
    coin: "Ready Games",
    valid: true,
    possible_match: "ready games",
    found_in: "trascript",
  },
  {
    coin: "Heroes of Mavia",
    valid: true,
    possible_match: "Heroes of mavia",
    found_in: "trascript",
  },
  {
    coin: "Shrapnel",
    valid: true,
    possible_match: "shrapnel",
    found_in: "trascript",
  },
  {
    coin: "Big Time",
    valid: true,
    possible_match: "big time",
    found_in: "trascript",
  },
  {
    coin: "Trapnel",
    valid: false,
    possible_match: "shrapnel",
    found_in: "trascript",
  },
  {
    coin: "Eluvium",
    valid: true,
    possible_match: "eluvium",
    found_in: "trascript",
  },
  {
    coin: "Cus",
    valid: true,
    possible_match: "cus",
    found_in: "trascript",
  },
  {
    coin: "Mavia",
    valid: true,
    possible_match: "Heroes of mavia",
    found_in: "trascript",
  },
  {
    coin: "Wagi",
    valid: true,
    possible_match: "wagi",
    found_in: "trascript",
  },
  {
    coin: "Pepe",
    valid: true,
    possible_match: "Pepe",
    found_in: "trascript",
  },
  {
    coin: "Bon",
    valid: true,
    possible_match: "Bon",
    found_in: "trascript",
  },
  {
    coin: "AIOZ",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "Bittensor",
    valid: false,
    possible_match: "none",
    found_in: "none",
  },
  {
    coin: "dYdX",
    valid: true,
    possible_match: "dydx",
    found_in: "trascript",
  },
  {
    coin: "Pudgy Penguins",
    valid: true,
    possible_match: "pudgy Penguins",
    found_in: "trascript",
  },
  {
    coin: "Prisma",
    valid: true,
    possible_match: "Prisma",
    found_in: "trascript",
  },
  {
    coin: "THORChain",
    valid: false,
    possible_match: "Rune",
    found_in: "trascript",
  },
];

const mergedItems = screenshotAnalysis.map((screenshotItem) => {
  if (screenshotItem.valid) {
    return screenshotItem;
  }
  const transcriptItem = transcriptAnalysis.find(
    (item) => item.coin === screenshotItem.coin
  );

  if (transcriptItem && transcriptItem.valid) {
    return transcriptItem;
  }
  return screenshotItem;
});

console.log("Final merged output:", mergedItems);
