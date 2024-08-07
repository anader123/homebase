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
  const randomIndex = Math.floor(Math.random() * 20);
  const randomMint = data.tokens[randomIndex];

  return NextResponse.json(randomMint, { status: 200 });
}
