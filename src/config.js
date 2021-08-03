import yVaultV2 from "./abi/yVaultV2.json";
import LidoVault from "./abi/LidoVault.json";

// Main config file for common parameters
export default Object.freeze({
  yusdcidle: {
    // route path
    TITLE: "USDc Idle",
    LOGO: "🏆🚀",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x33bd0f9618cf38fea8f7f01e1514ab63b9bde64b",
    WANT_ADDR: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    WANT_SYMBOL: "USDC",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  icecreath2: {
    TITLE: "iceCREATH2",
    LOGO: "🍦TH2",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x20Eb2A369b71C29FC4aFCddBbc1CAB66CCfcB062",
    WANT_ADDR: "0xcBc1065255cBc3aB41a6868c22d1f1C573AB89fd",
    WANT_SYMBOL: "CRETH2",
    COINGECKO_SYMBOL: "CRETH2",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  sushirocket: {
    TITLE: "Sushi YFI-ETH",
    LOGO: "🍣🍬",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x27Eb83254D900AB4F9b15d5652d913963FeC35e3",
    WANT_ADDR: "0x088ee5007C98a9677165D78dD2109AE4a3D04d0C",
    WANT_SYMBOL: "SLP",
    COINGECKO_SYMBOL: "SLP",
    VAULT_DEV: "andy8052",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  daihard: {
    TITLE: "DAI Hard",
    LOGO: "🏅💪",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xBFa4D8AA6d8a379aBFe7793399D3DdaCC5bBECBB",
    WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  usdc: {
    TITLE: "USd Coin",
    LOGO: "🇺🇸🪙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xe2f6b9773bf3a015e2aa70741bde1498bdb9425b",
    WANT_ADDR: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    WANT_SYMBOL: "USDC",
    COINGECKO_SYMBOL: "USDC",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  yvsteth: {
    TITLE: "Lido St. Ether",
    LOGO: "👼🏦",
    VAULT_ABI: LidoVault,
    VAULT_TYPE: "weird",
    VAULT_ADDR: "0x15a2B3CfaFd696e1C783FE99eed168b78a3A371e",
    WANT_ADDR: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
    WANT_SYMBOL: "stETH",
    COINGECKO_SYMBOL: "staked-ether",
    VAULT_DEV: "bantg",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  daiironbank: {
    TITLE: "DAI Ironbank",
    LOGO: "🦾🏦",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x07dbC20B84fF63F3cc542F6A22E5a71cbA5670A4",
    WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "dai",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  wethmaker: {
    TITLE: "WETH Maker",
    LOGO: "🖲🏰",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x6392e8fa0588CB2DCb7aF557FdC9D10FDe48A325",
    WANT_ADDR: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WANT_SYMBOL: "WETH",
    COINGECKO_SYMBOL: "WETH",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  stecrv: {
    TITLE: "st. Ether-ETH Pool",
    LOGO: "💧🎱",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xdCD90C7f6324cfa40d7169ef80b12031770B4325",
    WANT_ADDR: "0x06325440D014e39736583c165C2963BA99fAf14E",
    WANT_SYMBOL: "steCRV",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  ironlender: {
    TITLE: "WETH Iron Lender",
    LOGO: "🦾💰",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xED0244B688cF059f32f45E38A6ac6E479D6755f6",
    WANT_ADDR: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WANT_SYMBOL: "WETH",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  mmwbtc: {
    TITLE: "Mushroom Worker",
    LOGO: "🍄🧑‍🌾",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "weird",
    VAULT_ADDR: "0x0e8A7717A4FD7694682E7005957dD5d7598bF14A",
    WANT_ADDR: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WANT_SYMBOL: "WBTC",
    COINGECKO_SYMBOL: "wrapped-bitcoin",
    VAULT_DEV: "mushroomsfinan1",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  ecrvseth: {
    TITLE: "Egyptian God sETH/ETH",
    LOGO: "𓀀☀︎",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x0e880118C29F095143dDA28e64d95333A9e75A47",
    WANT_ADDR: "0xA3D87FffcE63B53E0d54fAa1cc983B7eB0b74A9c",
    WANT_SYMBOL: "eCRV",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "matkam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  wethgenlender: {
    TITLE: "WETH Gen Lender",
    LOGO: "🧬💰",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xac333895ce1a73875cf7b4ecdc5a743c12f3d82b",
    WANT_ADDR: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    WANT_SYMBOL: "WETH",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  susdidle: {
    TITLE: "sUSD Idle",
    LOGO: "🏆⚔️",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x3466c90017F82DDA939B01E8DBd9b0f97AEF8DfC",
    WANT_ADDR: "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
    WANT_SYMBOL: "sUSD",
    COINGECKO_SYMBOL: "nusd",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  creamyswords: {
    TITLE: "Creamy Swords SNX",
    LOGO: "🍦⚔️",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x7356f09c294cb9c6428ac7327b24b0f29419c181",
    WANT_ADDR: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    WANT_SYMBOL: "SNX",
    COINGECKO_SYMBOL: "havven",
    VAULT_DEV: "jmonteer23",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  spadavault: {
    TITLE: "SpadaVault",
    LOGO: "s🦡",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x1Ae8Ccd120A05080d9A01C3B4F627F865685D091",
    WANT_ADDR: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WANT_SYMBOL: "WBTC",
    COINGECKO_SYMBOL: "wrapped-bitcoin",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 1,
  },
  fantomsfury: {
    TITLE: "Fantom's Fury",
    LOGO: "👻⚡",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x36e7aF39b921235c4b01508BE38F27A535851a5c",
    WANT_ADDR: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    WANT_SYMBOL: "WFTM",
    COINGECKO_SYMBOL: "fantom",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  fantomsdollar: {
    TITLE: "Fantom's Dollar",
    LOGO: "👻💵",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x4b2de374d480efa96cb093cefcca23d97903a6ea",
    WANT_ADDR: "0xAd84341756Bf337f5a0164515b1f6F993D194E1f",
    WANT_SYMBOL: "fUSD",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  hotcoins: {
    TITLE: "HotCoins",
    LOGO: "🔥🪙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xBF7AA989192b020a8d3e1C65a558e123834325cA",
    WANT_ADDR: "0x0316eb71485b0ab14103307bf65a021042c6d380",
    WANT_SYMBOL: "HBTC",
    COINGECKO_SYMBOL: "huobi-btc",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 1,
  },
  fullmetalfarmer: {
    TITLE: "Full Metal Farmer",
    LOGO: "🧙‍♂️🧪",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x56A5Fd5104a4956898753dfb060ff32882Ae0eb4",
    WANT_ADDR: "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF",
    WANT_SYMBOL: "ALCX",
    COINGECKO_SYMBOL: "alchemix",
    VAULT_DEV: "akshaynexust",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  badgergoat: {
    TITLE: "Badger's GOAT",
    LOGO: "🦡🐐",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x3149950258FbBcE1638d6C23ac93A692604Ef864",
    WANT_ADDR: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WANT_SYMBOL: "WBTC",
    COINGECKO_SYMBOL: "wrapped-bitcoin",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 1,
  },
  oceanofdata: {
    TITLE: "Ocean of Data",
    LOGO: "🌊💿",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x1133b2E2F51becCF25b2f8d0cA48c1d93DD5ab12",
    WANT_ADDR: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
    WANT_SYMBOL: "OCEAN",
    COINGECKO_SYMBOL: "ocean-protocol",
    VAULT_DEV: "akshaynexust",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  dataaave: {
    TITLE: "Data AAVE",
    LOGO: "💿🕊",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xac1c90b9c76d56ba2e24f3995f7671c745f8f308",
    WANT_ADDR: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    WANT_SYMBOL: "AAVE",
    COINGECKO_SYMBOL: "aave",
    VAULT_DEV: "0xangelfish",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  idletether: {
    TITLE: "Idle Tether",
    LOGO: "🛌T",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xAf322a2eDf31490250fdEb0D712621484b09aBB6",
    WANT_ADDR: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    WANT_SYMBOL: "USDT",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  trueidle: {
    TITLE: "True Idle",
    LOGO: "T🛌",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x49b3e44e54b6220af892dba48ae45f1ea6bc4ae9",
    WANT_ADDR: "0x0000000000085d4780B73119b644AE5ecd22b376",
    WANT_SYMBOL: "TUSD",
    COINGECKO_SYMBOL: "true-usd",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  poolwithus: {
    TITLE: "Pool with Us",
    LOGO: "🏊‍♂️👩‍👩‍👧‍👧",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x2F194Da57aa855CAa02Ea3Ab991fa5d38178B9e6",
    WANT_ADDR: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    WANT_SYMBOL: "UNI",
    COINGECKO_SYMBOL: "uniswap",
    VAULT_DEV: "mattdwest",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  vesperusdc: {
    TITLE: "Vesper-bell USDC",
    LOGO: "🛐🪙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x477faf103dadc5fe5baa40951cf7512dcbc18126",
    WANT_ADDR: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    WANT_SYMBOL: "USDC",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "real_mills",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  sushibank: {
    TITLE: "Bank Sushi",
    LOGO: "🏦🍣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xb32747B4045479B77a8b8Eb44029ba12580214F8",
    WANT_ADDR: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    WANT_SYMBOL: "SUSHI",
    COINGECKO_SYMBOL: "sushi",
    VAULT_DEV: "akshaynexust",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  fantombaby: {
    TITLE: "Fantom's Ape Ape Baby",
    LOGO: "🧊👶",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xEea0714eC1af3b0D41C624Ba5ce09aC92F4062b1",
    WANT_ADDR: "0xf16e81dce15b08f326220742020379b855b87df9",
    WANT_SYMBOL: "ICE",
    COINGECKO_SYMBOL: "ice-token",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  bscbaby: {
    TITLE: "BSC's Ape Ape Baby",
    LOGO: "🧊👶",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x78bef219b3348CD65387F6f7B27c9ee3Bf525704",
    WANT_ADDR: "0xf16e81dce15b08f326220742020379b855b87df9",
    WANT_SYMBOL: "ICE",
    COINGECKO_SYMBOL: "ice-token",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },
  ellipsoidal: {
    TITLE: "Ellipsoidal Farmer",
    LOGO: "🍩3️⃣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xC8057Fd6F7917b5398f52d861d50685E6AbbED14",
    WANT_ADDR: "0xaF4dE8E872131AE328Ce21D909C74705d3Aaf452",
    WANT_SYMBOL: "3EPS",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "akshaynexust",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },
  ethbaby: {
    TITLE: "ETH's Ape Ape Baby",
    LOGO: "🧊👶",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xD2C65E20C3fDE3F18097e7414e65596e0C83B1a9",
    WANT_ADDR: "0xf16e81dce15b08f326220742020379b855b87df9",
    WANT_SYMBOL: "ICE",
    COINGECKO_SYMBOL: "ice-token",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  bscfrappedape: {
    TITLE: "BSC's Frapped Ape",
    LOGO: "☕️🦧",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x626530FCD25a8c9A949B024AAbbAe4BAE7D5F320",
    WANT_ADDR: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    WANT_SYMBOL: "fUSDT",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },

  bscfusdtproxyeth: {
    TITLE: "BSC's fUSDT proxy to ETH",
    LOGO: "😷🐙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x2A3020a71Ab92D5CdBAfEB72f0b90D1DfdF1B6E2",
    WANT_ADDR: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    WANT_SYMBOL: "fUSDT",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 56,
  },

  bsceth: {
    TITLE: "BSC ETH",
    LOGO: "🕳️🐨",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x9cBdd0f1d9FB5D1ea6f3d022D0896E57aF5f087f",
    WANT_ADDR: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    WANT_SYMBOL: "ETH",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "fp_crypto",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },

  ftmfusdtproxyeth: {
    TITLE: "FTM's fUSDT proxy to ETH",
    LOGO: "😷🐙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xb442450Af36d17D83Fe7BCc93bC17b18f94E245d",
    WANT_ADDR: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    WANT_SYMBOL: "fUSDT",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 250,
  },
  ftmfrappedape: {
    TITLE: "FTM's Frapped Ape",
    LOGO: "☕️🦧",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x1E9eC284BA99E14436f809291eBF7dC8CCDB12e1",
    WANT_ADDR: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    WANT_SYMBOL: "fUSDT",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  grandmastersdai: {
    TITLE: "Old Grandmaster's DAI",
    LOGO: "♟👴",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xB98Df7163E61bf053564bde010985f67279BBCEC",
    WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "_tonkers",
    BLOCK_ACTIVATED: 1619291138,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  bnbfarmer: {
    TITLE: "BNB Farmer",
    LOGO: "🔶👨‍🌾",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x7E12d21eeEF120dc5E23c8e70162815A9071Dde9",
    WANT_ADDR: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    WANT_SYMBOL: "wBNB",
    COINGECKO_SYMBOL: "binancecoin",
    VAULT_DEV: "poolpitako",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },
  spooky: {
    TITLE: "Spooky Skeletons",
    LOGO: "🙀👻",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x79330397e161C67703e9bce2cA2Db73937D5fc7e",
    WANT_ADDR: "0x841fad6eae12c286d1fd18d1d525dffa75c7effe",
    WANT_SYMBOL: "BOO",
    COINGECKO_SYMBOL: "spookyswap",
    VAULT_DEV: "lance_upp",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  rai: {
    TITLE: "Reflex me",
    LOGO: "📷💚",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x4856A7EFBbFcaE92AB13c5e2e322Fc77647bB856",
    WANT_ADDR: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
    WANT_SYMBOL: "RAI",
    COINGECKO_SYMBOL: "rai",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1620418420,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  nrv: {
    TITLE: "Nervy Mastermind",
    LOGO: "☸️🤔",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x7C1Db8938D8170A244635e9ae3AEb41663B6D858",
    WANT_ADDR: "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096",
    WANT_SYMBOL: "NRV",
    COINGECKO_SYMBOL: "nerve-finance",
    VAULT_DEV: "fp_crypto",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 56,
  },
  ftm_woofy: {
    TITLE: "FTM's Wandering Woofy",
    LOGO: "🧭🐶",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x6fCE944d1f2f877B3972e0E8ba81d27614D62BeD",
    WANT_ADDR: "0xd0660cd418a64a1d44e9214ad8e459324d8157f1",
    WANT_SYMBOL: "WOOFY",
    COINGECKO_SYMBOL: "woofy",
    VAULT_DEV: "lance_upp",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  complifiusdc: {
    TITLE: "Comfi Carousel",
    LOGO: "🛋🎠",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x71955515ADF20cBDC699B8bC556Fc7Fd726B31B0",
    WANT_ADDR: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    WANT_SYMBOL: "USDC",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "fp_crypto",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  frogprince: {
    TITLE: "The Frog Prince",
    LOGO: "🐸💋",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xf962b098ecc4352aa2ad1d4164bd2b8367fd94c3",
    WANT_ADDR: "0x514910771af9ca656af840dff83e8264ecf986ca",
    WANT_SYMBOL: "LINK",
    COINGECKO_SYMBOL: "chainlink",
    VAULT_DEV: "jmonteer23",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  frogprince2: {
    TITLE: "The Frog Prince 2",
    LOGO: "🐸💋",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x671a912c10bba0cfa74cfc2d6fba9ba1ed9530b2",
    WANT_ADDR: "0x514910771af9ca656af840dff83e8264ecf986ca",
    WANT_SYMBOL: "LINK",
    COINGECKO_SYMBOL: "chainlink",
    VAULT_DEV: "jmonteer23",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  matic_woofy: {
    TITLE: "Matic's Wandering Woofy",
    LOGO: "🧭🐶",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xEAFB3Ee25B5a9a1b35F193A4662E3bDba7A95BEb",
    WANT_ADDR: "0xd0660cd418a64a1d44e9214ad8e459324d8157f1",
    WANT_SYMBOL: "WOOFY",
    COINGECKO_SYMBOL: "woofy",
    VAULT_DEV: "lance_upp",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  "matic-idle-dai": {
    TITLE: "Matic's Magic Idle DAI",
    LOGO: "🏆🚀",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x9Cfeb5e00a38ed1c9950dBadC0821ce4cb648a90",
    WANT_ADDR: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "dai",
    VAULT_DEV: "emilianobonassi",
    BLOCK_ACTIVATED: 1623414798,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  purpletwister: {
    TITLE: "Purple Twister",
    LOGO: "🟣🧬",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xCcba0B868106d55704cb7ff19782C829dc949feB",
    WANT_ADDR: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    WANT_SYMBOL: "WMATIC",
    COINGECKO_SYMBOL: "wmatic",
    VAULT_DEV: "lance_upp",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  ultrasoundmoney: {
    TITLE: "Wrapped Ultra Sound Money",
    LOGO: "🦇🔊",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xa258C4606Ca8206D8aA700cE2143D7db854D168c",
    WANT_ADDR: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    WANT_SYMBOL: "WETH",
    COINGECKO_SYMBOL: "weth",
    VAULT_DEV: "fameal",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  coinsonfire: {
    TITLE: "Coins On Fire",
    LOGO: "🪙🔥",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x0F6121fB28C7C42916d663171063c62684598f9F",
    WANT_ADDR: "0x0316eb71485b0ab14103307bf65a021042c6d380",
    WANT_SYMBOL: "HBTC",
    COINGECKO_SYMBOL: "huobi-btc",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "stealth",
    CHAIN_ID: 1,
  },
  dollarstorebento: {
    TITLE: "Dollar Store Bento",
    LOGO: "💵🍱",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x32A2d6F07079b6CdFe942B198773cDA1398544b1",
    WANT_ADDR: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    WANT_SYMBOL: "USDC",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "fp_crypto",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  splitcameron: {
    TITLE: "Split Cameron",
    LOGO: "🕴🖖",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x2A384a7Cd43fEe03aD01Cd629efe5c28e0d09557",
    WANT_ADDR: "0x27E611FD27b276ACbd5Ffd632E5eAEBEC9761E40",
    WANT_SYMBOL: "2CRV",
    COINGECKO_SYMBOL: "usd-coin",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  tiedtyler: {
    TITLE: "Tied Tyler",
    LOGO: "🕴🪢",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xE95416c54f3e313E49306486b0ea9c2C6D623157",
    WANT_ADDR: "0x92D5ebF3593a92888C25C0AbEF126583d4b5312E",
    WANT_SYMBOL: "fUSDT+2CRV",
    COINGECKO_SYMBOL: "tether",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  daihard2: {
    TITLE: "DAI Hard 2",
    LOGO: "💪💪",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x63739d137EEfAB1001245A8Bd1F3895ef3e186E7",
    WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  intergalacticsushi: {
    TITLE: "Intergalactic Sushi",
    LOGO: "✨🍣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x497590d2d57f05cf8B42A36062fA53eBAe283498",
    WANT_ADDR: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    WANT_SYMBOL: "SUSHI",
    COINGECKO_SYMBOL: "sushi",
    VAULT_DEV: "dudesahn",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "withdraw",
    CHAIN_ID: 1,
  },
  ftmbtccrv: {
    TITLE: "Fantom Bitcoin",
    LOGO: "👻🪙",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x0FCDAeDFb8A7DfDa2e9838564c5A1665d856AFDF",
    WANT_ADDR: "0x5B5CFE992AdAC0C9D48E05854B2d91C73a003858",
    WANT_SYMBOL: "btcCRV",
    COINGECKO_SYMBOL: "wrapped-bitcoin",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 250,
  },
  wether: {
    TITLE: "Wether",
    LOGO: "🧬🐑",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x9ecE944BBcd320F224293117E2780259411D34A3",
    WANT_ADDR: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    WANT_SYMBOL: "weth",
    COINGECKO_SYMBOL: "ethereum",
    VAULT_DEV: "therealmonoloco",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  curvedaave: {
    TITLE: "Curved aave",
    LOGO: "🧬🐑",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xccaC4F77f6984C989cc38EdED99e1c7A83a9c7f4",
    WANT_ADDR: "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171",
    WANT_SYMBOL: "am3CRV",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "0xorb",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 137,
  },
  daihard3: {
    TITLE: "DAI Hard with a Vengeance",
    LOGO: "💪3️⃣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
    WANT_ADDR: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WANT_SYMBOL: "DAI",
    COINGECKO_SYMBOL: "DAI",
    VAULT_DEV: "arbingsam",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "endorsed",
    CHAIN_ID: 1,
  },
  bitcoinwave: {
    TITLE: "Bitcoin wAAVE",
    LOGO: "₿👋",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xf11b141be4d1985e41c3aea99417e27603f67c4c",
    WANT_ADDR: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    WANT_SYMBOL: "WBTC",
    COINGECKO_SYMBOL: "wrapped-bitcoin",
    VAULT_DEV: "GalloDaSballo",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  interstellarsushi: {
    TITLE: "Interstellar Sushi",
    LOGO: "✨🍣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x6d765CbE5bC922694afE112C140b8878b9FB0390",
    WANT_ADDR: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    WANT_SYMBOL: "SUSHI",
    COINGECKO_SYMBOL: "sushi",
    VAULT_DEV: "dudesahn",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  compoundingcosmos: {
    TITLE: "Compounding Cosmos",
    LOGO: "📈✨",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0x4A3FE75762017DB0eD73a71C9A06db7768DB5e66",
    WANT_ADDR: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    WANT_SYMBOL: "COMP",
    COINGECKO_SYMBOL: "compound",
    VAULT_DEV: "dudesahn",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  spookystars: {
    TITLE: "Spooky Starts",
    LOGO: "👻✨",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xd9788f3931Ede4D5018184E198699dC6d66C1915",
    WANT_ADDR: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    WANT_SYMBOL: "AAVE",
    COINGECKO_SYMBOL: "aave",
    VAULT_DEV: "dudesahn",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
  truecereal: {
    TITLE: "True Cereal",
    LOGO: "🔵🥣",
    VAULT_ABI: yVaultV2,
    VAULT_TYPE: "experimental",
    VAULT_ADDR: "0xFD0877d9095789cAF24c98F7CCe092fa8E120775",
    WANT_ADDR: "0x0000000000085d4780B73119b644AE5ecd22b376",
    WANT_SYMBOL: "TUSD",
    COINGECKO_SYMBOL: "true-usd",
    VAULT_DEV: "fp_crypto",
    BLOCK_ACTIVATED: 1606599919,
    VAULT_STATUS: "active",
    CHAIN_ID: 1,
  },
});
