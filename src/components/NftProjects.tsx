"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";

export default function NftProjects() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchNftProjects"],
    queryFn: () => apiFetcher("nftprojects"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: NFT Projects</div>;

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
