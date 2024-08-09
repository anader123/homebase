import { NextRequest, NextResponse } from "next/server";
import {
  BASEPAINT_START,
  CONTRACT_ADDRESSES,
  ABIS,
} from "@/constants/constants";
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
  FrameTransactionResponse,
  FrameValidationData,
} from "@coinbase/onchainkit/frame";
import { base } from "viem/chains";
import { encodeFunctionData, parseEther, zeroAddress } from "viem";

export async function GET(req: NextRequest) {
  const today = calcToday(new Date(BASEPAINT_START), new Date());

  const response = await fetch(
    `https://basepaint.xyz/api/art/${today.toString(16)}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const searchParams = req.nextUrl.searchParams;
  const isMint = searchParams.get("mint");

  if (isMint === "true") {
    return getMintResponse(message);
  } else {
    return getDefaultResponse();
  }
}

async function getDefaultResponse(): Promise<NextResponse> {
  const today = calcToday(new Date(BASEPAINT_START), new Date());
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Back",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        },
        {
          action: "tx",
          label: `Mint Day #${today}`,
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/basepaint?mint=true`,
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tx-success`,
        },
      ],
      image: {
        src: `https://basepaint.xyz/api/art/image?day=${today}`,
        aspectRatio: "1:1",
      },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}

async function getMintResponse(
  message: FrameValidationData
): Promise<NextResponse> {
  const userAddress = message.address
    ? message.address
    : message.interactor?.verified_addresses?.eth_addresses?.[0] ||
      message.interactor?.custody_address;

  const data = encodeFunctionData({
    abi: ABIS.basepaint,
    functionName: "mintLatest",
    args: [userAddress, 1, zeroAddress],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      data,
      to: CONTRACT_ADDRESSES.basepaintRewards,
      value: parseEther("0.0026").toString(),
    },
  };
  return NextResponse.json(txData);
}

const calcToday = (startDate: Date, endDate: Date) => {
  const differenceInMs = endDate.getTime() - startDate.getTime();
  return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
};
