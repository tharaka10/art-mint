// src/pages/MyNFTsPage.tsx
// import React, { useEffect, useState } from "react";
// import  ListNFT  from "../components/ListNFT"
// import { useWallet } from "@solana/wallet-adapter-react";
// import { db } from "../utils/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const MyNFTsPage: React.FC = () => {
//   const wallet = useWallet();
//   const [myNFTs, setMyNFTs] = useState<any[]>([]);

//   useEffect(() => {
//     const loadMyNFTs = async () => {
//       if (!wallet.publicKey) return;
//       const q = query(collection(db, "nfts"), where("owner", "==", wallet.publicKey.toBase58()));
//       const snapshot = await getDocs(q);
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMyNFTs(data);
//     };
//     loadMyNFTs();
//   }, [wallet.publicKey]);

//   return (
//     <div className="p-6 text-white bg-gray-950 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">My Minted NFTs</h1>

//       {myNFTs.length === 0 ? (
//         <p className="text-center text-gray-400">No NFTs found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {myNFTs.map((nft) => (
//             <div key={nft.id} className="bg-gray-800 p-4 rounded-2xl shadow-lg">
//               <img
//                 src={nft.image}
//                 alt={nft.name}
//                 className="w-full h-52 object-cover rounded-xl mb-3"
//               />
//               <h2 className="text-lg font-semibold">{nft.name}</h2>
//               <p className="text-sm text-gray-400 mb-3">{nft.description}</p>

//               {/* 👇 The ListNFT component */}
//               <ListNFT nftAddress={nft.mintAddress} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyNFTsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import toast, { Toaster } from "react-hot-toast";
import { LifeLine } from "react-loading-indicators";

interface NFTItem {
  name: string;
  description: string;
  mint: string;
  image_uri: string;
}

const MyNFTsPage: React.FC = () => {
  const wallet = useWallet();
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyNFTs = async () => {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      setLoading(true);

      const network = import.meta.env.VITE_NETWORK || "devnet";
      const endpoint = `${import.meta.env.VITE_SHYFT_ENDPOINT}/nft/read_all`
        .replace(/([^:]\/)\/+/g, "$1");

      const url = `${endpoint}?network=${network}&address=${wallet.publicKey.toBase58()}`;

      const res = await axios.get(url, {
        headers: {
          "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
        },
      });

      if (res.data.success) {
        setNfts(res.data.result);
        toast.success("NFTs loaded successfully ✨");
      } else {
        toast.error(res.data.message || "Failed to load NFTs");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Error fetching NFTs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.connected) {
      fetchMyNFTs();
    }
  }, [wallet.connected]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white px-6 py-10">
      <Toaster position="top-right" />

      {/* Page Title */}
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-10
                   bg-gradient-to-r from-purple-400 to-pink-500
                   bg-clip-text text-transparent"
      >
        My NFT Collection
      </h1>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center mt-20">
          <LifeLine color="purple" size="medium" />
          <p className="text-gray-400 mt-4">Loading your NFTs…</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && nfts.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          You don’t own any NFTs yet.
        </p>
      )}

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {nfts.map((nft, idx) => (
          <div
            key={idx}
            className="group bg-[#1C1C1C] border border-[#2A2A2A]
                       rounded-2xl overflow-hidden
                       transition-all duration-300
                       hover:-translate-y-1 hover:shadow-xl hover:border-white/30"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={nft.image_uri}
                alt={nft.name}
                className="w-full h-full object-cover
                           transition-transform duration-300
                           group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <h2
                className="text-lg font-semibold mb-1
                           bg-gradient-to-r from-purple-400 to-pink-500
                           bg-clip-text text-transparent"
              >
                {nft.name || "Untitled NFT"}
              </h2>

              <p className="text-sm text-gray-400 line-clamp-3">
                {nft.description || "No description provided."}
              </p>

              <p className="text-xs text-gray-500 mt-3 truncate">
                Mint: {nft.mint}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTsPage;
