// import { useEffect, useState } from "react";
// import axios from "axios";

// type CommodityPrices = {
//   [key: string]: string;
// };

// const CommoditiesPrices: React.FC = () => {
//   const [prices, setPrices] = useState<CommodityPrices>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_KEY = "d9e31e280e7b4609bde3446b5095d898"; // 🔁 Replace with your Twelve Data API key

//   const fetchPrices = async () => {
//     try {
//         const symbols = ["WTICOUSD", "XAU/USD", "XAGUSD"];

//     //   const symbols = ["WTICOUSD", "XAU/USD", "XAG/USD"];
//       const requests = symbols.map((symbol) =>
//         axios.get(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`)
//       );

//       const responses = await Promise.all(requests);

//       const updatedPrices: CommodityPrices = {};
//       symbols.forEach((symbol, index) => {
//         updatedPrices[symbol] = responses[index].data.price;
//       });

//       setPrices(updatedPrices);
//     } catch (err) {
//       setError("Failed to fetch prices.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000); // Refresh every 60s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
//       <h2 className="text-2xl text-black font-bold text-center mb-6">Real-Time Commodity Prices</h2>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//           <div className="bg-yellow-300 p-4 rounded-lg shadow">
//             <h3 className="text-lg text-black font-semibold">Gold (XAU/USD)</h3>
//             <p className="text-xl text-black font-bold">${prices["XAU/USD"]}</p>
//           </div>
//           <div className="bg-gray-300 p-4 rounded-lg shadow">
//             <h3 className="text-lg text-black font-semibold">Silver (XAG/USD)</h3>
//             <p className="text-xl text-black font-bold">${prices["XAGUSD"]}</p>
//           </div>
//           <div className="bg-blue-300 p-4 rounded-lg shadow">
//             <h3 className="text-lg text-black font-semibold">Oil (WTI)</h3>
//             <p className="text-xl text-black font-bold">${prices["WTICOUSD"]}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommoditiesPrices;
import { useEffect, useState } from "react";
import axios from "axios";

type CommodityPrices = {
  [key: string]: string;
};

const CommoditiesPrices: React.FC = () => {
  const [prices, setPrices] = useState<CommodityPrices>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchPrices = async () => {
  try {
    const yahooUrl = encodeURIComponent(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=GC=F,SI=F,CL=F"
    );

    const response = await axios.get(
      `https://api.allorigins.win/raw?url=${yahooUrl}`
    );

    const result = response.data.quoteResponse.result;

    const updatedPrices: CommodityPrices = {
      "GC=F": result.find((item: any) => item.symbol === "GC=F")?.regularMarketPrice?.toFixed(2) || "N/A",
      "SI=F": result.find((item: any) => item.symbol === "SI=F")?.regularMarketPrice?.toFixed(2) || "N/A",
      "CL=F": result.find((item: any) => item.symbol === "CL=F")?.regularMarketPrice?.toFixed(2) || "N/A",
    };

    setPrices(updatedPrices);
  } catch (err) {
    setError("Failed to fetch prices.");
    console.error("Yahoo API fetch error:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl text-black font-bold text-center mb-6">Real-Time Commodity Prices</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-yellow-300 p-4 rounded-lg shadow">
            <h3 className="text-lg text-black font-semibold">Gold (GC=F)</h3>
            <p className="text-xl text-black font-bold">${prices["GC=F"]}</p>
          </div>
          <div className="bg-gray-300 p-4 rounded-lg shadow">
            <h3 className="text-lg text-black font-semibold">Silver (SI=F)</h3>
            <p className="text-xl text-black font-bold">${prices["SI=F"]}</p>
          </div>
          <div className="bg-blue-300 p-4 rounded-lg shadow">
            <h3 className="text-lg text-black font-semibold">Oil (CL=F)</h3>
            <p className="text-xl text-black font-bold">${prices["CL=F"]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommoditiesPrices;
