import React, { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app } from "../utils/firebase";
import { FiTag, FiX } from "react-icons/fi";
import {
  listNFTOnAuctionHouse,
  cancelListingOnAuctionHouse,
} from "../utils/solana"; // make sure these are exported from solana.ts
import { LifeLine } from "react-loading-indicators";
import { Link, useLocation } from "react-router-dom";

type NFTData = {
  mintAddress: string;
  name: string;
  description?: string;
  image?: string;
  manufactureDate?: string;
  expiryDate?: string;
  certificateUrl?: string;
  owner?: string;
};

type ListingData = {
  id?: string;
  nftMint: string;
  seller: string;
  price: number;
  currency: string;
  quantity: number;
  status: string;
  expiry?: string | null; // ISO string
  createdAt?: any;
  updatedAt?: any;
  txSignature?: string;
};

const ProfileGoods: React.FC = () => {
  const wallet = useWallet();
  const publicKeyStr = useMemo(
    () => wallet.publicKey?.toBase58() ?? null,
    [wallet.publicKey]
  );
  const location = useLocation();

  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [listings, setListings] = useState<Record<string, ListingData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Inline listing form state (per-NFT)
  const [openForMint, setOpenForMint] = useState<string | null>(null); // mintAddress
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currency, setCurrency] = useState<string>("SOL");
  const [expiry, setExpiry] = useState<string>("");

  useEffect(() => {
    // Clear when wallet disconnected
    if (!publicKeyStr) {
      setNfts([]);
      setListings({});
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    const db = getFirestore(app);
    const nftsQ = query(collection(db, "nfts"), where("owner", "==", publicKeyStr));
    const listingsQ = query(
      collection(db, "listings"),
      where("seller", "==", publicKeyStr)
    );

    const unsubNfts = onSnapshot(
      nftsQ,
      (snap) => {
        const arr: NFTData[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            mintAddress: data.mintAddress ?? d.id,
            name: data.name ?? "Unnamed",
            description: data.description ?? "",
            image: data.image ?? "",
            manufactureDate: data.manufactureDate ?? "",
            expiryDate: data.expiryDate ?? "",
            certificateUrl: data.certificateUrl ?? "",
            owner: data.owner ?? "",
          };
        });
        setNfts(arr);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening nfts:", err);
        setError("Failed to listen to NFTs.");
        setLoading(false);
      }
    );

    const unsubListings = onSnapshot(
      listingsQ,
      (snap) => {
        const map: Record<string, ListingData> = {};
        snap.docs.forEach((d) => {
          const data = d.data() as ListingData;
          map[data.nftMint] = { ...(data as ListingData), id: d.id };
        });
        setListings(map);
      },
      (err) => {
        console.error("Error listening listings:", err);
      }
    );

    return () => {
      unsubNfts();
      unsubListings();
    };
  }, [publicKeyStr]);

  const openInlineForm = (mintAddress: string) => {
    setOpenForMint(mintAddress);
    setPrice("");
    setQuantity(1);
    setCurrency("SOL");
    setExpiry("");
  };

  const closeInlineForm = () => {
    setOpenForMint(null);
    setPrice("");
    setQuantity(1);
    setExpiry("");
  };

  const createListing = async (nft: NFTData) => {
  if (!publicKeyStr || !wallet) {
    alert("Connect your wallet first.");
    return;
  }

  if (!price || Number(price) <= 0) {
    alert("Enter a valid price.");
    return;
  }

  try {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      throw new Error("Invalid price");
    }

    // 1️⃣ Create on-chain listing
    const txOrTradeState = await listNFTOnAuctionHouse(
      wallet as any,
      nft.mintAddress,
      numericPrice
    );

    const txSignature =
      typeof txOrTradeState === "string" ? txOrTradeState : String(txOrTradeState);

    // 2️⃣ Save listing (with image, name, etc.) to Firestore
    const db = getFirestore(app);
    const newListing: ListingData & {
      image?: string;
      name?: string;
      description?: string;
    } = {
      nftMint: nft.mintAddress,
      seller: publicKeyStr,
      price: numericPrice,
      currency,
      quantity,
      status: "active",
      expiry: expiry || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      txSignature,
      image: nft.image || "",
      name: nft.name || "Unnamed NFT",
      description: nft.description || "",
    };

    // 3️⃣ Add document to Firestore
    const docRef = await addDoc(collection(db, "listings"), newListing);

    // 4️⃣ Update with ID (optional for easy reference)
    await updateDoc(doc(db, "listings", docRef.id), { id: docRef.id });

    closeInlineForm();
    alert(`✅ Listing created on-chain and stored in Firestore (${nft.name})`);
  } catch (err: any) {
    console.error("❌ Listing failed:", err);
    const msg = err?.message || String(err);
    alert("Listing failed: " + msg);
  }
};


  const handleCancelListing = async (listing: ListingData) => {
    if (!publicKeyStr || !wallet) {
      alert("Connect your wallet first.");
      return;
    }
    if (!listing || !listing.nftMint) {
      alert("Invalid listing");
      return;
    }

    try {
      // Find listing doc id (we keep listings keyed by nftMint in state)
      const db = getFirestore(app);
      // call on-chain cancel
      const res = await cancelListingOnAuctionHouse(wallet as any, listing.nftMint);

      // Update Firestore doc if we have id
      if (listing.id) {
        await updateDoc(doc(db, "listings", listing.id), {
          status: "cancelled",
          updatedAt: serverTimestamp(),
          cancelTx: res ?? null,
        });
      } else {
        // fallback: try to find doc by query and update — but simple path here
        console.warn("Listing had no id — Firestore update skipped.");
      }

      alert("Listing cancelled on-chain and Firestore updated.");
    } catch (err: any) {
      console.error("Cancel failed:", err);
      alert("Cancel failed: " + (err?.message || String(err)));
    }
  };

  // UI
  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Minted Goods</h1>

      {!publicKeyStr ? (
        <div className="text-center text-gray-300">
          Connect your wallet to view and manage your goods.
        </div>
      ) : loading ? (
        // <p className="text-center">Loading your NFTs…</p>
        <div className="flex items-center justify-center w-full h-full">
          <LifeLine color="green-400" size="medium" text="" textColor="" />
        </div>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-400">You have no minted NFTs.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map((nft) => {
            const listing = listings[nft.mintAddress];
            const isFormOpen = openForMint === nft.mintAddress;
            return (
              <div
                key={nft.mintAddress}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
              >
                <div className="relative">
                  {nft.image ? (
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-700 flex items-center justify-center rounded text-gray-400">
                      No image
                    </div>
                  )}

                  {!listing && (
                    <button
                      type="button"
                      onClick={() => openInlineForm(nft.mintAddress)}
                      className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
                      title={`List ${nft.name}`}
                      aria-label={`List ${nft.name}`}
                    >
                      <FiTag size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-semibold mt-3">{nft.name}</h2>
                <p className="text-sm text-gray-400 mb-3">{nft.description}</p>

                <div className="text-sm text-gray-400 space-y-1">
                  {nft.manufactureDate && (
                    <p>
                      <strong>Manufactured:</strong> {nft.manufactureDate}
                    </p>
                  )}
                  {nft.expiryDate && (
                    <p>
                      <strong>Expires:</strong> {nft.expiryDate}
                    </p>
                  )}
                  {nft.certificateUrl && (
                    <p>
                      <strong>Certificate:</strong>{" "}
                      <a
                        href={nft.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        View
                      </a>
                    </p>
                  )}
                </div>
                <Link
                                to={`/nft/${nft.mintAddress}`}
                                className="block mt-3 text-blue-400"
                                state={{ from: location.pathname }}
                              >
                                View More
                              </Link>

                {listing ? (
                  <div className="mt-4 border-t border-gray-700 pt-3">
                    <p className="text-green-400 font-semibold">
                      Listed: {listing.price} {listing.currency}
                    </p>
                    <p className="text-sm text-gray-400">
                      Quantity: {listing.quantity}
                      {listing.expiry && <> • Expires: {new Date(listing.expiry).toLocaleString()}</>}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCancelListing(listing)}
                      className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
                      title={`Cancel listing for ${nft.name}`}
                      aria-label={`Cancel listing for ${nft.name}`}
                    >
                      Cancel Listing
                    </button>
                  </div>
                ) : (
                  <>
                    {isFormOpen && (
                      <div className="mt-4 border-t border-gray-700 pt-3 bg-gray-900 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">Create listing</h3>
                          <button
                            type="button"
                            onClick={closeInlineForm}
                            className="text-gray-400 hover:text-white"
                            aria-label="Close listing form"
                            title="Close"
                          >
                            <FiX />
                          </button>
                        </div>

                        <label className="block mt-3">
                          <span className="text-sm">Price ({currency})</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.000001"
                            placeholder="0.5"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 bg-gray-800 rounded mt-1"
                            aria-label="Listing price"
                            title="Listing price"
                          />
                        </label>

                        <label className="block mt-3">
                          <span className="text-sm">Quantity</span>
                          <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full p-2 bg-gray-800 rounded mt-1"
                            aria-label="Quantity"
                            title="Quantity"
                          />
                        </label>

                        <label className="block mt-3">
                          <span className="text-sm">Expiry (optional)</span>
                          <input
                            type="datetime-local"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full p-2 bg-gray-800 rounded mt-1"
                            aria-label="Listing expiry"
                            title="Listing expiry"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => createListing(nft)}
                          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                          title={`Create listing for ${nft.name}`}
                          aria-label={`Create listing for ${nft.name}`}
                        >
                          Create Listing
                        </button>
                      </div>
                    )}

                    {!isFormOpen && (
                      <p className="text-xs text-gray-500 mt-3 italic text-center">Not listed yet</p>
                    )}
                  </>
                )}

                {nft.mintAddress && (
                  <a
                    href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-green-400 underline"
                  >
                    View on Solana Explorer
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileGoods;
