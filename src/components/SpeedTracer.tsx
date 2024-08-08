"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function SpeedTracer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchSpeedTracer"],
    queryFn: () => apiFetcher("speedtracer"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch BasePaint</div>;

  return (
    <main className="flex flex-col bg-darkgray p-6 rounded-md gap-4">
      <h2 className="text-xl">SpeedTracer</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-md flex justify-center w-full flex-grow">
        <img src={data.image} alt={data.name} className="rounded-lg w-[62%] " />
      </div>
      <div className="mt-2">
        <div>
          <p>{data.name}</p>
          <p className="text-sm text-gray-400">
            Current Record: {data.fastestTime} seconds
          </p>
        </div>
        <button
          onClick={() => {
            window.open(
              "https://www.speedtracer.xyz/",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4"
        >
          Race
        </button>
      </div>
    </main>
  );
}
