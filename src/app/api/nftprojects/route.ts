import { NextRequest, NextResponse } from "next/server";
import { NFT_ADDRESSES } from "@/constants/constants";

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
      return b.floorAsk.price.amount.decimal - a.floorAsk.price.amount.decimal;
    })
    .map((collection: any) => ({
      name: collection.name,
      floorAskPrice: collection.floorAsk.price.amount.decimal,
      image: collection.image,
      weeklyChange: collection.floorSaleChange["7day"],
    }));

  return NextResponse.json(nftData, { status: 200 });
}
