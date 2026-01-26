import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase";
import { LifeLine } from "react-loading-indicators";
import { Link, useLocation } from "react-router-dom";

interface NFTData {
  mintAddress: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  owner: string;
  createdAt: any;
}

const Goods: React.FC = () => {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "nfts"));
        setNfts(querySnapshot.docs.map(doc => doc.data() as NFTData));
      } catch (err) {
        console.error("Error loading NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent">
          Minted NFTs
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <LifeLine color="#A78BFA" size="large" /> 
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map(nft => (
            <div
              key={nft.mintAddress}   
              className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:scale-101 "
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-60 object-cover rounded-xl mb-3"
              />

              <h2 className="text-xl md:text-2xl font-bold mb-1
                             bg-gradient-to-r from-purple-400 to-pink-500
                             bg-clip-text text-transparent">
                {nft.name}
              </h2>

              <p className="text-sm text-gray-300 mb-2">{nft.description}</p>

              <ul className="mt-2 text-sm space-y-1">
                <li>
                  <strong className="text-purple-400">Symbol:</strong> {nft.symbol}
                </li>
                <li>
                  <strong className="text-purple-400">Mint Address:</strong> {nft.mintAddress}
                </li>
              </ul>

              <Link
                to={`/nft/${nft.mintAddress}`}
                state={{ from: location.pathname }}
                className="inline-block mt-3 text-sm font-semibold
                           bg-gradient-to-r from-purple-400 to-pink-500
                           bg-clip-text text-transparent underline hover:opacity-90 transition"
              >
                View More
              </Link>

              <a
                href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-white-400 underline hover:opacity-90 transition"
              >
                View on Solana Explorer
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Goods;
