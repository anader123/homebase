"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function MemeCoins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMemeCoins"],
    queryFn: () => apiFetcher("memecoins"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Memecoins</div>;

  return (
    <main className="flex flex-col items-center justify-between p-6 rounded-md bg-darkgray w-full">
      <div className="w-full flex flex-start">
        <h2 className="text-xl">MemeCoins</h2>
      </div>
      <div className="w-full mt-4">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Coin</th>
              <th className="p-2">Price</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin: any) => (
              <tr key={`key-${coin.name}`} className="bg-gray-800 text-white">
                <td className="p-2 text-center flex items-center">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={30}
                    height={30}
                    className="rounded-full inline-block mr-2"
                  />
                  <span>{coin.name}</span>
                </td>
                <td className="p-2 text-center">
                  ${coin.priceData.usd.toFixed(4)}
                </td>
                <td className="p-2 text-center">
                  $
                  {coin.priceData.usd_market_cap.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td
                  className={`p-2 text-center ${
                    coin.priceData.usd_24h_change < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {coin.priceData.usd_24h_change.toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
