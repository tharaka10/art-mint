import React from "react";
import { FaGem } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full space-y-10">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-emerald-500 tracking-wide">
            ABOUT NFThrive
          </h1>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            NFThrive empowers creators and collectors with unique digital assets on the blockchain, combining art, luxury, and technology.
          </p>
        </div>

        {/* Section: How NFTs Work */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
            <FaGem /> How NFTs Work
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            NFTs, or Non-Fungible Tokens, are one-of-a-kind digital assets stored on the blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum, NFTs cannot be exchanged on a one-to-one basis. They represent unique creations like art, music, collectibles, or luxury-inspired digital jewelry.
          </p>
        </section>

        {/* Section: What Makes an NFT Unique */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
            <FaGem /> What Makes an NFT Unique
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Each NFT has unique metadata proving its originality and ownership. They are impossible to forge and easily traceable on the blockchain. Every piece has a digital certificate of authenticity.
          </p>
        </section>

        {/* Section: How NFTs Are Created */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
            <FaGem /> How NFTs Are Created
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            NFTs are minted via smart contracts, linking the digital asset permanently to the creator. During minting:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-400 leading-relaxed space-y-1">
            <li>A unique token is generated</li>
            <li>Ownership is recorded on a public ledger</li>
            <li>It is permanently linked to the creator</li>
          </ul>
          <p className="mt-3 text-gray-400 leading-relaxed">
            At MintedGold, we mint each NFT carefully to ensure every piece has artistic distinction and real digital value.
          </p>
        </section>

        {/* Section: How Do You Own an NFT */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
            <FaGem /> How Do You Own an NFT
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Buying an NFT grants ownership rights to the digital asset. Ownership is secured by the blockchain and allows you to:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-400 leading-relaxed space-y-1">
            <li>View it in your wallet</li>
            <li>Resell on NFT marketplaces</li>
            <li>Showcase in virtual galleries</li>
            <li>Hold it as a collectible asset</li>
          </ul>
        </section>

        {/* Section: Why This Technology Is Valuable */}
        <section className="bg-[#111111] p-6 rounded-2xl shadow-md border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
            <FaGem /> Why This Technology Is Valuable
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            NFTs empower creators to protect their work and provide buyers with proof of authenticity, ownership, and rarity. Brands like MintedGold use NFTs to merge art, luxury, and modern technology into a secure, timeless experience.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
