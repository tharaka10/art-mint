import React from "react";
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
    <section className="min-h-screen bg-[#050505] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* Main Content */}
          <article className="lg:col-span-8 space-y-12">

            {/* Header */}
            <header className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight
                             bg-gradient-to-r from-violet-400 to-fuchsia-500
                             bg-clip-text text-transparent">
                How NFTs Work
              </h1>

              <p className="text-gray-400 leading-relaxed max-w-2xl">
                NFTs (Non-Fungible Tokens) are unique digital assets recorded on
                the blockchain. Unlike cryptocurrencies, each NFT represents
                verifiable ownership of a distinct digital item.
              </p>
            </header>

            {/* Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                What Makes an NFT Unique?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Each NFT contains unique metadata that establishes authenticity,
                scarcity, and ownership. Blockchain technology ensures
                transparency and traceability across its lifecycle.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-semibold text-white">
                How Are NFTs Created?
              </h2>

              <p className="text-gray-400">
                NFTs are created through a process known as minting, where a
                digital asset is permanently recorded on the blockchain using a
                smart contract.
              </p>

              <ul className="space-y-3">
                {[
                  "A unique token is generated",
                  "Creator attribution is embedded",
                  "Ownership is stored on a public ledger",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-gray-400">
                At MintedGold, each NFT is designed with a focus on long-term
                digital value and artistic integrity.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-xl font-semibold text-white">
                How Do You Own an NFT?
              </h2>

              <p className="text-gray-400">
                Purchasing an NFT grants blockchain-secured ownership, allowing
                collectors to:
              </p>

              <ul className="space-y-3">
                {[
                  "Store NFTs in a digital wallet",
                  "Trade on verified marketplaces",
                  "Showcase in virtual galleries",
                  "Hold as a collectible digital asset",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Why Is This Technology Valuable?
              </h2>

              <p className="text-gray-400 leading-relaxed">
                NFTs empower creators with control while offering collectors
                verifiable proof of authenticity, ownership, and scarcity—where
                technology meets digital luxury.
              </p>
            </section>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">

            <h3 className="text-lg font-semibold text-white">
              Related Topics
            </h3>

            <div className="space-y-4">
              {InfoCard.map((info) => (
                <div
                  key={info.id}
                  className="flex items-center gap-4
                             rounded-xl border border-white/10
                             bg-black/70 px-5 py-4
                             transition-all duration-300
                             hover:border-violet-500/40
                             hover:translate-x-1"
                >
                  <img
                    src={info.image}
                    alt={info.name}
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-300">
                    {info.name}
                  </span>
                </div>
              ))}
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
};

export default HowNftsWorks;
