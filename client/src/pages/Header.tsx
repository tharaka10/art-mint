import React from "react";
import { FiSearch } from "react-icons/fi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header: React.FC = () => {
  return (
    <header className="bg-[#0F0F0F] border-b border-gray-700 px-5 py-3 flex items-center justify-between shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md px-3 py-1.5 rounded-lg bg-[#1C1C1C] border border-gray-700 text-sm text-white shadow-md transition-all hover:shadow-lg">
        <FiSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search Art Mint"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 
            focus:ring-1 focus:ring-offset-0 focus:ring-purple-400 transition"
        />
      </div>

      {/* Wallet Button */}
      <div className="ml-5">
        <WalletMultiButton
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:from-purple-500 hover:to-pink-600 hover:shadow-lg transition-all"
        />
      </div>
    </header>
  );
};

export default Header;
