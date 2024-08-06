import {
  getFrameHtmlResponse,
  getFrameMessage,
  FrameRequest,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { basePaintStart } from "@/constants/constants";

export const fetchInternalData = async (path: string) => {
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
  const allowFramegear = process.env.NODE_ENV !== "production";

  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest, {
    allowFramegear,
  });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  if (message?.button === 1) {
    const calcToday = (startDate: Date, endDate: Date) => {
      const differenceInMs = endDate.getTime() - startDate.getTime();
      return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    };

    const today = calcToday(new Date(basePaintStart), new Date());
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
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
        postUrl: "https://build-onchain-apps.vercel.app/api/frame",
      })
    );
  }

  if (message?.button === 2) {
    const trending = await fetch(
      "https://mint.fun/api/mintfun/feed/trending?range=24h&chain=8453"
    );

    const data = await trending.json();
    const topMint = data.collections[0];

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            action: "link",
            label: `${topMint.name}`,
            target: `https://mint.fun/base/${topMint.contract.slice(5)}`,
          },
        ],
        image: {
          src: `${topMint.imageUrl}`,
          aspectRatio: "1:1",
        },
        postUrl: "https://build-onchain-apps.vercel.app/api/frame",
      })
    );
  }

  if (message?.button === 3) {
    const yellowCollectiveData = await fetchInternalData("yellowcollective");
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            action: "link",
            label: `Bid on YC Noun #${yellowCollectiveData.tokenId}`,
            target: "https://www.yellowcollective.xyz/",
          },
        ],
        input: {
          text: "Bid Amount",
        },
        image: {
          src: `${yellowCollectiveData.image}`,
          aspectRatio: "1:1",
        },
        postUrl: "https://build-onchain-apps.vercel.app/api/frame",
      })
    );
  }

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
