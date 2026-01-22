import CommoditiesPrices from "../components/Commodity/CommoditiesPrices";
// import GoldChartWidget from "../components/GoldChartWidget";

const Market: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl text-blue-300 font-bold text-center mb-4">Market Dashboard</h1>
        <CommoditiesPrices />
        {/* <GoldChartWidget /> */}
      </div>
    </div>
  );
};

export default Market;
