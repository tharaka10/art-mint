import React, { useState, useEffect } from "react";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useNavigate } from "react-router-dom";
import {
  fetchLimitedListings,
  fetchWeeklySales,
  fetchRecentPurchases,
} from "../services/listingService";

import nft1 from "../assets/understanding_nfts.jpg";
import nft2 from "../assets/digital_technology.webp";
import nft3 from "../assets/blockchain_technology.png";
import nft4 from "../assets/how_to_invest_in_nfts.jpg";

// Elegant Skeletons
const SkeletonCard = () => (
  <div className="animate-pulse space-y-4">
    {/* Image placeholder */}
    <div className="bg-black/80 border border-green-800 rounded-xl aspect-square w-full" />
    
    {/* Text placeholders */}
    <div className="space-y-2">
      <div className="h-5 bg-green-900 rounded w-4/5" />
      <div className="h-4 bg-green-900 rounded w-3/5" />
    </div>
  </div>
);

const SkeletonTrending = () => (
  <div className="animate-pulse bg-black/80 border border-green-800 rounded-2xl p-6 space-y-4">
    {/* Small title bar */}
    <div className="h-5 bg-green-900 rounded w-24" />
    
    <div className="space-y-2">
      {/* Main content blocks */}
      <div className="h-7 bg-green-900 rounded w-3/4" />
      <div className="h-10 bg-green-900 rounded w-1/2" />
    </div>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [trendingAssets, setTrendingAssets] = useState<any[]>([]);
  const [weeklyHighestSales, setWeeklyHighestSales] = useState<any[]>([]);
  const [recentSales, setRecentSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [trending, weekly, recent] = await Promise.all([
          fetchLimitedListings(6),
          fetchWeeklySales(4),
          fetchRecentPurchases(4),
        ]);

        setTrendingAssets(
          trending.map((item: any, i: number) => ({
            id: i + 1,
            name: item.name || "Unnamed Asset",
            price: `${item.price} ${item.currency || "USD"}`,
          }))
        );

        setWeeklyHighestSales(
          weekly.map((item: any, i: number) => ({
            id: i + 1,
            name: item.name || "Unknown Collection",
            price: `${item.price} ${item.currency || "USD"}`,
            imageUrl: item.imageUrl || "/placeholder.jpg",
          }))
        );

        setRecentSales(recent);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const articles = [
    { id: 1, title: "Understanding NFTs", image: nft1 },
    { id: 2, title: "The Future of Digital Art", image: nft2 },
    { id: 3, title: "Blockchain Technology Basics", image: nft3 },
    { id: 4, title: "How to Invest in NFTs", image: nft4 },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Full-width Hero Slider */}
      <div className="px-5 pt-5 pb-5">
        <ImageSlider />
      </div>

      {/* Main Content */}
      <div className="px-5 py-5 max-w-full mx-auto space-y-20">

        {/* Trending Assets */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white tracking-wide">
            Trending Assets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array(6).fill(0).map((_, i) => <SkeletonTrending key={i} />)
              : trendingAssets.map((asset, index) => (
                <div
                  key={asset.id}
                  className="group bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden
                       transition-all duration-300 hover:border-[#C0C0C0]/40 hover:shadow-md hover:-translate-y-1"
                >
                  {/* Top badge bar */}
                  <div className="bg-gradient-to-r from-[#1A1A1A]/40 to-[#1C1C1C]/10 px-3 py-2">
                    <span className="text-[11px] md:text-xs font-medium text-[#D0D0D0]">
                      #{index + 1} Trending
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-semibold text-white mb-2 line-clamp-2 
                             group-hover:text-[#C0C0C0] transition-colors">
                      {asset.name}
                    </h3>

                    <div className="flex items-end justify-between">
                      <div>
                        {/* Price */}
                        <p className="text-lg md:text-xl font-semibold text-[#C0C0C0]">
                          {asset.price}
                        </p>

                        {/* Floor price label */}
                        <p className="text-[10px] md:text-[11px] text-gray-500 mt-1">
                          Floor Price
                        </p>
                      </div>

                      {/* Arrow Icon */}
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-[#C0C0C0] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
        {/* Weekly Top Sales */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white tracking-wide">
            Weekly Top Sales
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : weeklyHighestSales.map((asset) => (
                <div
                  key={asset.id}
                  className="group bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden 
                     transition-all duration-300 hover:border-[#C0C0C0]/40 hover:shadow-md hover:shadow-black/20"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover transition-transform duration-500 
                        group-hover:scale-103"
                    />
                    <div className="absolute top-3 right-3 bg-[#C0C0C0] text-black font-semibold 
                            text-[10px] md:text-xs px-2.5 py-1 rounded-full">
                      #{asset.id}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-300 text-sm md:text-base line-clamp-2 
                           group-hover:text-white transition-colors">
                      {asset.name}
                    </h3>

                    {/* Price Label */}
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 mt-2">
                      Price
                    </p>

                    <p className="text-lg md:text-xl font-semibold text-[#C0C0C0] mt-0.5">
                      {asset.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>

        </section>

        {/* Recent Sales */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white tracking-wide">
            Recent Sales
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : recentSales.map((sale: any, i: number) => (
                <div
                  key={i}
                  className="group bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden
                     transition-all duration-300 hover:border-[#C0C0C0]/40 hover:shadow-md hover:shadow-black/20"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={sale.imageUrl}
                      alt={sale.name}
                      className="w-full h-full object-cover transition-transform duration-500
                        group-hover:scale-103"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* SOLD Tag */}
                    <span className="absolute bottom-3 left-3 bg-[#C0C0C0] text-black font-semibold
                             text-[10px] md:text-xs px-2.5 py-1 rounded-full">
                      SOLD
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    {/* Name */}
                    <p className="font-medium text-gray-300 text-sm md:text-base line-clamp-2
                          group-hover:text-white transition-colors">
                      {sale.name}
                    </p>

                    {/* Price Label */}
                    <p className="text-[10px] uppercase tracking-wide text-gray-500">
                      Price
                    </p>

                    {/* Price */}
                    <p className="text-lg md:text-xl font-semibold text-[#C0C0C0]">
                      {sale.price} SOL
                    </p>

                    {/* Date */}
                    <p className="text-[11px] md:text-xs text-gray-500">
                      {sale.createdAt
                        ? new Date(sale.createdAt.seconds * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })
                        : "Just now"}
                    </p>
                  </div>
                </div>
              ))}
          </div>

        </section>

        {/* Learn Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-5 text-white tracking-wide">
            Learn About Tokenization
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => article.id === 1 && navigate("/hownftsworks")}
                className="group cursor-pointer bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl 
                   overflow-hidden transition-all duration-300 
                   hover:border-[#C0C0C0]/40 hover:shadow-md hover:shadow-black/20"
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                       group-hover:scale-103"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold text-white 
                         group-hover:text-[#C0C0C0] transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-[11px] md:text-xs text-gray-400 mt-3 
                        group-hover:text-[#C0C0C0] transition-colors duration-300 
                        flex items-center gap-2">
                    Read article
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from "react";
// import Categories from "./Categories";
// import ImageSlider from "../components/ImageSlider/ImageSlider";
// import { useNavigate } from "react-router-dom";

// // Import reusable listing services
// import {
//   fetchLimitedListings,
// } from "../services/listingService";

// const PLACEHOLDER_IMAGE =
//   "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   const [trendingAssets, setTrendingAssets] = useState<any[]>([]);
//   const [weeklyHighestSales, setWeeklyHighestSales] = useState<any[]>([]);
//   const [highestAssets, setHighestAssets] = useState<any[]>([]);
//   const [featuredSale, setFeaturedSale] = useState<any>(null);

//   // ------------------------------------------------------------------
//   // LOAD ALL LISTS USING REUSABLE SERVICE
//   // ------------------------------------------------------------------
//   useEffect(() => {
//     const loadAll = async () => {
//       // 1. TRENDING
//       const trending = await fetchLimitedListings(6);
//       setTrendingAssets(
//         trending.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           Status: index % 3 === 0 ? "NEW" : "",
//           changedPrice: `${item.price} ${item.currency}`,
//           Change: index % 2 === 0 ? "+" : "-",
//         }))
//       );

//       // 2. WEEKLY HIGHEST SALES
//       const weekly = await fetchLimitedListings(4);
//       setWeeklyHighestSales(
//         weekly.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           image: item.imageUrl || PLACEHOLDER_IMAGE,
//           description: item.description || "Top traded asset of the week.",
//         }))
//       );

//       // Featured sale = first one
//       setFeaturedSale(weekly[0]);

//       // 3. HIGHEST ASSETS
//       const highest = await fetchLimitedListings(4);
//       setHighestAssets(
//         highest.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           change: `${Math.floor(Math.random() * 10 - 5)}%`,
//           image: item.imageUrl || PLACEHOLDER_IMAGE,
//         }))
//       );
//     };

//     loadAll();
//   }, []);

//   const Articles = [
//     {
//       id: 1,
//       title: "Understanding NFTs",
//       content: "A deep dive into the world of NFTs.",
//     },
//     {
//       id: 2,
//       title: "The Future of Digital Art",
//       content: "Exploring the evolution of digital art.",
//     },
//     {
//       id: 3,
//       title: "Blockchain Technology",
//       content: "How blockchain is revolutionizing industries.",
//     },
//     {
//       id: 4,
//       title: "Investing in NFTs",
//       content: "Tips and strategies for investing in NFTs.",
//     },
//   ];

//   return (
//     <div className="flex bg-black">
//       <div className="flex-1 bg-white min-h-screen">

//         <Categories />

//         {/* Image Slider */}
//         <div className="flex flex-col bg-black">
//           <div className="px-5 w-full h-[500px] bg-black">
//             <ImageSlider />
//           </div>

//           {/* ---------------------------------------------------------
//               TRENDING ASSETS
//           ---------------------------------------------------------- */}
//           <div className="h-[300px] bg-black flex-col gap-5 p-5 flex">
//             <div className="text-white font-bold">Trending Assets</div>

//             {[0, 1].map((rowIndex) => (
//               <div key={rowIndex} className="w-full flex-1 flex gap-5">
//                 {trendingAssets.slice(rowIndex * 3, rowIndex * 3 + 3).map((asset) => (
//                   <div
//                     key={asset.id}
//                     className="w-1/3 flex items-center border border-gray-500 rounded-md bg-gray-500 text-white p-4"
//                   >
//                     <div className="flex flex-col ml-4">
//                       <div className="flex text-lg font-bold gap-5">
//                         {asset.name}
//                         {asset.Status && (
//                           <div className="text-[10px] bg-green-800 px-2 rounded-sm">
//                             {asset.Status}
//                           </div>
//                         )}
//                       </div>

//                       <div className="text-sm flex gap-5 pt-1">
//                         <div className="text-gray-300">{asset.price}</div>

//                         <div className="text-gray-300 text-xs">
//                           {asset.changedPrice}{" "}
//                           <span className={asset.Change === "+" ? "text-green-500" : "text-red-500"}>
//                             {asset.Change}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* ---------------------------------------------------------
//               WEEKLY HIGHEST SALES
//           ---------------------------------------------------------- */}
//           <div className="h-[320px] bg-black flex flex-col gap-5 p-5">
//             <div className="text-white font-bold">Weekly Highest Sales</div>

//             <div className="w-full flex gap-5">
//               {featuredSale && (
//                 <div className="w-1/3 flex border border-gray-500 rounded-md bg-gray-500 text-black p-2 h-56">
//                   <div className="w-1/2 flex justify-center items-center bg-white rounded-md">
//                     <img
//                       src={featuredSale.imageUrl}
//                       alt={featuredSale.nftName}
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   </div>

//                   <div className="w-1/2 flex flex-col justify-between p-2">
//                     <div className="text-lg font-bold">{featuredSale.nftName}</div>
//                     <div className="text-xs">{featuredSale.description}</div>

//                     <div className="flex px-2 py-1 bg-black/60 rounded-xl border border-gray-600">
//                       <div className="flex-1 text-center">
//                         <div className="text-[10px] text-gray-300">FLOOR PRICE</div>
//                         <div className="text-white text-xs font-semibold">
//                           {featuredSale.price} {featuredSale.currency}
//                         </div>
//                       </div>

//                       <div className="w-px bg-gray-500 mx-3"></div>

//                       <div className="flex-1 text-center">
//                         <div className="text-[10px] text-gray-300">24H VOLUME</div>
//                         <div className="text-white text-xs font-semibold">
//                           {featuredSale.price * 10} {featuredSale.currency}
//                         </div>
//                       </div>
//                     </div>

//                     <button className="bg-green-800 text-white px-4 py-1 rounded">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <div className="flex-1 flex gap-5">
//                 {weeklyHighestSales.slice(1).map((asset) => (
//                   <div
//                     key={asset.id}
//                     className="w-1/3 border border-gray-500 rounded-md bg-gray-500 text-black flex flex-col"
//                   >
//                     <div className="bg-white rounded-md h-3/4">
//                       <img
//                         src={asset.image}
//                         alt={asset.name}
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     </div>
//                     <div className="p-2">
//                       <div className="text-lg font-bold">{asset.name}</div>
//                       <div className="text-sm">{asset.price}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ---------------------------------------------------------
//               HIGHEST ASSETS
//           ---------------------------------------------------------- */}
//           <div className="h-[320px] bg-black flex flex-col gap-5 p-5">
//             <div className="text-white font-bold">Highest Assets</div>

//             <div className="flex gap-6">
//               {highestAssets.map((asset) => (
//                 <div key={asset.id} className="relative w-full h-56 rounded-md overflow-hidden">
//                   <img
//                     src={asset.image}
//                     alt={asset.name}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-0 left-0 p-2 text-white text-sm">
//                     <p className="font-semibold">{asset.name}</p>
//                     <p>
//                       Price: {asset.price}
//                       <span
//                         className={`ml-5 ${
//                           asset.change.startsWith("-")
//                             ? "text-red-400"
//                             : "text-green-400"
//                         }`}
//                       >
//                         {asset.change}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ---------------------------------------------------------
//               ARTICLES / HOW NFT WORKS
//           ---------------------------------------------------------- */}
//           <div className="h-[350px] bg-black flex flex-col gap-5 p-5 mb-5">
//             <div className="text-white font-bold">How NFT Works</div>

//             <div className="text-xs text-white">
//               A fusion of timeless elegance and digital innovation — this NFT captures
//             </div>

//             <div className="flex gap-5">
//               {Articles.map((article) => (
//                 <div
//                   key={article.id}
//                   onClick={() =>
//                     article.title === "Understanding NFTs" &&
//                     navigate("/hownftsworks")
//                   }
//                   className="w-1/4 flex flex-col items-center border border-gray-500 rounded-md bg-gray-500 text-black cursor-pointer"
//                 >
//                   <div className="w-full h-40 bg-white rounded-md mb-4"></div>

//                   <div className="text-lg text-center mb-2 px-2 w-full">
//                     {article.title}
//                     <span className="block text-xs text-gray-400 text-right cursor-pointer">
//                       Read more
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import Categories from "./Categories";
// import ImageSlider from "../components/ImageSlider/ImageSlider";
// import { useNavigate } from "react-router-dom";
// import { fetchLimitedListings } from "../services/listingService";

// const PLACEHOLDER_IMAGE =
//   "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   const [trendingAssets, setTrendingAssets] = useState<any[]>([]);
//   const [weeklyHighestSales, setWeeklyHighestSales] = useState<any[]>([]);
//   const [highestAssets, setHighestAssets] = useState<any[]>([]);
//   const [featuredSale, setFeaturedSale] = useState<any>(null);

//   useEffect(() => {
//     const loadAll = async () => {
//       // 1. TRENDING
//       const trending = await fetchLimitedListings(6);
//       setTrendingAssets(
//         trending.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           Status: index % 3 === 0 ? "NEW" : "",
//           changedPrice: `${item.price} ${item.currency}`,
//           Change: index % 2 === 0 ? "+" : "-",
//         }))
//       );

//       // 2. WEEKLY HIGHEST SALES
//       const weekly = await fetchLimitedListings(4);
//       setWeeklyHighestSales(
//         weekly.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           imageUrl: item.imageUrl || PLACEHOLDER_IMAGE,
//           description: item.description || "Top traded asset of the week.",
//           currency: item.currency,
//         }))
//       );

//       setFeaturedSale(weekly[0]);

//       // 3. HIGHEST ASSETS
//       const highest = await fetchLimitedListings(4);
//       setHighestAssets(
//         highest.map((item, index) => ({
//           id: index + 1,
//           name: item.nftName,
//           price: `${item.price} ${item.currency}`,
//           change: `${Math.floor(Math.random() * 10 - 5)}%`,
//           imageUrl: item.imageUrl || PLACEHOLDER_IMAGE,
//         }))
//       );
//     };

//     loadAll();
//   }, []);

//   const Articles = [
//     { id: 1, title: "Understanding NFTs" },
//     { id: 2, title: "The Future of Digital Art" },
//     { id: 3, title: "Blockchain Technology" },
//     { id: 4, title: "Investing in NFTs" },
//   ];

//   return (
//     <div className="flex bg-black">
//       <div className="flex-1 bg-white min-h-screen">

//         <Categories />

//         {/* Image Slider */}
//         <div className="flex flex-col bg-black">
//           <div className="px-5 w-full h-[500px] bg-black">
//             <ImageSlider />
//           </div>

//           {/* ---------------------------------------------------------
//               TRENDING
//           ---------------------------------------------------------- */}
//           <div className="h-[300px] bg-black flex-col gap-5 p-5 flex">
//             <div className="text-white font-bold text-xl">Trending Assets</div>

//             {[0, 1].map((row) => (
//               <div key={row} className="w-full flex gap-5">
//                 {trendingAssets.slice(row * 3, row * 3 + 3).map((asset) => (
//                   <div
//                     key={asset.id}
//                     className="flex-1 border border-gray-700 rounded-2xl bg-[#1a1a1a] text-white p-4 shadow-md"
//                   >
//                     <div className="text-lg font-semibold">{asset.name}</div>
//                     <div className="text-sm opacity-80">{asset.price}</div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* ---------------------------------------------------------
//               WEEKLY HIGHEST SALES
//           ---------------------------------------------------------- */}
//           <div className="h-[330px] bg-black flex flex-col gap-5 p-5">
//             <div className="text-white font-bold text-xl">Weekly Highest Sales</div>

//             <div className="w-full flex gap-5">
//               {/* FEATURED CARD */}
//               {featuredSale && (
//                 <div className="w-1/3 flex border border-gray-700 rounded-2xl bg-[#181818] text-white p-3">

//                   {/* Image container (OpenSea square style) */}
//                   <div className="w-1/2 aspect-square bg-black rounded-xl p-2 flex justify-center items-center">
//                     <img
//                       src={featuredSale.imageUrl}
//                       alt={featuredSale.nftName}
//                       className="object-contain w-full h-full"
//                     />
//                   </div>

//                   {/* Text Section */}
//                   <div className="w-1/2 flex flex-col justify-between pl-3">
//                     <div>
//                       <div className="text-lg font-bold">{featuredSale.nftName}</div>
//                       <div className="text-xs opacity-70">{featuredSale.description}</div>
//                     </div>

//                     <button className="bg-green-700 text-white py-1 rounded-lg mt-2">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* OTHER WEEKLY CARDS */}
//               <div className="flex-1 flex gap-5">
//                 {weeklyHighestSales.slice(1).map((asset) => (
//                   <div
//                     key={asset.id}
//                     className="w-1/3 border border-gray-700 rounded-xl bg-[#181818] text-white p-2"
//                   >
//                     <div className="aspect-square bg-black rounded-xl p-2 flex justify-center items-center">
//                       <img
//                         src={asset.imageUrl}
//                         alt={asset.name}
//                         className="object-contain w-full h-full"
//                       />
//                     </div>

//                     <div className="mt-2 px-1">
//                       <div className="text-md font-semibold">{asset.name}</div>
//                       <div className="text-sm opacity-80">{asset.price}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ---------------------------------------------------------
//               HIGHEST ASSETS
//           ---------------------------------------------------------- */}
//           <div className="bg-black flex flex-col gap-5 p-5">
//             <div className="text-white font-bold text-xl">Highest Assets</div>

//             <div className="flex gap-5">
//               {highestAssets.map((asset) => (
//                 <div
//                   key={asset.id}
//                   className="flex-1 rounded-xl border border-gray-700 bg-[#181818] overflow-hidden"
//                 >
//                   <div className="aspect-square bg-black p-2 flex justify-center items-center">
//                     <img
//                       src={asset.imageUrl}
//                       alt={asset.name}
//                       className="object-contain w-full h-full"
//                     />
//                   </div>

//                   <div className="p-3 text-white text-sm">
//                     <div className="font-semibold">{asset.name}</div>
//                     <div className="opacity-80">
//                       Price: {asset.price}  
//                       <span
//                         className={`ml-3 ${
//                           asset.change.startsWith("-") ? "text-red-400" : "text-green-400"
//                         }`}
//                       >
//                         {asset.change}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ---------------------------------------------------------
//               ARTICLES
//           ---------------------------------------------------------- */}
//           <div className="h-[350px] bg-black flex flex-col gap-5 p-5 mb-5">
//             <div className="text-white font-bold text-xl">How NFT Works</div>

//             <div className="flex gap-5">
//               {Articles.map((article) => (
//                 <div
//                   key={article.id}
//                   onClick={() =>
//                     article.title === "Understanding NFTs" &&
//                     navigate("/hownftsworks")
//                   }
//                   className="w-1/4 border border-gray-700 rounded-xl bg-[#181818] text-white p-3 cursor-pointer"
//                 >
//                   <div className="aspect-square bg-black rounded-xl mb-4"></div>

//                   <div className="text-lg font-semibold">{article.title}</div>
//                   <div className="text-xs opacity-60 text-right mt-1">Read more</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.tsx