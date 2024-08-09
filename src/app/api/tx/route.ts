import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther, zeroAddress } from "viem";
import { base } from "viem/chains";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { ABIS, CONTRACT_ADDRESSES } from "@/constants/constants";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    // neynarApiKey: "NEYNAR_ONCHAIN_KIT",
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

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

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
