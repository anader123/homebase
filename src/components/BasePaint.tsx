"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function BasePaint() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchBasePaints"],
    queryFn: () => apiFetcher("basepaint"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch BasePaint</div>;

  return (
    <main className="">
      <div className="bg-darkgray p-6 rounded-md">
        <h2 className="py-2 text-2xl">BasePaint</h2>
        <div className="">
          <Image
            src={data.image}
            alt={data.name}
            layout="responsive"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>{" "}
        <div className="mt-2">
          <div>
            <p>Day #{data.tokenId}</p>
            <p>Theme:</p>
          </div>
          <button className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4">
            Mint
          </button>
        </div>
      </div>
    </main>
  );
}
