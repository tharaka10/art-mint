// // src/components/ListNFT.tsx
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Transaction } from "@solana/web3.js";
// import { useSolana } from "../hooks/useSolana";

// interface ListNFTProps {
//   nftAddress: string;
//   price: number;
// }

// export const ListNFT: React.FC<ListNFTProps> = ({ nftAddress, price }) => {
//   const { wallet, connection, network } = useSolana();

//   const handleList = async () => {
//     if (!wallet.publicKey) {
//       toast.error("Connect your wallet first!");
//       return;
//     }

//     try {
//       toast.loading("Preparing list transaction...");

//       const res = await axios.post(
//         `${import.meta.env.VITE_SHYFT_ENDPOINT}marketplace/list`,
//         {
//           network,
//           marketplace_address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
//           nft_address: nftAddress,
//           price: Number(price),
//           seller_address: wallet.publicKey.toString(),
//           service_charge: {
//             receiver: import.meta.env.VITE_SERVICE_FEE_RECEIVER,
//             amount: Number(import.meta.env.VITE_SERVICE_FEE),
//           },
//         },
//         {
//           headers: { "x-api-key": import.meta.env.VITE_SHYFT_API_KEY! },
//         }
//       );

//       const encodedTx = res.data.result.encoded_transaction;
//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

//       const sig = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(sig, "confirmed");

//       toast.dismiss();
//       toast.success("NFT listed successfully!");
//     } catch (err: any) {
//       toast.dismiss();
//       console.error(err);
//       toast.error(err.message || "Listing failed");
//     }
//   };

//   return (
//     <button
//       onClick={handleList}
//       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//     >
//       List NFT
//     </button>
//   );
// };

// src/components/ListNFT.tsx
// src/components/ListNFT.tsx
// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Transaction, Connection } from "@solana/web3.js";
// import { useWallet } from "@solana/wallet-adapter-react";

// interface ListNFTProps {
//   nftAddress: string;
//   defaultPrice?: number;
// }

// const ListNFT: React.FC<ListNFTProps> = ({ nftAddress, defaultPrice = 1 }) => {
//   const wallet = useWallet();
//   const connection = new Connection(import.meta.env.VITE_SHYFT_RPC!, "confirmed");

//   const [price, setPrice] = useState(defaultPrice);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleList = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       toast.error("Please connect your wallet first!");
//       return;
//     }

//     if (!price || price <= 0) {
//       toast.error("Please enter a valid price!");
//       return;
//     }

//     try {
//       setLoading(true);
//       toast.loading("Preparing list transaction...");

//       const baseUrl = import.meta.env.VITE_SHYFT_ENDPOINT!.replace(/\/+$/, "");
//       const body = {
//         network: import.meta.env.VITE_NETWORK || "devnet",
//         marketplace_address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
//         nft_address: nftAddress,
//         price: Number(price),
//         seller_address: wallet.publicKey.toBase58(),
//         service_charge: {
//           receiver: import.meta.env.VITE_SERVICE_FEE_RECEIVER,
//           amount: Number(import.meta.env.VITE_SERVICE_FEE),
//         },
//       };

//       console.log("📤 Listing Body:", body);

//       const res = await axios.post(`${baseUrl}/marketplace/list`, body, {
//         headers: {
//           "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.data.success) throw new Error(res.data.message || "Listing failed.");

//       const encodedTx = res.data.result.encoded_transaction;
//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

//       const sig = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(sig, "confirmed");

//       toast.dismiss();
//       toast.success("🎉 NFT listed successfully!");
//       console.log("✅ Listing Signature:", sig);

