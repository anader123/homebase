import { NextRequest, NextResponse } from "next/server";
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
  FrameTransactionResponse,
  FrameValidationData,
} from "@coinbase/onchainkit/frame";
import { encodeFunctionData, parseEther } from "viem";
import { ABIS } from "@/constants/constants";
import { base } from "viem/chains";

export async function GET(req: NextRequest) {
  const data = await fetchLatestMoshi();
  const randomIndex = Math.floor(Math.random() * 20);
  const randomMint = data.tokens[randomIndex];

  return NextResponse.json(randomMint, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const url = new URL(frameRequest.untrustedData.url);
  const isMint = url.searchParams.get("mint");

  if (isMint === "true") {
    const contractAddress =
      (url.searchParams.get("contract") as `0x${string}`) ||
      ("0x" as `0x${string}`);
    const tokenId = url.searchParams.get("token");

    return getMintResponse(message, Number(tokenId), contractAddress);
  } else {
    return getDefaultResponse();
  }
}

async function fetchLatestMoshi() {
  const response = await fetch(
    `https://api.moshi.cam/api/v1/feed/latest-mints?last=20`
  );

  if (!response.ok) {
    return { error: "Error fetching data", status: response.status };
  }

  const data = await response.json();
  return data;
}

async function getDefaultResponse(): Promise<Response> {
  const data = await fetchLatestMoshi();
  const randomIndex = Math.floor(Math.random() * 20);
  const randomMint = data.tokens[randomIndex];

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Back",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        },
        {
          action: "mint",
          label: `Mint`,
          target: `eip155:${base.id}:${randomMint.contract_address}:${randomMint.token_id}`,
        },
        {
          action: "tx",
          label: `Mint in Wallet`,
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/moshicam?mint=true&contract=${randomMint.contract_address}&token=${randomMint.token_id}`,
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tx-success`,
        },
      ],
      image: {
        src: `https://moshi.cam/api/og?imageUrl=${randomMint.previews.image_opengraph_url}&useSquareAspectRatio=1&bg=dark`,
        aspectRatio: "1:1",
      },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}

async function getMintResponse(
  message: FrameValidationData,
  tokenId: number,
  contractAddress: `0x${string}`
): Promise<Response> {
  const userAddress = message.address
    ? message.address
    : message.interactor?.verified_addresses?.eth_addresses?.[0] ||
      message.interactor?.custody_address;

  const data = encodeFunctionData({
    abi: ABIS.moshicam,
    functionName: "collect",
    args: [userAddress, tokenId, 1],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: contractAddress,
      value: parseEther("0.0001").toString(),
    },
  };
  return NextResponse.json(txData);
}
