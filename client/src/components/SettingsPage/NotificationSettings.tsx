import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const toggleItems = [
    {
      title: "Item sold",
      description: "You’ll be notified when your listed item is sold."
    },
    {
      title: "Bid activity",
      description: "Get alerts when someone places or updates a bid on your items."
    },
    {
      title: "Price change",
      description: "Receive notifications when your NFT price is changed."
    },
    {
      title: "Auction expiration",
      description: "Get a reminder before an auction you’re watching ends."
    },
    {
      title: "Outbid notification",
      description: "We’ll notify you when someone outbids your offer."
    },
    {
      title: "Successful purchase",
      description: "Be informed when your NFT purchase is completed successfully."
    }
  ];

  // Dynamically initialize toggles to false
  const [toggles, setToggles] = useState<boolean[]>(
    Array(toggleItems.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const updatedToggles = [...toggles];
    updatedToggles[index] = !updatedToggles[index];
    setToggles(updatedToggles);
  };

  return (
    <div className="ml-5">
      <h1 className="text-2xl font-semibold mb-6">Email Notifications</h1>
      <p className="text-gray-400 mb-4">
        Manage which notifications you'd like to receive from MintedGold.
      </p>

      <div className="space-y-6">
        {toggleItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-black p-4 rounded border border-gray-700">
            <div className="flex-col">
              <div className="text-white font-medium">{item.title}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={toggles[index]}
                onChange={() => handleToggle(index)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
              />
              <span className="ms-3 text-sm font-medium text-gray-300">
                {toggles[index] ? "On" : "Off"}
              </span>
            </label>
          </div>
        ))}
      </div>

      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => alert("Settings saved")}
      >
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;
