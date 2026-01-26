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

import avatarImage from "../../assets/Avatar.svg";
import copyIcon from "../../assets/CopyIcon.svg";
import { app } from "../../utils/firebase";

type NFTData = {
  mintAddress: string;
  name: string;
  description?: string;
  image?: string;
};

const ProfilePage: React.FC = () => {
  const wallet = useWallet();
  const location = useLocation();

  const publicKeyStr = useMemo(
    () => wallet.publicKey?.toBase58() ?? null,
    [wallet.publicKey]
  );

  const shortAddress = publicKeyStr
    ? `${publicKeyStr.slice(0, 6)}...${publicKeyStr.slice(-6)}`
    : "Wallet not connected";

  const [copied, setCopied] = useState(false);
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCopy = () => {
    if (!publicKeyStr) return;
    navigator.clipboard.writeText(publicKeyStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    if (!publicKeyStr) {
      setNfts([]);
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    const q = query(
      collection(db, "nfts"),
      where("owner", "==", publicKeyStr)
    );

    const unsub = onSnapshot(q, (snap) => {
      setNfts(snap.docs.map((d) => d.data() as NFTData));
      setLoading(false);
    });

    return () => unsub();
  }, [publicKeyStr]);

  return (
    <div className="min-h-screen bg-[#08080C] text-gray-200">
      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/30" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-40" />
              <img
                src={avatarImage}
                alt="Avatar"
                className="relative w-28 h-28 rounded-4xl bg-black border border-white/10"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold text-purple-900">
                My Profile
              </h1>

              <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                <span className="text-sm text-gray-400">{shortAddress}</span>

                {publicKeyStr && (
                  <button
                    onClick={handleCopy}
                    className="relative p-1.5 rounded-md
                               border border-white/10
                               hover:bg-white/5 transition"
                  >
                    {copied && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2
                                       text-xs px-2 py-1 rounded bg-black
                                       border border-white/10">
                        Copied
                      </span>
                    )}
                    <img src={copyIcon} className="w-4 h-4 invert" />
                  </button>
                )}
              </div>

              <p className="mt-4 max-w-xl text-gray-400 text-sm">
                Explore and manage the NFTs minted under this wallet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xl font-medium text-white mb-8">
          Minted NFTs
        </h2>

        {!publicKeyStr ? (
          <p className="text-gray-500 text-center">
            Connect your wallet to view assets.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <LifeLine color="#a855f7" size="medium" />
          </div>
        ) : nfts.length === 0 ? (
          <p className="text-gray-500 text-center">
            No NFTs found for this wallet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {nfts.map((nft) => (
              <Link
                key={nft.mintAddress}
                to={`/nft/${nft.mintAddress}`}
                state={{ from: location.pathname }}
                className="group rounded-2xl bg-[#111118]
                           border border-white/10 overflow-hidden
                           hover:border-purple-500/40
                           hover:-translate-y-1 transition"
              >
                {nft.image ? (
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-gray-500 bg-black/40">
                    No image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-white font-medium">
                    {nft.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {nft.description || "No description available."}
                  </p>

                  <span className="inline-block mt-4 text-sm
                                   text-purple-400 group-hover:text-pink-400">
                    View NFT →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
