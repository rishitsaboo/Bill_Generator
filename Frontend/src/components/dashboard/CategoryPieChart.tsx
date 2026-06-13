import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { CategorySale } from "../../types/dashboard";

type Props = {
  data: CategorySale[];
};

const CATEGORY_COLORS: Record<string, string> = {
  Namkeens: "#4F7DF3",
  Sweets: "#22C55E",
  Nasta_Items: "#F59E0B",
  Sabzi: "#EF4444",
  Others: "#8B5CF6",
  custom: "#94A3B8",
};

const CategoryPieChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item.category || (item as any)._id || "custom",
    value: item.totalRevenue ?? (item as any).value ?? 0,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
      <h1 className="text-xl font-semibold text-slate-300 mb-6">
        Sales by Category
      </h1>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="52%"
            innerRadius={90}
            outerRadius={135}
            paddingAngle={0}
            cornerRadius={0}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  CATEGORY_COLORS[entry.name] ||
                  CATEGORY_COLORS["custom"] 
                }
              />
            ))}
          </Pie>

          {/* Center Text */}
          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#94a3b8"
            fontSize={14}
          >
            Total Sales
          </text>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize={22}
            fontWeight="bold"
          >
            ₹{total.toLocaleString()}
          </text>

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#cbd5e1",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              color: "#cbd5e1",
              fontSize: "14px",
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;