import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
 
} from "firebase/firestore";

import { LifeLine } from "react-loading-indicators";

import { app } from "../utils/firebase";




type NFTData = {
  mintAddress: string;
  name: string;
  description?: string;
  image?: string;
};


const ProfileGoods: React.FC = () => {
  const wallet = useWallet();
  const location = useLocation();
  

  const publicKeyStr = useMemo(
    () => wallet.publicKey?.toBase58() ?? null,
    [wallet.publicKey]
  );

  const [nfts, setNfts] = useState<NFTData[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error] = useState("");


  useEffect(() => {
    if (!publicKeyStr) {
      setNfts([]);
      
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    setLoading(true);

    const nftQuery = query(
      collection(db, "nfts"),
      where("owner", "==", publicKeyStr)
    );

    

    const unsubNFTs = onSnapshot(nftQuery, (snap) => {
      setNfts(
        snap.docs.map((d) => ({
          ...(d.data() as NFTData),
        }))
      );
      setLoading(false);
    });

  

    return () => {
      unsubNFTs();
     
    };
  }, [publicKeyStr]);



  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white px-5 py-10 max-w-7xl mx-auto">

     
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10
                     bg-gradient-to-r from-purple-400 to-pink-500
                     bg-clip-text text-transparent">
        My Minted Goods
      </h1>

      {!publicKeyStr ? (
        <p className="text-center text-gray-400">
          Connect your wallet to view your NFTs
        </p>
      ) : loading ? (
        <div className="flex justify-center">
          <LifeLine color="#a855f7" size="medium" />
        </div>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-400">
          No NFTs minted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => {
            

            return (
              <div
                key={nft.mintAddress}
                className="group bg-[#1C1C1C] border border-[#2A2A2A]
                           rounded-xl overflow-hidden transition
                           hover:-translate-y-1 hover:border-white/30"
              >
                {nft.image ? (
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center bg-gray-800">
                    No Image
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-gray-200">
                    {nft.name}
                  </h2>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {nft.description}
                  </p>

                 <Link
                                 to={`/nft/${nft.mintAddress}`}
                                 state={{ from: location.pathname }}
                                 className="inline-block mt-3 text-sm font-semibold
                                            bg-gradient-to-r from-purple-400 to-pink-500
                                            bg-clip-text text-transparent underline hover:opacity-90 transition"
                               >
                                 View More
                               </Link>

                  
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileGoods;
