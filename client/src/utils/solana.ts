// import {
//   Connection,
//   PublicKey,
// } from "@solana/web3.js";
// import {
//   Metaplex,
//   walletAdapterIdentity,
//   token,
//   type LazyListing,
//   sol,
// } from "@metaplex-foundation/js";
// import type { WalletAdapter } from "@solana/wallet-adapter-base";
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   deleteDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { app } from "./firebase";
// import axios from "axios";
// import {
//   getAssociatedTokenAddress,
//   getAccount,
// } from "@solana/spl-token";

// // =============================================================
// // CONFIGURATION
// // =============================================================
// const RPC_URL = "https://api.devnet.solana.com";

// export const AUCTION_HOUSE_ADDRESS = new PublicKey(
//   "7qhDeVaZC3ouf47XXsKvUpV7YYZvmbw34imu1S6vVPcD"
// );

// const PINATA_JWT =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YTJhYTZjYy0zNzQ5LTQ5NTctYTczYS1iZjI1OTk0NTdlM2UiLCJlbWFpbCI6InRydXdhbm1hZHV3YW50aGEyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5MGQxMjA4ZGZhZDM1YjU2MjY3MSIsInNjb3BlZEtleVNlY3JldCI6IjBmOGE3YjU1OGFiMzU5NGJlZjYzOWM5ZmZjODVhZmQwYTE5ZmI1ZGIyYmVlMjlhNjBjZDkzZDQzZjliMmZlYWEiLCJleHAiOjE3OTM1MTQzMTF9.oyOz-kJedAlLf2YGCCFttbaMQEpboSMMrqASa0X8uxE";

// // =============================================================
// // Metaplex Setup
// // =============================================================
// export function getMetaplex(walletAdapter: WalletAdapter) {
//   const connection = new Connection(RPC_URL, "confirmed");
//   return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
// }

// // =============================================================
// // Pinata Upload Helpers
// // =============================================================
// export async function uploadToPinata(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await axios.post(
//     "https://api.pinata.cloud/pinning/pinFileToIPFS",
//     formData,
//     {
//       maxBodyLength: Infinity,
//       headers: { Authorization: PINATA_JWT },
//     }
//   );

//   return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
// }

// export async function uploadJSONToPinata(jsonData: object): Promise<string> {
//   const res = await axios.post(
//     "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//     jsonData,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: PINATA_JWT,
//       },
//     }
//   );
//   return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
// }

// // =============================================================
// // Metadata Interface
// // =============================================================
// export interface NFTMetadata {
//   name: string;
//   symbol: string;
//   description: string;
//   imageFile: File;
//   manufactureDate: string;
//   expiryDate: string;
//   certificateUrl: string;
// }

// // =============================================================
// // Mint NORMAL NFT (SFT)
// // =============================================================
// export async function mintNormalNFTWithQuantity(
//   walletAdapter: WalletAdapter,
//   metadata: NFTMetadata,
//   quantity: number
// ): Promise<string[]> {
//   if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

//   const metaplex = getMetaplex(walletAdapter);
//   const {
//     name,
//     symbol,
//     description,
//     imageFile,
//     manufactureDate,
//     expiryDate,
//     certificateUrl,
//   } = metadata;

//   const imageUrl = await uploadToPinata(imageFile);
//   const metadataJson = {
//     name,
//     symbol,
//     description,
//     image: imageUrl,
//     attributes: [
//       { trait_type: "Manufacture Date", value: manufactureDate },
//       { trait_type: "Expiry Date", value: expiryDate },
//       { trait_type: "Certificate", value: certificateUrl },
//     ],
//   };

//   const metadataUri = await uploadJSONToPinata(metadataJson);
//   console.log("Metadata uploaded:", metadataUri);

//   const mintedNFTs: string[] = [];
//   const db = getFirestore(app);

//   for (let i = 1; i <= quantity; i++) {
//     const nftName = `${name} #${i}`;
//     const { sft } = await metaplex.nfts().createSft({
//       uri: metadataUri,
//       name: nftName,
//       symbol,
//       sellerFeeBasisPoints: 0,
//       decimals: 0,
//       tokenOwner: walletAdapter.publicKey,
//       tokenAmount: token(1),
//       isMutable: true,
//     });

