"use client";
import { apiFetcher } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "@/constants/constants";
import ErrorMessage from "./ErrorMessage";

export default function NetworkStats() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchNetworkStats"],
    queryFn: () => apiFetcher("networkstats"),
    staleTime: STALE_TIME,
  });

  const formattedTvl = (parseFloat(data?.tvlUsd) / 1e9).toFixed(2);
  const formattedTotalTxs = (parseFloat(data?.totalTransactions) / 1e6).toFixed(
    0
  );
  const formattedDailyTxs = (parseFloat(data?.dailyTransactions) / 1e6).toFixed(
    2
  );

  if (isLoading) return <div className="w-full min-h-[50px]"></div>;
  if (error || !data) return <ErrorMessage name={"Base Stats"} />;

  return (
    <main className="hidden sm:flex flex-row items-center justify-between w-full mt-6">
      <div className="flex flex-col items-start">
        <p className="text-gray-400">Total Value Locked</p>
        <p className="sm:text-2xl">${formattedTvl} Billion 💸</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-gray-400">Transactions Per Second</p>
        <p className="sm:text-2xl">{data.dailyTps} TPS ⚡️</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-gray-400">Total Transactions</p>
        <p className="sm:text-2xl">{formattedTotalTxs} Million 📈</p>
      </div>
      {/* <p>Transactions Today: {formattedDailyTxs} Mil</p> */}
    </main>
  );
}
