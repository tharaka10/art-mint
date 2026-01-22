import { collection, onSnapshot } from "firebase/firestore";
import type React from "react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { db } from "../../utils/firebase";

interface NFT {
  createdAt?: any; // Timestamp or string or undefined
}

const NftChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>(
    []
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "nfts"), (snapshot) => {
      // Extract only valid dates
      const validDates = snapshot.docs
        .map((doc) => {
          const nft = doc.data() as NFT;

          if (!nft.createdAt) return null;

          let createdAtDate: Date | null = null;

          try {
            if (nft.createdAt?.toDate) {
              createdAtDate = nft.createdAt.toDate(); // Firestore Timestamp
            } else if (typeof nft.createdAt === "string") {
              const d = new Date(nft.createdAt);
              if (!isNaN(d.getTime())) createdAtDate = d;
            }
          } catch {}

          return createdAtDate;
        })
        .filter((d): d is Date => d !== null); // remove null values

      // Group by formatted date
      const grouped: Record<string, number> = {};

      validDates.forEach((dateObj) => {
        const dateStr = dateObj.toLocaleDateString();
        grouped[dateStr] = (grouped[dateStr] || 0) + 1;
      });

      // Convert to chart format
      const formattedData = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
      }));

      // Sort chronologically
      formattedData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setChartData(formattedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-10 border border-gray-600">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        NFT Minting Trend
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No NFT minting data yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2.5}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NftChart;
