import { NextRequest, NextResponse } from "next/server";
import { nftAddresses } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const url = `https://api-base.reservoir.tools/collections/v5?contract=${nftAddresses.join(
    "&contract="
  )}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": process.env.RESERVOIR_API_KEY!,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(
      `Network response was not ok: ${JSON.stringify(errorDetails)}`
    );
  }

  const data = await response.json();
  const nftData = data.collections.map((collection: any) => ({
    name: collection.name,
    floorAskPrice: collection.floorAsk.price.amount.decimal,
    image: collection.image,
  }));

  return NextResponse.json(nftData, { status: 200 });
}
