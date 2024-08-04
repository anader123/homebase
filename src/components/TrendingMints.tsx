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
    <main className="flex flex-col w-full items-center py-8 bg-darkgray rounded-md">
      {/* <h1 className="mb-4 text-xl">Trending Mints</h1> */}
      <div className="flex flex-col sm:flex-row justify-around items-center sm:w-full">
        {data.map((token: any) => {
          return (
            <div key={`key-${token.name}`}>
              <Image
                src={`${token.imageUrl}`}
                alt={token.name}
                width={250}
                height={150}
                className="rounded-md"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
