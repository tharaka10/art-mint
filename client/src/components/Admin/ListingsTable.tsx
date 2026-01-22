import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface Listing {
  id: string;
  seller: string;
  nftMint: string;
  price: number;
  quantity: number;
  currency: string;
  status: string;
  createdAt: any;
  updatedAt: any;
  expiry: any;
  txSignature?: string;
}

const ListingTable: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "listings"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[];

      setListings(data);
    });

    return () => unsubscribe();
  }, []);

  const formattedDate = (dateValue: any) => {
    if (!dateValue) return "-";
    try {
      if (dateValue.toDate) return dateValue.toDate().toLocaleDateString();
      return new Date(dateValue).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-400";
      case "cancelled":
        return "text-red-400";
      case "pending":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
        Active Marketplace Listings
      </h1>

      <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <table className="min-w-full text-sm">
          {/* Table Header */}
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              {[
                "NFT Mint",
                "Created",
                "Seller",
                "Price",
                "Currency",
                "Quantity",
                "Status",
                "Updated",
                "Expiry",
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
            {/* Empty State */}
            {listings.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-10 text-gray-400 italic"
                >
                  No listings found
                </td>
              </tr>
            )}

            {/* Rows */}
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="border-t border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-3 font-medium text-green-100 break-all">
                  {listing.nftMint}
                </td>

                <td className="p-3 text-gray-300">
                  {formattedDate(listing.createdAt)}
                </td>

                <td className="p-3 font-medium text-white">
                  {listing.seller}
                </td>

                <td className="p-3 font-semibold text-white">
                  {listing.price ?? "-"}
                </td>

                <td className="p-3 text-gray-300">
                  {listing.currency ?? "-"}
                </td>

                <td className="p-3 text-gray-300">
                  {listing.quantity ?? 1}
                </td>

                <td className={`p-3 font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status || "Unknown"}
                </td>

                <td className="p-3 text-gray-300">
                  {formattedDate(listing.updatedAt)}
                </td>

                <td className="p-3 text-gray-300">
                  {formattedDate(listing.expiry)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;
