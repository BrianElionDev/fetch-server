import Fuse from "fuse.js";
import { findSimilarCoins } from "../utils.js";
const data = {
  projects: [
    {
      coin_or_project: "Aosh",
      content:
        "Ethereum (ETH), Akash ,  (SETH)\nEthereum (ETH), (SETH)\nEthereum (ETH), (SETH)\nBittensor (TAO)\nBittensor (TAO)\nEthereum (ETH), (ETH)\nBittensor (TAO)\nBittensor (TAO)",
      usage: 0.02,
    },
    {
      coin_or_project: "Ondo",
      content:
        "BTC, DCOIN, SOL, XRP, ETH, SAFU/WBNB, A1C/WETH, BUILD/WBNB, BNBXBT/WBNB, PI/WBNB, Bitcoin (BTC), Ethereum (ETH), Tether (USDT)\nBitcoin (BTC), DCOIN, Solana (SOL), XRP, Ethereum (ETH), SAFU/WBNB, A1C/WETH, BUILD/WBNB, BNBXBT/WBNB, PI/WBNB, Tether (USDT)\nOndo (ONDO)\nAIOZ Network (AIOZ), AIOZUSDT\nAIOZ Network (AIOZ)\nPolyhedra Network (ZKJ), OriginTrail (TRAC), Ravencoin (RVN), Usual USD (USDO), Chintai (CHEX), Polymath (POLY), GoldPro Token (GPRO), Chia (XCH), Polymesh (POLYX)\nAIOZ Network (AIOZ), (AIOZUSDT)\nAIOZ Network (AIOZ), USDT",
      usage: 0.0212,
    },
    {
      coin_or_project: "Internet_Computer",
      content:
        "POL (POL), MATIC (MATIC)\nInternet Computer (ICP), OFFICIAL TRUMP (TRUMP)\nNEAR Protocol (NEAR), Bittensor (TAO), Internet Computer (ICP), Filecoin (FIL), Render (RENDER), DeXe (DEXE), Artificial Superintelligence Alliance (FET), Injective (INJ)\nNEAR Protocol (NEAR), Bittensor (TAO), Internet Computer (ICP), Filecoin (FIL), Render (RENDER), DeXe (DEXE), Artificial Superintelligence Alliance (FET), Injective (INJ)",
      usage: 0.0106,
    },
    {
      coin_or_project: "Sui",
      content:
        "Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT)\nSui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe)\nBitcoin (BTC), (BTC)\nDogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO)\nSui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe)\nHedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe), Bitcoin Cash (BCH), Bitget Token (BGB), Dai (DAI), Uniswap (UNI)\nBitcoin (BTC), (BTC)\nTRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB)",
      usage: 0.0223,
    },
    {
      coin_or_project: "Hyperliquid",
      content:
        "BTC, DCOIN, SOL, XRP, ETH, SAFU/WBNB, A1C/WETH, BUILD/WBNB, BNBXBT/WBNB, PI/WBNB, Bitcoin (BTC), Ethereum (ETH), Tether (USDT)\nSui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe)\nAIOZ Network (AIOZ), AIOZUSDT\nAIOZ Network (AIOZ), AIOZUSDT\nSui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe)\nBitcoin Cash (BCH), Bitget Token (BGB), Dai (DAI), Uniswap (UNI), Monero (XMR), NEAR Protocol (NEAR), Pepe (PEPE), Bittensor (TAO), Aptos (APT)",
      usage: 0.0165,
    },
    {
      coin_or_project: "EOS",
      content:
        "Story (IP), Theta Network (THETA), The Graph (GRT), Virtuals Protocol (VIRTUAL), KAITO (KAITO), AIOZ Network (AIOZ), Grass (GRASS), Akash Network (AKT), Golem (GLM)\nKAITO, IP, TAO, RENDER, VIRTUAL, VANA, VXV, FET (FET), ICP (ICP), NEAR Protocol (NEAR), Bittensor (TAO), Internet Protocol (ICP)\nBitcoin (BTC), BTC\nGolem (GLM), Oasis (ROSE), Vana (VANA), Basic Attention Token (BAT), Livepeer (LPT), Aethir (ATH), Turbo (TURBO), OriginTrail (TRAC), Beldex (BDX)\nOndo (ONDO)\nKAITO, IP, TAO, RENDER, VIRTUAL, VANA, VXV, FET (FET), ICP (ICP), NEAR Protocol (NEAR), Bittensor (TAO)\nAIOZ Network (AIOZ), ONDO (ONDO)\nBitcoin (BTC), (BTC)",
      usage: 0.0213,
    },
    {
      coin_or_project: "Bittensor",
      content:
        "Bittensor (TAO)\nBittensor (TAO), Aave (AAVE)\nBittensor (TAO)\nBittensor (TAO)\nBittensor (TAO)\nBittensor (TAO)\nBittensor (TAO)\nDai (DAI), Uniswap (UNI), Monero (XMR), NEAR Protocol (NEAR), Pepe (PEPE), Bittensor (TAO), Aptos (APT), Ondo (ONDO), Internet Computer (ICP), Aave (AAVE)",
      usage: 0.0204,
    },
    {
      coin_or_project: "PinLink",
      content:
        "PinLink (PIN), Creditcoin (CTC), Chia (XCH)\nPinLink (PIN)\nOndo (ONDO), Hedera (HBAR), IOTA (IOTA)\nPolymath (POLY), GoldPro Token (GPRO), Chia (XCH), Polymesh (POLYX), Ozone Chain (OZO), Clearpool (CPOOL), Venus (XVS), Lisk (LSK), Zebec Network (ZBCN), VeChain (VET), Algorand (ALGO)\nPolyhedra Network (ZKJ), OriginTrail (TRAC), Ravencoin (RVN), Usual USD (USDO), Chintai (CHEX), Polymath (POLY), GoldPro Token (GPRO), Chia (XCH), Polymesh (POLYX)\nPinLink (PIN)",
      usage: 0.016,
    },
    {
      coin_or_project: "Pi",
      content:
        "BTC, DCOIN, SOL, XRP, ETH, SAFU/WBNB, A1C/WETH, BUILD/WBNB, BNBXBT/WBNB, PI/WBNB, Bitcoin (BTC), Ethereum (ETH)\nEthereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK)\nBitcoin (BTC), Ethereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE)\nHBAR, LINK, ONDO, OM, AVAX, POLY, CTC, XDB, VeChain (VET), Chainlink (LINK), Avalanche (AVAX)\nBitcoin (BTC), Ethereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE)\nHBAR, LINK, ONDO, OM, AVAX, POLY, CTC, XDB, VeChain (VET), Chainlink (LINK), Avalanche (AVAX)",
      usage: 0.0164,
    },
    {
      coin_or_project: "NeuralAI",
      content:
        "Vana (VANA), Basic Attention Token (BAT), Livepeer (LPT), Aethir (ATH), Turbo (TURBO), OriginTrail (TRAC), Beldex (BDX), AI Companions (AIC), AI Rig Complex (ARC), io.net (IO)\nOriginTrail (TRAC), Beldex (BDX), AI Companions (AIC), AI Rig Complex (ARC), io.net (IO), Echelon Prime (PRIME), Destra Network (DSYNC), Qubic (QUBIC), Casper (CSPR), Kadena (KDA)",
      usage: 0.0058,
    },
    {
      coin_or_project: "Destra",
      content:
        "Destiny AI (DEST), Destra Network (DSYNC), Stride Staked DYDX (stDYDX), Stride Staked TIA (stTIA)\nStory (IP), Theta Network (THETA), The Graph (GRT), Virtuals Protocol (VIRTUAL), KAITO (KAITO), AIOZ Network (AIOZ), Grass (GRASS), Akash Network (AKT), Golem (GLM)\nBNB (BNB)\nGolem (GLM), Oasis (ROSE), Vana (VANA), Basic Attention Token (BAT), Livepeer (LPT), Aethir (ATH), Turbo (TURBO), OriginTrail (TRAC), Beldex (BDX)\nDestra Network (DSYNC)\nDestra Network (DSYNC)\nDestra Network (DSYNC)\nDestra Network (DSYNC)",
      usage: 0.0209,
    },
    {
      coin_or_project: "Avalanche",
      content:
        "POL (POL), MATIC (MATIC)\nSolana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)\nInternet Computer (ICP), OFFICIAL TRUMP (TRUMP)\nDogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO)\nSui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT), Hyperliquid (HYPE), Ethena USDe (USDe)\nTRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB)",
      usage: 0.0164,
    },
    {
      coin_or_project: "Cardano",
      content:
        "Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)\nBNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX)\nBNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX)\nSolana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)\nBitcoin (BTC), Ethereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), DCOIN, SOL (SOL)\nSolana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)\nSolana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)\nSolana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON)",
      usage: 0.0223,
    },
    {
      coin_or_project: "Solana",
      content:
        "Ethereum (ETH), (SETH)\nEthereum (ETH), SETH\nEthereum (ETH), (SETH)\nEthereum (ETH), SETH\nEthereum (ETH), (SETH)\nEthereum (ETH)\nEthereum (ETH), (SETH)\nEthereum (ETH)",
      usage: 0.0198,
    },
    {
      coin_or_project: "PolyMarket",
      content:
        "Internet Computer (ICP), OFFICIAL TRUMP (TRUMP)\nPOL (POL), MATIC (MATIC)",
      usage: 0.005,
    },
    {
      coin_or_project: "Beam",
      content:
        "AIOZ Network (AIOZ), USDT (USDT)\nAIOZ Network (AIOZ), (AIOZ), (AIOZUSDT)\nAIOZ Network (AIOZ), (AIOZ), (AIOZUSDT)\nAIOZ Network (AIOZ), (AIOZUSDT)",
      usage: 0.0102,
    },
    {
      coin_or_project: "Binance_Coin",
      content:
        "BNB (BNB)\nBNB (BNB)\nBNB (BNB)\nEthereum (ETH), Tether (USDT), XRP (XRP), BINANCE, BNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK)\nBNB (BNB)\nBNB (BNB)",
      usage: 0.0153,
    },
    {
      coin_or_project: "Arbitrum",
      content:
        "BTC, DCOIN, SOL, XRP, ETH, SAFU/WBNB, A1C/WETH, BUILD/WBNB, BNBXBT/WBNB, PI/WBNB, Bitcoin (BTC), Ethereum (ETH), Tether (USDT)\nPOL (POL), MATIC (MATIC), Algorand (ALGO)\nBitcoin (BTC), DCOIN, Solana (SOL), XRP, Ethereum (ETH), Tether (USDT), SAFU (WBNB), A1C (WETH), BUILD (WBNB), BNBXBT (WBNB), PI (WBNB)\nArbitrum (ARB), Cronos (CRO), DeXe (DEXE)",
      usage: 0.0109,
    },
    {
      coin_or_project: "Bitcoin",
      content:
        "Bitcoin (BTC), Ethereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), DCOIN, SOL (SOL), A1C/WETH, BUILD/WBNB, BNBXT/WBNB, PI/WBNB\nBitcoin (BTC)\nBitcoin (BTC), Ethereum (ETH), Tether (USDT), XRP (XRP), BNB (BNB), DCOIN, SOL (SOL)\nEthereum (ETH)\nEthereum (ETH), (ETH)\nBitcoin (BTC)\nBitcoin (BTC)\nBitcoin (BTC)",
      usage: 0.0201,
    },
    {
      coin_or_project: "Chainlink",
      content:
        "Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO), Shiba Inu (SHIB), Hedera (HBAR), MANTRA (OM), Polkadot (DOT)\nUSDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC)\nBNB (BNB), Solana (SOL), USDC (USDC), Dogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX)\nDogecoin (DOGE), Cardano (ADA), TRON (TRX), Chainlink (LINK), Stellar (XLM), Avalanche (AVAX), Toncoin (TON), Sui (SUI), Litecoin (LTC), UNUS SED LEO (LEO)\nOndo (ONDO), Maker (MKR)\nChainlink (LINK), VET",
      usage: 0.0164,
    },
    {
      coin_or_project: "TreeVerse",
      content:
        "POL (POL), MATIC (MATIC), Terse , Algorand (ALGO)\nInternet Computer (ICP), OFFICIAL TRUMP (TRUMP)\nAIOZ Network (AIOZ), AIOZUSDT\nAIOZ Network (AIOZ), AIOZUSDT (AIOZUSDT)",
      usage: 0.0101,
    },
  ],
  link: "https://www.youtube.com/watch?v=6rdsSTZkG_k",
};
const sm = findSimilarCoins(data);
console.log("Similar coins: " + JSON.stringify(sm));
