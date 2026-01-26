import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  // addDoc,
  // doc,
  // serverTimestamp,
  // updateDoc,
} from "firebase/firestore";
import { FiX } from "react-icons/fi";
import { LifeLine } from "react-loading-indicators";

import { app } from "../utils/firebase";
import {
  // listNFTOnAuctionHouse,
  cancelListingOnAuctionHouse,
} from "../utils/solana";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type NFTData = {
  mintAddress: string;
  name: string;
  description?: string;
  image?: string;
};

type ListingData = {
  id?: string;
  nftMint: string;
  seller: string;
  price: number;
  currency: string;
  quantity: number;
  status: string;
  expiry?: string | null;
};

/* -------------------------------------------------------------------------- */
/*                              ProfileGoods                                  */
/* -------------------------------------------------------------------------- */

const ProfileGoods: React.FC = () => {
  const wallet = useWallet();
  const location = useLocation();

  const publicKeyStr = useMemo(
    () => wallet.publicKey?.toBase58() ?? null,
    [wallet.publicKey]
  );

  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [listings, setListings] = useState<Record<string, ListingData>>({});
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  const [openForMint, setOpenForMint] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                 Firestore                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!publicKeyStr) {
      setNfts([]);
      setListings({});
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    setLoading(true);

    const nftQuery = query(
      collection(db, "nfts"),
      where("owner", "==", publicKeyStr)
    );

    const listingQuery = query(
      collection(db, "listings"),
      where("seller", "==", publicKeyStr)
    );

    const unsubNFTs = onSnapshot(nftQuery, (snap) => {
      setNfts(
        snap.docs.map((d) => ({
          ...(d.data() as NFTData),
          mintAddress: d.id,
        }))
      );
      setLoading(false);
    });

    const unsubListings = onSnapshot(listingQuery, (snap) => {
      const map: Record<string, ListingData> = {};
      snap.docs.forEach((d) => {
        const data = d.data() as ListingData;
        map[data.nftMint] = { ...data, id: d.id };
      });
      setListings(map);
    });

    return () => {
      unsubNFTs();
      unsubListings();
    };
  }, [publicKeyStr]);

  /* -------------------------------------------------------------------------- */
  /*                                   UI                                       */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white px-5 py-10 max-w-7xl mx-auto">

      {/* Title */}
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
            const listing = listings[nft.mintAddress];
            const isOpen = openForMint === nft.mintAddress;

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
                    className="inline-block text-sm
                               bg-gradient-to-r from-purple-400 to-pink-500
                               bg-clip-text text-transparent"
                  >
                    View more →
                  </Link>

                  {listing ? (
                    <div className="pt-3">
                      <p className="text-lg font-semibold
                                    bg-gradient-to-r from-purple-400 to-pink-500
                                    bg-clip-text text-transparent">
                        {listing.price} {listing.currency}
                      </p>

                      <button
                        onClick={() => cancelListingOnAuctionHouse(wallet as any, listing.nftMint)}
                        className="mt-2 w-full py-2 rounded-lg
                                   bg-red-600 hover:bg-red-700 transition"
                      >
                        Cancel Listing
                      </button>
                    </div>
                  ) : (
                    <>
                      {!isOpen && (
                        <button
                          onClick={() => setOpenForMint(nft.mintAddress)}
                          className="mt-3 w-full py-2 rounded-lg font-medium
                                     bg-gradient-to-r from-purple-500 to-pink-500
                                     hover:opacity-90 transition"
                        >
                          List NFT
                        </button>
                      )}

                      {isOpen && (
                        <div className="mt-4 bg-black/40 p-4 rounded-lg space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Create Listing</span>
                            <button onClick={() => setOpenForMint(null)}>
                              <FiX />
                            </button>
                          </div>

                          <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 bg-[#1C1C1C] border border-[#2A2A2A] rounded"
                          />

                          <input
                            type="datetime-local"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full p-2 bg-[#1C1C1C] border border-[#2A2A2A] rounded"
                          />

                          <button
                            className="w-full py-2 rounded-lg font-medium
                                       bg-gradient-to-r from-purple-500 to-pink-500
                                       hover:opacity-90 transition"
                          >
                            Create Listing
                          </button>
                        </div>
                      )}
                    </>
                  )}
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
