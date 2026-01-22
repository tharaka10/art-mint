import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";

const ConfirmMarketplace: React.FC = () => {
  const wallet = useWallet();
  const [encodedTx, setEncodedTx] = useState("");
  const [network] = useState("https://api.devnet.solana.com");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
  if (!wallet.connected || !wallet.publicKey) {
    toast.error("Please connect your wallet first!");
    return;
  }

  if (!encodedTx.trim()) {
    toast.error("Please paste your encoded transaction first!");
    return;
  }

  try {
    setLoading(true);
    toast.loading("Preparing marketplace transaction...");

    const connection = new Connection(network, "confirmed");

    // Decode the base64 transaction
    const tx = Transaction.from(Buffer.from(encodedTx, "base64"));

    // ✅ Force set recentBlockhash and fee payer to your wallet
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (
      await connection.getLatestBlockhash("finalized")
    ).blockhash;

    console.log("🔑 Fee Payer:", tx.feePayer.toBase58());
    console.log("⛓️ Blockhash:", tx.recentBlockhash);

    // Send + confirm
    const signature = await wallet.sendTransaction(tx, connection);
    await connection.confirmTransaction(signature, "confirmed");

    toast.dismiss();
    toast.success("🎉 Marketplace confirmed on-chain!");
    console.log("✅ Tx Signature:", signature);
  } catch (err: any) {
    toast.dismiss();
    console.error("❌ Error confirming marketplace:", err);
    toast.error(err.message || "Transaction failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Confirm Marketplace Transaction</h2>

      <div className="max-w-md w-full bg-gray-900 p-6 rounded-2xl shadow-lg space-y-3">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Paste Encoded Transaction
        </label>
        <textarea
          rows={5}
          value={encodedTx}
          onChange={(e) => setEncodedTx(e.target.value)}
          placeholder="Paste your base64 encoded transaction here..."
          className="w-full p-3 bg-gray-800 rounded text-white placeholder-gray-400"
        />

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition"
        >
          {loading ? "Confirming..." : "Confirm Marketplace"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmMarketplace;
