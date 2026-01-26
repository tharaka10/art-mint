import React from "react";
import { FaGem } from "react-icons/fa";

const About: React.FC = () => {
  const sections = [
    {
      title: "How NFTs Work",
      content:
        "NFTs (Non-Fungible Tokens) are unique digital assets stored on the blockchain. Unlike cryptocurrencies, each NFT represents a one-of-a-kind creation like art, collectibles, or digital luxury items.",
    },
    {
      title: "What Makes an NFT Unique",
      content:
        "Each NFT contains immutable metadata proving originality and ownership. They are impossible to forge and fully traceable on the blockchain, providing a verified digital certificate of authenticity.",
    },
    {
      title: "How NFTs Are Created",
      content:
        "NFTs are minted via smart contracts, permanently linking the asset to the creator. During minting:\n- A unique token is generated\n- Ownership is recorded on a public ledger\n- It is permanently linked to the creator",
    },
    {
      title: "Owning an NFT",
      content:
        "Purchasing an NFT gives verified ownership. You can:\n- Store it in your wallet\n- Resell on marketplaces\n- Showcase in galleries\n- Hold it as a collectible asset",
    },
    {
      title: "Why This Technology Matters",
      content:
        "NFTs empower creators to protect their work while giving buyers provable ownership. Platforms like Art Mint merge art, luxury, and technology into a secure and valuable experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-gray-300 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6
                         bg-gradient-to-r from-purple-400 to-pink-500
                         bg-clip-text text-transparent tracking-wide">
            About Art Mint
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Art Mint empowers creators and collectors with unique digital assets on the blockchain, blending art, luxury, and modern technology.
          </p>
        </header>

        {/* Sections */}
        <div className="grid gap-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="relative bg-[#111111] p-8 rounded-3xl border border-gray-800
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <FaGem className="text-purple-400 text-2xl" />
                <h2 className="text-3xl font-bold text-white
                               bg-gradient-to-r from-purple-400 to-pink-500
                               bg-clip-text">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
