import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const baseTvlResponse = await fetch(`https://l2beat.com/api/tvl/base.json`);
    const baseStatsResponse = await fetch(
      `https://base.blockscout.com/api/v2/stats`
    );

    const baseTvlData = await baseTvlResponse.json();
    const baseStatsData = await baseStatsResponse.json();

    const dailyTransactions = parseInt(baseStatsData.transactions_today, 10);
    const dailyTps = Math.round(dailyTransactions / 86400);
    const tvlUsd =
      baseTvlData.hourly.data[baseTvlData.hourly.data.length - 1][1];

    return NextResponse.json(
      {
        tvlUsd,
        dailyTps,
        dailyTransactions,
        totalTransactions: parseInt(baseStatsData.total_transactions, 10),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
