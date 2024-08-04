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
  image: "https://basepaint.xyz/api/og",
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full flex-col items-center">
      <div className="flex flex-col items-center justify-center">
        <Header />
        <div className="flex flex-col gap-y-6 items-center justify-center w-[80%]">
          <NetworkStats />
          <TrendingMints />
          <div className="flex flex-row gap-x-2">
            <MemeCoins />
            <NftProjects />
          </div>
          <div className="flex flex-row w-full">
            <BasePaint />
            <YellowCollective />
          </div>
          <TopBounties />
        </div>
      </div>
    </main>
  );
}
