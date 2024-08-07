"use client";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { base } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_CB_API_KEY}
        chain={base}
      >
        {children}
      </OnchainKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
