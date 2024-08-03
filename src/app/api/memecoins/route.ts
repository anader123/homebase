import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const param = "based-brett,degen-base,toshi,higher,mfercoin";

  const encodedIds = encodeURIComponent(param);
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodedIds}&vs_currencies=usd&x_cg_demo_api_key=${process.env.CG_API_KEY}`;

  try {
    const coins = await fetch(url);

    if (!coins.ok) {
      const errorDetails = await coins.text();
      console.error("Error fetching data:", {
        status: coins.status,
        statusText: coins.statusText,
        details: errorDetails,
      });
      return NextResponse.json(
        { error: "Error fetching data", details: errorDetails },
        { status: coins.status }
      );
    }

    const data = await coins.json();

    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Network error or other issue:", error);
    return NextResponse.json(
      { error: "Network error or other issue" },
      { status: 500 }
    );
  }
}
