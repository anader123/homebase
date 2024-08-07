import React from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Badge,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import classNames from "classnames";
import { useAccount } from "wagmi";

const BUTTON_CLASS = classNames(
  "bg-blue-600 px-4 py-2 rounded-md w-full border-white hover:opacity-70 mt-4"
);

const WalletComponents: React.FC = () => {
  const { isConnected } = useAccount();
  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet
          className={`${BUTTON_CLASS} ${
            !isConnected
              ? "bg-blue-600 hover:bg-blue-600"
              : "bg-white hover:bg-gray-400"
          } mt-0 font-normal`}
        >
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity
            className="px-4 pt-3 pb-2"
            hasCopyAddressOnClick
            schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
          >
            <Avatar />
            <Name>
              <Badge />
            </Name>
            <Address className={color.foregroundMuted} />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
};

export default WalletComponents;
