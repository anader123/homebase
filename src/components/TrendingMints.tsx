"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function TrendingMints() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTrendingMints"],
    queryFn: () => apiFetcher("trendingmints"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Trending Mints</div>;

  return (
    <main className="flex flex-col w-full items-center p-6 bg-darkgray rounded-md">
      <div className="w-full flex flex-start">
        <h2 className="mb-2 text-xl">Trending Mints</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-around items-center sm:w-full">
        {data.map((token: any) => {
          return (
            <div
              className="flex flex-col items-center gap-2 text-gray-400"
              key={`key-${token.name}`}
            >
              <img
                src={`${token.imageUrl}`}
                alt={token.name}
                width={250}
                height={150}
                className="rounded-md"
              />
              <p>{token.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
