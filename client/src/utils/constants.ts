// import axios from "axios";
// import toast from "react-hot-toast";

// // =============================
// // 🔐 ENV VARIABLES
// // =============================
// const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY as string;
// const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY as string;
// const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY as string;
// const SHYFT_ENDPOINT = import.meta.env.VITE_SHYFT_ENDPOINT as string;
// const NFT_MARKETPLACE = import.meta.env.VITE_MARKETPLACE_ADDRESS as string;

// // =============================
// // 🔔 Toast Notifications
// // =============================
// export const notifySuccess = (msg: string) => toast.success(msg, { duration: 2000 });
// export const notifyError = (msg: string) => toast.error(msg, { duration: 2000 });

// // =============================
// // 🧩 Utility Functions
// // =============================
// export const copyText = (text: string) => {
//   navigator.clipboard.writeText(text);
//   notifySuccess("Copied to clipboard!");
// };

// export const SHORTEN_ADDRESS = (address: string): string =>
//   `${address.slice(0, 4)}...${address.slice(-4)}`;

// // =============================
// // 🖼️ UPLOAD IMAGE TO PINATA
// // =============================
// export const UPLOAD_IPFS_IMAGE = async (file: File): Promise<string | null> => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//       headers: {
//         pinata_api_key: PINATA_API_KEY,
//         pinata_secret_api_key: PINATA_SECRET_KEY,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const ipfsHash = res.data.IpfsHash;
//     const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
//     notifySuccess("✅ Image uploaded to IPFS!");
//     return imageUrl;
//   } catch (err: any) {
//     console.error("❌ Image upload error:", err);
//     notifyError("Failed to upload image. Check your Pinata API keys.");
//     return null;
//   }
// };

// // =============================
// // 🧠 UPLOAD METADATA TO PINATA
// // =============================
// interface NFTAttributes {
//   traitTypeOne: string;
//   valueOne: string;
//   traitTypeTwo: string;
//   valueTwo: string;
// }

// interface NFTMetadata {
//   name: string;
//   symbol: string;
//   description: string;
//   image: string;
//   link: string;
// }

// export const UPLOAD_METADATA = async (nft: any, attributes: any, address: string) => {
//   try {
//     const { name, symbol, description, image, link } = nft;
//     const { traitTypeOne, valueOne, traitTypeTwo, valueTwo } = attributes;

//     if (!name || !description || !image || !symbol)
//       return notifyError("Missing required NFT fields");

//     const metadata = {
//       name,
//       symbol,
//       description,
//       seller_fee_basis_points: 500, // ✅ 5% Royalty added
//       image,
//       external_url: link || "",
//       attributes: [
//         { trait_type: traitTypeOne || "Manufacture Date", value: valueOne || "N/A" },
//         { trait_type: traitTypeTwo || "Expiry Date", value: valueTwo || "N/A" },
//       ],
//       properties: {
//         files: [{ uri: image, type: "image/png" }],
//         category: "image",
//         creators: [{ address, share: 100 }],
//       },
//     };

//     const response = await axios({
//       method: "POST",
//       url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//       data: metadata,
//       headers: {
//         pinata_api_key: import.meta.env.VITE_PINATA_API_KEY!,
//         pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY!,
//         "Content-Type": "application/json",
//       },
//     });

//     const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//     console.log("✅ Metadata uploaded:", ipfsUrl);
//     notifySuccess("Metadata uploaded to IPFS");

//     return ipfsUrl;
//   } catch (error) {
//     console.error("❌ Metadata upload failed:", error);
//     notifyError("Failed to upload metadata");
//     return null;
//   }
// };


// // =============================
// // 🧾 SHYFT - GET USER NFTs
// // =============================
// export const GET_USER_NFTS = async (walletAddress: string): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}nft/read_all?network=${network}&address=${walletAddress}`;

//   try {
//     const res = await axios.get(url, {
//       headers: {
//         "x-api-key": SHYFT_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });

//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("Error fetching NFTs:", err);
//     return [];
//   }
// };

// // =============================
// // 🏷️ SHYFT - SELLER LISTINGS
// // =============================
// export const SELLER_LISTINGS = async (walletId: string): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/seller_listings?network=${network}&marketplace_address=${NFT_MARKETPLACE}&seller_address=${walletId}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });

//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("Error fetching seller listings:", err);
//     return [];
//   }
// };

