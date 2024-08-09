import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(frameRequest);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Home",
          target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        },
        {
          action: "link",
          label: "View Tx",
          target: `https://base.blockscout.com/tx/${
            frameRequest?.untrustedData?.transactionId || "--"
          }`,
        },
      ],
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/tx-success.png`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
