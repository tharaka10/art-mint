// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
// import { Connection, PublicKey } from "@solana/web3.js";

// const RPC_URL = "https://devnet.helius-rpc.com/?api-key=f0d2dece-416e-4676-8489-542f04bef695";

// const NFTOwnershipCheck: React.FC = () => {
//   const { wallet } = useWallet();
//   const [owner, setOwner] = useState<string | null>(null);

//   useEffect(() => {
//     const checkOwner = async () => {
//       if (!wallet?.adapter?.publicKey) return;
//       try {
//         const connection = new Connection(RPC_URL, "confirmed");
//         const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet.adapter));

//         const mintAddress = new PublicKey("8pHFxzYBVR5m8Uw4AFSyMhu991EeQNxRF7rkraAJiLi6");
//         const nft = await metaplex.nfts().findByMint({ mintAddress });

//         const nftOwner = nft.token?.ownerAddress?.toBase58() ?? "Unknown";
//         const walletOwner = wallet.adapter.publicKey.toBase58();

//         console.log("🔹 NFT Owner:", nftOwner);
//         console.log("🔹 Your Wallet:", walletOwner);

//         setOwner(nftOwner);
//       } catch (err) {
//         console.error("Error checking ownership:", err);
//       }
//     };

//     checkOwner();
//   }, [wallet]);

//   return (
//     <div className="text-white p-6">
//       <h1 className="text-xl font-bold mb-3">NFT Ownership Check</h1>
//       <p>
//         Mint Address:{" "}
//         <span className="text-blue-400">
//           8pHFxzYBVR5m8Uw4AFSyMhu991EeQNxRF7rkraAJiLi6
//         </span>
//       </p>
//       <p>
//         Owner:{" "}
//         <span className="text-green-400">
//           {owner ? owner : "Checking... (see console)"}
//         </span>
//       </p>
//     </div>
//   );
// };

// export default NFTOwnershipCheck;

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL =
  "https://devnet.helius-rpc.com/?api-key=f0d2dece-416e-4676-8489-542f04bef695";

const NFTOwnershipCheck: React.FC = () => {
  const { wallet } = useWallet();
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    const checkOwner = async () => {
      if (!wallet?.adapter?.publicKey) return;

      try {
        const connection = new Connection(RPC_URL, "confirmed");

        const metaplex = Metaplex.make(connection).use(
          walletAdapterIdentity(wallet.adapter)
        );

        const mintAddress = new PublicKey(
          "8pHFxzYBVR5m8Uw4AFSyMhu991EeQNxRF7rkraAJiLi6"
        );

        // 🔥 CORRECT FIX: tokenOwner MUST be a PublicKey
        const nft = await metaplex.nfts().findByMint({
          mintAddress,
          tokenOwner: wallet.adapter.publicKey, // ensures WITH TOKEN DATA
        });

        // Type Guard: check if nft has token field
        const tokenOwner =
          "token" in nft && nft.token?.ownerAddress
            ? nft.token.ownerAddress.toBase58()
            : "Unknown";

        setOwner(tokenOwner);
      } catch (err) {
        console.error("Error checking ownership:", err);
      }
    };

    checkOwner();
  }, [wallet]);

  return (
    <div className="text-white p-6">
      <h1 className="text-xl font-bold mb-3">NFT Ownership Check</h1>
      <p>
        Mint Address:{" "}
        <span className="text-blue-400">
          8pHFxzYBVR5m8Uw4AFSyMhu991EeQNxRF7rkraAJiLi6
        </span>
      </p>
      <p>
        Owner:{" "}
        <span className="text-green-400">
          {owner ? owner : "Checking... (see console)"}
        </span>
      </p>
    </div>
  );
};

export default NFTOwnershipCheck;
