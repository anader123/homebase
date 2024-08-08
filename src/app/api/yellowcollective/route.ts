import { NextRequest, NextResponse } from "next/server";
import { formatUnits } from "viem";

export async function GET(req: NextRequest) {
  const auction = await fetch(
    "https://www.yellowcollective.xyz/api/auction/0x0aa23A7E112889C965010558803813710beCF263"
  );

  if (!auction.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: auction.status }
    );
  }

  const auctionData = await auction.json();

  const token = await fetch(
    `https://www.yellowcollective.xyz/api/token/0x220e41499CF4d93a3629a5509410CBf9E6E0B109/${auctionData.tokenId}`
  );

  const tokenData = await token.json();

  const ethBid = formatUnits(BigInt(parseInt(auctionData.highestBid, 16)), 18);

  return NextResponse.json(
    {
      tokenId: parseInt(auctionData.tokenId, 16),
      name: `Collective Noun #${parseInt(auctionData.tokenId, 16)}`,
      image: tokenData.image,
      highestBidder: auctionData.highestBidder,
      highestEthBid: ethBid,
    },
    { status: 200 }
  );
}