// // =============================
// // 🧾 SHYFT - ACTIVE LISTINGS
// // =============================
// export const ACTIVE_LISTINGS = async (): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/active_listings?network=${network}&marketplace_address=${NFT_MARKETPLACE}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("Error fetching active listings:", err);
//     return [];
//   }
// };

// // =============================
// // 💬 LOCAL NOTIFICATIONS
// // =============================
// interface Notification {
//   name: string;
//   message: string;
//   image: string;
//   date: string;
//   time: string;
// }

// export const Notify = (message: string, image: string, name: string): void => {
//   const notification: Notification = {
//     name,
//     message,
//     image,
//     date: new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }),
//     time: new Date().toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     }),
//   };

//   const existing = JSON.parse(localStorage.getItem("NOTIFICATIONS") || "[]");
//   existing.push(notification);
//   localStorage.setItem("NOTIFICATIONS", JSON.stringify(existing));
// };

// import axios from "axios";
// import toast from "react-hot-toast";

// // =============================
// // 🔐 ENV VARIABLES
// // =============================
// const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY as string;
// const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY as string;
// const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY as string;
// const SHYFT_ENDPOINT = import.meta.env.VITE_SHYFT_ENDPOINT as string;
// const NFT_MARKETPLACE = import.meta.env.VITE_MARKETPLACE_ADDRESS as string;

// // =============================
// // 🔔 Toast Notifications
// // =============================
// export const notifySuccess = (msg: string) =>
//   toast.success(msg, { duration: 2000 });

// export const notifyError = (msg: string) =>
//   toast.error(msg, { duration: 2000 });

// // =============================
// // 🧩 Utility Functions
// // =============================
// export const copyText = (text: string): void => {
//   navigator.clipboard.writeText(text);
//   notifySuccess("Copied to clipboard!");
// };

// export const SHORTEN_ADDRESS = (address: string): string =>
//   `${address.slice(0, 4)}...${address.slice(-4)}`;

// // =============================
// // 🖼️ UPLOAD IMAGE TO PINATA
// // =============================
// export const UPLOAD_IPFS_IMAGE = async (
//   file: File
// ): Promise<string | null> => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         headers: {
//           pinata_api_key: PINATA_API_KEY,
//           pinata_secret_api_key: PINATA_SECRET_KEY,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     const ipfsHash = res.data.IpfsHash;
//     const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
//     notifySuccess("✅ Image uploaded to IPFS!");
//     return imageUrl;
//   } catch (err: any) {
//     console.error("❌ Image upload error:", err);
//     notifyError("Failed to upload image. Check your Pinata API keys.");
//     return null;
//   }
// };

// // =============================
// // 🧠 UPLOAD METADATA TO PINATA
// // =============================
// interface NFTAttributes {
//   traitTypeOne: string;
//   valueOne: string;
//   traitTypeTwo: string;
//   valueTwo: string;
// }

// interface NFTMetadata {
//   name: string;
//   symbol: string;
//   description: string;
//   image: string;
//   link: string;
// }

// export const UPLOAD_METADATA = async (
//   nft: NFTMetadata,
//   attributes: NFTAttributes,
//   address: string
// ): Promise<string | null> => {
//   try {
//     const { name, symbol, description, image, link } = nft;
//     const { traitTypeOne, valueOne, traitTypeTwo, valueTwo } = attributes;

//     if (!name || !description || !image || !symbol || !link) {
//       notifyError("❌ Missing NFT metadata fields");
//       return null;
//     }

//     const metadata = {
//       name,
//       symbol,
//       description,
//       seller_fee_basis_points: 500,
//       image,
//       external_url: link,
//       attributes: [
//         {
//           trait_type: traitTypeOne || "Manufacture Date",
//           value: valueOne || "N/A",
//         },
//         {
//           trait_type: traitTypeTwo || "Expiry Date",
//           value: valueTwo || "N/A",
//         },
//       ],
//       properties: {
//         files: [{ uri: image, type: "image/png" }],
//         category: "image",
//         creators: [{ address, share: 100 }],
//       },
//     };

//     const response = await axios.post(
//       "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//       metadata,
//       {
//         headers: {
//           pinata_api_key: PINATA_API_KEY,
//           pinata_secret_api_key: PINATA_SECRET_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//     notifySuccess("✅ Metadata uploaded to IPFS!");
//     console.log("Metadata URL:", ipfsUrl);

