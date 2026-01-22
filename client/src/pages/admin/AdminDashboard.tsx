import { useState } from "react";
import ListingTable from "../../components/Admin/ListingsTable";
import NftTable from "../../components/Admin/NftTable";
import PurchasesTable from "../../components/Admin/PurchasesTable";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("nfts");
  const navigate = useNavigate();

  const tabs = [
    { key: "nfts", label: "NFTs" },
    { key: "listings", label: "Listings" },
    { key: "purchases", label: "Purchases" },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "nfts":
        return <NftTable />;
      case "listings":
        return <ListingTable />;
      case "purchases":
        return <PurchasesTable />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2
          bg-black/50 backdrop-blur-md border border-white/10
          rounded-lg px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-white/10 hover:border-green-500 hover:text-white
          transition-all duration-200 shadow-md"
      >
        <IoArrowBack className="text-lg" />
        Back
      </button>

      {/* Page Header */}
      <div className="pt-16 pb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-400 text-sm md:text-base">
          Manage NFTs, Listings, and Purchases
        </p>
      </div>

      {/* Tabs with identical dimensions */}
      <div className="flex justify-center gap-4 mb-6 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`relative w-32 h-10 md:w-36 md:h-12 flex justify-center items-center rounded-full font-medium text-sm md:text-base transition-all duration-300
              ${selectedTab === tab.key
                ? "bg-green-500 text-black shadow-lg"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
          >
            {tab.label}
            {selectedTab === tab.key && (
              <span className="absolute inset-0 rounded-full bg-green-500/20 blur-xl -z-10" />
            )}
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div className="max-w-8xl mx-auto px-4 pb-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Section Header */}
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              {selectedTab === "nfts" && "All NFTs"}
              {selectedTab === "listings" && "Active Listings"}
              {selectedTab === "purchases" && "Purchase History"}
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              {selectedTab === "nfts" && "Overview of all minted NFTs"}
              {selectedTab === "listings" && "All items currently listed"}
              {selectedTab === "purchases" && "All completed transactions"}
            </p>
          </div>

          {/* Tables */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-full">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
