"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function MemeCoins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMemeCoins"],
    queryFn: () => apiFetcher("memecoins"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <main className="flex flex-col items-center justify-betwee py-4">
      <h1>MemeCoins</h1>
      <div className="flex flex-col items-center justify-between">
        {Object.entries(data).map(([key, value]) => {
          return (
            <div key={`key-${key}`}>
              <p>
                {key}: ${value.usd}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
