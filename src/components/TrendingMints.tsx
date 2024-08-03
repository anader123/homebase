"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function TrendingMints() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTrendingMints"],
    queryFn: () => apiFetcher("trendingmints"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <main className="flex flex-col items-center justify-between">
      <h1>Trending Mints</h1>
      <div className="flex flex-row items-center justify-between">
        {data.map((token: any) => {
          return (
            <div key={`key-${token.name}`}>
              <h2>{token.name}</h2>
              <Image
                src={`${token.imageUrl}`}
                alt={token.name}
                width={250}
                height={150}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
