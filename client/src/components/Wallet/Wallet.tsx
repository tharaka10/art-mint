// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import React from "react";

// interface WalletProps {
//   onClose: () => void;
// }

// const Wallet: React.FC<WalletProps> = ({ onClose }) => {
//   const handlePhontomClick = () => {
//     {
//       /**Open https://phantom.com/download this page on a new tab */
//     }
//     window.open("https://phantom.com/download");
//     onClose();
//   };
//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60"
//       onClick={onClose}
//     >
//       <div
//         className="relative border border-gray-900 bg-gray-800 p-6 rounded-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-3 right-3 text-white hover:text-gray-400"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-white">Connect Wallet</h2>

//         {/* Actual wallet connect button from solana adapter */}
//         <WalletMultiButton />

//         <h2 className="text-2xl font-bold mb-4 p-5">Connect with NFThrive</h2>

//         {/* Wallet rows */}
//         <div className="space-y-3 mb-5">
//           <button
//             className="ml-15 w-100 flex items-center gap-2 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
//             onClick={handlePhontomClick}
//           >
//             <span className="flex items-center gap-3">
//               <img src={phontomIcon} alt="Phontom Icon" className="w-20 h-20" />
//               <span className="text-sm">Phontom</span>
//             </span>
//           </button>
//         </div>

//         <div className="space-y-3 mb-5">
//           <button className="ml-15 w-100 flex items-center gap-5 p-3 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
//             <span className="flex items-center gap-3">
//               <img
//                 src={solflareIcon}
//                 alt="Solflare Icon"
//                 className="w-12 h-12 mr-5"
//               />
//               <span className="text-sm">Solflare</span>
//             </span>
//           </button>
//         </div>

//         <div className="space-y-3 mb-5">
//           <button className="ml-15 w-100 flex items-center gap-8 p-3 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
//             <span className="flex items-center gap-3">
//               <img
//                 src={metaMaskIcon}
//                 alt="MetaMask Icon"
//                 className="w-12 h-12 mr-5"
//               />
//               <span className="text-sm">MetaMask</span>
//             </span>
//           </button>
//         </div>
//         <div className="space-y-3 mb-5">
//           <button className="ml-15 w-100 flex items-center gap-8 p-3 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
//             <span className="flex items-center gap-3">
//               <img
//                 src={walletConnectIcon}
//                 alt="Wallet Connect Icon"
//                 className="w-12 h-12 mr-5"
//               />
//               <span className="text-sm">Wallet Connect</span>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wallet;
