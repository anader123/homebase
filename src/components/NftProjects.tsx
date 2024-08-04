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
  if (error) return <div>Error: NFT Projects</div>;

  return (
    <main className="flex flex-col items-center justify-betwee py-4 sm:w-[50%] rounded-md bg-darkgray">
      <h2 className="text-xl">NFT Projects</h2>
      <div className="flex flex-col items-center justify-between gap-4 mt-4">
        {data.map((collection: any) => {
          return (
            <div
              className="flex flex-row items-center gap-2"
              key={`key-${collection.name}`}
            >
              <Image
                alt={collection.name}
                src={collection.image}
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{collection.name}</p>
              <p>{collection.floorAskPrice.toFixed(3)} ETH</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
