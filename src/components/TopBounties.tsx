"use client";
import { apiFetcher } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";

export default function TopBounties() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchTopBounties"],
    queryFn: () => apiFetcher("bounties"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex flex-row items-center justify-around py-4">
      <div className="flex flex-row items-center justify-between">
        {data.map((bounty: any) => {
          return (
            <div key={`key-${bounty.title}`}>
              <p>{bounty.title}</p>
              <p>USD Amount: ${bounty.reward_summary.usd_value}</p>
              <p>Token: {bounty.token_symbol_display}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
