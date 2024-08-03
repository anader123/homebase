"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchYellowCollective } from "@/utils/fetchers";
import { formatUnits } from "viem";

export default function YellowCollective() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchYellowCollective"],
    queryFn: fetchYellowCollective,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const ethBid = formatUnits(BigInt(parseInt(data.highestBid, 16)), 18);

  return (
    <main className="flex flex-col items-center justify-between">
      <h1>{data.name}</h1>
      <Image src={`${data.image}`} alt={data.name} width={500} height={300} />
      <p>Bidder: {data.highestBidder}</p>
      <p>Current Bid: {ethBid} ETH</p>
    </main>
  );
}
