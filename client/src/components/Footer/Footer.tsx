import { FaInstagram, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 p-5">
      <div className="w-full flex flex-col justify-center">
        {/* Logo and Social Icons */}
        <div className="w-full flex flex-col md:flex-row gap-5 items-center md:items-start md:justify-between mb-6">
          <div
            className="text-2xl font-bold
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent"
          >
            ArtMint
          </div>

          <div className="flex items-center gap-4">
            <FaFacebookSquare className="text-xl hover:text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaInstagram className="text-xl hover:text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaXTwitter className="text-xl hover:text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaYoutube className="text-xl hover:text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-105" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-5 px-4 md:px-10 w-full flex flex-col sm:flex-row flex-wrap justify-center md:justify-between gap-4">
          <a href="/about" className="hover:scale-105 transition-transform text-center">
            About
          </a>
          {/* <a href="/marketplace" className="hover:scale-105 transition-transform text-center">
            Marketplace
          </a> */}
          <a href="/mint" className="hover:scale-105 transition-transform text-center">
            Mint NFT
          </a>
          <a href="/hownftsworks" className="hover:scale-105 transition-transform text-center">
            How NFTs Work
          </a>
        </div>

        {/* Platform Description */}
        <div className="p-10 text-gray-500 text-center text-xs max-w-4xl mx-auto">
          ArtMint is a decentralized art minting platform empowering artists to
          tokenize their creativity as NFTs. Discover, mint, collect, and trade
          unique digital artworks with true ownership, transparent provenance,
          and blockchain-backed authenticity.
        </div>

        {/* Contact */}
        <div className="p-1 text-gray-500 text-center text-xs font-semibold">
          Contact us:{" "}
          <a
            href="mailto:support@artmint.io"
            className="text-purple-400 hover:underline"
          >
            support@artmint.io
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-gray-700 pt-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white">
              © {new Date().getFullYear()} ArtMint. All Rights Reserved.
            </p>

            <div className="flex gap-4">
              <a className="text-white hover:scale-105 transition-transform cursor-pointer">
                Terms
              </a>
              <a className="text-white hover:scale-105 transition-transform cursor-pointer">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
