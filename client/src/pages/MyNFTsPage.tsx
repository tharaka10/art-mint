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
import ListForSale from "../components/ListNFT";
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
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [loading, setLoading] = useState(false);

const fetchMyNFTs = async () => {
  if (!wallet.publicKey) {
    toast.error("Please connect your wallet first!");
    return;
  }

  try {
    setLoading(true);

    const network = import.meta.env.VITE_NETWORK || "devnet";

    // 🧩 Fix: Always build a full clean URL with params
    const endpoint = `${import.meta.env.VITE_SHYFT_ENDPOINT}/nft/read_all`
      .replace(/([^:]\/)\/+/g, "$1");

    const url = `${endpoint}?network=${network}&address=${wallet.publicKey.toBase58()}`;
    console.log("🔗 Fetching:", url);

    const res = await axios.get(url, {
      headers: {
        "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
      },
    });

    if (res.data.success) {
      setNfts(res.data.result);
      toast.success("✅ NFTs loaded successfully!");
    } else {
      toast.error(res.data.message || "Failed to load NFTs");
    }
  } catch (error: any) {
    console.error("❌ Fetch error:", error.response?.data || error.message);
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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-6">My NFTs</h1>

      {loading && (
        // <div className="text-center text-gray-400">Loading your NFTs...</div>
        <div className="flex items-center justify-center w-full h-full">
          <LifeLine color="green-400" size="medium" text="" textColor="" />
        </div>
      )}

      {!loading && nfts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          You don’t own any NFTs yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {nfts.map((nft, idx) => (
          <div
            key={idx}
            className="bg-gray-900 rounded-2xl shadow-lg p-4 transition hover:scale-105"
          >
            <img
              src={nft.image_uri}
              alt={nft.name}
              className="rounded-xl w-full h-60 object-cover"
            />
            <h2 className="text-xl font-semibold mt-3">{nft.name}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {nft.description?.slice(0, 80)}...
            </p>

            <button
              onClick={() => setSelectedNFT(nft)}
              data-toggle="modal"
              data-target="#listForSale"
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              List for Sale
            </button>
          </div>
        ))}
      </div>

      {/* Modal: List For Sale */}
      {selectedNFT && (
        <ListForSale
          nft={selectedNFT}
          setLoader={setLoading}
        />
      )}
    </div>
  );
};

export default MyNFTsPage;
