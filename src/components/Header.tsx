"use client";
import Link from "next/link";
import Image from "next/image";
import WalletComponents from "@/components/WalletComponents";

const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-white text-white py-4 w-full">
      <nav className="flex justify-between items-center px-5 sm:px-10">
        <div className="text-2xl flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            HomeBase
          </Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link
              href="https://www.base.org/"
              className="hover:underline hover:opacity-70 hidden sm:flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Base
            </Link>
          </li>
          <li>
            <Link
              href="https://www.base.org/ecosystem"
              className="hover:underline hover:opacity-70 hidden sm:flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apps
            </Link>
          </li>
          <li>
            <Link
              href="https://base.blockscout.com"
              className="hover:underline hover:opacity-70 hidden sm:flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorer
            </Link>
          </li>
          <WalletComponents />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
