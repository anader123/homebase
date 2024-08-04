"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function MemeCoins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMemeCoins"],
    queryFn: () => apiFetcher("memecoins"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Memecoins</div>;

  return (
    <main className="flex flex-col items-center justify-betwee py-4 sm:w-[50%] rounded-md bg-darkgray">
      <h2 className="text-xl">MemeCoins</h2>
      <div className="flex flex-col items-center justify-between gap-4 mt-4">
        {Object.entries(data).map(([key, value]) => {
          return (
            <div key={`key-${key}`}>
              <p>
                {key}: ${value.usd.toFixed(4)}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
