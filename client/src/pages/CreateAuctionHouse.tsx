import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const CreateAuctionHouse: React.FC = () => {
  const wallet = useWallet();

  const handleCreateAH = async () => {
    if (!wallet.connected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      const { auctionHouse } = await metaplex.auctionHouse().create({
        sellerFeeBasisPoints: 0,
        requiresSignOff: false, // ✅ open marketplace
        canChangeSalePrice: true,
      });

      alert(`✅ Auction House created!\n\nAddress: ${auctionHouse.address.toBase58()}`);
      console.log("✅ Created Open Auction House:", auctionHouse.address.toBase58());
    } catch (err: any) {
      console.error("❌ Creation failed:", err);
      alert("Failed to create Auction House: " + (err?.message || err));
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-3">Create Open Auction House</h2>
      <button
        onClick={handleCreateAH}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Create Auction House
      </button>
    </div>
  );
};

export default CreateAuctionHouse;
