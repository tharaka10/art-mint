import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoHomeSharp,
  IoNotificationsSharp,
  IoSettingsSharp,
  IoPersonSharp,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import { MdAdminPanelSettings, MdOutlineInventory2 } from "react-icons/md";
import { GiBoxUnpacking, GiPriceTag, GiCargoShip } from "react-icons/gi";
import { RiCoinsLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineInformationCircle } from "react-icons/hi";

const SideNav: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-48 bg-black flex flex-col z-50 border-r border-gray-800
                 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-track-gray-900/50 scrollbar-thumb-rounded-md
                 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 transition-all duration-300"
      style={{ scrollbarColor: "#6b7280 #111827" }}
    >
      {/* Logo */}
      <div className="text-center p-5">
        <h2
          className="text-2xl font-bold
                     bg-gradient-to-r from-[#39e0ab] to-[#059669]
                     bg-clip-text text-transparent"
        >
          NFThrive
        </h2>
      </div>

      {/* Menu Title */}
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-5">Menu</p>

      <ul className="space-y-1 flex-1">
        {/* Home */}
        <MenuItem icon={<IoHomeSharp className="w-4 h-4" />} label="Home" path="/home" />

        {/* Goods */}
        <MenuItem icon={<GiBoxUnpacking className="w-4 h-4" />} label="Goods" path="/goods" />

        {/* Listed NFTs (main item) */}
        <MenuItem icon={<MdOutlineInventory2 className="w-4 h-4" />} label="Listed NFTs" path="/listednfts" />

        {/* My NFTs Dropdown */}
        <Dropdown
          title="My NFTs"
          icon={<RiCoinsLine className="w-4 h-4" />}
          items={[
            { label: "My NFTs", path: "/mynfts" },
            { label: "Bought NFTs", path: "/boughtnfts" },
          ]}
          isOpen={openDropdown === "mynfts"}
          onClick={() => toggleDropdown("mynfts")}
        />

        {/* Sales Dropdown */}
        <Dropdown
          title="Sales"
          icon={<GiPriceTag className="w-4 h-4" />}
          items={[
            { label: "Sales Page", path: "/sales" },
            { label: "Auction House", path: "/auctionhouse" },
          ]}
          isOpen={openDropdown === "sales"}
          onClick={() => toggleDropdown("sales")}
        />

        {/* Activity */}
        {/* <MenuItem icon={<FiActivity className="w-4 h-4" />} label="Activity" path="/activitypage" /> */}

        {/* Notifications */}
        <MenuItem icon={<IoNotificationsSharp className="w-4 h-4" />} label="Notifications" path="/notifications" />

        {/* Delivery Dropdown */}
        <Dropdown
          title="Delivery"
          icon={<GiCargoShip className="w-4 h-4" />}
          items={[
            { label: "Tracking View", path: "/trackingview" },
            { label: "Shipping", path: "/shipping" },
            { label: "Delivery Status", path: "/delivery-status" },
          ]}
          isOpen={openDropdown === "delivery"}
          onClick={() => toggleDropdown("delivery")}
        />

        {/* How NFTs Work */}
        <MenuItem icon={<HiOutlineDocumentText className="w-4 h-4" />} label="How NFTs Work" path="/hownftsworks" />

        {/* About */}
        <MenuItem icon={<HiOutlineInformationCircle className="w-4 h-4" />} label="About" path="/about" />

        {/* Profile Dropdown */}
        <Dropdown
          title="Profile"
          icon={<IoPersonSharp className="w-4 h-4" />}
          items={[
            { label: "My Profile", path: "/user" },
            // { label: "Profile Settings", path: "/profile" },
            { label: "My Goods", path: "/mygoods" },
          ]}
          isOpen={openDropdown === "profile"}
          onClick={() => toggleDropdown("profile")}
        />

        {/* Settings Dropdown */}
        <Dropdown
          title="Settings"
          icon={<IoSettingsSharp className="w-4 h-4" />}
          items={[
            { label: "Profile Settings", path: "/settings/profile" },
            { label: "Notification Settings", path: "/settings/notificationSettings" },
          ]}
          isOpen={openDropdown === "settings"}
          onClick={() => toggleDropdown("settings")}
        />

        {/* Admin Login */}
        <MenuItem icon={<MdAdminPanelSettings className="w-4 h-4" />} label="Admin Login" path="/admin/login" />
      </ul>
    </div>
  );
};

/* Reusable Single Menu Item */
const MenuItem = ({ icon, label, path }: { icon: React.ReactNode; label: string; path: string }) => (
  <li>
    <Link
      to={path}
      className="flex items-center p-2.5 rounded-lg hover:bg-gray-800/80 text-gray-300 hover:text-white transition-all duration-200 group"
    >
      <div className="w-8 flex justify-center text-gray-500 group-hover:text-white transition-colors">{icon}</div>
      <span className="ml-3 text-xs font-medium">{label}</span>
    </Link>
  </li>
);

/* Reusable Dropdown Component */
const Dropdown = ({
  title,
  icon,
  items,
  isOpen,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; path: string }[];
  isOpen: boolean;
  onClick: () => void;
}) => (
  <li>
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-2.5 rounded-lg hover:bg-gray-800/80 text-gray-300 hover:text-white transition-all duration-200 group"
    >
      <div className="flex items-center">
        <div className="w-8 flex justify-center text-gray-500 group-hover:text-white transition-colors">{icon}</div>
        <span className="ml-3 text-xs font-medium">{title}</span>
      </div>
      {isOpen ? (
        <IoChevronDown className="w-3.5 h-3.5 text-gray-500" />
      ) : (
        <IoChevronForward className="w-3.5 h-3.5 text-gray-500" />
      )}
    </button>

    {isOpen && (
      <ul className="ml-10 mt-1 space-y-0.5 border-l border-gray-700 pl-3">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              className="block py-1.5 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-all duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default SideNav;
