import React, { useState } from "react";
import sliderImage from "../../assets/Slider1.jpg";
import avatarImage from "../../assets/Avatar.svg";
import { useWallet } from "@solana/wallet-adapter-react";
import edit from "../../assets/Edit.svg";
import copyIcon from "../../assets/CopyIcon.svg";
import { useNavigate } from "react-router-dom";
import Sidebar from "./UserProfile";

const ProfileDashboard: React.FC = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const fullAddress = publicKey
    ? `${publicKey.toString().slice(0, 6)}...${publicKey
        .toString()
        .slice(-6)}`
    : "Wallet Not Connected";

  const handleEdit = () => navigate("/settings/profile");

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Cover */}
      <div className="relative h-[320px]">
        <img
          src={sliderImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="relative max-w-7xl mx-auto px-6 -mt-24">
        <div
          className="bg-[#1C1C1C] border border-[#2A2A2A]
                     rounded-3xl p-6 flex flex-col md:flex-row
                     items-center gap-6 shadow-xl"
        >
          {/* Avatar */}
          <img
            src={avatarImage}
            alt="Avatar"
            className="w-32 h-32 rounded-2xl border border-[#2A2A2A]"
          />

          {/* Info */}
          <div className="flex-1">
            <h2
              className="text-2xl font-bold
                         bg-gradient-to-r from-purple-400 to-pink-500
                         bg-clip-text text-transparent"
            >
              My Profile
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-gray-400 text-sm">{fullAddress}</span>

              <button
                onClick={handleCopy}
                className="relative p-2 rounded-lg bg-black/40
                           hover:bg-black/70 transition"
              >
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2
                                   text-xs px-2 py-1 bg-black rounded">
                    Copied!
                  </span>
                )}
                <img src={copyIcon} alt="Copy" className="w-5 h-5 invert" />
              </button>

              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-black/40
                           hover:bg-black/70 transition"
              >
                <img src={edit} alt="Edit" className="w-5 h-5 invert" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Sidebar>
          <div className="flex flex-col items-center justify-center
                          h-full text-center py-20">
            <h2
              className="text-3xl font-bold
                         bg-gradient-to-r from-purple-400 to-pink-500
                         bg-clip-text text-transparent"
            >
              No Results Found
            </h2>
            <p className="mt-4 text-gray-400">
              We’ve been searching the blockchain…
            </p>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default ProfileDashboard;
