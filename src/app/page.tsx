import Header from "@/components/Header";
import BasePaint from "@/components/BasePaint";
import YellowCollective from "@/components/YellowCollective";
import TrendingMints from "@/components/TrendingMints";
import NetworkStats from "@/components/NetworkStats";
import TopBounties from "@/components/TopBounties";
import MemeCoins from "@/components/MemeCoins";
import NftProjects from "@/components/NftProjects";
import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: "post",
      label: "BasePaint",
    },
    {
      action: "post",
      label: "Trending Mint",
    },
    {
      action: "post",
      label: "NFT Projects",
    },
    {
      action: "post",
      label: "Yellow Collective Auction",
    },
  ],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "HomeBase",
  description: "All Base culture in one place.",
  openGraph: {
    title: "HomeBase",
    description: "All Base culture in one place.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "HomeBase OG Image",
      },
    ],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full flex-col items-center mb-5">
      <div className="flex flex-col items-center justify-center">
        <Header />
        <div className="flex flex-col gap-y-6 sm:gap-y-10 items-center justify-center px-4 sm:px-10">
          <NetworkStats />
          <TrendingMints />
          <div className="flex flex-col items-center sm:flex-row sm:gap-x-6 w-full">
            <MemeCoins />
            <NftProjects />
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-6 sm:gap-y-0  sm:gap-x-5 w-full">
            <BasePaint />
            <BasePaint />
            <YellowCollective />
          </div>
          <TopBounties />
        </div>
      </div>
    </main>
  );
}
