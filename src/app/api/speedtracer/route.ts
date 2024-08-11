import { NextResponse } from "next/server";
import { SPEEDTRACER_START } from "@/constants/constants";
import { CONTRACT_ADDRESSES } from "@/constants/constants";

export async function GET() {
  try {
    const calcToday = (startDate: Date, endDate: Date) => {
      const differenceInMs = endDate.getTime() - startDate.getTime();
      return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    };

    const today = calcToday(new Date(SPEEDTRACER_START), new Date());

    const leaderboardResponse = await fetch(
      `https://www.speedtracer.xyz/api/leaderboard?address=undefined&track=${today}`
    );

    const tokenUrl = `https://api-base.reservoir.tools/tokens/v7?tokens=${CONTRACT_ADDRESSES.speedtracer}:${today}`;
    const tokenResponse = await fetch(tokenUrl, {
      headers: {
        "x-api-key": process.env.RESERVOIR_API_KEY!,
      },
    });

    const leaderboardResult = await leaderboardResponse.json();
    const tokenResult = await tokenResponse.json();

    let leaderboardData;
    let tokenData;
    if (tokenResult.tokens.length === 0) {
      const tokenUrl = `https://api-base.reservoir.tools/tokens/v7?tokens=${
        CONTRACT_ADDRESSES.speedtracer
      }:${today - 1}`;
      const tokenFallback = await fetch(tokenUrl, {
        headers: {
          "x-api-key": process.env.RESERVOIR_API_KEY!,
        },
      });

      const leaderboardFallback = await fetch(
        `https://www.speedtracer.xyz/api/leaderboard?address=undefined&track=${
          today - 1
        }`
      );
      leaderboardData = await leaderboardFallback.json();
      tokenData = await tokenFallback.json();
    } else {
      leaderboardData = leaderboardResult;
      tokenData = tokenResult;
    }
    const token = tokenData.tokens[0].token;

    const finalData = {
      name: token.name,
      day: today,
      fastestTime:
        leaderboardData[0]?.time == null
          ? "---"
          : (leaderboardData[0].time / 1000).toFixed(2),
      image: token.image,
    };
    return NextResponse.json(finalData, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
