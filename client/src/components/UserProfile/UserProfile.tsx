import type { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => (
  <div className="flex bg-black text-white min-h-screen">
    <aside className="w-64 bg-[#0D0D0D] border-r border-gray-800 p-5 flex flex-col">
      <div className="space-y-6 items-start flex flex-col">
        
        {/* STATES */}
        <div className="w-full text-left">
          <h3 className="text-sm text-white font-bold mb-2 tracking-wide">
            States
          </h3>
          <div className="flex flex-wrap gap-2 text-xs justify-start">
            {["All", "Buy", "Top Rating", "High", "Minimum"].map((item) => (
              <button
                key={item}
                className="px-3 py-1 rounded-md bg-[#1A1A1A] text-gray-300 hover:bg-green-600 hover:text-black transition-all duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE FILTER */}
        <div className="w-full text-left">
          <h3 className="text-sm text-white font-bold mb-2 tracking-wide">
            Price (SOL)
          </h3>
          <div className="flex gap-2 justify-start">
            <input
              id="minPrice"
              placeholder="Min"
              className="bg-[#1A1A1A] w-20 p-2 rounded text-xs text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
            <input
              id="maxPrice"
              placeholder="Max"
              className="bg-[#1A1A1A] w-20 p-2 rounded text-xs text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
          <button className="mt-3 bg-green-500 text-black text-xs px-3 py-1.5 rounded-md w-full font-semibold hover:bg-green-400 transition-all">
            Apply
          </button>
        </div>

        {/* COLLECTION */}
        <div className="w-full text-left">
          <h3 className="text-sm text-white font-bold mb-2 tracking-wide">
            Collection
          </h3>

          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <label
                key={i}
                htmlFor={`collection-${i}`}
                className="flex items-center text-xs cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  id={`collection-${i}`}
                  className="mr-2 accent-green-500"
                />
                <span className="group-hover:text-green-500 transition">
                  AurumCraft
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </aside>

    <main className="flex-1 p-6">{children}</main>
  </div>
);

export default Sidebar;
