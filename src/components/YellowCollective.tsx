"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { formatUnits } from "viem";

export default function YellowCollective() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchYellowCollective"],
    queryFn: () => apiFetcher("yellowcollective"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Yellow Collective</div>;

  const ethBid = formatUnits(BigInt(parseInt(data.highestBid, 16)), 18);

  return (
    <main className="flex flex-col bg-darkgray rounded-md">
      <div className="flex flex-col items-start justify-between w-full p-6 flex-grow">
        <h2 className="mb-2 text-xl">Yellow Collective</h2>
        <Image
          src={`${data.image}`}
          alt={data.name}
          layout="responsive"
          width={400}
          height={400}
          className="rounded-lg p-1 bg-gray-800 border border-gray-700"
        />

        <div className="w-full">
          <div>
            <p>{data.name}</p>
            <p className="text-sm text-gray-400">Current Bid: {ethBid} ETH</p>
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4">
            Bid
          </button>
        </div>
      </div>
    </main>
  );
}
