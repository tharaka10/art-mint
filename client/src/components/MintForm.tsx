// import React, { useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection, Transaction } from "@solana/web3.js";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { db } from "../utils/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const MintForm: React.FC = () => {
//   const wallet = useWallet();
//   const [minting, setMinting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     symbol: "",
//     description: "",
//     manufactureDate: "",
//     expiryDate: "",
//     certificateUrl: "",
//     weight: "", // NEW FIELD
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [mintAddress, setMintAddress] = useState<string | null>(null);

//   const connection = new Connection(import.meta.env.VITE_SHYFT_RPC!, "confirmed");

//   // Upload image to Pinata
//   const uploadToPinata = async (file: File) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         headers: {
//           pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//           pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//         },
//       });

//       return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//     } catch (err) {
//       toast.error("Image upload failed");
//       throw err;
//     }
//   };

//   // Upload metadata JSON to Pinata
//   const uploadMetadata = async (imageUrl: string) => {
//     try {
//       const metadata = {
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         seller_fee_basis_points: 500,
//         attributes: [
//           { trait_type: "Manufacture Date", value: form.manufactureDate || "N/A" },
//           { trait_type: "Expiry Date", value: form.expiryDate || "N/A" },
//           { trait_type: "Certificate URL", value: form.certificateUrl || "N/A" },
//           { trait_type: "Weight (g)", value: form.weight || "N/A" }, // NEW
//         ],
//         properties: {
//           creators: [{ address: wallet.publicKey?.toBase58(), share: 100 }],
//           files: [{ uri: imageUrl, type: "image/jpg" }],
//         },
//       };

//       const res = await axios.post(
//         "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//         metadata,
//         {
//           headers: {
//             pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//             pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//           },
//         }
//       );

//       return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
//     } catch (err) {
//       toast.error("Metadata upload failed");
//       throw err;
//     }
//   };

//   // MAIN MINT FUNCTION
//   const handleMint = async () => {
//     if (!wallet.connected || !wallet.publicKey) {
//       toast.error("Please connect your wallet!");
//       return;
//     }

//     if (!imageFile) {
//       toast.error("Please upload an image.");
//       return;
//     }

//     if (!form.weight) {
//       toast.error("Weight is required.");
//       return;
//     }

//     try {
//       setMinting(true);
//       toast.loading("Minting NFT...");

//       // 1️⃣ Upload image
//       const imageUrl = await uploadToPinata(imageFile);

//       // 2️⃣ Upload metadata
//       const metadataUri = await uploadMetadata(imageUrl);

//       // 3️⃣ MINT using SHYFT — FIXED 🚀
//       const baseUrl = import.meta.env.VITE_SHYFT_ENDPOINT!.replace(/\/+$/, "");

//       const res = await axios.post(
//         `${baseUrl}/nft/create_from_metadata`,
//         {
//           network: import.meta.env.VITE_NETWORK,
//           wallet: wallet.publicKey.toBase58(),
//           metadata_uri: metadataUri,

//           // ⭐ REQUIRED TO LET BUYER BURN LATER
//           update_authority: wallet.publicKey.toBase58(),
//         },
//         {
//           headers: {
//             "x-api-key": import.meta.env.VITE_SHYFT_API_KEY!,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.data.success) {
//         toast.error("Minting failed");
//         return;
//       }

//       const encodedTx = res.data.result.encoded_transaction;
//       const mint = res.data.result.mint;

//       const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
//       const signature = await wallet.sendTransaction(tx, connection);
//       await connection.confirmTransaction(signature, "confirmed");

//       // 4️⃣ Save NFT info to Firestore
//       await addDoc(collection(db, "nfts"), {
//         mintAddress: mint,
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//         image: imageUrl,
//         metadataUri,
//         manufactureDate: form.manufactureDate,
//         expiryDate: form.expiryDate,
//         certificateUrl: form.certificateUrl,
//         weight: form.weight, // SAVE WEIGHT
//         owner: wallet.publicKey.toBase58(),
//         txSignature: signature,
//         createdAt: serverTimestamp(),
//       });

//       toast.dismiss();
//       toast.success("🎉 NFT Minted Successfully!");
//       setMintAddress(mint);

//       // reset form
//       setForm({
//         name: "",
//         symbol: "",
//         description: "",
//         manufactureDate: "",
//         expiryDate: "",
//         certificateUrl: "",
//         weight: "",
//       });
//       setImageFile(null);

