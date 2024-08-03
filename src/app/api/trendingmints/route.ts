import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const trending = await fetch(
    "https://mint.fun/api/mintfun/feed/trending?range=24h&chain=8453"
  );

  if (!trending.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: trending.status }
    );
  }

  const data = await trending.json();

  const topThreeNFTs = data.collections.slice(0, 3);
  return NextResponse.json(topThreeNFTs, { status: 200 });
}
