import type { ReactNode } from "react";

export interface TableRow {
  event: string;
  item: ReactNode;
  price: string;
  rarity: string;
  qty: number;
  to: string;
  time: string;
}

interface DataTableProps {
  rows: TableRow[];
}

export const DataTable: React.FC<DataTableProps> = ({ rows }) => (
  <table className="w-full text-xs text-left border-collapse">
    <thead className="bg-gray-700 text-gray-300">
      <tr>
        <th className="p-2">EVENT</th>
        <th className="p-2">ITEM</th>
        <th className="p-2">PRICE</th>
        <th className="p-2">RARITY</th>
        <th className="p-2">QTY</th>
        <th className="p-2">TO</th>
        <th className="p-2">TIME</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} className="border-b border-gray-800 hover:bg-gray-800">
          <td className="p-2">{row.event}</td>
          <td className="p-2">{row.item}</td>
          <td className="p-2 text-red-500">{row.price}</td>
          <td className="p-2">{row.rarity}</td>
          <td className="p-2">{row.qty}</td>
          <td className="p-2">{row.to}</td>
          <td className="p-2">{row.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);