import { NextResponse } from "next/server";
import { MEMECOINS } from "@/constants/constants";

export async function GET(): Promise<NextResponse> {
  const param = "based-brett,degen-base,toshi,higher,mfercoin";
  const encodedIds = encodeURIComponent(param);
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodedIds}&vs_currencies=usd&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}&include_market_cap=true&include_24hr_change=true`;

  try {
    const coinsResponse = await fetch(url);

    const data = await coinsResponse.json();

    const updatedMemeCoins = MEMECOINS.map((coin) => {
      return {
        ...coin,
        priceData: data[coin.coingeckoName],
      };
    }).sort((a, b) => {
      return b.priceData.usd_market_cap - a.priceData.usd_market_cap;
    });

    return NextResponse.json(updatedMemeCoins, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
