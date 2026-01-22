import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

interface Purchase {
  id: string;
  image: string;
  name: string;
  seller: string;
  price: number;
  buyer: string;
  createdAt: any;
  mintAddress: string;
  tx: string;
}

const PurchasesTable: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const q = query(collection(db, "purchases"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Purchase[];
      setPurchases(data);
    });

    return () => unsubscribe();
  }, []);

  const formattedDate = (createdAt: any) => {
    if (!createdAt) return "-";
    try {
      if (createdAt.toDate) return createdAt.toDate().toLocaleDateString();
      return new Date(createdAt).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
        Purchases Dashboard
      </h1>

      <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-white/10 border-b border-white/10 text-gray-300 text-xs uppercase tracking-wider">
            <tr>
              {[
                "Name",
                "Created At",
                "Image",
                "Seller",
                "Price",
                "Mint Address",
                "Tx",
              ].map((header) => (
                <th key={header} className="p-3 text-left font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {purchases.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-400 italic"
                >
                  No purchases found
                </td>
              </tr>
            )}

            {purchases.map((item) => (
              <tr
                key={item.id}
                className="border-t border-white/10 hover:bg-white/5 transition-all duration-150"
              >
                <td className="p-3 font-medium text-gray break-all">
                  {item.name}
                </td>

                <td className="p-3 text-gray-300">{formattedDate(item.createdAt)}</td>

                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border border-white/10"
                  />
                </td>

                <td className="p-3 text-gray-400">{item.seller}</td>

                <td className="p-3 font-semibold text-white">
                  {item.price ?? "-"}
                </td>

                <td className="p-3 break-all text-gray-400">
                  {item.mintAddress || "-"}
                </td>

                <td className="p-3">
                  {item.tx ? (
                    <a
                      href={`https://solscan.io/tx/${item.tx}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-md bg-green-500 text-black font-semibold text-xs hover:bg-green-400 transition"
                    >
                      View Tx
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesTable;
