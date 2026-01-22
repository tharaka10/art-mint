import { PublicKey } from '@solana/web3.js';

(async () => {
  const auctionHouse = new PublicKey("7qhDeVaZC3ouf47XXsKvUpV7YYZvmbw34imu1S6vVPcD");
  const buyer = new PublicKey("Bgdr5MCjhY3uEqhS4aSBUcT4WkZGA7P87vFnuXuqbkuW"); // ← PASTE YOUR WALLET

  const [escrow] = await PublicKey.findProgramAddress(
    [
      Buffer.from("auction_house"),
      auctionHouse.toBuffer(),
      buyer.toBuffer(),
      Buffer.from("escrow")
    ],
    new PublicKey("hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk")
  );

  console.log("FUND THIS PDA →", escrow.toBase58());
})();