//     return ipfsUrl;
//   } catch (error) {
//     console.error("❌ Metadata upload failed:", error);
//     notifyError("Failed to upload metadata");
//     return null;
//   }
// };

// // =============================
// // 🧾 SHYFT - GET USER NFTs
// // =============================
// export const GET_USER_NFTS = async (walletAddress: string): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}nft/read_all?network=${network}&address=${walletAddress}`;

//   try {
//     const res = await axios.get(url, {
//       headers: {
//         "x-api-key": SHYFT_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching NFTs:", err);
//     return [];
//   }
// };

// // =============================
// // 🎨 SHYFT - GET COLLECTIONS
// // =============================
// export const GET_COLLECTIONS = async (
//   walletAddress: string
// ): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}wallet/collections?network=${network}&wallet_address=${walletAddress}`;

//   try {
//     const res = await axios.get(url, {
//       headers: {
//         "x-api-key": SHYFT_API_KEY,
//         "Content-Type": "application/json",
//       },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching collections:", err);
//     return [];
//   }
// };

// // =============================
// // 🏷️ SHYFT - SELLER LISTINGS
// // =============================
// export const SELLER_LISTINGS = async (walletId: string): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/seller_listings?network=${network}&marketplace_address=${NFT_MARKETPLACE}&seller_address=${walletId}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching seller listings:", err);
//     return [];
//   }
// };

// // =============================
// // 🧾 SHYFT - ACTIVE LISTINGS
// // =============================
// export const ACTIVE_LISTINGS = async (): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/active_listings?network=${network}&marketplace_address=${NFT_MARKETPLACE}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching active listings:", err);
//     return [];
//   }
// };

// // =============================
// // 📦 SHYFT - ORDER HISTORY
// // =============================
// export const ORDER_HISTORY = async (walletId: string): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/buy_history?network=${network}&marketplace_address=${NFT_MARKETPLACE}&buyer_address=${walletId}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching order history:", err);
//     return [];
//   }
// };

// // =============================
// // 💼 SHYFT - ACTIVE SELLERS
// // =============================
// export const ACTIVE_SELLERS = async (): Promise<any[]> => {
//   const network = localStorage.getItem("NETWORK") || "devnet";
//   const url = `${SHYFT_ENDPOINT}marketplace/active_sellers?network=${network}&marketplace_address=${NFT_MARKETPLACE}`;

//   try {
//     const res = await axios.get(url, {
//       headers: { "x-api-key": SHYFT_API_KEY },
//     });
//     return res.data.success ? res.data.result : [];
//   } catch (err) {
//     console.error("❌ Error fetching active sellers:", err);
//     return [];
//   }
// };

import axios from "axios";
import toast from "react-hot-toast";

// =============================
// 🔐 ENV VARIABLES
// =============================
export const ENDPOINT =
  import.meta.env.VITE_SHYFT_ENDPOINT || "https://api.shyft.to/sol/v1";
export const SHYFT_API_KEY = import.meta.env.VITE_SHYFT_API_KEY || "";
export const NFT_MARKETPLACE =
  import.meta.env.VITE_MARKETPLACE_ADDRESS || "";
export const NETWORK = import.meta.env.VITE_NETWORK || "devnet";

export const RECEVIED = import.meta.env.VITE_RECEVIED_FEE || "";
export const NFT_BUY_FEE = import.meta.env.VITE_NFT_BUY_FEE || "";

export const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || "";
export const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY || "";

// =============================
// 🔔 TOAST HELPERS
// =============================
export const notifySuccess = (msg: string) =>
  toast.success(msg, { duration: 2000 });
export const notifyError = (msg: string) =>
  toast.error(msg, { duration: 2000 });

// =============================
// 🧩 UTILITIES
// =============================
export const SHORTEN_ADDRESS = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export const copyText = (text: string): void => {
  navigator.clipboard.writeText(text);
  notifySuccess("Copied to clipboard!");
};

// =============================
// 🖼️ UPLOAD IMAGE TO IPFS (Pinata)
// =============================
export const UPLOAD_IPFS_IMAGE = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const ipfsHash = response.data.IpfsHash;
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    notifySuccess("✅ Image uploaded successfully!");
    return imageUrl;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    notifyError("Failed to upload image. Check your Pinata keys.");
    return null;
  }
};

