"use client";
import Link from "next/link";
import WalletComponents from "@/components/WalletComponents";

const Header: React.FC = () => {
  return (
    <header className="border-b-2 border-white text-white py-4 w-full">
      <nav className="flex justify-between items-center px-10">
        <div className="text-lg font-bold">
          <Link href="/">HomeBase</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link
              href="https://www.base.org/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Base
            </Link>
          </li>
          <li>
            <Link
              href="/test"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apps
            </Link>
          </li>
          <li>
            <Link
              href="https://base.blockscout.com"
              className="hover:underline"
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