//       setShowConfirm(false);
//     } catch (err: any) {
//       toast.dismiss();
//       console.error("❌ Listing Error:", err.response?.data || err);
//       toast.error(err.response?.data?.message || err.message || "Listing failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Price Input */}
//       <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
//         <label htmlFor="price" className="text-sm text-gray-300 mr-2">
//           Price (SOL):
//         </label>
//         <input
//           id="price"
//           type="number"
//           step="0.01"
//           min="0"
//           title="Price in SOL"
//           aria-label="Price in SOL"
//           placeholder="Enter price"
//           value={price}
//           onChange={(e) => setPrice(Number(e.target.value))}
//           className="w-32 p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none"
//         />
//       </div>

//       {/* List Button */}
//       <button
//         onClick={() => setShowConfirm(true)}
//         disabled={!wallet.connected || loading}
//         className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition"
//       >
//         {loading ? "Listing..." : "List NFT"}
//       </button>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-xl p-6 w-80 shadow-xl border border-gray-700">
//             <h3 className="text-lg font-semibold text-white mb-3 text-center">
//               Confirm Listing
//             </h3>
//             <p className="text-sm text-gray-300 text-center mb-4">
//               You are about to list your NFT for{" "}
//               <span className="font-bold text-green-400">{price} SOL</span>.
//               <br />
//               Proceed?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleList}
//                 disabled={loading}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 {loading ? "Processing..." : "Yes, List"}
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListNFT;

// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Transaction, Connection } from "@solana/web3.js";
// import { useWallet } from "@solana/wallet-adapter-react";

// interface ListNFTProps {
//   nftAddress: string;
//   defaultPrice?: number;
// }

// const ListNFT: React.FC<ListNFTProps> = ({ nftAddress, defaultPrice = 1 }) => {
//   const wallet = useWallet();
//   const connection = new Connection(import.meta.env.VITE_SHYFT_RPC!, "confirmed");

//   const [price, setPrice] = useState(defaultPrice);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Main listing function
//   const handleList = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       toast.error("Please connect your wallet first!");
//       return;
//     }

//     if (!price || price <= 0) {
//       toast.error("Please enter a valid price!");
//       return;
//     }

//     try {
//       setLoading(true);
//       toast.loading("Preparing list transaction...");

//       const endpoint = import.meta.env.VITE_SHYFT_ENDPOINT?.replace(/\/+$/, "") || "https://api.shyft.to/sol/v1";
//       const marketplace = import.meta.env.VITE_MARKETPLACE_ADDRESS!;
//       const receiver = import.meta.env.VITE_SERVICE_FEE_RECEIVER!;
//       const fee = Number(import.meta.env.VITE_SERVICE_FEE) || 0.02;
//       const network = import.meta.env.VITE_NETWORK || "devnet";

//       // Build request body
//       const body = {
//         network,
//         marketplace_address: marketplace,
//         nft_address: nftAddress,
//         price: Number(price),
//         seller_address: wallet.publicKey.toBase58(),
//         service_charge: {
//           receiver,
//           amount: fee,
//         },
//       };

//       // 🧩 Debug log to verify fields are valid
//       console.log("📤 Listing Body:", body);
//       console.log("🧾 Full env:", {
//   endpoint,
//   marketplace,
//   receiver,
//   fee,
//   network,
// });


//       const res = await axios.post(`${endpoint}/marketplace/list`, body, {
//         headers: {
//           "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("🧭 Shyft response:", res.data);

//       if (!res.data.success) {
//         throw new Error(res.data.message || "Listing failed — Shyft validation error.");
//       }

//       const encodedTx = res.data.result.encoded_transaction;
//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

//       // Send transaction via wallet
//       const sig = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(sig, "confirmed");

//       toast.dismiss();
//       toast.success("🎉 NFT listed successfully!");
//       console.log("✅ Listing Signature:", sig);

//       setShowConfirm(false);
//     } catch (err: any) {
//       toast.dismiss();
//       console.error("❌ Listing Error:", err.response?.data || err.message || err);
//       toast.error(err.response?.data?.message || err.message || "Listing failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Price Input */}
//       <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
//         <label htmlFor="price" className="text-sm text-gray-300 mr-2">
//           Price (SOL):
//         </label>
//         <input
//           id="price"
//           type="number"
//           step="0.01"
//           min="0"
//           title="Price in SOL"
//           aria-label="Price in SOL"
//           placeholder="Enter price"
//           value={price}
//           onChange={(e) => setPrice(Number(e.target.value))}
//           className="w-32 p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none"
//         />
//       </div>