// =============================
// 🧠 UPLOAD METADATA TO IPFS
// =============================
interface NFTAttributes {
  traitTypeOne: string;
  valueOne: string;
  traitTypeTwo: string;
  valueTwo: string;
}

interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  link: string;
}

export const UPLOAD_METADATA = async (
  nft: NFTMetadata,
  attributes: NFTAttributes,
  address: string
): Promise<string | null> => {
  try {
    const { name, symbol, description, image, link } = nft;
    const { traitTypeOne, valueOne, traitTypeTwo, valueTwo } = attributes;

    if (!name || !symbol || !description || !image)
      return notifyError("Missing required NFT fields");

    const metadata = {
      name,
      symbol,
      description,
      seller_fee_basis_points: 500, // 5% royalty
      image,
      external_url: link || "",
      attributes: [
        { trait_type: traitTypeOne || "Manufacture Date", value: valueOne || "N/A" },
        { trait_type: traitTypeTwo || "Expiry Date", value: valueTwo || "N/A" },
      ],
      properties: {
        files: [{ uri: image, type: "image/png" }],
        category: "image",
        creators: [{ address, share: 100 }],
      },
    };

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    console.log("✅ Metadata uploaded:", ipfsUrl);
    notifySuccess("Metadata uploaded to IPFS!");
    return ipfsUrl;
  } catch (error) {
    console.error("❌ Error uploading metadata:", error);
    notifyError("Failed to upload metadata.");
    return null;
  }
};

// =============================
// 🧾 SHYFT - GET USER NFTs
// =============================
export const GET_USER_NFTS = async (walletAddress: string): Promise<any[]> => {
  const nftUrl = `${ENDPOINT}/nft/read_all`.replace(/([^:]\/)\/+/g, "$1");

  try {
    const response = await axios.get(nftUrl, {
      params: { network: NETWORK, address: walletAddress },
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return response.data.success ? response.data.result : [];
  } catch (err) {
    console.error("❌ Error fetching NFTs:", err);
    return [];
  }
};

// =============================
// 🧾 SHYFT - SELLER LISTINGS
// =============================
export const SELLER_LISTINGS = async (walletId: string): Promise<any[]> => {
  const url = `${ENDPOINT}/marketplace/seller_listings`.replace(/([^:]\/)\/+/g, "$1");

  try {
    const res = await axios.get(url, {
      params: {
        network: NETWORK,
        marketplace_address: NFT_MARKETPLACE,
        seller_address: walletId,
      },
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return res.data.success ? res.data.result : [];
  } catch (err) {
    console.error("❌ Error fetching seller listings:", err);
    return [];
  }
};

// =============================
// 🧾 SHYFT - ACTIVE LISTINGS
// =============================
export const ACTIVE_LISTINGS = async (): Promise<any[]> => {
  const url = `${ENDPOINT}/marketplace/active_listings`.replace(/([^:]\/)\/+/g, "$1");

  try {
    const res = await axios.get(url, {
      params: { network: NETWORK, marketplace_address: NFT_MARKETPLACE },
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return res.data.success ? res.data.result : [];
  } catch (err) {
    console.error("❌ Error fetching active listings:", err);
    return [];
  }
};

// =============================
// 🧾 SHYFT - ORDER HISTORY
// =============================
export const ORDER_HISTORY = async (walletId: string): Promise<any[]> => {
  const url = `${ENDPOINT}/marketplace/buy_history`.replace(/([^:]\/)\/+/g, "$1");

  try {
    const res = await axios.get(url, {
      params: {
        network: NETWORK,
        marketplace_address: NFT_MARKETPLACE,
        buyer_address: walletId,
      },
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return res.data.success ? res.data.result : [];
  } catch (err) {
    console.error("❌ Error fetching order history:", err);
    return [];
  }
};

// =============================
// 🧾 SHYFT - ACTIVE SELLERS
// =============================
export const ACTIVE_SELLERS = async (): Promise<any[]> => {
  const url = `${ENDPOINT}/marketplace/active_sellers`.replace(/([^:]\/)\/+/g, "$1");

  try {
    const res = await axios.get(url, {
      params: { network: NETWORK, marketplace_address: NFT_MARKETPLACE },
      headers: {
        "x-api-key": SHYFT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return res.data.success ? res.data.result : [];
  } catch (err) {
    console.error("❌ Error fetching active sellers:", err);
    return [];
  }
};
