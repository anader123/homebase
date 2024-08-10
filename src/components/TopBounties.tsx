"use client";
import { apiFetcher } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { STALE_TIME } from "@/constants/constants";

export default function TopBounties() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTopBounties"],
    queryFn: () => apiFetcher("bounties"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <></>;
  if (error || !data) return <div>Error: Failed to fetch Bounties</div>;

  return (
    <main className="w-full p-6 bg-darkgray rounded-md">
      <h2 className="text-xl mb-2">Open Bounties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 w-full gap-y-4">
        {data.map((bounty: any) => {
          return (
            <a
              href={`https://www.bountycaster.xyz/bounty/${bounty.platform.hash}`}
              className="block bg-gray-800 p-2 rounded-md w-full hover:opacity-80"
              key={`key-${bounty.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-row gap-1 items-center ">
                <img
                  src={`${bounty.reward_summary.token.image_url}`}
                  alt={bounty.token_symbol_display}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p>
                  {Number(bounty.reward_summary.unit_amount).toLocaleString()}
                </p>
                <p className="uppercase">{bounty.token_symbol_display}</p>
                {bounty.token_symbol_display !== "USDC" && (
                  <p className="text-sm text-gray-400">
                    ($
                    {Number(
                      parseFloat(bounty.reward_summary.usd_value).toFixed(0)
                    ).toLocaleString()}
                    )
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-2 my-2 min-h-[1rem]">
                {bounty.tag_slugs.length !== 0 ? (
                  bounty.tag_slugs.map((slug: string, index: number) => {
                    return (
                      <p
                        className="text-xs px-1 bg-gray-600 rounded"
                        key={index}
                      >
                        {slug}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-xs px-1 bg-gray-600 rounded">misc </p>
                )}
              </div>

              <p className="text-sm text-gray-400">{bounty.title}</p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
