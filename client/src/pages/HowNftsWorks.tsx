import React from "react";
import sliderImage from "../assets/Slider1.jpg";
import image1 from "../assets/HowNftsWorksAssets/Image1.svg";
import image2 from "../assets/HowNftsWorksAssets/Image2.svg";
import image3 from "../assets/HowNftsWorksAssets/Image3.svg";
import image4 from "../assets/HowNftsWorksAssets/Image4.svg";

const InfoCard = [
  { id: 1, image: image1, name: "How NFTs Work" },
  { id: 2, image: image2, name: "From Creation to Ownership" },
  { id: 3, image: image3, name: "Smart Contracts & Scarcity" },
  { id: 4, image: image4, name: "Token Standards Explained" },
];

const HowNftsWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white px-8 py-10 space-y-10">

      {/* Hero Image */}
      <img
        src={sliderImage}
        alt="NFTs Explained"
        className="w-full rounded-3xl h-[420px] object-cover"
      />

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Main Content */}
        <div className="lg:w-2/3 space-y-6">

          <h1
            className="text-3xl md:text-4xl font-bold
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            How NFTs Work
          </h1>

          <p className="text-gray-400 leading-relaxed">
            NFTs, or Non-Fungible Tokens, are unique digital assets stored on the
            blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum which
            are interchangeable, NFTs represent something one of a kind—whether
            it is digital art, music, collectibles, or in the case of MintedGold,
            luxury-inspired digital jewelry.
          </p>

          <h2
            className="text-2xl font-bold pt-6
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            What Makes an NFT Unique?
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Each NFT is embedded with unique metadata that proves originality
            and ownership. No two NFTs are the same, and each one can be traced
            back to its creator or owner using blockchain technology.
          </p>

          <h2
            className="text-2xl font-bold pt-6
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            How Are NFTs Created?
          </h2>

          <p className="text-gray-400">
            NFTs are created through a process called minting. This means the
            digital file is uploaded to the blockchain via a smart contract:
          </p>

          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>A unique token is generated.</li>
            <li>It is permanently linked to the creator.</li>
            <li>Ownership is stored on a public ledger.</li>
          </ul>

          <p className="text-gray-400">
            At MintedGold, each NFT is crafted with care—ensuring real digital
            value and artistic distinction.
          </p>

          <h2
            className="text-2xl font-bold pt-6
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            How Do You Own an NFT?
          </h2>

          <p className="text-gray-400">
            When you buy an NFT, you're buying ownership rights secured by the
            blockchain. You can:
          </p>

          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>View it in your wallet</li>
            <li>Resell it on NFT marketplaces</li>
            <li>Showcase it in virtual galleries</li>
            <li>Hold it as a collectible asset</li>
          </ul>

          <h2
            className="text-2xl font-bold pt-6
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            Why Is This Technology Valuable?
          </h2>

          <p className="text-gray-400 leading-relaxed">
            NFTs empower creators with control, while collectors gain proof of
            ownership, scarcity, and authenticity. For MintedGold, this is where
            art, luxury, and technology meet.
          </p>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">

          <h2
            className="text-2xl font-bold
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            More Questions
          </h2>

          {InfoCard.map((info) => (
            <div
              key={info.id}
              className="group cursor-pointer bg-[#1C1C1C] border border-[#2A2A2A]
                         rounded-2xl p-4 transition-all duration-300
                         hover:-translate-y-1 hover:border-white/30 hover:shadow-xl"
            >
              <img
                src={info.image}
                alt={info.name}
                className="rounded-xl mb-4"
              />
              <p
                className="font-semibold
                           bg-gradient-to-r from-purple-400 to-pink-500
                           bg-clip-text text-transparent"
              >
                {info.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowNftsWorks;
