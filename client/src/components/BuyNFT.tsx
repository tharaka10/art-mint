// import React from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";

// interface NFTInfo {
//   image_uri: string;
//   name: string;
//   description: string;
// }

// interface BuyData {
//   nft: NFTInfo;
//   nft_address: string;
//   price: number;
//   currency_symbol?: string;
//   seller_address: string;
// }

// interface BuyNFTProps {
//   buy: BuyData;
//   setLoader: React.Dispatch<React.SetStateAction<boolean>>;
//   onClose: () => void; // ✅ new prop to close modal
// }

// const NFT_MARKETPLACE = import.meta.env.VITE_MARKETPLACE_ADDRESS as string;
// const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY as string;
// const ENDPOINT = import.meta.env.VITE_SHYFT_ENDPOINT as string;

// const BuyNFT: React.FC<BuyNFTProps> = ({ buy, setLoader, onClose }) => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet();

//   const notifySuccess = (msg: string) => toast.success(msg, { duration: 2000 });
//   const notifyError = (msg: string) => toast.error(msg, { duration: 2000 });

//   const buyNow = async (): Promise<void> => {
//   if (!publicKey) {
//     notifyError("Please connect your wallet first!");
//     return;
//   }

//   try {
//     setLoader(true);
//     toast.loading("Preparing NFT purchase transaction...");

//     const network =
//       localStorage.getItem("NETWORK") || import.meta.env.VITE_NETWORK || "devnet";

//     const nftUrl = `${ENDPOINT}/marketplace/buy`.replace(/([^:]\/)\/+/g, "$1");

//     const data = {
//       network,
      
//       marketplace_address: NFT_MARKETPLACE,
//       nft_address: buy?.nft_address,
//       price: Number(buy?.price),
//       seller_address: buy?.seller_address,
//       buyer_address: publicKey.toString(), // ✅ use buyer_address instead of buyer_wallet
//       buyer_wallet: publicKey.toString(), //
//     };

//     console.log("🛒 [BUY NFT] Request Body:", JSON.stringify(data, null, 2));

//     const response = await axios.post(nftUrl, data, {
//       headers: {
//         "x-api-key": SHYFT_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("📦 [BUY NFT] Shyft Response:", response.data);

//     if (response.data.success && response.data.result?.encoded_transaction) {
//       const encodedTransaction = response.data.result.encoded_transaction;

//       // ✅ Decode the Shyft-provided transaction
//       const transaction = Transaction.from(
//         Buffer.from(encodedTransaction, "base64")
//       );

//       console.log("👛 Buyer public key:", publicKey.toString());
//       console.log("🧩 Transaction fee payer:", transaction.feePayer?.toString());

//       // ✅ Manually sign the transaction with Phantom
//       const signedTx = await window.solana.signTransaction(transaction);

//       // ✅ Send raw transaction
//       const txid = await connection.sendRawTransaction(signedTx.serialize(), {
//         skipPreflight: false,
//         preflightCommitment: "processed",
//       });

//       await connection.confirmTransaction(txid, "confirmed");

//       notifySuccess(
//         `✅ NFT purchased successfully!`,
//       );
//       console.log(
//         `🟢 Transaction Signature: ${txid}`,
//         `\n🔗 Explorer: https://explorer.solana.com/tx/${txid}?cluster=${network}`
//       );
//     } else {
//       notifyError(response.data.message || "Purchase failed!");
//       console.error("❌ [BUY NFT] API Error:", response.data);
//     }
//   } catch (err: any) {
//     console.error("💥 [BUY NFT] Error:", err);
//     notifyError(err.response?.data?.message || err.message || "Transaction failed");
//   } finally {
//     toast.dismiss();
//     setLoader(false);
//   }
// };

//   return (
//     // ✅ Modal overlay
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
//       <div className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         >
//           ✕
//         </button>

//         {/* NFT preview */}
//         <img
//           src={buy?.nft?.image_uri || "/placeholder.png"}
//           alt={buy?.nft?.name || "NFT"}
//           className="rounded-xl w-full h-64 object-cover mb-4"
//         />

//         {/* Solana logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src="/logo-solana.png"
//             alt="Solana"
//             className="w-16 h-16 rounded-full animate-spin-slow"
//           />
//         </div>

//         {/* NFT details */}
//         <h2 className="text-2xl font-semibold mb-2 text-center">
//           {buy?.nft?.name || "Unnamed NFT"}
//         </h2>
//         <p className="text-sm text-gray-400 mb-4 text-center">
//           {buy?.nft?.description
//             ? buy.nft.description.slice(0, 100)
//             : "No description available"}
//         </p>

//         {/* Buy button */}
//         <button
//           onClick={buyNow}
//           className="bg-green-500 hover:bg-green-600 text-black font-semibold w-full py-3 rounded-lg transition"
//         >
//           Buy {buy?.price} {buy?.currency_symbol || "SOL"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BuyNFT;

// import React from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";
// import { FaExternalLinkAlt } from "react-icons/fa";

// // ----------------- TYPES -----------------
// interface NFTInfo {
//   image_uri: string;
//   name: string;
//   description: string;
// }

