import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfileDashboard from "../components/UserProfile/ProfileDashboard";
import KycUploadForm from "../pages/KYCForm";

const Profile: React.FC = () => {
  const { connected } = useWallet();
  const [showKycModal, setShowKycModal] = useState(false);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-5">
        <h1 className="text-2xl font-bold mb-2">NFThrive</h1>
        <p className="text-gray-400 mb-3">Connect With NFThrive</p>
        <WalletMultiButton className="mb-3 p-10" />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full text-center p-5">
      <ProfileDashboard />

      <button
        onClick={() => setShowKycModal(true)}
        className="mt-10 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Start KYC
      </button>

      {/* KYC Modal */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowKycModal(false)}
          />

          {/* Modal content */}
          <div className="relative bg-white/10 rounded-2xl shadow-xl w-full max-w-2xl max-h-screen p-6 z-10 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 p-3 rounded-lg bg-green-800 shadow-lg">
              <h2 className="text-xl font-bold text-white drop-shadow-sm">KYC Verification</h2>
              <button
                onClick={() => setShowKycModal(false)}
                className="px-3 py-1 rounded-md border border-white text-white hover:bg-white hover:text-green-800 transition"
              >
                Close
              </button>
            </div>


            {/* KYC Form */}
            <KycUploadForm {...({ maxFileSizeMB: 5 } as any)} />

          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
