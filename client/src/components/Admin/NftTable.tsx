import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface NFT {
  id: string;
  name?: string;
  image?: string;
  owner?: string;
  mintAddress?: string;
  createdAt: any;
  manufactureDate: string;
  expiryDate: string;
  certificateUrl: string;
  description: string;
  metadataUri: string;
}

interface NFTwithOrderedDate extends NFT {
  createdAtDate: Date;
}

const NftTable: React.FC = () => {
  const [nfts, setNfts] = useState<NFTwithOrderedDate[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "nfts"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => {
          const nft = doc.data() as NFT;
          if (!nft.createdAt) return null;

          let createdAtDate: Date | null = null;

          try {
            if (nft.createdAt?.toDate) {
              createdAtDate = nft.createdAt.toDate();
            } else if (typeof nft.createdAt === "string") {
              const d = new Date(nft.createdAt);
              if (!isNaN(d.getTime())) createdAtDate = d;
            }
          } catch {}

          if (!createdAtDate) return null;

          return {
            ...nft,
            id: doc.id,
            createdAtDate,
          };
        })
        .filter((item): item is NFTwithOrderedDate => item !== null)
        .sort(
          (a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime()
        );

      setNfts(data);
    });

    return () => unsubscribe();
  }, []);

  const formattedDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
        Minted NFT Collection
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              {[
                "Image",
                "Created",
                "Name",
                "Owner",
                "Manufactured",
                "Expiry",
                "Mint Address",
                "Certificate",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-left font-medium text-gray-300 uppercase tracking-wider text-xs"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {nfts.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-400 italic"
                >
                  No NFTs minted yet
                </td>
              </tr>
            )}

            {nfts.map((nft) => (
              <tr
                key={nft.id}
                className="border-t border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-3">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-14 h-14 rounded-lg object-cover border border-white/10"
                  />
                </td>

                <td className="p-3 text-gray-300">
                  {formattedDate(nft.createdAtDate)}
                </td>

                <td className="p-3 font-medium text-white">{nft.name}</td>

                <td className="p-3 text-gray-400">{nft.owner}</td>

                <td className="p-3 text-gray-300">
                  {nft.manufactureDate}
                </td>

                <td className="p-3 text-gray-300">{nft.expiryDate}</td>

                <td className="p-3 text-gray-400">{nft.mintAddress}</td>

                <td className="p-3">
                  <a
                    href={nft.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md bg-green-500 text-black font-semibold text-xs hover:bg-green-400 transition"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NftTable;
