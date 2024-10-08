"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { useState } from "react";
import { Modal } from "./Modal";
import { ABIS, STALE_TIME } from "@/constants/constants";
import LoadingAnimation from "./LoadingAnimation";
import ErrorMessage from "./ErrorMessage";

export default function Moshicam() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMoshicam"],
    queryFn: () => apiFetcher("moshicam"),
    staleTime: STALE_TIME,
  });

  if (isLoading) return <LoadingAnimation />;
  if (error || !data) return <ErrorMessage name={"Moshicam"} />;

  return (
    <main className="flex flex-col bg-darkgray p-6 rounded-md gap-2">
      <h2 className="text-xl">Moshicam</h2>
      <div className="rounded-md flex-grow">
        <img
          src={data.previews.image_medium_url}
          alt={data.contract_address}
          className="rounded-md bg-gray-800 border border-gray-700 w-full"
        />
      </div>
      <div className="mt-2">
        <button
          onClick={() => openModal()}
          className="bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-1"
        >
          Mint
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          details={{
            name: data.name,
            image: data.previews.image_medium_url,
            tokenId: data.token_id,
            abi: ABIS.moshicam,
            readAddress: data.contract_address as `0x${string}`,
            readFunctionName: "mintPrice",
            writeAddress: data.contract_address as `0x${string}`,
            writeFunctionName: "collect",
          }}
        />
      </div>
    </main>
  );
}
