import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const bounties = await fetch(
    `https://www.bountycaster.xyz/api/v1/bounties/open`
  );

  if (!bounties.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: bounties.status }
    );
  }

  const bountiesData = await bounties.json();
  const nonNullPrices = bountiesData.bounties
    .filter(
      (bounty: any) =>
        bounty?.reward_summary?.usd_value != null &&
        bounty?.reward_summary?.usd_value > 20
    )
    .slice(0, 6);

  return NextResponse.json(nonNullPrices, { status: 200 });
}
