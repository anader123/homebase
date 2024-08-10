"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { STALE_TIME } from "@/constants/constants";
import ErrorMessage from "./ErrorMessage";

export default function NftProjects() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchNftProjects"],
    queryFn: () => apiFetcher("nftprojects"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <></>;
  if (error || !data) return <ErrorMessage name={"NFT Projects"} />;

  return (
    <main className="flex flex-col items-center justify-between p-6 rounded-md bg-darkgray w-full">
      <div className="w-full flex flex-start">
        <h2 className="text-xl">NFT Projects</h2>
      </div>
      <div className="w-full mt-4">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="ml-1 p-2 flex flex-start">
                <p>Project</p>
              </th>
              <th className="p-2">Floor Price</th>
              <th className="p-2  hidden sm:table-cell">7d Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((collection: any) => (
              <tr
                key={`key-${collection.name}`}
                className="bg-gray-800 text-white"
              >
                <td className="p-2 text-left">
                  <div className="flex items-center">
                    <Image
                      alt={collection.name}
                      src={collection.image}
                      width={30}
                      height={30}
                      className="rounded-full inline-block mr-2"
                    />
                    <span>{collection.name}</span>
                  </div>
                </td>
                <td className="p-2 text-center">
                  {collection.floorAskPrice.toFixed(3)} ETH
                </td>
                <td
                  className={`p-2 text-center  hidden sm:table-cell ${
                    collection.weeklyChange < 1
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {collection.weeklyChange.toFixed(2) === "1.00"
                    ? "0.00"
                    : collection.weeklyChange > 1
                    ? `+${((collection.weeklyChange - 1) * 100).toFixed(2)}`
                    : `${((collection.weeklyChange - 1) * 100).toFixed(2)}`}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
