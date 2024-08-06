"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function Moshicam() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMoshicam"],
    queryFn: () => apiFetcher("moshicam"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Moshicam</div>;

  const randomIndex = Math.floor(Math.random() * 20);
  const moshiToken = data[randomIndex];

  return (
    <main className="bg-darkgray p-6 rounded-md">
      <h2 className="mb-2 text-xl">Moshicam</h2>
      <div className="p-1 m-2 bg-gray-700 rounded-md">
        <img
          src={moshiToken.previews.image_medium_url}
          alt={data.contract_address}
          className="rounded-md"
        />
      </div>
      <div className="mt-2">
        {/* <div>
          <p>Day #{data.tokenId}</p>
          <p className="text-sm text-gray-400">Theme: {theme[0].value}</p>
        </div> */}
        <button className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-1">
          Mint
        </button>
      </div>
    </main>
  );
}