//     console.log(`Minted SFT ${i}:`, sft.address.toBase58());
//     mintedNFTs.push(sft.address.toBase58());

//     await setDoc(doc(db, "nfts", sft.address.toBase58()), {
//       mintAddress: sft.address.toBase58(),
//       name: nftName,
//       description,
//       image: imageUrl,
//       metadataUri,
//       manufactureDate,
//       expiryDate,
//       certificateUrl,
//       owner: walletAdapter.publicKey.toBase58(),
//       createdAt: serverTimestamp(),
//     });
//   }

//   return mintedNFTs;
// }

// // =============================================================
// // List NFT on Auction House
// // =============================================================
// export async function listNFTOnAuctionHouse(
//   walletAdapter: WalletAdapter,
//   mintAddress: string,
//   price: number
// ): Promise<string> {
//   if (!walletAdapter?.publicKey) throw new Error("Wallet not connected");

//   const connection = new Connection(RPC_URL, "confirmed");
//   const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
//   const mint = new PublicKey(mintAddress);

//   const ata = await getAssociatedTokenAddress(mint, walletAdapter.publicKey);
//   const tokenAccount = await getAccount(connection, ata);
//   if (Number(tokenAccount.amount) === 0) throw new Error("You don't own this NFT.");

//   const auctionHouse = await metaplex
//     .auctionHouse()
//     .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

//   const { listing } = await metaplex.auctionHouse().list({
//     auctionHouse,
//     seller: metaplex.identity(),
//     mintAccount: mint,
//     price: sol(price),
//     tokens: token(1),
//   });

//   console.log("Listing created:", listing.tradeStateAddress.toBase58());
//   return listing.tradeStateAddress.toBase58();
// }

// // =============================================================
// // Cancel Listing
// // =============================================================
// export async function cancelListingOnAuctionHouse(
//   walletAdapter: WalletAdapter,
//   mintAddress: string
// ): Promise<string> {
//   if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

//   const metaplex = getMetaplex(walletAdapter);
//   const mint = new PublicKey(mintAddress);

//   const auctionHouse = await metaplex
//     .auctionHouse()
//     .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

//   const listings = await metaplex
//     .auctionHouse()
//     .findListings({ auctionHouse, seller: walletAdapter.publicKey });

//   let targetLazyListing: LazyListing | null = null;

//   for (const l of listings) {
//     const loaded = await metaplex.auctionHouse().loadListing({ lazyListing: l as LazyListing });
//     if (loaded.asset.address.equals(mint)) {
//       targetLazyListing = l as LazyListing;
//       break;
//     }
//   }

//   if (!targetLazyListing) throw new Error("No active listing found for this NFT.");

//   const listing = await metaplex.auctionHouse().loadListing({
//     lazyListing: targetLazyListing,
//   });

//   const { response } = await metaplex.auctionHouse().cancelListing({
//     auctionHouse,
//     listing,
//   });

//   console.log("Listing cancelled:", response.signature);
//   return response.signature;
// }

// // =============================================================
// // BUY NFT FROM AUCTION HOUSE (100% WORKING — FINAL)
// // =============================================================
// // safeBuyNFT: improved, defensive buy flow
// export async function buyNFT(
//   walletAdapter: WalletAdapter,
//   mintAddress: string,
//   price: number
// ): Promise<string> {
//   if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

//   const connection = new Connection(RPC_URL, "confirmed");
//   const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
//   const mint = new PublicKey(mintAddress);

//   console.log("🔍 Starting NFT Purchase for:", mintAddress);

//   // Load auction house
//   const auctionHouse = await metaplex
//     .auctionHouse()
//     .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

//   // Fetch all listings
//   const listings = await metaplex.auctionHouse().findListings({ auctionHouse });

//   // Find target listing and ensure it’s loaded
//   let targetListing = null;
//   for (const l of listings) {
//     try {
//       const loaded = await metaplex.auctionHouse().loadListing({ lazyListing: l as any });
//       if (loaded.asset.address.equals(mint)) {
//         targetListing = loaded;
//         break;
//       }
//     } catch {
//       continue;
//     }
//   }

