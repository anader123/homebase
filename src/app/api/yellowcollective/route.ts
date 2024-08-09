import { NextRequest, NextResponse } from "next/server";
import { formatUnits } from "viem";
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";

export async function GET(req: NextRequest) {
  const data = await fetchAuctionData();

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const data = await fetchAuctionData();

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
          action: "tx",
          label: `Bid YC Noun #${data.tokenId}`,
          target: "https://basepaint.xyz/mint",
        },
      ],
      image: {
        src: `${data.image}`,
        aspectRatio: "1:1",
      },
      input: { text: `Bid ${Number(data.highestEthBid) * 1.1} ETH or more` },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}

async function fetchAuctionData() {
  const auction = await fetch(
    "https://www.yellowcollective.xyz/api/auction/0x0aa23A7E112889C965010558803813710beCF263"
  );

  if (!auction.ok) {
    return { error: "Error fetching auction data", status: auction.status };
  }

  const auctionData = await auction.json();

  const token = await fetch(
    `https://www.yellowcollective.xyz/api/token/0x220e41499CF4d93a3629a5509410CBf9E6E0B109/${auctionData.tokenId}`
  );

  if (!token.ok) {
    return { error: "Error fetching token data", status: token.status };
  }

  const tokenData = await token.json();
  const ethBid = formatUnits(BigInt(parseInt(auctionData.highestBid, 16)), 18);

  return {
    tokenId: parseInt(auctionData.tokenId, 16),
    name: `YC Noun #${parseInt(auctionData.tokenId, 16)}`,
    image: tokenData.image,
    highestBidder: auctionData.highestBidder,
    highestEthBid: ethBid,
    status: 200,
  };
}
