import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoHomeSharp,
  IoPersonSharp,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import { GiBoxUnpacking, GiPriceTag } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";
import { HiOutlineDocumentText, HiOutlineInformationCircle } from "react-icons/hi";

/* ================================
   Side Navigation
================================ */
const SideNav: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

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
          Art Mint
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
        <MenuItem icon={<RiCoinsLine />} label="My NFTs" path="/mynfts" />
        <MenuItem icon={<HiOutlineDocumentText />} label="How NFTs Work" path="/hownftsworks" />
        <MenuItem icon={<HiOutlineInformationCircle />} label="About" path="/about" />

        <Dropdown
          title="Profile"
          icon={<IoPersonSharp />}
          isOpen={openDropdown === "profile"}
          onClick={() => toggleDropdown("profile")}
          items={[
            { label: "My Profile", path: "/user" },
            { label: "My Goods", path: "/mygoods" },
          ]}
        />
      </ul>
    </aside>
  );
};

/* ================================
   Reusable Menu Item
================================ */
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

/* ================================
   Reusable Dropdown
================================ */
interface DropdownProps {
  title: string;
  icon: React.ReactNode;
  items: { label: string; path: string }[];
  isOpen: boolean;
  onClick: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, icon, items, isOpen, onClick }) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className="
        group flex w-full items-center justify-between p-2.5 rounded-lg
        text-gray-300 hover:text-white
        hover:bg-gray-800/60
        transition-all duration-200
      "
    >
      <div className="flex items-center">
        <div className="w-8 flex justify-center text-gray-500 group-hover:text-white">
          {icon}
        </div>
        <span className="ml-3 text-xs font-medium">{title}</span>
      </div>

      {isOpen ? (
        <IoChevronDown className="w-3.5 h-3.5 text-gray-500" />
      ) : (
        <IoChevronForward className="w-3.5 h-3.5 text-gray-500" />
      )}
    </button>

    {isOpen && (
      <ul className="mt-1 ml-10 space-y-0.5 border-l border-gray-700 pl-3">
        {items.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className="
                block px-2 py-1.5 rounded-md text-xs text-gray-400
                hover:text-white hover:bg-gray-800/50
                transition-all duration-200
              "
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default SideNav;
