import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { TopSeller } from "../../types/dashboard";

type ExtendedTopSeller = TopSeller | { name?: string; category?: string; _id?: string; totalQuantity: number };
type Props = { data: ExtendedTopSeller[] };

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const TopItemsTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const { item, quantity, totalSales } = payload[0].payload;
  return (
    <div className="rounded border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow">
      <p className="mb-2 font-semibold">{item}</p>
      <p className="text-blue-600">Quantity Sold: {quantity}</p>
      <p className="text-blue-600">Total Sales: {formatCurrency(totalSales)}</p>
    </div>
  );
};

const TopItemsBarChart = ({ data }: Props) => {
  const chartData = data.map((item) => {
    const itemName = "name" in item && item.name ? item.name : item.category || (item as any)._id || "Unknown";
    return {
      item: itemName,
      quantity: item.totalQuantity ?? (item as any).quantity ?? 0,
      totalSales: (item as any).totalSales ?? (item as any).sales ?? 0,
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-serif">
      <h2 className="text-lg font-semibold mb-6 text-slate-400">
        Top Selling Items
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="item" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip content={<TopItemsTooltip />} />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TopItemsBarChart;
