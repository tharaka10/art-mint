import React from "react";
import { Link } from "react-router-dom";
import copyIcon from "../assets/CopyIcon.svg";
import trendingIcon from "../assets/Trending.svg";
import productImage1 from "../assets/Product1.svg";
import productImage2 from "../assets/Product2.svg";
import productImage3 from "../assets/Product3.svg";
import productImage4 from "../assets/Product4.svg";
import NftChart from "../components/Admin/NftChart";

const ProductDetails: React.FC = () => {
  return (
    <div className="ml-20 mr-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 justify-between">
          {/* User Icon */}
          <Link
            to="/user"
            className="flex p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 text-gray-200 dark:text-gray-200 items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
            AurumCraft 0045
          </h1>
          <img src={copyIcon} alt="Copy Icon" className="w-6 h-6 invert" />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div>
            <h2>All</h2>
          </div>
          <div>
            <h2>1y</h2>
          </div>
          <div>
            <h2>2D</h2>
          </div>
          <div>
            <h2>30MIN</h2>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-5 mt-2">
        <h1>SOL 6.2200</h1>
        <div className="bg-gray-700 text-white px-2 py-1 rounded w-16">
          -16.5%
        </div>
      </div>
      <div className="p-4">
        <NftChart />
      </div>
      <div className="flex flex-col md:flex-row gap-6 px-5 mt-10 mb-10">
        {/* Left Card*/}
        <div className="bg-[#1c1c1c] text-white rounded-lg p-5 w-full md:w-1/2">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-400">Top Offer</p>
              <p className="font-semibold">SOL 6.2200</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Collection Floor</p>
              <p className="font-semibold">SOL 6.2200</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Top Offer</p>
              <p className="font-semibold">+24.58%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Top Offer</p>
              <p className="font-semibold">+24.58%</p>
            </div>
          </div>
          <hr className="my-4 border-gray-500" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Buy For</p>
              <p className="font-semibold">
                SOL 6.2200
                <span className="text-xs text-gray-500 ml-5">
                  ENDS IN 4 DAYS
                </span>
              </p>
            </div>
          </div>
          <div className="flex grid-cols-2 gap-12 mt-4">
            <button className="bg-green-600 px-14 py-2 rounded text-white hover:bg-green-900 cursor-pointer">
              Buy Now
            </button>
            <button className="border border-white px-14 py-2 rounded cursor-pointer hover:bg-gray-600">
              Make an Offer
            </button>
          </div>
        </div>
        {/** Right Side Card */}
        <div className="bg-[#1c1c1c] text-white rounded-lg p-5 w-full md:w-1/2">
          <h1 className="font-semibold">About</h1>
          <p className="mt-3">About AurumCraft 0045</p>
          <p className="mt-5">
            A fusion of timeless elegance and digital innovation — this NFT
            captures the brilliance of handcrafted gold and precious gems,
            preserved forever on the blockchain. Own a piece of luxury that
            shines both in reality and the metaverse.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 ml-5 gap-2">
        <div className="flex items-center gap-2">
          <img
            src={trendingIcon}
            alt="Trending Icon"
            className="w-6 h-6 invert fill-white"
          />
          <h1 className="font-semibold text-2xl">Trending Collection</h1>
        </div>
        <div className="text-sm text-gray-400 hover:text-white cursor-pointer">
          View More
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-5 ml-10 mb-5">
        <div className="relative w-full h-auto rounded overflow-hidden">
          <img
            src={productImage1}
            alt="Product Image 1"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-transparent text-white text-sm p-2">
            <p className="font-semibold">NFTreasures</p>
            <p>
              Price: $15.05 <span className="text-red-400 ml-5">-1.6%</span>
            </p>
          </div>
        </div>
        <div className="relative w-full h-auto rounded overflow-hidden">
          <img
            src={productImage2}
            alt="Product Image 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-transparent p-2 text-sm text-white">
            <p className="font-semibold">NFTreasures</p>
            <p>
              Price: $15.05 <span className="text-red-400 ml-5">-1.6%</span>
            </p>
          </div>
        </div>

        <div className="relative w-full h-auto rounded overflow-hidden">
          <img
            src={productImage3}
            alt="Product Image 3"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-transparent p-2 text-sm text-white">
            <p className="font-semibold">NFTreasures</p>
            <p>
              Price: $15.05 <span className="text-red-400 ml-5">-1.6%</span>
            </p>
          </div>
        </div>
        <div className="relative w-full h-auto rounded overflow-hidden">
          <img
            src={productImage4}
            alt="Product Image 4"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-transparent p-2 text-sm text-white">
            <p className="font-semibold">NFTreasures</p>
            <p>
              Price: $15.05 <span className="text-red-400 ml-5">-1.6%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