//       {/* List Button */}
//       <button
//         onClick={() => setShowConfirm(true)}
//         disabled={!wallet.connected || loading}
//         className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg transition"
//       >
//         {loading ? "Listing..." : "List NFT"}
//       </button>

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-gray-900 rounded-xl p-6 w-80 shadow-xl border border-gray-700">
//             <h3 className="text-lg font-semibold text-white mb-3 text-center">
//               Confirm Listing
//             </h3>
//             <p className="text-sm text-gray-300 text-center mb-4">
//               You are about to list your NFT for{" "}
//               <span className="font-bold text-green-400">{price} SOL</span>.
//               <br />
//               Do you want to continue?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleList}
//                 disabled={loading}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 {loading ? "Processing..." : "Yes, List"}
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListNFT;

// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// import { Transaction } from "@solana/web3.js";
// import { FaExternalLinkAlt } from "react-icons/fa";
// import { Notify } from "../utils/constants"; // update if path differs

// interface ListForSaleProps {
//   nft: {
//     mint: string;
//     name: string;
//     description: string;
//     image_uri: string;
//   };
//   setLoader: (value: boolean) => void;
// }

// const ListForSale: React.FC<ListForSaleProps> = ({ nft, setLoader }) => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet();
//   const [price, setPrice] = useState<string>("");

//   const notifySuccess = (msg: string) => toast.success(msg, { duration: 2000 });
//   const notifyError = (msg: string) => toast.error(msg, { duration: 2000 });

//   const listNFT = async () => {
//     if (!publicKey) {
//       notifyError("Please connect your wallet first!");
//       return;
//     }
//     if (!price || isNaN(Number(price))) {
//       notifyError("Enter a valid price in SOL");
//       return;
//     }

//     try {
//       setLoader(true);
//       const network = import.meta.env.VITE_NETWORK || "devnet";
//       const endpoint = `${import.meta.env.VITE_SHYFT_ENDPOINT}/marketplace/list`.replace(/([^:]\/)\/+/g, "$1");

//       const body = {
//         network,
//         marketplace_address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
//         nft_address: nft.mint,
//         price: price.toString(), // ✅ must be string
//         seller_address: publicKey.toString(),
//         service_charge: {
//           receiver: import.meta.env.VITE_SERVICE_FEE_RECEIVER,
//           amount: import.meta.env.VITE_SERVICE_FEE.toString(), // ✅ must be string
//         },
//       };

//       console.log("🧾 Listing Body:", body);

//       const res = await axios.post(endpoint, body, {
//         headers: {
//           "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.data.success) throw new Error(res.data.message);

//       const encodedTx = res.data.result.encoded_transaction;
//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
//       const sig = await sendTransaction(tx, connection);
//       await connection.confirmTransaction(sig, "confirmed");

//       Notify("NFT Listed Successfully", nft.image_uri, nft.name);
//       notifySuccess("✅ NFT listed successfully!");
//     } catch (err: any) {
//       console.error("❌ Listing Error:", err.response?.data || err.message);
//       notifyError(err.response?.data?.message || "Listing failed");
//     } finally {
//       setLoader(false);
//     }
//   };

