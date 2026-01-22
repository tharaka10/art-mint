// // src/services/listingService.ts
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import { Connection, PublicKey } from "@solana/web3.js";
// import { Metaplex } from "@metaplex-foundation/js";

// const connection = new Connection("https://api.mainnet-beta.solana.com");
// const metaplex = new Metaplex(connection);

// const PLACEHOLDER_IMAGE =
//   "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// // -------------------------------
// // 1. Normalize image URL from IPFS, CID, or http
// // -------------------------------
// export const safeImageUrl = (url?: string) => {
//   if (!url) return PLACEHOLDER_IMAGE;

//   if (url.startsWith("http")) return url;

//   if (url.startsWith("ipfs://")) {
//     const cid = url.replace("ipfs://", "");
//     return `https://gateway.pinata.cloud/ipfs/${cid}`;
//   }

//   // Raw CID
//   if (url.length >= 46 && !url.includes(".")) {
//     return `https://gateway.pinata.cloud/ipfs/${url}`;
//   }

//   return PLACEHOLDER_IMAGE;
// };

// // -------------------------------
// // 2. Fetch Metadata for a Mint
// // -------------------------------
// export const fetchNFTData = async (mint: string) => {
//   try {
//     const nft = await metaplex.nfts().findByMint({
//       mintAddress: new PublicKey(mint),
//     });

//     return {
//       image: safeImageUrl(nft.json?.image),
//       name: nft.json?.name || `${mint.slice(0, 10)}...`,
//     };
//   } catch (err) {
//     console.error("⚠️ NFT Metadata fetch error:", err);
//     return {
//       image: PLACEHOLDER_IMAGE,
//       name: mint.slice(0, 10) + "...",
//     };
//   }
// };

// // -------------------------------
// // Listing Interface
// // -------------------------------
// export interface Listing {
//   description: string;
//   id: string;
//   nftMint: string;
//   price: number;
//   currency: string;
//   seller: string;
//   status: string;
//   imageUrl?: string;
//   nftName?: string;
// }

// // -------------------------------
// // 3. Fetch All Listings + NFT Metadata
// // -------------------------------
// export const fetchAllListings = async (): Promise<Listing[]> => {
//   try {
//     const snap = await getDocs(collection(db, "listings"));

//     const listings: Listing[] = await Promise.all(
//       snap.docs.map(async (doc) => {
//         const data = doc.data();
//         const nftData = await fetchNFTData(data.nftMint);

//         return {
//           id: doc.id,
//           description: data.description,
//           nftMint: data.nftMint,
//           price: data.price,
//           currency: data.currency,
//           seller: data.seller,
//           status: data.status,
//           imageUrl: nftData.image,
//           nftName: nftData.name,
//         };
//       })
//     );

//     return listings;
//   } catch (error) {
//     console.error("🔥 Failed to fetch listings:", error);
//     return [];
//   }
// };

// // -------------------------------
// // 4. Filter Only Active Listings
// // -------------------------------
// export const fetchActiveListings = async () => {
//   const all = await fetchAllListings();
//   return all.filter((l) => l.status !== "cancelled");
// };

// // -------------------------------
// // 5. Fetch Limited Listings (for slider, trending, etc.)
// // -------------------------------
// export const fetchLimitedListings = async (limit: number) => {
//   const active = await fetchActiveListings();
//   return active.slice(0, limit);
// };


// src/services/listingService.ts
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../utils/firebase";

// const PLACEHOLDER_IMAGE =
//   "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// // -------------------------------
// // Normalize IPFS / CID URLs
// // -------------------------------
// export const safeImageUrl = (url?: string) => {
//   if (!url) return PLACEHOLDER_IMAGE;

//   if (url.startsWith("http")) return url;

//   if (url.startsWith("ipfs://")) {
//     const cid = url.replace("ipfs://", "");
//     return `https://gateway.pinata.cloud/ipfs/${cid}`;
//   }

//   // Raw CID
//   if (url.length >= 46 && !url.includes(".")) {
//     return `https://gateway.pinata.cloud/ipfs/${url}`;
//   }

//   return PLACEHOLDER_IMAGE;
// };

// // -------------------------------
// // Listing interface
// // -------------------------------
// export interface Listing {
//   description: string;
//   id: string;
//   nftMint: string;
//   price: number;
//   currency: string;
//   seller: string;
//   status: string;
//   imageUrl?: string;
//   nftName?: string;
// }

// // -------------------------------
// // Fetch All Listings (🔥 No RPC Metadata)
// // -------------------------------
// export const fetchAllListings = async (): Promise<Listing[]> => {
//   try {
//     const snap = await getDocs(collection(db, "listings"));

//     const listings: Listing[] = snap.docs.map((doc) => {
//       const data = doc.data();

//       return {
//         id: doc.id,
//         description: data.description,
//         nftMint: data.nftMint,
//         price: data.price,
//         currency: data.currency,
//         seller: data.seller,
//         status: data.status,

//         // 🔥 Prefer Firestore image
//         // No RPC fetch, no Metaplex metadata needed
//         imageUrl: safeImageUrl(data.image) || PLACEHOLDER_IMAGE,