// interface BuyData {
//   nft: NFTInfo;
//   nft_address: string;
//   price: number;
//   currency_symbol?: string;
//   seller_address: string;
// }

// interface BuyNFTProps {
//   buy: BuyData;
//   setLoader: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // ----------------- ENV -----------------
// const ENDPOINT = import.meta.env.VITE_SHYFT_ENDPOINT || "https://api.shyft.to/sol/v1/";
// const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY || "";
// const NFT_MARKETPLACE = import.meta.env.VITE_MARKETPLACE_ADDRESS || "";
// const NETWORK = import.meta.env.VITE_NETWORK || "devnet";

// // ----------------- COMPONENT -----------------
// const BuyNFT: React.FC<BuyNFTProps> = ({ buy, setLoader }) => {
//   const { connection } = useConnection();
//   const { sendTransaction, publicKey } = useWallet();

//   // Helper to show toasts
//   const notify = {
//     success: (msg: string) => toast.success(msg, { duration: 2500 }),
//     error: (msg: string) => toast.error(msg, { duration: 2500 }),
//     loading: (msg: string) => toast.loading(msg, { duration: 2000 }),
//   };

//   // ----------------- BUY FUNCTION -----------------
//   const buyNow = async () => {
//     if (!publicKey) {
//       notify.error("Please connect your wallet first!");
//       return;
//     }

//     try {
//       setLoader(true);
//       notify.loading("Creating transaction...");

//       const nftUrl = `${ENDPOINT}marketplace/buy`;

//       // ✅ The only payload Shyft accepts
//       const data = {
//         network: NETWORK,
//         marketplace_address: NFT_MARKETPLACE,
//         nft_address: buy.nft_address,
//         price: Number(buy.price),
//         seller_address: buy.seller_address,
//         buyer_wallet: publicKey.toString(),
//       };

//       console.log("🧾 [BUY NFT] Payload:", JSON.stringify(data, null, 2));

//       const response = await axios.post(nftUrl, data, {
//         headers: {
//           "x-api-key": SHYFT_API_KEY,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("📡 [BUY NFT] Shyft Response:", response.data);

//       if (!response.data.success) {
//         console.error("❌ Shyft API Error:", response.data);
//         notify.error(response.data.message || "Validation failed!");
//         return;
//       }

//       // Decode and send transaction
//       const encodedTx = response.data.result.encoded_transaction;
//       const transaction = Transaction.from(Buffer.from(encodedTx, "base64"));

//       console.log("🧩 Decoded Transaction:", transaction);

//       const signature = await sendTransaction(transaction, connection);
//       console.log("🪶 Signature:", signature);

//       const confirmation = await connection.confirmTransaction(signature, "confirmed");
//       console.log("✅ Confirmation:", confirmation);

//       notify.success("NFT purchased successfully!");
//       console.log(
//         `🔗 View on Explorer: https://explorer.solana.com/tx/${signature}?cluster=${NETWORK}`
//       );
//     } catch (err: any) {
//       console.error("💥 [BUY NFT] Error:", err);
//       if (err.response?.data) {
//         console.error("📡 Shyft Raw Response:", err.response.data);
//       }
//       notify.error(err.response?.data?.message || err.message || "Purchase failed!");
//     } finally {
//       toast.dismiss();
//       setLoader(false);
//     }
//   };

//   // ----------------- JSX -----------------
//   return (
//     <div
//       className="modal fade popup"
//       id="buyNft"
//       tabIndex={-1}
//       role="dialog"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//           <button
//             type="button"
//             className="close"
//             data-dismiss="modal"
//             aria-label="Close"
//           >
//             <span aria-hidden="true">×</span>
//           </button>

//           <div className="modal-body text-center">
//             <div className="image mb-4">
//               <img
//                 src={buy.nft.image_uri}
//                 alt={buy.nft.name}
//                 className="rounded-lg w-64 h-64 mx-auto"
//               />
//             </div>

//             <div className="flex flex-col items-center mb-4">
//               <img
//                 src="/logo-solana.png"
//                 alt="Solana Logo"
//                 className="w-16 h-16 rounded-full mb-2"
//               />
//               <h2 className="text-xl font-semibold">{buy.nft.name}</h2>
//               <p className="text-sm text-gray-400">
//                 {buy.nft.description?.slice(0, 115) || "No description"}...
//               </p>
//             </div>

//             <button
//               onClick={buyNow}
//               className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-lg flex justify-center items-center gap-2"
//             >
//               Buy {buy.price} {buy.currency_symbol || "SOL"}
//               <FaExternalLinkAlt />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyNFT;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";
// import {
//   ENDPOINT,
//   SHYFT_API_KEY,
//   NFT_MARKETPLACE,
//   NETWORK,
//   RECEVIED,
//   NFT_BUY_FEE,
//   notifySuccess,
//   notifyError,
// } from "../utils/constants";

// interface NFTListing {
//   nft_address: string;
//   price: number;
//   seller_address: string;
//   name?: string;
//   image_uri?: string;
//   description?: string;
//   currency_symbol?: string;
// }