//     } catch (err: any) {
//       toast.dismiss();
//       toast.error(err.response?.data?.message || "Minting failed.");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//   <div className="min-h-screen bg-gray-950 text-white p-6">
//     <Toaster position="top-right" />
//     <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

//     <div className="max-w-lg mx-auto space-y-3 bg-gray-900 p-6 rounded-2xl shadow-lg">

//       {/* NAME */}
//       <div>
//         <label htmlFor="name" className="block text-sm mb-1">Name</label>
//         <input
//           id="name"
//           title="NFT Name"
//           aria-label="NFT Name"
//           placeholder="Enter product name"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//       </div>

//       {/* SYMBOL */}
//       <div>
//         <label htmlFor="symbol" className="block text-sm mb-1">Symbol</label>
//         <input
//           id="symbol"
//           title="NFT Symbol"
//           aria-label="NFT Symbol"
//           placeholder="Enter NFT symbol"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.symbol}
//           onChange={(e) => setForm({ ...form, symbol: e.target.value })}
//           required
//         />
//       </div>

//       {/* DESCRIPTION */}
//       <div>
//         <label htmlFor="description" className="block text-sm mb-1">Description</label>
//         <input
//           id="description"
//           title="Description"
//           aria-label="Description"
//           placeholder="Enter product description"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />
//       </div>

//       {/* CERTIFICATE URL */}
//       <div>
//         <label htmlFor="certificateUrl" className="block text-sm mb-1">
//           Certificate URL
//         </label>
//         <input
//           id="certificateUrl"
//           title="Certificate URL"
//           aria-label="Certificate URL"
//           placeholder="Enter certificate URL"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.certificateUrl}
//           onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
//         />
//       </div>

//       {/* MANUFACTURE DATE */}
//       <div>
//         <label htmlFor="manufactureDate" className="block text-sm mb-1">
//           Manufacture Date
//         </label>
//         <input
//           id="manufactureDate"
//           type="date"
//           title="Manufacture Date"
//           aria-label="Manufacture Date"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.manufactureDate}
//           onChange={(e) =>
//             setForm({ ...form, manufactureDate: e.target.value })
//           }
//         />
//       </div>

//       {/* EXPIRY DATE */}
//       <div>
//         <label htmlFor="expiryDate" className="block text-sm mb-1">
//           Expiry Date
//         </label>
//         <input
//           id="expiryDate"
//           type="date"
//           title="Expiry Date"
//           aria-label="Expiry Date"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.expiryDate}
//           onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
//         />
//       </div>

//       {/* WEIGHT FIELD */}
//       <div>
//         <label htmlFor="weight" className="block text-sm mb-1">
//           Weight (grams)
//         </label>
//         <input
//           id="weight"
//           type="number"
//           title="Weight in grams"
//           aria-label="Weight in grams"
//           placeholder="Enter weight in grams"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={form.weight}
//           onChange={(e) => setForm({ ...form, weight: e.target.value })}
//           required
//         />
//       </div>

//       {/* IMAGE UPLOAD */}
//       <div>
//         <label htmlFor="fileInput" className="block text-sm mb-1">
//           Product Image
//         </label>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           title="Product image upload"
//           aria-label="Upload product image"
//           className="block w-full text-sm bg-gray-800 rounded"
//           onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//           required
//         />
//       </div>

//       {/* MINT BUTTON */}
//       <button
//         onClick={handleMint}
//         disabled={minting}
//         className="w-full bg-green-600 py-2 rounded mt-3"
//       >
//         {minting ? "Minting..." : "Mint NFT"}
//       </button>

//       {/* MINTED ADDRESS */}
//       {mintAddress && (
//         <div className="mt-4 text-center">
//           <p className="text-green-400 font-semibold">✅ Successfully Minted:</p>
//           <a
//             href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
//             target="_blank"
//             className="underline text-blue-400 break-all"
//           >
//             {mintAddress}
//           </a>
//         </div>
//       )}
//     </div>
//   </div>
// );

// };

