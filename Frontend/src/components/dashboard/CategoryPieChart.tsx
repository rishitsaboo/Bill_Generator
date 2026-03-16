import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { CategorySale } from "../../types/dashboard";

type Props = { data: CategorySale[] };
const CATEGORY_COLORS: Record<string, string> = {
  Namkeens: "#3b82f6",
  Sweets: "#22c55e",
  Nasta_Items: "#f59e0b",
  Sabzi: "#ef4444",
  Others: "#8b5cf6",
  Unknown: "#94a3b8",
};

const CategoryPieChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    // Backward compatibility: some API responses used `_id` instead of `category`
    name: item.category || (item as any)._id || "Unknown",
    value: item.totalRevenue ?? (item as any).value ?? 0,
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
            label={({ name, value }) => `${name}: ${value}`}
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell
                key = {index}
                fill={
                  CATEGORY_COLORS[chartData[index].name] || CATEGORY_COLORS["Unknown"]}
              />
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
