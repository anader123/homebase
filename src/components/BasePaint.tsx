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

  const theme = data.attributes.filter((x: { trait_type: string }) => {
    return x.trait_type === "Theme";
  });

  return (
    <main className="bg-darkgray p-6 rounded-md">
      <h2 className="mb-2 text-xl">BasePaint</h2>
      <div className="p-1 bg-gray-700 rounded-md">
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
          <p className="text-sm text-gray-400">Theme: {theme[0].value}</p>
        </div>
        <button className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4">
          Mint
        </button>
      </div>
    </main>
  );
}
