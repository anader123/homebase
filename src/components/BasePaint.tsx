"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "@/utils/fetchers";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Stepper from "./Stepper";
import classNames from "classnames";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { addresses, abis } from "@/constants/constants";
import { formatEther, zeroAddress } from "viem";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

const BUTTON_CLASS = classNames(
  "bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4"
);

export default function BasePaint() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchBasePaints"],
    queryFn: () => apiFetcher("basepaint"),
  });

  if (isLoading) return <></>;
  if (error) return <div>Error: Failed to fetch BasePaint</div>;

  const theme = data.attributes.filter((x: { trait_type: string }) => {
    return x.trait_type === "Theme";
  });

  return (
    <main className="flex flex-col bg-darkgray rounded-md">
      <div className="flex flex-col items-start justify-between w-full p-6 flex-grow">
        <h2 className="mb-2 text-xl">BasePaint</h2>
        <Image
          src={data.image}
          alt={data.name}
          layout="responsive"
          width={400}
          height={400}
          className="rounded-lg p-2 bg-gray-800 border border-gray-700"
        />
        <div className="mt-2 w-full">
          <div>
            <p>Day #{data.tokenId}</p>
            <p className="text-sm text-gray-400">Theme: {theme[0].value}</p>
          </div>
          <button onClick={() => openModal()} className={BUTTON_CLASS}>
            Mint
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} details={data} />
        </div>
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
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, details }) => {
  const [howMany, setHowMany] = useState(1);
  const write = useWriteContract();
  const { address, isConnected } = useAccount();

  const price = useReadContract({
    address: addresses.basepaint,
    abi: abis.basepaint,
    functionName: "openEditionPrice",
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
              {isConnected ? (
                <button
                  onClick={() =>
                    write.writeContract({
                      address: addresses.basepaintRewards,
                      abi: abis.basepaint,
                      functionName: "mintLatest",
                      args: [address, howMany, zeroAddress],
                      value:
                        BigInt((price.data as string) ?? 26000000000000000) *
                        BigInt(howMany),
                    })
                  }
                  className={`${BUTTON_CLASS}`}
                >
                  Mint
                </button>
              ) : (
                <ConnectWallet
                  className={`${BUTTON_CLASS} hover:bg-blue-600 font-normal`}
                />
              )}

              <div className="w-full flex justify-center mt-2 gap-2">
                <div className="text-gray-400 text-sm">
                  Total:{" "}
                  {formatEther(
                    BigInt(howMany) *
                      BigInt((price.data as string) ?? 2600000000000000)
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
