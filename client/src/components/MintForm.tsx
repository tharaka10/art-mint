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
  email: "",
  
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
        { trait_type: "name", value: form.name },
        { trait_type: "symbol", value: form.symbol },
        { trait_type: "description", value: form.description },
        { trait_type: "email", value: form.email },
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
  email: form.email,
  owner: wallet.publicKey.toBase58(),
  createdAt: serverTimestamp(),
});


      /** Reset form */
      setForm({
        name: "",
        symbol: "",
        description: "",
        email: "",
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
