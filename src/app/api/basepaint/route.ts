import { NextRequest, NextResponse } from "next/server";
import { BASEPAINT_START } from "@/constants/constants";
import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";

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

export async function POST(req: NextRequest): Promise<Response> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const calcToday = (startDate: Date, endDate: Date) => {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  };

  const today = calcToday(new Date(BASEPAINT_START), new Date());
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Back",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        },
        {
          action: "link",
          label: `Mint BasePaint Day #${today}`,
          target: "https://basepaint.xyz/mint",
        },
      ],
      image: {
        src: `https://basepaint.xyz/api/art/image?day=${today}`,
        aspectRatio: "1:1",
      },
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}
