import Header from "@/components/Header";
import BasePaint from "@/components/BasePaint";
import YellowCollective from "@/components/YellowCollective";
import TrendingMints from "@/components/TrendingMints";
import NetworkStats from "@/components/NetworkStats";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <NetworkStats />
      <TrendingMints />
      <BasePaint />
      <YellowCollective />
    </main>
  );
}
