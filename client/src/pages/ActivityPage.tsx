import { Sidebar } from "../components/UserProfile/UserProfile";
import { DataTable } from "../components/Table/DataTable";
import goldImage1 from "../assets/activityAssets/goldImage1.png";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const ActivityPage = () => {
  const [showChart, setShowChart] = useState(false);

  const mockData = [
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0001</>, price: "SOL 0.85", rarity: "#12,300", qty: 1, to: "#82,134", time: "12 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0342</>, price: "SOL 1.25", rarity: "#5,876", qty: 2, to: "#44,223", time: "26 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0456</>, price: "SOL 0.99", rarity: "#9,112", qty: 1, to: "#11,578", time: "7 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0222</>, price: "SOL 2.00", rarity: "#3,004", qty: 3, to: "#65,349", time: "40 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0099</>, price: "SOL 0.75", rarity: "#20,456", qty: 1, to: "#78,256", time: "18 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0781</>, price: "SOL 1.85", rarity: "#2,789", qty: 2, to: "#33,042", time: "3 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0654</>, price: "SOL 0.65", rarity: "#15,678", qty: 1, to: "#92,500", time: "55 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0213</>, price: "SOL 1.10", rarity: "#7,321", qty: 1, to: "#44,999", time: "31 min" },
    { event: "Buy", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0899</>, price: "SOL 1.75", rarity: "#1,345", qty: 2, to: "#17,222", time: "21 min" },
    { event: "Sale", item: <><img src={goldImage1} alt="nft" className="w-6 h-6 inline-block mr-2" />AurumCraft 0033</>, price: "SOL 0.95", rarity: "#11,111", qty: 1, to: "#56,789", time: "10 min" },
  ];

  const chartData = [
    { time: "1 AM", price: 0.8 },
    { time: "2 AM", price: 0.9 },
    { time: "3 AM", price: 0.85 },
    { time: "4 AM", price: 0.95 },
    { time: "5 AM", price: 1.0 },
    { time: "6 AM", price: 0.92 },
    { time: "7 AM", price: 1.05 },
  ];

  return (
    <Sidebar>
      <div className="p-6 min-h-screen bg-[#0a0a0a] text-gray-200 overflow-auto flex flex-col gap-6">

        {/* Header + Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-emerald-500 tracking-wide">
            Activity Dashboard
          </h2>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm bg-black border border-emerald-500/40 rounded-lg hover:border-emerald-500 transition">
              Sales
            </button>
            <button className="px-4 py-2 text-sm bg-black border border-gray-700 rounded-lg hover:border-gray-500 transition">
              Clear
            </button>
            <button
              onClick={() => setShowChart(!showChart)}
              className="px-4 py-2 text-sm bg-emerald-600 rounded-lg hover:bg-emerald-500 transition text-white"
            >
              {showChart ? "Hide Chart" : "View Chart"}
            </button>
          </div>
        </div>

        {/* Chart */}
        {showChart && (
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-lg mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "none" }} />
                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-lg">
          <DataTable rows={mockData} />
        </div>

      </div>
    </Sidebar>
  );
};
