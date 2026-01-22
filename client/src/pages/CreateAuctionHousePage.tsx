// // import React, { useEffect, useState } from "react";
// // import { useWallet } from "@solana/wallet-adapter-react";
// // import { createAuctionHouse, getMetaplex } from "../utils/solana";
// // import { getFirestore, doc, getDoc } from "firebase/firestore";
// // import { app } from "../utils/firebase";

// // const CreateAuctionHousePage: React.FC = () => {
// //   const { wallet } = useWallet();
// //   const [auctionHouseAddress, setAuctionHouseAddress] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   // 🔹 Check Firestore for existing Auction House
// //   useEffect(() => {
// //     const fetchAuctionHouse = async () => {
// //       try {
// //         const db = getFirestore(app);
// //         const docRef = doc(db, "auctionHouse", "devnet");
// //         const snap = await getDoc(docRef);

// //         if (snap.exists()) {
// //           setAuctionHouseAddress(snap.data().address);
// //           setMessage(`✅ Auction House already exists:\n${snap.data().address}`);
// //         } else {
// //           setMessage("ℹ️ No Auction House found. You can create one below.");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching Auction House:", err);
// //         setMessage("❌ Failed to check Auction House in Firestore.");
// //       }
// //     };

// //     fetchAuctionHouse();
// //   }, []);

// //   const handleCreate = async () => {
// //     if (!wallet?.adapter) return alert("Please connect your wallet first.");
// //     setLoading(true);
// //     setMessage("⏳ Creating Auction House... Please approve the transaction in your wallet.");

// //     try {
// //       const address = await createAuctionHouse(wallet.adapter);
// //       setAuctionHouseAddress(address);
// //       setMessage(`✅ Auction House ready!\n📦 Address: ${address}`);
// //     } catch (err: any) {
// //       console.error("❌ Error creating Auction House:", err);
// //       setMessage(`❌ Auction House creation failed: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 text-white max-w-lg mx-auto text-center">
// //       <h1 className="text-3xl font-bold mb-4">Create Auction House</h1>

// //       <p className="text-gray-300 mb-6">
// //         This sets up your marketplace on the Solana Devnet using the Metaplex Auction House program.
// //       </p>

// //       <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-left whitespace-pre-wrap">
// //         {message || "Checking for existing Auction House..."}
// //       </div>

// //       {auctionHouseAddress ? (
// //         <button
// //           type="button"
// //           disabled
// //           className="bg-gray-700 text-gray-400 cursor-not-allowed py-2 px-6 rounded"
// //           title="Auction House already exists"
// //         >
// //           Auction House Created
// //         </button>
// //       ) : (
// //         <button
// //           type="button"
// //           onClick={handleCreate}
// //           disabled={loading}
// //           className={`py-2 px-6 rounded font-semibold ${
// //             loading
// //               ? "bg-blue-800 text-gray-300 cursor-not-allowed"
// //               : "bg-blue-600 hover:bg-blue-700 text-white"
// //           }`}
// //           title="Create new Auction House"
// //         >
// //           {loading ? "Creating..." : "Create Auction House"}
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default CreateAuctionHousePage;


// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { createAuctionHouse } from "../utils/solana";

// const CreateAuctionHousePage: React.FC = () => {
//   const { wallet } = useWallet();
//   const [status, setStatus] = useState("");

//   const handleCreate = async () => {
//     if (!wallet?.adapter) return alert("Please connect your wallet.");
//     setStatus("Creating auction house...");

//     try {
//       const address = await createAuctionHouse(wallet.adapter);
//       setStatus(`✅ Auction House created: ${address}`);
//     } catch (err: any) {
//       console.error("❌ Error creating Auction House:", err);
//       setStatus(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-3xl font-bold mb-4">Create Auction House</h1>
//       <button
//         onClick={handleCreate}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//       >
//         Create Auction House
//       </button>
//       {status && <p className="mt-4">{status}</p>}
//     </div>
//   );
// };

// export default CreateAuctionHousePage;
