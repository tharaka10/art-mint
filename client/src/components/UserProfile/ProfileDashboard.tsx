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

  const fullAddress = publicKey ? publicKey.toString() : "Not Connected";

  const handleEdit = () => {
    navigate("/settings/profile");
  };

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <img
        src={sliderImage}
        alt="Slider Image"
        className="w-full py-5 object-cover h-100 opacity-40"
      />
      <img
        src={avatarImage}
        alt="Profile Picture"
        className="absolute top-60 p-8"
      />
      <div className="absolute top-85 p-8 font-bold text-2xl flex gap-3 items-center">
        <h2>{fullAddress}</h2>

        <button onClick={handleEdit} className="p-2 cursor-pointer">
          <img src={edit} alt="Edit Icon" className="w-6 h-6 invert" />
        </button>

        <button onClick={handleCopy} className="cursor-pointer">
          {copied && (
            <span className="absolute -top-2 px-3 py-2 bg-black text-sm rounded">
              Copied!
            </span>
          )}
          <img src={copyIcon} alt="Copy Icon" className="w-6 h-6 invert" />
        </button>
      </div>
      <Sidebar>
        <div className="flex flex-col justify-center items-center h-full text-center">
          <h2 className="text-3xl font-bold">No results found</h2>
          <p className="mt-5 text-gray-400">
            We've been searching the blockchain
          </p>
        </div>
      </Sidebar>
    </div>
  );
};
export default ProfileDashboard;
