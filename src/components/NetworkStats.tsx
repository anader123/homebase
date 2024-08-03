"use client";
import { fetchNetworkStats } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";

export default function NetworkStats() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchNetworkStats"],
    queryFn: fetchNetworkStats,
  });

  const formattedTvl = (parseFloat(data.tvlUsd) / 1e9).toFixed(2);
  const formattedTotalTxs = (parseFloat(data.totalTransactions) / 1e6).toFixed(
    0
  );
  const formattedDailyTxs = (parseFloat(data.dailyTransactions) / 1e6).toFixed(
    2
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex flex-row items-center justify-around py-4">
      <p>TVL: ${formattedTvl} Billion</p>
      <p>Daily TPS: {data.dailyTps}</p>
      <p>Total Transactions: {formattedTotalTxs} Million</p>
      {/* <p>Transactions Today: {formattedDailyTxs} Mil</p> */}
    </main>
  );
}
