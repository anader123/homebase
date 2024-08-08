import { NextRequest, NextResponse } from "next/server";
import { NFT_ADDRESSES, NFT_PROJECTS } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const url = `https://api-base.reservoir.tools/collections/v5?sortBy=floorAskPrice&contract=${NFT_ADDRESSES.join(
    "&contract="
  )}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_RESERVOIR_API_KEY!,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      `Network response was not ok: ${JSON.stringify(errorDetails)}`
    );
  }

  const data = await response.json();

  const nftData = data.collections
    .sort((a: any, b: any) => {
      const aPrice = a.floorAsk?.price?.amount?.decimal || 0;
      const bPrice = b.floorAsk?.price?.amount?.decimal || 0;
      return bPrice - aPrice;
    })
    .map((collection: any) => {
      const matchingProjects = NFT_PROJECTS.filter((nft) => {
        return nft.name.toLowerCase() === collection.name.toLowerCase();
      });

      return {
        name: collection.name,
        floorAskPrice: collection.floorAsk?.price?.amount?.decimal || 0,
        image: matchingProjects.length > 0 ? matchingProjects[0].image : "",
        weeklyChange: collection.floorSaleChange?.["7day"] || 0,
      };
    });

  return NextResponse.json(nftData, { status: 200 });
}
