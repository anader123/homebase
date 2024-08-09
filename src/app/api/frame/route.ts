import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { BASEPAINT_START } from "@/constants/constants";

const fetchInternalData = async (path: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${path}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch internal data");
  }

  return response.json();
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "BasePaint",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/basepaint`,
        },
        {
          action: "post",
          label: "Trending Mint",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trendingmints`,
        },
        {
          action: "post",
          label: "Yellow Collective Auction",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/yellowcollective`,
        },
        {
          action: "post",
          label: "Moshicam",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/moshicam`,
        },
      ],
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
