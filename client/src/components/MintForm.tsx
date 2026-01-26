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

  /** Upload image to Pinata */
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
    if (!wallet.publicKey) return toast.error("Connect your wallet first!");
    if (!imageFile) return toast.error("Please upload an image");

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

      setForm({ name: "", symbol: "", description: "", email: "" });
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
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <Toaster position="top-right" />

      {/* Heading with gradient */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6
                     bg-gradient-to-r from-purple-400 to-pink-500
                     bg-clip-text text-transparent text-center">
        Mint Your NFT
      </h2>

      <div className="w-full max-w-lg space-y-4 bg-gray-900 p-6 rounded-2xl shadow-lg">

        {/* Form Fields */}
        <label className="font-semibold text-gray-300">Name</label>
        <input
          placeholder="NFT name"
          className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="font-semibold text-gray-300">Symbol</label>
        <input
          placeholder="NFT symbol"
          className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
        />

        <label className="font-semibold text-gray-300">Description</label>
        <input
          placeholder="NFT description"
          className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label className="font-semibold text-gray-300">Email</label>
        <input
          type="email"
          placeholder="Owner's email"
          className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="font-semibold text-gray-300">NFT Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full text-sm bg-gray-800 rounded-lg border border-gray-700 p-2"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        {/* Mint Button */}
        <button
          onClick={handleMint}
          disabled={minting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500
                     font-bold text-black hover:opacity-90 transition duration-300"
        >
          {minting ? "Minting..." : "Mint NFT"}
        </button>

        {/* Mint Result */}
        {mintAddress && (
          <div className="mt-4 text-center space-y-1">
            <p className="text-green-400 font-semibold">Minted successfully:</p>
            <a
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
              className="underline text-blue-400 break-all"
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
