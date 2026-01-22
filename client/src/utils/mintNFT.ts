import axios from "axios";
import { Transaction, Connection } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SHYFT_ENDPOINT = import.meta.env.VITE_SHYFT_ENDPOINT as string;
const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY as string;
const NETWORK = import.meta.env.VITE_NETWORK || "devnet";

/**
 * Mint a new NFT on Solana using Shyft + IPFS metadata
 */
export const mintNFT = async (
  wallet: WalletContextState,
  metadataUri: string,
  connection: Connection
): Promise<string | null> => {
  if (!wallet.connected || !wallet.publicKey) {
    toast.error("Connect your wallet first!");
    return null;
  }

  if (!metadataUri) {
    toast.error("Metadata URI missing — please upload metadata to IPFS first.");
    return null;
  }

  try {
    toast.loading("Minting your NFT...");

    // Prepare request body
    const data = {
      network: NETWORK,
      wallet: wallet.publicKey.toBase58(),
      metadata_uri: metadataUri,
      is_mutable: true,
      is_compressed: false,
    };

    // Call Shyft API
    const res = await axios.post(`${SHYFT_ENDPOINT}nft/create_from_metadata`, data, {
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!res.data.success) {
      toast.dismiss();
      toast.error(res.data.message || "Minting failed!");
      console.error("Shyft error:", res.data);
      return null;
    }

    // Decode and send transaction
    const encodedTx = res.data.result.encoded_transaction;
    const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

    const signature = await wallet.sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    const { mint, image_uri } = res.data.result;

    // Store in Firestore
    await addDoc(collection(db, "nfts"), {
      mintAddress: mint,
      metadataUri,
      image: image_uri,
      owner: wallet.publicKey.toBase58(),
      txSignature: signature,
      createdAt: serverTimestamp(),
    });

    toast.dismiss();
    toast.success("🎉 NFT Minted Successfully!");
    console.log("✅ NFT Minted:", mint);

    return mint;
  } catch (err: any) {
    toast.dismiss();
    console.error("❌ Minting Failed:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Minting failed — check console.");
    return null;
  }
};
