import type { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => (
  <div className="flex bg-[#0F0F0F] text-white min-h-screen">

    {/* Sidebar */}
    <aside className="w-64 bg-[#0D0D0D] border-r border-[#2A2A2A] p-5 flex flex-col">
      <div className="space-y-8 flex flex-col">

        {/* STATES */}
        <div>
          <h3
            className="text-sm font-bold mb-3
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent tracking-wide"
          >
            States
          </h3>

          <div className="flex flex-wrap gap-2">
            {["All", "Buy", "Top Rating", "High", "Minimum"].map((item) => (
              <button
                key={item}
                className="px-3 py-1.5 rounded-md text-xs
                           bg-[#1C1C1C] text-gray-300
                           border border-[#2A2A2A]
                           hover:border-purple-400/60
                           hover:text-white
                           transition-all duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE FILTER */}
        <div>
          <h3
            className="text-sm font-bold mb-3
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent tracking-wide"
          >
            Price (SOL)
          </h3>

          <div className="flex gap-2">
            <input
              id="minPrice"
              placeholder="Min"
              className="bg-[#1C1C1C] w-20 p-2 rounded-md
                         text-xs text-gray-200 placeholder-gray-500
                         border border-[#2A2A2A]
                         focus:ring-1 focus:ring-purple-400
                         outline-none"
            />
            <input
              id="maxPrice"
              placeholder="Max"
              className="bg-[#1C1C1C] w-20 p-2 rounded-md
                         text-xs text-gray-200 placeholder-gray-500
                         border border-[#2A2A2A]
                         focus:ring-1 focus:ring-pink-500
                         outline-none"
            />
          </div>

          <button
            className="mt-4 w-full text-xs font-semibold
                       px-3 py-2 rounded-md
                       bg-gradient-to-r from-purple-400 to-pink-500
                       text-black
                       hover:opacity-90 transition"
          >
            Apply Filter
          </button>
        </div>

        {/* COLLECTION */}
        <div>
          <h3
            className="text-sm font-bold mb-3
                       bg-gradient-to-r from-purple-400 to-pink-500
                       bg-clip-text text-transparent tracking-wide"
          >
            Collection
          </h3>

          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <label
                key={i}
                htmlFor={`collection-${i}`}
                className="flex items-center text-xs cursor-pointer
                           text-gray-400 hover:text-white transition group"
              >
                <input
                  type="checkbox"
                  id={`collection-${i}`}
                  className="mr-2 accent-purple-400"
                />
                <span className="group-hover:text-pink-400 transition">
                  AurumCraft
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6">{children}</main>
  </div>
);

export default Sidebar;
