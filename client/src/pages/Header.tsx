import React from "react";
import { FiSearch } from "react-icons/fi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header: React.FC = () => {
  return (
    <section className="pl-5 pr-5 py-3 bg-black flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center w-full max-w-md px-3 py-1 rounded-md bg-[#1f1f1f] border border-gray-600 text-sm text-white">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search Art Mint"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400"
        />
        <div className="px-1 py-0.1 text-lg text-gray-300 border border-gray-500 rounded bg-gray-500 flex justify-center items-center">
          /
        </div>
      </div>

      {/* Wallet Button */}
      <div className="ml-4">
        <WalletMultiButton >
         
          </WalletMultiButton>
      </div>
    </section>
  );
};

export default Header;
