import React from "react";
import sliderImage from "../assets/Slider1.jpg";
import image1 from "../assets/HowNftsWorksAssets/Image1.svg";
import image2 from "../assets/HowNftsWorksAssets/Image2.svg";
import image3 from "../assets/HowNftsWorksAssets/Image3.svg";
import image4 from "../assets/HowNftsWorksAssets/Image4.svg";

const InfoCard = [
  {
    id: 1,
    image: image1,
    name: "How Nfts Work",
  },
  {
    id: 2,
    image: image2,
    name: "From Creation to Ownership",
  },
  {
    id: 3,
    image: image3,
    name: "Smart Contracts & Scarcity",
  },
  {
    id: 4,
    image: image4,
    name: "Token Standards Explained",
  },
];
const HowNftsWorks: React.FC = () => {
  return (
    <div className="px-8 py-6 space-y-6">
      <img
        src={sliderImage}
        alt="Slider Image"
        className="w-full p-5 rounded-3xl h-[400px] object-cover"
      />
      <div className="flex flex-row gap-8">
        <div className="w-2/3 px-6">
          <h1 className="font-bold text-3xl">How Nfts Work</h1>
          <p className="text-gray-400 py-3">
            NFTs, or Non-Fungible Tokens, are unique digital assets stored on
            the blockchain. Unlike cryptocurrencies like Bitcoin or Ethereum
            which are interchangeable NFTs represent something one of a kind,
            whether it is a digital art, music, collectibles, or in the case of
            MintedGold, luxury-inspired digital jewelry.
          </p>
          <h2 className="font-bold text-2xl py-5">What Makes an NFT Unique?</h2>
          <p className="text-gray-400">
            Each NFT is embedded with a unique code, or metadata, which proves
            its originality and ownership. No two NFTs are the same, and each
            one can be traced back to its creator or owner using blockchain
            technology. Think of it as a digital certificate of authenticity
            impossible to forge, easy to verify.
          </p>
          <h2 className="font-bold text-2xl py-5">How Are NFTs Created?</h2>
          <p className="text-gray-400 py-3">
            NFTs are created through a process called minting. This means the
            digital file (art, jewelry design, etc.) is uploaded to the
            blockchain via a smart contract. During this process:
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>A unique token is generated.</li>
            <li>It is permanently linked to the creator.</li>
            <li>Ownership is established and stored on a public ledger.</li>
          </ul>
          <p className="text-gray-400 py-3">
            At MintedGold, we mint each NFT with great care ensuring that every
            gold and gem inspired piece holds real digital value and artistic
            distinction
          </p>
          <h2 className="text-3xl font-bold py-5">How Do You Own an NFT?</h2>
          <p className="text-gray-400 py-3">
            When you buy an NFT, you're buying ownership rights to that specific
            digital asset. This ownership is secured by the blockchain, which
            acts like a public record. You can:
          </p>
          <ol className="text-gray-400 list-disc list-inside">
            <li>View it in your wallet.</li>
            <li>Resell it on NFT marketplaces.</li>
            <li>Showcase it in virtual galleries</li>
            <li>Hold it as a collectible asset</li>
          </ol>
          <h2 className="text-3xl font-bold py-5">
            Why Is This Technology Valuable?
          </h2>
          <p className="text-gray-400">
            NFTs give creators control over their work, while giving collectors
            proof of ownership, scarcity, and authenticity. For a brand like
            MintedGold, it means we can deliver timeless beauty in a modern,
            secure form where art, luxury, and technology come together
          </p>
        </div>
        <div className="w-1/3 space-y-6 px-10">
          <h1 className="font-bold text-3xl">More Questions</h1>
          {InfoCard.map((info) => (
            <div key={info.id} className="cursor-pointer">
              <img src={info.image} alt={info.name} className="rounded" />
              <p className="font-bold py-5">{info.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowNftsWorks;
