"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { abis } from "@/constants/constants";
import { Transition } from "@headlessui/react";
import Stepper from "./Stepper";
import classNames from "classnames";
import { formatEther } from "viem";

const BUTTON_CLASS = classNames(
  "bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4"
);
export default function Moshicam() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMoshicam"],
    queryFn: () => apiFetcher("moshicam"),
    staleTime: 1000 * 60 * 10, // 10 mins
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch Moshicam</div>;

  return (
    <main className="flex flex-col bg-darkgray p-6 rounded-md">
      <h2 className="mb-2 text-xl">Moshicam</h2>
      <div className="rounded-md flex-grow">
        <img
          src={data.previews.image_medium_url}
          alt={data.contract_address}
          className="rounded-md bg-gray-800 border border-gray-700"
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
            address: data.contract_address as `0x${string}`,
            image: data.previews.image_medium_url,
            tokenId: data.token_id,
            name: data.name,
          }}
        />
      </div>
    </main>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    name: string;
    image: string;
    tokenId: string;
    address: `0x${string}`;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, details }) => {
  const [howMany, setHowMany] = useState(1);
  const write = useWriteContract();
  const { address } = useAccount();

  const price = useReadContract({
    address: details.address as `0x${string}`,
    abi: abis.moshicam,
    functionName: "mintPrice",
  });

  useEffect(() => {
    if (write.isSuccess) {
      setHowMany(1);
    }
  }, [write.isSuccess]);

  return (
    <Transition show={isOpen}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <Transition.Child
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="bg-black rounded-lg shadow-lg p-8 max-w-lg w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-white text-2xl mb-2">{details.name}</h3>
              <img src={details.image} alt={details.name} />
              <div>
                <Stepper
                  value={howMany}
                  onChange={(newHowMany) => {
                    setHowMany(newHowMany);
                  }}
                />
              </div>
              <button
                disabled={write.isPending}
                onClick={() =>
                  write.writeContract({
                    address: details.address,
                    abi: abis.moshicam,
                    functionName: "collect",
                    args: [address, Number(details.tokenId), howMany],
                    value:
                      BigInt((price.data as string) ?? 26000000000000000) *
                      BigInt(howMany),
                  })
                }
                className={`${BUTTON_CLASS}`}
              >
                Mint
              </button>
              <div className="w-full flex flex-col items-center mt-2 gap-2">
                <div className="text-gray-400 text-sm">
                  Total:{" "}
                  {formatEther(
                    BigInt(howMany) * BigInt((price.data as string) ?? 0)
                  )}{" "}
                  ETH
                </div>
                {write.isSuccess && (
                  <a
                    href={`https://base.blockscout.com/tx/${write!.data}`}
                    className="text-white underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transaction
                  </a>
                )}
                {write.error && (
                  <div
                    title={write.error.message}
                    className="text-red-500 font-roboto text-xs max-w-sm line-clamp-2"
                  >
                    {toHumanErrorMessage(write.error.message)}
                  </div>
                )}
              </div>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 font-bold hover:text-gray-600"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

function toHumanErrorMessage(message?: string | null): string | null {
  if (!message) {
    return null;
  }

  if (message.includes("exceeds the balance")) {
    return "You do not have enough ETH to mint.";
  }

  if (message.includes("User rejected")) {
    return "User rejected the request.";
  }

  if (message.includes("Connector not connected")) {
    return "Wallet not connected. Please connect wallet.";
  }

  return message;
}
