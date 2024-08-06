"use client";
import { apiFetcher } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function TopBounties() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTopBounties"],
    queryFn: () => apiFetcher("bounties"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Bounties</div>;

  return (
    <main className="flex flex-row items-center justify-center w-full">
      <div className="flex flex-col sm:flex-row items-start w-full gap-4 ">
        {data.map((bounty: any) => {
          return (
            <div
              className="bg-darkgray p-2 rounded-md w-full"
              key={`key-${bounty.title}`}
            >
              <div className="flex flex-row gap-1 items-center">
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
                    (${bounty.reward_summary.usd_value})
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-2 my-2">
                {bounty.tag_slugs.map((slug: string, index: number) => {
                  return (
                    <p className="text-xs px-1 bg-gray-600 rounded" key={index}>
                      {slug}
                    </p>
                  );
                })}
              </div>
              <p className="text-sm">{bounty.title}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