//   return (
//     <div
//       className="modal fade popup"
//       id="listForSale"
//       tabIndex={-1}
//       role="dialog"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content bg-gray-900 text-white rounded-2xl p-6">
//           <button
//             type="button"
//             className="close text-gray-400 hover:text-white text-3xl absolute top-4 right-6"
//             data-dismiss="modal"
//             aria-label="Close"
//           >
//             &times;
//           </button>
//           <div className="modal-body space-y-4">
//             <div className="flex justify-center">
//               <img
//                 src={nft.image_uri}
//                 alt={nft.name}
//                 className="rounded-xl w-48 h-48 object-cover"
//               />
//             </div>
//             <h2 className="text-2xl font-bold text-center">{nft.name}</h2>
//             <p className="text-gray-400 text-center">
//               {nft.description?.slice(0, 100)}...
//             </p>

//             <div className="mt-4">
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium text-gray-300 mb-1"
//               >
//                 Enter Price (SOL)
//               </label>
//               <input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="e.g., 0.5"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full p-2 bg-gray-800 rounded text-white"
//               />
//             </div>

//             <button
//               onClick={listNFT}
//               className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
//             >
//               List NFT <FaExternalLinkAlt size={14} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListForSale;

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";

// ✅ Props match how you're using the component in MyNFTsPage.tsx
interface ListNFTProps {
  nft: {
    mint: string;
    name?: string;
    image_uri?: string;
    description?: string;
  };
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListNFT: React.FC<ListNFTProps> = ({ nft, setLoader }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

const handleList = async () => {
  console.log("🔥 handleList triggered"); // ✅ CHECKPOINT #1

  if (!publicKey) {
    toast.error("Please connect your wallet first!");
    console.warn("⚠️ No wallet connected");
    return;
  }

  if (!price || isNaN(Number(price))) {
    toast.error("Enter a valid price!");
    console.warn("⚠️ Invalid price:", price);
    return;
  }

  try {
    setLoading(true);
    setLoader(true);
    toast.loading("Preparing listing transaction...");

    const body = {
      network: import.meta.env.VITE_NETWORK || "devnet",
      marketplace_address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
      nft_address: nft.mint,
      price: Number(price),
      seller_wallet: publicKey.toString(),
      service_charge: {
        receiver: import.meta.env.VITE_SERVICE_FEE_RECEIVER,
        amount: Number(import.meta.env.VITE_SERVICE_FEE),
      },
    };

    console.log("🧾 Listing body:", body); // ✅ CHECKPOINT #2

    const endpoint = `${import.meta.env.VITE_SHYFT_ENDPOINT}/marketplace/list`.replace(
      /([^:]\/)\/+/g,
      "$1"
    );

    console.log("🌐 Endpoint:", endpoint); // ✅ CHECKPOINT #3

    const res = await axios.post(endpoint, body, {
      headers: {
        "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
        "Content-Type": "application/json",
      },
    });

    console.log("📩 API Response:", res.data); // ✅ CHECKPOINT #4

    if (!res.data.success) throw new Error(res.data.message || "Listing failed");

    const encodedTx = res.data.result.encoded_transaction;
    const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
    const sig = await sendTransaction(tx, connection);
    await connection.confirmTransaction(sig, "confirmed");

    toast.dismiss();
    toast.success("✅ NFT listed successfully!");
    console.log("🟢 Transaction:", sig);
  } catch (err: any) {
    toast.dismiss();
    console.error("❌ Listing Error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Listing failed");
  } finally {
    setLoading(false);
    setLoader(false);
  }
};


  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white max-w-md mx-auto">
      <img
        src={nft.image_uri || "/placeholder.png"}
        alt={nft.name || "NFT"}
        className="w-full rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold">{nft.name || "Unnamed NFT"}</h2>
      <p className="text-sm text-gray-400 mb-4">
        {nft.description?.slice(0, 80) || "No description"}
      </p>

      <input
        type="number"
        placeholder="Enter price in SOL"
        title="Price"
        className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

    <button
  type="button"
  onClick={() => {
    console.log("🖱️ Button clicked!");
    handleList();
  }}
  disabled={loading}
  className={`w-full px-4 py-2 rounded-lg text-white ${
    loading
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Listing..." : "List NFT"}
</button>


    </div>
  );
};

export default ListNFT;
