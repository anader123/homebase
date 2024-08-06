import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await fetch(
    `https://api.moshi.cam/api/v1/feed/latest-mints?last=20`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: response.status }
    );
  }
  const data = await response.json();

  const highestRankedMints = data.tokens.sort(
    (a: { leaderboard_rank: number }, b: { leaderboard_rank: number }) => {
      a.leaderboard_rank - b.leaderboard_rank;
    }
  );

  return NextResponse.json(highestRankedMints, { status: 200 });
}
