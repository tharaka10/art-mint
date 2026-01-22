import React from "react";

interface TimelineProps {
  status: string;
}

const steps = [
  { key: "delivering", label: "NFT Burned & Delivery Requested" },
  { key: "shipped", label: "Shipment Created" },
  { key: "in_transit", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const DeliveryTimeline: React.FC<TimelineProps> = ({ status }) => {
  const activeIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="mt-5 bg-gray-800 p-4 rounded-xl">
      <h3 className="text-lg font-bold mb-4">📦 Delivery Progress</h3>

      <div className="flex flex-col gap-5">
        {steps.map((step, index) => {
          const isActive = index <= activeIndex;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  isActive
                    ? "bg-green-500 animate-ping"
                    : "bg-gray-600"
                }`}
              ></div>
              <span
                className={`text-sm ${
                  isActive ? "text-green-400" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTimeline;