// const BuyNFTPage: React.FC = () => {
//   const { connection } = useConnection();
//   const { sendTransaction, publicKey } = useWallet();

//   const [listings, setListings] = useState<NFTListing[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ================================
//   // 🔹 Fetch Active Listings
//   // ================================
//   const fetchListings = async () => {
//     setLoading(true);
//     toast.loading("Fetching active listings...");

//     try {
//       const nftUrl = `${ENDPOINT}/marketplace/active_listings`.replace(
//         /([^:]\/)\/+/g,
//         "$1"
//       );

//       const res = await axios.get(nftUrl, {
//         params: {
//           network: NETWORK,
//           marketplace_address: NFT_MARKETPLACE,
//         },
//         headers: {
//           "x-api-key": SHYFT_API_KEY,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.data.success && res.data.result) {
//         setListings(res.data.result);
//         toast.success("✅ Listings loaded successfully!");
//       } else {
//         throw new Error("No active listings found.");
//       }
//     } catch (err: any) {
//       console.error("❌ Fetch listings error:", err);
//       notifyError("Failed to fetch active listings");
//     } finally {
//       toast.dismiss();
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   // ================================
//   // 💰 Buy NFT Function
//   // ================================
//  const buyNFT = async (nft: NFTListing) => {
//   if (!publicKey) {
//     notifyError("Please connect your wallet first!");
//     return;
//   }

//   try {
//     setLoading(true);
//     toast.loading("Preparing NFT purchase...");

//     const nftUrl = `${ENDPOINT}/marketplace/buy`.replace(/([^:]\/)\/+/g, "$1");

//     const payload = {
//       network: NETWORK,
//       marketplace_address: NFT_MARKETPLACE,
//       nft_address: nft.nft_address,
//       price: Number(nft.price),
//       seller_address: nft.seller_address,
//       buyer_wallet: publicKey.toString(),
//     };

//     console.log("[BUY NFT] Payload:", payload);

//     const response = await axios.post(nftUrl, payload, {
//       headers: {
//         "x-api-key": SHYFT_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("📡 [BUY NFT] Raw Shyft Response:", response.data);

//     if (!response.data.success) {
//       notifyError(response.data.message || "Failed to create buy transaction");
//       return;
//     }

//     // --- Decode the returned transaction ---
//     const encodedTx = response.data.result.encoded_transaction;
//     const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

//     // --- Refresh fee payer + blockhash ---
//     const { blockhash, lastValidBlockHeight } =
//       await connection.getLatestBlockhash("finalized");
//     tx.recentBlockhash = blockhash;
//     tx.feePayer = publicKey;

//     console.log("🧩 Transaction ready to sign:", {
//       feePayer: tx.feePayer.toBase58(),
//       blockhash: tx.recentBlockhash,
//       instructionCount: tx.instructions.length,
//     });

//     // --- Use Phantom's native signer instead of wallet adapter ---
//     if (!(window as any).solana) {
//       throw new Error("Phantom wallet not found in window.solana");
//     }

//     const provider = (window as any).solana;
//     if (!provider.isPhantom) {
//       throw new Error("Detected wallet is not Phantom");
//     }

//     console.log("🟣 Requesting Phantom signature...");
//     const signedTx = await provider.signTransaction(tx);

//     const rawTx = signedTx.serialize();

//     console.log("📤 Sending raw transaction...");
//     const sig = await connection.sendRawTransaction(rawTx, {
//       skipPreflight: false,
//       preflightCommitment: "confirmed",
//     });

//     console.log("✅ Transaction signature:", sig);
//     await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");

//     toast.dismiss();
//     toast.success(`🎉 NFT Purchased Successfully!`);
//     console.log(`🔗 View on Solscan: https://solscan.io/tx/${sig}?cluster=devnet`);
//   } catch (err: any) {
//     console.error("💥 [BUY NFT] Error:", err);
//     notifyError(err.message || "Transaction failed or was rejected by wallet");
//   } finally {
//     toast.dismiss();
//     setLoading(false);
//   }
// };


//   // ================================
//   // 🖼️ UI RENDER
//   // ================================
//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">🛒 NFT Marketplace</h1>

//       {loading && <p className="text-center text-gray-400 mb-6">Loading...</p>}

//       {!loading && listings.length === 0 && (
//         <p className="text-center text-gray-400">No NFTs listed for sale.</p>
//       )}

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {listings.map((nft) => (
//           <div
//             key={nft.nft_address}
//             className="bg-gray-900 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all"
//           >
//             <img
//               src={nft.image_uri || "/placeholder.png"}
//               alt={nft.name || "NFT"}
//               className="rounded-lg mb-4 w-full h-56 object-cover"
//             />
//             <h2 className="text-lg font-semibold">{nft.name || "Unnamed NFT"}</h2>
//             <p className="text-sm text-gray-400 mb-2">
//               {nft.description?.slice(0, 60) || "No description"}
//             </p>
//             <p className="text-blue-400 font-semibold mb-4">
//               {nft.price} {nft.currency_symbol || "SOL"}
//             </p>

//             <button
//               onClick={() => buyNFT(nft)}
//               className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BuyNFTPage;

