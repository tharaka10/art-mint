import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase";
import { LifeLine } from "react-loading-indicators";
import { Link, useLocation } from "react-router-dom";


interface NFTData {
  mintAddress: string;
  name: string;
  description: string;
  image: string;
  manufactureDate: string;
  expiryDate: string;
  certificateUrl: string;
  owner: string;
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
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Minted Goods (NFTs)</h1>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <LifeLine color="green-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map(nft => (
            <div
              key={nft.mintAddress}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-60 object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-3">{nft.name}</h2>
              <p className="text-sm text-gray-300">{nft.description}</p>

              <ul className="mt-2 text-sm">
                <li><strong>Manufactured:</strong> {nft.manufactureDate}</li>
                <li><strong>Expires:</strong> {nft.expiryDate}</li>
                <li>
                  <strong>Certificate:</strong>{" "}
                  <a
                    href={nft.certificateUrl}
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>

              <Link
                to={`/nft/${nft.mintAddress}`}
                className="block mt-3 text-blue-400 underline"
                state={{ from: location.pathname }}
              >
                View More
              </Link>

              <a
                href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-green-400 underline"
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
