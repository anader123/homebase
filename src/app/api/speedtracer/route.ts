import { NextRequest, NextResponse } from "next/server";
import { speedTracerStart } from "@/constants/constants";
import { speedtracerAddress } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const calcToday = (startDate: Date, endDate: Date) => {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  };

  const today = calcToday(new Date(speedTracerStart), new Date());

  const leaderboardResponse = await fetch(
    `https://www.speedtracer.xyz/api/leaderboard?address=undefined&track=${today}`
  );

  const tokenUrl = `https://api-base.reservoir.tools/tokens/v7?tokens=${speedtracerAddress}:${today}`;
  const tokenResponse = await fetch(tokenUrl, {
    headers: {
      "x-api-key": process.env.RESERVOIR_API_KEY!,
    },
  });

  if (!leaderboardResponse.ok || !tokenResponse.ok) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }

  const leaderboardData = await leaderboardResponse.json();
  const tokenData = await tokenResponse.json();

  console.log(tokenData.tokens[0].token);
  const token = tokenData.tokens[0].token;

  const finalData = {
    name: token.name,
    day: today,
    fastestTime: (leaderboardData[0].time / 1000).toFixed(2),
    image: token.image,
  };
  return NextResponse.json(finalData, { status: 200 });
}
