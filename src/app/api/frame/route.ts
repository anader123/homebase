import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const allowFramegear = process.env.NODE_ENV !== "production";

  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest, {
    allowFramegear,
  });

  //   {
  //     message: {
  //       address: null,
  //       button: 1,
  //       following: false,
  //       input: '',
  //       interactor: {
  //         fid: 0,
  //         custody_address: '0xnotarealaddress',
  //         verified_accounts: [],
  //         verified_addresses: [Object]
  //       },
  //       liked: false,
  //       recasted: false,
  //       state: { serialized: '' },
  //       transaction: null,
  //       valid: true,
  //       raw: { valid: true, action: {} }
  //     },
  //     isValid: true
  //   }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `We love the goat`,
        },
      ],
      image: "https://build-onchain-apps.vercel.app/release/v-0-17.png",
      postUrl: "https://build-onchain-apps.vercel.app/api/frame",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
