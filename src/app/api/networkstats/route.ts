import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseTvl = await fetch(`https://l2beat.com/api/tvl/base.json`);

  if (!baseTvl.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: baseTvl.status }
    );
  }

  const baseStats = await fetch(`https://base.blockscout.com/api/v2/stats`);

  if (!baseStats.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: baseStats.status }
    );
  }

  const baseTvlData = await baseTvl.json();
  const baseStatsData = await baseStats.json();

  const dailyTransactions = parseInt(baseStatsData.transactions_today, 10);
  const dailyTps = Math.round(dailyTransactions / 86400);
  const tvlUsd = baseTvlData.hourly.data[baseTvlData.hourly.data.length - 1][1];

  return NextResponse.json(
    {
      tvlUsd,
      dailyTps,
      dailyTransactions,
      totalTransactions: parseInt(baseStatsData.total_transactions, 10),
    },
    { status: 200 }
  );
}
