import "@coinbase/onchainkit/styles.css";
import { ReactNode } from "react";
import Providers from "../components/Providers";
import "./globals.css";

export default function Home({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
