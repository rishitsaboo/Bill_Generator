import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { TopSeller } from "../../types/dashboard";

type Props = { data: TopSeller[] };

const TopItemsBarChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    item: item.category,
    quantity: item.totalQuantity,
  }));

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
          <Tooltip formatter={(value) => [value, "Quantity"]} />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TopItemsBarChart;
