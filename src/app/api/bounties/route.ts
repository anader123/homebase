import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const bountiesResponse = await fetch(
      `https://www.bountycaster.xyz/api/v1/bounties/open`
    );

    const bountiesData = await bountiesResponse.json();

    const nonNullPrices = bountiesData.bounties
      .filter(
        (bounty: any) =>
          bounty?.reward_summary?.usd_value != null &&
          bounty?.reward_summary?.usd_value > 20
      )
      .slice(0, 6);

    return NextResponse.json(nonNullPrices, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
