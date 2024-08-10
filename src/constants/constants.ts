import classNames from "classnames";

export const BASEPAINT_START = "2023-08-09T16:42:00.000Z";
export const SPEEDTRACER_START = "2024-01-09T12:00:00.000Z";

export const BUTTON_CLASS = classNames(
  "bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4"
);

export const CONTRACT_ADDRESSES: Record<string, `0x${string}`> = {
  speedtracer: "0xaa4d3bc0fc9b7e2e6253ed83efb5dce9a21ae1c9",
  basepaint: "0xba5e05cb26b78eda3a2f8e3b3814726305dcac83",
  basepaintRewards: "0xaff1A9E200000061fC3283455d8B0C7e3e728161",
  yellowcollectiveAuction: "0x0aa23a7e112889c965010558803813710becf263",
};

export const STALE_TIME = 1000 * 60 * 10; // 10 mins

export const NFT_ADDRESSES = [
  "0xa449b4f43d9a33fcdcf397b9cc7aa909012709fd",
  "0xcb28749c24af4797808364d71d71539bc01e76d4",
  "0x13dc8261fce63499aa25deb512bb1827b411b83b",
  "0xba5e05cb26b78eda3a2f8e3b3814726305dcac83",
  "0x2d53d0545cd1275b69040e3c50587e2cc4443a52",
];

export const ABIS = {
  basepaint: [
    {
      inputs: [],
      name: "openEditionPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sendMintsTo",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "count",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "sendRewardsTo",
          type: "address",
        },
      ],
      name: "mintLatest",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
  moshicam: [
    {
      inputs: [],
      name: "mintPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "uint256", name: "quantity", type: "uint256" },
      ],
      name: "collect",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
  yellowcollectiveAuction: [
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "createBid",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
};

export const MEMECOINS = [
  {
    name: "Brett",
    coingeckoName: "based-brett",
    image:
      "https://assets.coingecko.com/coins/images/35529/standard/1000050750.png?1709031995",
  },
  {
    name: "Toshi",
    coingeckoName: "toshi",
    image:
      "https://assets.coingecko.com/coins/images/31126/standard/Toshi_Logo_-_Circular.png?1721677476",
  },
  {
    name: "Degen",
    coingeckoName: "degen-base",
    image:
      "https://assets.coingecko.com/coins/images/34515/standard/android-chrome-512x512.png?1706198225",
  },
  {
    name: "Higher",
    coingeckoName: "higher",
    image:
      "https://assets.coingecko.com/coins/images/36084/standard/200x200logo.png?1710427814",
  },
  {
    name: "mfercoin",
    coingeckoName: "mfercoin",
    image:
      "https://assets.coingecko.com/coins/images/36550/standard/mfercoin-logo.png?1711876821",
  },
];

export const NFT_PROJECTS = [
  {
    name: "Onchain Gaias",
    address: "",
    image:
      "https://i.seadn.io/s/raw/files/0051dce5929fe4f195bf98bb20ea7aa0.jpg?auto=format&dpr=1&w=64",
  },
  {
    name: "Base Gods",
    address: "",
    image:
      "https://i.seadn.io/s/raw/files/5a0d8b395d0288ad816e302ecce9f3cd.gif?auto=format&dpr=1&w=64",
  },
  {
    name: "Based Punks",
    address: "",
    image:
      "https://i.seadn.io/s/raw/files/857e39e54f4fa53eb78d1747e9470478.png?auto=format&dpr=1&w=64",
  },
  {
    name: "BasePaint",
    address: "",
    image:
      "https://i.seadn.io/gcs/files/bb9ca4cd26ea64203f696f42bcdf4bec.png?auto=format&dpr=1&w=64",
  },
  {
    name: "swatches by jvmi",
    address: "",
    image:
      "https://i.seadn.io/s/raw/files/7de0794e14fbf7af9c135a9a52452500.gif?auto=format&dpr=1&w=64",
  },
];
