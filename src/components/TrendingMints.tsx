"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { STALE_TIME } from "@/constants/constants";

export default function TrendingMints() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTrendingMints"],
    queryFn: () => apiFetcher("trendingmints"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Trending Mints</div>;

  return (
    <main className="flex flex-col w-full items-center p-6 bg-darkgray rounded-md mt-6 sm:mt-0">
      <div className="w-full flex flex-start">
        <h2 className="mb-2 text-xl">Trending Mints</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-around items-center sm:w-full gap-y-8 sm:gap-y-0 mt-4 sm:mt-0">
        {data.map((token: any) => {
          return (
            <div key={`key-${token.name}`}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://mint.fun/base/${token.contract.slice(5)}`}
              >
                <div className="flex flex-col items-center text-gray-400 hover:opacity-80 transform transition-transform duration-300 hover:-translate-y-1 bg-gray-800 p-2 rounded-lg border border-gray-700">
                  <div className="p-2">
                    <img
                      src={`${token.imageUrl}`}
                      alt={token.name}
                      className="rounded-md"
                    />
                  </div>
                  <p className="text-sm text-center">{token.name}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}
