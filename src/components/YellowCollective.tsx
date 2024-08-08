"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { ABIS, CONTRACT_ADDRESSES, STALE_TIME } from "@/constants/constants";
import { useState } from "react";
import { Modal } from "./Modal";
import { BUTTON_CLASS } from "@/constants/constants";

export default function YellowCollective() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchYellowCollective"],
    queryFn: () => apiFetcher("yellowcollective"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Yellow Collective</div>;

  return (
    <main className="flex flex-col bg-darkgray rounded-md">
      <div className="flex flex-col items-start justify-between w-full p-6 flex-grow">
        <h2 className="text-xl">Yellow Collective</h2>
        <Image
          src={`${data.image}`}
          alt={data.name}
          layout="responsive"
          width={400}
          height={400}
          className="rounded-lg p-1 bg-gray-800 border border-gray-700"
        />

        <div className="w-full">
          <div>
            <p>{data.name}</p>
            <p className="text-sm text-gray-400">
              Highest Bid: {data.highestEthBid} ETH
            </p>
          </div>
          <button onClick={() => openModal()} className={BUTTON_CLASS}>
            Bid
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            details={{
              name: data.name,
              image: data.image,
              tokenId: data.tokenId.toString(),
              abi: ABIS.yellowcollectiveAuction,
              writeAddress: CONTRACT_ADDRESSES.yellowcollectiveAuction,
              writeFunctionName: "createBid",
              highestEthBid: data.highestEthBid,
            }}
          />
        </div>
      </div>
    </main>
  );
}
