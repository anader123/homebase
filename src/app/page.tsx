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
      label: "Memecoins",
    },
    {
      action: "post",
      label: "Trending Mints",
    },
    {
      action: "post",
      label: "NFT Projects",
    },
    {
      action: "post",
      label: "BasePaint",
    },
  ],
  image: "https://basepaint.xyz/api/og",
  postUrl: "http://localhost:3000/api/frame",
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <NetworkStats />
      <TrendingMints />
      <MemeCoins />
      <NftProjects />
      <BasePaint />
      <YellowCollective />
      <TopBounties />
    </main>
  );
}