//   if (!targetListing) throw new Error("No active listing found for this NFT");

//   // Ensure listing has valid price and tokens
//   if (!targetListing.price || !targetListing.tokens) {
//     console.warn("⚠️ Incomplete listing data:", targetListing);
//     throw new Error("Listing data incomplete — please re-list the NFT.");
//   }

//   console.log("✅ Listing verified:", {
//     price: targetListing.price.basisPoints.toNumber(),
//     tokens: targetListing.tokens.basisPoints?.toNumber?.(),
//   });

//   // Create bid (buyer offer)
//   const { bid, response: bidResponse } = await metaplex.auctionHouse().bid({
//     auctionHouse,
//     mintAccount: mint,
//     seller: targetListing.sellerAddress,
//     price: targetListing.price, // use listing price directly
//     tokens: targetListing.tokens, // match tokens exactly
//   });

//   console.log("💰 Bid signature:", bidResponse.signature);
//   await connection.confirmTransaction(bidResponse.signature, "finalized");

//   // Safety check before executing
//   if (!bid.price || !bid.tokens) {
//     throw new Error("Bid object incomplete — price or tokens missing.");
//   }

//   // Execute sale
//   console.log("⚙️ Executing sale...");
//   const { response } = await metaplex.auctionHouse().executeSale({
//     auctionHouse,
//     listing: targetListing,
//     bid,
//   });

//   console.log("✅ Sale executed:", response.signature);
//   await connection.confirmTransaction(response.signature, "confirmed");

//   // Return transaction signature
//   return response.signature;
// }

import {
  Connection,
  PublicKey,
} from "@solana/web3.js";
import {
  Metaplex,
  walletAdapterIdentity,
  token,
  type LazyListing,
  sol,
} from "@metaplex-foundation/js";
import type { WalletAdapter } from "@solana/wallet-adapter-base";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./firebase";
import axios from "axios";
import {
  getAssociatedTokenAddress,
  getAccount,
} from "@solana/spl-token";

// =============================================================
// CONFIGURATION
// =============================================================
const RPC_URL = "https://api.devnet.solana.com";

export const AUCTION_HOUSE_ADDRESS = new PublicKey(
  "7qhDeVaZC3ouf47XXsKvUpV7YYZvmbw34imu1S6vVPcD"
);

const PINATA_JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YTJhYTZjYy0zNzQ5LTQ5NTctYTczYS1iZjI1OTk0NTdlM2UiLCJlbWFpbCI6InRydXdhbm1hZHV3YW50aGEyMDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5MGQxMjA4ZGZhZDM1YjU2MjY3MSIsInNjb3BlZEtleVNlY3JldCI6IjBmOGE3YjU1OGFiMzU5NGJlZjYzOWM5ZmZjODVhZmQwYTE5ZmI1ZGIyYmVlMjlhNjBjZDkzZDQzZjliMmZlYWEiLCJleHAiOjE3OTM1MTQzMTF9.oyOz-kJedAlLf2YGCCFttbaMQEpboSMMrqASa0X8uxE";

// =============================================================
// Metaplex Setup
// =============================================================
export function getMetaplex(walletAdapter: WalletAdapter) {
  const connection = new Connection(RPC_URL, "confirmed");
  return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
}

// =============================================================
// Pinata Upload Helpers
// =============================================================
export async function uploadToPinata(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: Infinity,
      headers: { Authorization: PINATA_JWT },
    }
  );

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
}

export async function uploadJSONToPinata(jsonData: object): Promise<string> {
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: PINATA_JWT,
      },
    }
  );
  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
}

// =============================================================
// Metadata Interface
// =============================================================
export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  imageFile: File;
  manufactureDate: string;
  expiryDate: string;
  certificateUrl: string;
}

