import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { app } from "../utils/firebase";
import { LifeLine } from "react-loading-indicators";
import { useNavigate, useLocation } from "react-router-dom";


interface NFTData {
  mintAddress: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  metadataUri: string;
  certificateUrl: string;
  manufactureDate: string;
  expiryDate: string;
  weight: string;
  quantity: string;
  email: string;
  owner: string;
}

const NFTDetails: React.FC = () => {
  const { mintAddress } = useParams<{ mintAddress: string }>();
  const [nft, setNft] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const location = useLocation();

const from = (location.state as any)?.from || "/";


  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const db = getFirestore(app);
        const q = query(
          collection(db, "nfts"),
          where("mintAddress", "==", mintAddress)
        );

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setNft(snapshot.docs[0].data() as NFTData);
        }
      } catch (err) {
        console.error("Error loading NFT:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [mintAddress]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <LifeLine color="green-400" />
      </div>
    );
  }

  if (!nft) {
    return (
      <p className="text-center text-red-400 mt-20">
        NFT not found
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <button
  onClick={() => navigate(from)}
  className="mb-4 text-blue-400 cursor-pointer hover:text-blue-300"
>
  ← Back
</button>



      <div className="bg-gray-900 p-6 rounded-xl mt-4 shadow-lg">
        {/* IMAGE */}
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* BASIC INFO */}
        <h1 className="text-3xl font-bold mt-6">{nft.name}</h1>
        <p className="text-gray-400 text-sm mt-1">Symbol: {nft.symbol}</p>
        <p className="text-gray-300 mt-3">{nft.description}</p>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
          <p><strong>Manufacture Date:</strong> {nft.manufactureDate}</p>
          <p><strong>Expiry Date:</strong> {nft.expiryDate}</p>
          <p><strong>Weight (per item):</strong> {nft.weight} g</p>
          <p><strong>Quantity:</strong> {nft.quantity}</p>

          <p className="sm:col-span-2 break-all">
            <strong>Owner Wallet:</strong> {nft.owner}
          </p>

          <p className="sm:col-span-2">
            <strong>Owner Email:</strong> {nft.email}
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href={nft.certificateUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            View Certificate
          </a>

          <a
            href={nft.metadataUri}
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 underline"
          >
            View Metadata (IPFS)
          </a>

          <a
            href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
            className="text-green-400 underline"
          >
            View on Solana Explorer
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
