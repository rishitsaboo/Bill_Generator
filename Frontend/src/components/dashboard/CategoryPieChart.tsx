import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { CategorySale } from "../../types/dashboard";

type Props = { data: CategorySale[] };
const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

const CategoryPieChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.totalRevenue,
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-serif">
      <h2 className="text-lg font-semibold mb-6 text-slate-400">
        Sales by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
