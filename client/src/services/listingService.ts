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
  where,
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

    console.debug("listingService.fetchAllListings -> firestore docs:", snap.docs.length, "parsed listings:", listings.length);

    // If there are no listings in the `listings` collection, fall back to `nfts` collection
    if (!listings.length) {
      try {
        // Fetch latest NFTs ordered by createdAt (newest first)
        const q = query(collection(db, "nfts"), orderBy("createdAt", "desc"));
        const nftSnap = await getDocs(q);
        const fallback = nftSnap.docs.map((d) => {
          const data: any = d.data();
          return {
            id: d.id,
            description: data.description || "",
            nftMint: data.mintAddress || "",
            price: data.price || 0,
            currency: data.currency || "SOL",
            seller: data.owner || "",
            status: "active",
            imageUrl: safeImageUrl(data.image),
            name: data.name || "Unnamed NFT",
            // include createdAt for potential further sorting
            createdAt: data.createdAt,
          } as any;
        });

        console.debug("listingService.fetchAllListings -> fallback to nfts (ordered by createdAt), docs:", nftSnap.docs.length, "mapped:", fallback.length);
        return fallback as Listing[];
      } catch (err) {
        console.error("listingService.fetchAllListings fallback error:", err);
      }
    }

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

    const mapped = snap.docs.map((d) => {
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

    console.debug("listingService.fetchRecentPurchases -> docs:", snap.docs.length, "mapped:", mapped.length);

    if (mapped.length) return mapped;

    // Fallback to `nfts` collection when there are no purchases
    try {
      const nftSnap = await getDocs(query(collection(db, "nfts"), orderBy("createdAt", "desc"), fbLimit(limitCount)));
      const nfts = nftSnap.docs.map((d) => {
        const data: any = d.data();
        return {
          id: d.id,
          buyer: null,
          seller: data.owner || null,
          name: data.name,
          imageUrl: safeImageUrl(data.image),
          price: data.price || 0,
          currency: "SOL",
          createdAt: data.createdAt,
          mint: data.mintAddress,
          tx: null,
        };
      });

      console.debug("listingService.fetchRecentPurchases -> fallback nfts:", nfts.length);
      return nfts;
    } catch (err) {
      console.error("fetchRecentPurchases fallback error:", err);
      return [];
    }
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

  // First, collect purchases for the current week and sort oldest-first
  let results: any[] = [];

  const currentWeekPurchases = await fetchPurchasesSince(startTime);
  currentWeekPurchases.sort((a: any, b: any) => {
    const aSec = a.createdAt?.seconds || 0;
    const bSec = b.createdAt?.seconds || 0;
    return aSec - bSec; // oldest first
  });

  results = [...currentWeekPurchases];

  // If not enough, fill from previous weeks (oldest-first per week)
  let prevStart = startTime - 7 * 24 * 60 * 60;
  for (let i = 0; i < 3 && results.length < needed; i++) {
    const weekPurchases = await fetchPurchasesSince(prevStart);
    weekPurchases.sort((a: any, b: any) => {
      const aSec = a.createdAt?.seconds || 0;
      const bSec = b.createdAt?.seconds || 0;
      return aSec - bSec;
    });

    results = [...results, ...weekPurchases];
    prevStart -= 7 * 24 * 60 * 60;
  }

  // Return oldest-first overall (so first minted this week appears first)
  if (results.length >= needed) {
    console.debug("listingService.fetchWeeklySales -> purchases results:", results.length);
    return results.slice(0, needed);
  }

  // If no purchases found for the week, fall back to `nfts` created this week (oldest-first)
  try {
    const weekStartDate = new Date(monday.getTime());
    const nftQ = query(
      collection(db, "nfts"),
      where("createdAt", ">=", weekStartDate),
      orderBy("createdAt", "asc"),
      fbLimit(needed)
    );

    const nftSnap = await getDocs(nftQ);
    const fallback = nftSnap.docs.map((d) => {
      const data: any = d.data();
      return {
        id: d.id,
        name: data.name,
        price: data.price || 0,
        currency: data.currency || "SOL",
        imageUrl: safeImageUrl(data.image),
        createdAt: data.createdAt,
        mint: data.mintAddress,
      };
    });

    console.debug("listingService.fetchWeeklySales -> fallback nfts this week:", nftSnap.docs.length, "mapped:", fallback.length);
    return fallback.slice(0, needed);
  } catch (err) {
    console.error("listingService.fetchWeeklySales fallback error:", err);
    return results.slice(0, needed);
  }
};

