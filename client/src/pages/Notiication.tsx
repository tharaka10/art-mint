import React from "react";

const notifications = [
  {
    id: 1,
    title: "New NFT Sale",
    message: "Your NFT #002 just sold for 1.2 ETH!",
    time: "5 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Follower",
    message: "Alex started following you.",
    time: "30 mins ago",
    unread: false,
  },
  {
    id: 3,
    title: "Bid Received",
    message: "You received a new bid on NFT #015.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 4,
    title: "System Message",
    message: "Server maintenance scheduled for tonight.",
    time: "1 day ago",
    unread: false,
  },
];

const Notifications: React.FC = () => {
  return (
    <div className="mx-5 text-white">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg shadow-md ${
              note.unread ? "bg-gray-800 border-l-4 border-gray-500" : "bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <span className="text-sm text-gray-400">{note.time}</span>
            </div>
            <p className="text-sm text-gray-300">{note.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
