import React from "react";
import { Link } from "react-router-dom";
import {
  IoHomeSharp,
  IoPersonSharp,
} from "react-icons/io5";
import { GiBoxUnpacking, GiPriceTag } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";
import { HiOutlineDocumentText, HiOutlineInformationCircle } from "react-icons/hi";

const SideNav: React.FC = () => {

  return (
    <aside
      className="
        fixed top-0 left-0 z-50 h-screen w-48
        flex flex-col overflow-y-auto
        scrollbar scrollbar-w-2
        scrollbar-track-gray-900/50
        scrollbar-thumb-gray-600
        hover:scrollbar-thumb-gray-500
        transition-all duration-300
        bg-gradient-to-b from-black to-purple-900
      "
      style={{ scrollbarColor: "#6b7280 #111827" }}
    >
      {/* Logo */}
      <div className="p-5 text-center">
        <h2
          className="
            text-2xl font-bold
            bg-gradient-to-r from-purple-400 to-pink-500
            bg-clip-text text-transparent
          "
        >
          ArtMint
        </h2>
      </div>

      {/* Menu Label */}
      <p className="px-5 mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
        Menu
      </p>

      <ul className="flex-1 space-y-1">
        <MenuItem icon={<IoHomeSharp />} label="Home" path="/home" />
        <MenuItem icon={<GiPriceTag />} label="Mint NFTs" path="/mint" />
        <MenuItem icon={<GiBoxUnpacking />} label="Minted NFTs" path="/goods" />
        <MenuItem icon={<RiCoinsLine />} label="My NFTs" path="/mygoods" />
        <MenuItem icon={<HiOutlineDocumentText />} label="How NFTs Work" path="/hownftsworks" />
        <MenuItem icon={<HiOutlineInformationCircle />} label="About" path="/about" />
        <MenuItem icon={<IoPersonSharp />} label="profile" path="/user" />
      </ul>
    </aside>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path }) => (
  <li>
    <Link
      to={path}
      className="
        group flex items-center p-2.5 rounded-lg
        text-gray-300 hover:text-white
        hover:bg-gray-800/60
        transition-all duration-200
      "
    >
      <div className="w-8 flex justify-center text-gray-500 group-hover:text-white">
        {icon}
      </div>
      <span className="ml-3 text-xs font-medium">{label}</span>
    </Link>
  </li>
);




export default SideNav;
