import axios from "axios";

const createMarketplace = async () => {
  const res = await axios.post(
    "https://api.shyft.to/sol/v1/marketplace/create",
    {
      network: "devnet",
      transaction_fee: 0.02,
      fee_payer: "EzfTeX34Tkmunppw5T8D5pXothTiWctxTkmoJtHUjQYE", // your wallet
      fee_recipient: "EzfTeX34Tkmunppw5T8D5pXothTiWctxTkmoJtHUjQYE",
      creator_wallet: "EzfTeX34Tkmunppw5T8D5pXothTiWctxTkmoJtHUjQYE",
    },
    {
      headers: {
        "x-api-key": "XFKpkzOLa4JvbR1w",
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Marketplace Created:", res.data);
};

createMarketplace();
