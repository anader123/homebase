import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const trending = await fetch(
      "https://mint.fun/api/mintfun/feed/trending?range=24h&chain=8453"
    );

    const data = await trending.json();

    const topThreeNFTs = data.collections.slice(0, 3);
    return NextResponse.json(topThreeNFTs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
