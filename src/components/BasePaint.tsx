"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { useState } from "react";
import { Modal } from "./Modal";
import { ABIS, CONTRACT_ADDRESSES, STALE_TIME } from "@/constants/constants";
import { BUTTON_CLASS } from "@/constants/constants";

export default function BasePaint() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchBasePaints"],
    queryFn: () => apiFetcher("basepaint"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch BasePaint</div>;

  const theme = data.attributes.filter((x: { trait_type: string }) => {
    return x.trait_type === "Theme";
  });

  return (
    <main className="flex flex-col bg-darkgray rounded-md">
      <div className="flex flex-col items-start justify-between w-full p-6 flex-grow">
        <h2 className="text-xl">BasePaint</h2>
        <Image
          src={data.image}
          alt={data.name}
          layout="responsive"
          width={400}
          height={400}
          className="rounded-lg p-1 bg-gray-800 border border-gray-700"
        />
        <div className="w-full">
          <div>
            <p>Day #{data.tokenId}</p>
            <p className="text-sm text-gray-400">Theme: {theme[0].value}</p>
          </div>
          <button onClick={() => openModal()} className={BUTTON_CLASS}>
            Mint
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            details={{
              name: data.name,
              image: data.image,
              tokenId: data.tokenId,
              abi: ABIS.basepaint,
              readAddress: CONTRACT_ADDRESSES.basepaint,
              readFunctionName: "openEditionPrice",
              writeAddress: CONTRACT_ADDRESSES.basepaintRewards,
              writeFunctionName: "mintLatest",
            }}
          />
        </div>
      </div>
    </main>
  );
}
