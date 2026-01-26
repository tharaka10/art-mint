import React, { useState, useEffect } from "react";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useNavigate } from "react-router-dom";
import {
  fetchLimitedListings,
  fetchWeeklySales,
  fetchRecentPurchases,
} from "../services/listingService";

import art1 from "../assets/Image_fx.png";
import art2 from "../assets/Image_fx (1).png";
import art3 from "../assets/Image_fx (2).png";
import art4 from "../assets/Image_fx (3).png";

// Skeletons
const SkeletonCard = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-black/70 border border-gray-700 rounded-xl aspect-square w-full" />
    <div className="space-y-2">
      <div className="h-5 bg-gray-700 rounded w-4/5" />
      <div className="h-4 bg-gray-700 rounded w-3/5" />
    </div>
  </div>
);

const SkeletonTrending = () => (
  <div className="animate-pulse bg-black/70 border border-gray-700 rounded-2xl p-6 space-y-4">
    <div className="h-5 bg-gray-700 rounded w-24" />
    <div className="space-y-2">
      <div className="h-7 bg-gray-700 rounded w-3/4" />
      <div className="h-10 bg-gray-700 rounded w-1/2" />
    </div>
  </div>
);

// Animated gradient class (Tailwind + custom)
const AnimatedTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-gradient-x">
    {children}
  </h2>
);

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [trendingArtworks, setTrendingArtworks] = useState<any[]>([]);
  const [weeklyMints, setWeeklyMints] = useState<any[]>([]);
  const [recentMints, setRecentMints] = useState<any[]>([]);
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

        setTrendingArtworks(
          trending.map((item: any, i: number) => ({
            id: i + 1,
            name: item.name || "Untitled Artwork",
            price: `${item.price} ${item.currency || "USD"}`,
          }))
        );

        setWeeklyMints(
          weekly.map((item: any, i: number) => ({
            id: i + 1,
            name: item.name || "Unknown Artwork",
            price: `${item.price} ${item.currency || "USD"}`,
            imageUrl: item.imageUrl || "/placeholder.jpg",
          }))
        );

        setRecentMints(recent);
      } catch (err) {
        console.error("Failed to load art data", err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const articles = [
    { id: 1, title: "How Digital Art Minting Works", image: art1 },
    { id: 2, title: "The Future of Digital Art", image: art2 },
    { id: 3, title: "Blockchain for Artists", image: art3 },
    { id: 4, title: "Minting & Selling Your Artwork", image: art4 },
  ];

  const renderImage = (src: string, alt: string, className?: string) => (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.onerror = null;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          const placeholder = document.createElement("div");
          placeholder.className =
            "flex items-center justify-center bg-gray-800 border border-gray-700 rounded-xl w-full h-full";
          placeholder.innerHTML = `<p class="text-gray-400 text-center text-sm px-2">Image not available</p>`;
          parent.appendChild(placeholder);
        }
      }}
    />
  );

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero */}
      <div className="px-5 pt-5 pb-8">
        <ImageSlider />
      </div>

      <div className="px-5 py-5 max-w-[1400px] mx-auto space-y-24">
        {/* Trending Artworks */}
        <section>
          <AnimatedTitle>Trending Artworks</AnimatedTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <SkeletonTrending key={i} />)
              : trendingArtworks.map((art, index) => (
                  <div
                    key={art.id}
                    className="group relative bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden
                    shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="px-3 py-2 text-xs text-gray-400 z-10 relative">
                      #{index + 1} Trending Artwork
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold mb-2 text-gray-200 group-hover:text-white transition">
                        {art.name}
                      </h3>

                      <p className="text-xl font-bold text-white">{art.price}</p>
                      <p className="text-xs text-gray-400 mt-1">Mint Price</p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Weekly Minted */}
        <section>
          <AnimatedTitle>Top Minted This Week</AnimatedTitle>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : weeklyMints.map((art) => (
                  <div
                    key={art.id}
                    className="group relative bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden
                    shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square relative">
                      {renderImage(
                        art.imageUrl,
                        art.name,
                        "w-full h-full object-cover"
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition">
                        {art.name}
                      </h3>
                      <p className="text-lg font-semibold text-white mt-1">
                        {art.price}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Recently Minted */}
        <section>
          <AnimatedTitle>Recently Minted</AnimatedTitle>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : recentMints.map((art: any, i: number) => (
                  <div
                    key={i}
                    className="group relative bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square relative">
                      {renderImage(
                        art.imageUrl,
                        art.name,
                        "w-full h-full object-cover"
                      )}
                      <span className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-black text-xs font-bold px-2 py-1 rounded">
                        MINTED
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-300 group-hover:text-white transition">
                        {art.name}
                      </p>
                      <p className="text-lg font-bold text-white mt-1">
                        {art.price} SOL
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Learn */}
        <section>
          <AnimatedTitle>Learn About Digital Art & Minting</AnimatedTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() =>
                  article.id === 1 && navigate("/hownftsworks")
                }
                className="group cursor-pointer relative bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {renderImage(
                  article.image,
                  article.title,
                  "aspect-video object-cover w-full"
                )}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-300 group-hover:text-white transition">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">Read article →</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tailwind CSS gradient animation */}
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% }
            50% { background-position: 100% }
            100% { background-position: 0% }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
