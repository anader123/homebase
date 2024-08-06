import { NextRequest, NextResponse } from "next/server";
import { memeCoins } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const param = "based-brett,degen-base,toshi,higher,mfercoin";

  const encodedIds = encodeURIComponent(param);
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodedIds}&vs_currencies=usd&x_cg_demo_api_key=${process.env.CG_API_KEY}&include_market_cap=true&include_24hr_change=true`;

  try {
    const coins = await fetch(url);

    if (!coins.ok) {
      const errorDetails = await coins.text();
      return NextResponse.json(
        { error: "Error fetching data", details: errorDetails },
        { status: coins.status }
      );
    }

    const data = await coins.json();

    const updatedMemeCoins = memeCoins
      .map((coin) => {
        return {
          ...coin,
          priceData: data[coin.coingeckoName],
        };
      })
      .sort((a, b) => {
        return b.priceData.usd_market_cap - a.priceData.usd_market_cap;
      });

    return NextResponse.json(updatedMemeCoins, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Network error or other issue" },
      { status: 500 }
    );
  }
}
