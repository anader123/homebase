"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function NftProjects() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchNftProjects"],
    queryFn: () => apiFetcher("nftprojects"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex flex-col items-center justify-betwee py-4">
      <h1>NFT Projects</h1>
      <div className="flex flex-col items-center justify-between">
        {data.map((collection: any) => {
          return (
            <div key={`key-${collection.name}`}>
              <p>{collection.name}</p>
              <p>{collection.floorAskPrice} ETH</p>
              <Image
                alt={collection.name}
                src={collection.image}
                width={50}
                height={50}
                className="rounded-sm"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