//         // 🔥 Prefer Firestore name
//         nftName: data.name || "Unnamed NFT",
//       };
//     });

//     return listings;
//   } catch (error) {
//     console.error("🔥 Failed to fetch listings:", error);
//     return [];
//   }
// };

// // -------------------------------
// // Filter only Active Listings
// // -------------------------------
// export const fetchActiveListings = async () => {
//   const all = await fetchAllListings();
//   return all.filter((l) => l.status !== "cancelled");
// };

// // -------------------------------
// // Fetch limited amount
// // -------------------------------
// export const fetchLimitedListings = async (limit: number) => {
//   const active = await fetchActiveListings();
//   return active.slice(0, limit);
// };

// src/services/listingService.ts
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit as fbLimit,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const connection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=f0d2dece-416e-4676-8489-542f04bef695"
);
const metaplex = new Metaplex(connection);

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// Normalize IPFS / CID
export const safeImageUrl = (url?: string) => {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith("http")) return url;

  if (url.startsWith("ipfs://")) {
    const cid = url.replace("ipfs://", "");
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }

  if (url.length >= 46 && !url.includes(".")) {
    return `https://gateway.pinata.cloud/ipfs/${url}`;
  }

  return PLACEHOLDER_IMAGE;
};

// Fetch NFT metadata (fallback only)
export const fetchNFTData = async (mint: string) => {
  try {
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mint),
    });

    return {
      image: safeImageUrl(nft.json?.image),
      name: nft.json?.name,
    };
  } catch {
    return {
      image: PLACEHOLDER_IMAGE,
      name: undefined,
    };
  }
};

// Listing interface
export interface Listing {
  description: string;
  id: string;
  nftMint: string;
  price: number;
  currency: string;
  seller: string;
  status: string;
  imageUrl?: string;
  name?: string;
}

// Fetch all listings
export const fetchAllListings = async (): Promise<Listing[]> => {
  try {
    const snap = await getDocs(collection(db, "listings"));

    const listings: Listing[] = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data();
        const nftData = await fetchNFTData(data.nftMint);

        return {
          id: doc.id,
          description: data.description,
          nftMint: data.nftMint,
          price: data.price,
          currency: data.currency ?? "SOL",
          seller: data.seller,
          status: data.status,
          imageUrl: safeImageUrl(data.image) || nftData.image,
          name: data.name || nftData.name || "Unnamed NFT",
        };
      })
    );

    return listings;
  } catch (error) {
    console.error("🔥 Failed to fetch listings:", error);
    return [];
  }
};

// Fetch only active listings
export const fetchActiveListings = async () => {
  const all = await fetchAllListings();
  return all.filter((l) => l.status !== "cancelled");
};

// Fetch limited listings
export const fetchLimitedListings = async (limit: number) => {
  const active = await fetchActiveListings();
  return active.slice(0, limit);
};

// -------------------------
// RECENT PURCHASES
// -------------------------
export const fetchRecentPurchases = async (limitCount: number) => {
  try {
    const q = query(
      collection(db, "purchases"),
      orderBy("createdAt", "desc"),
      fbLimit(limitCount)
    );

    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        buyer: data.buyer,
        seller: data.seller,
        name: data.name,
        imageUrl: safeImageUrl(data.image),
        price: data.price,
        currency: "SOL",
        createdAt: data.createdAt,
        mint: data.mintAddress,
        tx: data.tx,
      };
    });
  } catch (err) {
    console.error("🔥 fetchRecentPurchases error:", err);
    return [];
  }
};

// -------------------------
// WEEKLY SALES + FALLBACK
// -------------------------
export const fetchPurchasesSince = async (timestamp: number) => {
  try {
    const q = query(
      collection(db, "purchases"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((d: any) => d.createdAt?.seconds >= timestamp)
      .map((d: any) => ({
        id: d.id,
        buyer: d.buyer,
        seller: d.seller,
        name: d.name,
        price: d.price,
        currency: "SOL",
        imageUrl: safeImageUrl(d.image),
        createdAt: d.createdAt,
        mint: d.mintAddress,
      }));
  } catch (err) {
    console.error("🔥 fetchPurchasesSince error:", err);
    return [];
  }
};

export const fetchWeeklySales = async (needed: number = 4) => {
  const now = new Date();
  const today = now.getDay();

  // Find this Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((today + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  let startTime = Math.floor(monday.getTime() / 1000);

  let results: any[] = [];

  // Check up to 4 previous weeks until enough results
  for (let i = 0; i < 4; i++) {
    const weekPurchases = await fetchPurchasesSince(startTime);

    results = [...results, ...weekPurchases];

    if (results.length >= needed) break;

    // Move to previous week
    startTime -= 7 * 24 * 60 * 60;
  }

  // -----------------------------------------------------
  // 🔥 NEW SORT LOGIC
  // Highest price first
  // If same price → latest sale first (newest createdAt first)
  // -----------------------------------------------------
  const sorted = results.sort((a: any, b: any) => {
    if (b.price !== a.price) {
      return b.price - a.price; // highest price first
    }
    // same price → newest sale first
    return b.createdAt.seconds - a.createdAt.seconds;
  });

  return sorted.slice(0, needed);
};

