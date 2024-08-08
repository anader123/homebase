import { NextRequest, NextResponse } from "next/server";
import { BASEPAINT_START } from "@/constants/constants";

export async function GET(req: NextRequest) {
  const calcToday = (startDate: Date, endDate: Date) => {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  };

  const today = calcToday(new Date(BASEPAINT_START), new Date());

  const response = await fetch(
    `https://basepaint.xyz/api/art/${today.toString(16)}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}