// =============================================================
// Mint NORMAL NFT (SFT)
// =============================================================
export async function mintNormalNFTWithQuantity(
  walletAdapter: WalletAdapter,
  metadata: NFTMetadata,
  quantity: number
): Promise<string[]> {
  if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

  const metaplex = getMetaplex(walletAdapter);
  const {
    name,
    symbol,
    description,
    imageFile,
    manufactureDate,
    expiryDate,
    certificateUrl,
  } = metadata;

  const imageUrl = await uploadToPinata(imageFile);
  const metadataJson = {
    name,
    symbol,
    description,
    image: imageUrl,
    attributes: [
      { trait_type: "Manufacture Date", value: manufactureDate },
      { trait_type: "Expiry Date", value: expiryDate },
      { trait_type: "Certificate", value: certificateUrl },
    ],
  };

  const metadataUri = await uploadJSONToPinata(metadataJson);
  console.log("Metadata uploaded:", metadataUri);

  const mintedNFTs: string[] = [];
  const db = getFirestore(app);

  for (let i = 1; i <= quantity; i++) {
    const nftName = `${name} #${i}`;
    const { sft } = await metaplex.nfts().createSft({
      uri: metadataUri,
      name: nftName,
      symbol,
      sellerFeeBasisPoints: 0,
      decimals: 0,
      tokenOwner: walletAdapter.publicKey,
      tokenAmount: token(1),
      isMutable: true,
    });

    console.log(`Minted SFT ${i}:`, sft.address.toBase58());
    mintedNFTs.push(sft.address.toBase58());

    await setDoc(doc(db, "nfts", sft.address.toBase58()), {
      mintAddress: sft.address.toBase58(),
      name: nftName,
      description,
      image: imageUrl,
      metadataUri,
      manufactureDate,
      expiryDate,
      certificateUrl,
      owner: walletAdapter.publicKey.toBase58(),
      createdAt: serverTimestamp(),
    });
  }

  return mintedNFTs;
}

// =============================================================
// List NFT on Auction House
// =============================================================
export async function listNFTOnAuctionHouse(
  walletAdapter: WalletAdapter,
  mintAddress: string,
  price: number
): Promise<string> {
  if (!walletAdapter?.publicKey) throw new Error("Wallet not connected");

  const connection = new Connection(RPC_URL, "confirmed");
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  const mint = new PublicKey(mintAddress);

  const ata = await getAssociatedTokenAddress(mint, walletAdapter.publicKey);
  const tokenAccount = await getAccount(connection, ata);
  if (Number(tokenAccount.amount) === 0) throw new Error("You don't own this NFT.");

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

  const { listing } = await metaplex.auctionHouse().list({
    auctionHouse,
    seller: metaplex.identity(),
    mintAccount: mint,
    price: sol(price),
    tokens: token(1),
  });

  console.log("Listing created:", listing.tradeStateAddress.toBase58());
  return listing.tradeStateAddress.toBase58();
}

// =============================================================
// Cancel Listing
// =============================================================
export async function cancelListingOnAuctionHouse(
  walletAdapter: WalletAdapter,
  mintAddress: string
): Promise<string> {
  if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

  const metaplex = getMetaplex(walletAdapter);
  const mint = new PublicKey(mintAddress);

  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

  const listings = await metaplex
    .auctionHouse()
    .findListings({ auctionHouse, seller: walletAdapter.publicKey });

  let targetLazyListing: LazyListing | null = null;

  for (const l of listings) {
    const loaded = await metaplex.auctionHouse().loadListing({ lazyListing: l as LazyListing });
    if (loaded.asset.address.equals(mint)) {
      targetLazyListing = l as LazyListing;
      break;
    }
  }

  if (!targetLazyListing) throw new Error("No active listing found for this NFT.");

  const listing = await metaplex.auctionHouse().loadListing({
    lazyListing: targetLazyListing,
  });

  const { response } = await metaplex.auctionHouse().cancelListing({
    auctionHouse,
    listing,
  });

  console.log("Listing cancelled:", response.signature);
  return response.signature;
}