// export default MintForm;

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const MintForm: React.FC = () => {
  const wallet = useWallet();
  const [minting, setMinting] = useState(false);

  const [form, setForm] = useState({
  name: "",
  symbol: "",
  description: "",
  certificateUrl: "",
  manufactureDate: "",
  expiryDate: "",
  weight: "",
  email: "",
  quantity: "",
});


  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  /** Upload to Pinata: Image */
  const uploadToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  /** Upload metadata JSON */
  const uploadMetadata = async (imageUrl: string) => {
    const metadata = {
      name: form.name,
      symbol: form.symbol,
      description: form.description,
      image: imageUrl,
      attributes: [
        { trait_type: "Manufacture Date", value: form.manufactureDate },
        { trait_type: "Expiry Date", value: form.expiryDate },
        { trait_type: "Certificate URL", value: form.certificateUrl },
        { trait_type: "Weight (g)", value: form.weight },
      ],
      properties: {
        files: [{ uri: imageUrl, type: "image/png" }],
        category: "image",
      },
    };

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  /** Mint NFT */
  const handleMint = async () => {
    if (!wallet.publicKey) {
      toast.error("Connect your wallet first!");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    if (!form.weight.trim()) {
      toast.error("Weight is required");
      return;
    }

    try {
      setMinting(true);
      toast.loading("Uploading image…");

      const imageUrl = await uploadToPinata(imageFile);

      toast.dismiss();
      toast.loading("Uploading metadata…");

      const metadataUri = await uploadMetadata(imageUrl);

      toast.dismiss();
      toast.loading("Minting NFT…");

      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      /** MINT NFT HERE */
      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: form.name,
        symbol: form.symbol,
        sellerFeeBasisPoints: 500,
      });

      const mintStr = nft.address.toBase58();
      setMintAddress(mintStr);

      toast.dismiss();
      toast.success("🎉 NFT Minted Successfully!");

      /** Save NFT to Firestore */
      await addDoc(collection(db, "nfts"), {
  mintAddress: mintStr,
  name: form.name,
  symbol: form.symbol,
  description: form.description,
  image: imageUrl,
  metadataUri,
  certificateUrl: form.certificateUrl,
  manufactureDate: form.manufactureDate,
  expiryDate: form.expiryDate,
  weight: form.weight,
  quantity: form.quantity,
  email: form.email,   // <-- ADDED
  owner: wallet.publicKey.toBase58(),
  createdAt: serverTimestamp(),
});


      /** Reset form */
      setForm({
        name: "",
        symbol: "",
        description: "",
        certificateUrl: "",
        email: "",
        manufactureDate: "",
        expiryDate: "",
        weight: "",
        quantity: "",
      });
      setImageFile(null);
    } catch (err: any) {
      toast.dismiss();
      console.error(err);
      toast.error(err.message || "Minting failed");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-4 text-center">Mint New NFT</h2>

      <div className="max-w-lg mx-auto space-y-3 bg-gray-900 p-6 rounded-xl shadow">

        {/* NAME */}
        <label>Name</label>
        <input
          placeholder="Product name"
          aria-label="Product name"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* SYMBOL */}
        <label>Symbol</label>
        <input
          placeholder="NFT symbol"
          aria-label="NFT symbol"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
        />

        {/* DESCRIPTION */}
        <label>Description</label>
        <input
          placeholder="Description"
          aria-label="Description"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* CERTIFICATE */}
        <label>Certificate URL</label>
        <input
          placeholder="Certificate URL"
          aria-label="Certificate URL"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.certificateUrl}
          onChange={(e) => setForm({ ...form, certificateUrl: e.target.value })}
        />

        {/* EMAIL */}
<label>Email</label>
<input
  type="email"
  placeholder="Owner's Email"
  aria-label="Owner email"
  className="w-full p-2 bg-gray-800 rounded"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>


        {/* MANUFACTURE DATE */}
        <label>Manufacture Date</label>
        <input
          type="date"
          aria-label="Manufacture date"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.manufactureDate}
          onChange={(e) => setForm({ ...form, manufactureDate: e.target.value })}
        />

        {/* EXPIRY DATE */}
        <label>Expiry Date</label>
        <input
          type="date"
          aria-label="Expiry date"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
        />

        {/* WEIGHT */}
        <label>Weight (grams)</label>
        <input
          type="number"
          placeholder="Weight in grams and for one item"
          aria-label="weight in grams"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity of items"
          aria-label="quantity of items"
          className="w-full p-2 bg-gray-800 rounded"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        {/* IMAGE UPLOAD */}
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          aria-label="product image upload"
          className="w-full text-sm bg-gray-800 rounded"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        {/* BUTTON */}
        <button
          onClick={handleMint}
          disabled={minting}
          className="w-full bg-green-600 py-2 rounded mt-3"
        >
          {minting ? "Minting..." : "Mint NFT"}
        </button>

        {mintAddress && (
          <div className="mt-4 text-center">
            <p className="text-green-400 font-semibold">Minted:</p>
            <a
              className="underline text-blue-400"
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
            >
              {mintAddress}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintForm;
