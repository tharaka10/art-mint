// src/hooks/useSolana.ts
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useMemo } from "react";

export const useSolana = () => {
  const wallet = useWallet();
  const connection = useMemo(
    () =>
      new Connection(
        import.meta.env.VITE_SHYFT_RPC || "https://api.devnet.solana.com",
        "confirmed"
      ),
    []
  );

  return {
    wallet,
    connection,
    network: import.meta.env.VITE_NETWORK || "devnet",
  };
};
