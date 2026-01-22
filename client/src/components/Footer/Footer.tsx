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
                         bg-gradient-to-r from-[#39e0ab] to-[#059669]
                         bg-clip-text text-transparent"
          >
            NFThrive
          </div>

          <div className="flex items-center gap-4">
            <FaFacebookSquare className="text-xl hover:text-gray-500 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaInstagram className="text-xl hover:text-gray-500 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaXTwitter className="text-xl hover:text-gray-500 cursor-pointer transition-transform duration-200 hover:scale-105" />
            <FaYoutube className="text-xl hover:text-gray-500 cursor-pointer transition-transform duration-200 hover:scale-105" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-5 px-4 md:px-10 w-full flex flex-col sm:flex-row flex-wrap justify-center md:justify-between gap-4">
          <a
            href="/about"
            className="transition-transform duration-200 hover:scale-105 text-center"
          >
            About us
          </a>
          <a
            href="/discover"
            className="transition-transform duration-200 hover:scale-105 text-center"
          >
            Discover
          </a>
          <a
            href="/books"
            className="transition-transform duration-200 hover:scale-105 text-center"
          >
            Books
          </a>
          <a
            href="/explore"
            className="transition-transform duration-200 hover:scale-105 text-center"
          >
            Explore
          </a>
        </div>

        {/* Description */}
        <div className="p-10 text-gray-500 text-center text-xs">
          A secure and transparent ecosystem for tokenizing real-world
          commodities. We connect suppliers, traders, and buyers through
          blockchain-powered digital assets, enabling faster transactions,
          improved traceability, and verified ownership across the global trade
          network.
        </div>

        {/* Description */}
        <div className="p-1 text-gray-500 text-center text-xs font-bold">
          Contact us :{" "}
          <a
            href="mailto:pradath@gmail.com"
            className="text-blue-600 hover:underline"
          >
            pradath@gmail.com
          </a>
        </div>

        {/* Copyright + Links */}
        <div className="mt-2 border-t border-gray-600 pt-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-3">
            <p className="text-white">
              © {new Date().getFullYear()} NFThrive. All Rights Reserved.
            </p>

            <div className="flex gap-4">
              <a className="text-white transition-transform duration-200 hover:scale-105 cursor-pointer">
                Terms of Service
              </a>
              <a className="text-white transition-transform duration-200 hover:scale-105 cursor-pointer">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