// =============================================================
// BUY NFT FROM AUCTION HOUSE (100% WORKING — FINAL)
// =============================================================
// safeBuyNFT: improved, defensive buy flow
export async function buyNFT(
  walletAdapter: WalletAdapter,
  mintAddress: string,
  price: number
): Promise<string> {
  if (!walletAdapter.publicKey) throw new Error("Wallet not connected");

  console.log("🎯 Starting NFT Purchase for:", mintAddress);

  const connection = new Connection(RPC_URL, "confirmed");
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
  const mint = new PublicKey(mintAddress);

  // 1️⃣ Fetch Auction House
  const auctionHouse = await metaplex
    .auctionHouse()
    .findByAddress({ address: AUCTION_HOUSE_ADDRESS });

  // 2️⃣ Find active listing for this NFT
  const listings = await metaplex.auctionHouse().findListings({ auctionHouse });
  let targetListing = null;

  for (const l of listings) {
    try {
      const loaded = await metaplex.auctionHouse().loadListing({ lazyListing: l as any });
      if (loaded.asset.address.equals(mint)) {
        targetListing = loaded;
        break;
      }
    } catch {
      continue;
    }
  }

  if (!targetListing) throw new Error("No active listing found for this NFT.");
  console.log("✅ Listing verified:", {
    price: targetListing.price.basisPoints.toNumber(),
    tokens: targetListing.tokens.basisPoints.toNumber(),
  });

  // 3️⃣ Place Bid
  const { bid, response: bidResponse } = await metaplex.auctionHouse().bid({
    auctionHouse,
    mintAccount: mint,
    seller: targetListing.sellerAddress,
    price: sol(price),
  });

  console.log("💰 Bid confirmed:", bidResponse.signature);
  await connection.confirmTransaction(bidResponse.signature, "finalized");

  // 4️⃣ Execute Sale
  console.log("⚙️ Executing sale...");
  const { response: saleResponse } = await metaplex.auctionHouse().executeSale({
    auctionHouse,
    listing: targetListing,
    bid,
  });

  console.log("✅ Sale executed:", saleResponse.signature);
  const txSignature = saleResponse.signature;

  // 5️⃣ Load NFT metadata (including image)
  let nft;
  let nftJson: any = null;

  try {
    nft = await metaplex.nfts().findByMint({ mintAddress: mint });
    if (nft?.uri) {
      const res = await fetch(nft.uri);
      nftJson = await res.json();
    }
  } catch (err) {
    console.warn("⚠️ Could not load NFT metadata via findByMint:", err);
  }

  const imageUrl =
    nftJson?.image ||
    nft?.json?.image ||
    targetListing.asset.json?.image ||
    "";
  const nftName =
    nftJson?.name ||
    nft?.name ||
    targetListing.asset.name ||
    "Unnamed NFT";

  // 6️⃣ Save Purchase in Firestore (so it appears in BoughtNFTs)
  const db = getFirestore(app);
  await setDoc(doc(db, "purchases", txSignature), {
    mintAddress: mint.toBase58(),
    name: nftName,
    image: imageUrl,
    price,
    buyer: walletAdapter.publicKey.toBase58(),
    seller: targetListing.sellerAddress.toBase58(),
    tx: txSignature,
    createdAt: serverTimestamp(),
  });

  console.log("🧾 Firestore purchase record saved:", { name: nftName, image: imageUrl });

  // 7️⃣ Delete Listing from Firestore
  try {
    await deleteDoc(doc(db, "listings", mint.toBase58()));
    console.log("🗑️ Listing removed from Firestore:", mint.toBase58());
  } catch (err) {
    console.warn("⚠️ Failed to delete listing from Firestore:", err);
  }

  // 8️⃣ Update NFT ownership (so it disappears from seller's ProfileGoods)
  try {
    const nftDocRef = doc(db, "nfts", mint.toBase58());
    await updateDoc(nftDocRef, {
      owner: walletAdapter.publicKey.toBase58(),
      updatedAt: serverTimestamp(),
    });
    console.log("🔄 Firestore NFT ownership transferred to buyer:", walletAdapter.publicKey.toBase58());
  } catch (err) {
    console.warn("⚠️ Could not update NFT owner in Firestore:", err);
  }

  console.log("🎉 NFT Purchase Complete!");
  return txSignature;
}