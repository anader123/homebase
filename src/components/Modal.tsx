import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Stepper from "./Stepper";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { CONTRACT_ADDRESSES } from "@/constants/constants";
import { formatEther, zeroAddress, parseEther } from "viem";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { BUTTON_CLASS } from "@/constants/constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    name: string;
    image: string;
    tokenId: string;
    abi: any;
    readAddress?: `0x${string}`;
    readFunctionName?: string;
    writeAddress: `0x${string}`;
    writeFunctionName: string;
    highestEthBid?: string;
  };
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, details }) => {
  const [howMany, setHowMany] = useState(1);
  const [howMuch, setHowMuch] = useState<string | undefined>();
  const [isBidValid, setIsBidValid] = useState(true);
  const write = useWriteContract();
  const { isConnected, address } = useAccount();
  const isMint =
    details.writeAddress !== CONTRACT_ADDRESSES.yellowcollectiveAuction;

  const price = useReadContract({
    address: details.readAddress,
    abi: details.abi,
    functionName: details.readFunctionName,
    query: {
      enabled: !!details.readFunctionName,
    },
  });

  let args: any[];
  if (details.writeAddress === CONTRACT_ADDRESSES.basepaintRewards) {
    args = [address, howMany, zeroAddress]; // BasePaint Mint
  } else if (
    details.writeAddress === CONTRACT_ADDRESSES.yellowcollectiveAuction
  ) {
    args = [details.tokenId]; // Yellow Collective
  } else {
    args = [address, Number(details.tokenId), howMany]; // Moshicam
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHowMuch(value);

    const enteredBid = parseFloat(value);
    const highestBid = parseFloat(details.highestEthBid || "0");
    setIsBidValid(enteredBid * 1.1 > highestBid);
  };

  useEffect(() => {
    if (write.isSuccess && isMint) {
      setHowMany(1);
    }
  }, [write.isSuccess]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

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
                {isMint ? (
                  <div>
                    <Stepper
                      value={howMany}
                      onChange={(newHowMany) => {
                        setHowMany(newHowMany);
                      }}
                    />
                    <p className="text-gray-400 text-sm w-full">
                      Total:{" "}
                      {formatEther(
                        BigInt(howMany) * BigInt((price.data as string) ?? 0)
                      )}{" "}
                      ETH
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <input
                      type="number"
                      className="text-white w-full rounded-sm mt-4 border border-white bg-black p-1"
                      value={howMuch}
                      placeholder={`Ξ ${
                        parseFloat(details.highestEthBid!) * 1.1
                      } ETH or more`}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm text-gray-400">
                      Highest Bid: {details.highestEthBid} ETH
                    </span>
                    {!isBidValid && (
                      <span className="text-sm text-red-500 w-full text-center">
                        Your bid must be higher by 10%
                      </span>
                    )}
                  </div>
                )}
                {write.isSuccess && (
                  <div className="text-center">
                    <a
                      href={`https://base.blockscout.com/tx/${write!.data}`}
                      className="text-blue-500 text-lg font-bold underline hover:opacity-80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${
                        details.writeAddress !==
                        CONTRACT_ADDRESSES.yellowcollectiveAuction
                          ? "Mint"
                          : "Bid"
                      } successful!`}
                    </a>
                  </div>
                )}
              </div>
              {isConnected ? (
                <button
                  onClick={() => {
                    const value = isMint
                      ? BigInt((price.data as string) ?? "0") * BigInt(howMany)
                      : parseEther(howMuch || "0");

                    write.writeContract({
                      address: details.writeAddress,
                      abi: details.abi,
                      functionName: details.writeFunctionName,
                      args: args,
                      value,
                    });
                  }}
                  className={`${BUTTON_CLASS}`}
                  disabled={isMint ? false : !isBidValid}
                >
                  {details.writeAddress !==
                  CONTRACT_ADDRESSES.yellowcollectiveAuction
                    ? "Mint"
                    : "Bid"}
                </button>
              ) : (
                <ConnectWallet
                  className={`${BUTTON_CLASS} hover:bg-blue-600 font-normal`}
                />
              )}

              <div className="w-full flex flex-col items-center justify-center mt-2 gap-2">
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
