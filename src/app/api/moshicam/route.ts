import { NextRequest, NextResponse } from "next/server";
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";

export async function GET(req: NextRequest) {
  const data = await fetchLatestMoshi();
  const randomIndex = Math.floor(Math.random() * 20);
  const randomMint = data.tokens[randomIndex];

  return NextResponse.json(randomMint, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const data = await fetchLatestMoshi();
  const randomIndex = Math.floor(Math.random() * 20);
  const randomMint = data.tokens[randomIndex];

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: data.status });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Back",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        },
        {
          action: "tx",
          label: `Mint Moshicam`,
          target: "",
        },
      ],
      image: {
        src: `${randomMint.image}`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}

async function fetchLatestMoshi() {
  const response = await fetch(
    `https://api.moshi.cam/api/v1/feed/latest-mints?last=20`
  );

  if (!response.ok) {
    return { error: "Error fetching data", status: response.status };
  }

  const data = await response.json();
  return data;
}
