// src/utils/connection.ts
import { Connection } from "@solana/web3.js";

export const connection = new Connection(
  import.meta.env.VITE_SHYFT_RPC || "https://api.devnet.solana.com",
  "confirmed"
);
