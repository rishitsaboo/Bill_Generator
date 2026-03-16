import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardApi";
import type { DashboardData } from "../types/dashboard";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import TopItemsBarChart from "../components/dashboard/TopItemsBarChart";

export default function DashBoard() {
  const today = new Date();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // 1-based

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        // Keep the daily box aligned with the selected month
        const daysInSelectedMonth = new Date(today.getFullYear(), selectedMonth, 0).getDate();
        const safeDay = Math.min(today.getDate(), daysInSelectedMonth);
        const selectedDate = new Date(today.getFullYear(), selectedMonth - 1, safeDay);

        const res = await getDashboardData(
          today.getFullYear(),
          selectedMonth, // API expects 1-based month
          selectedDate.toISOString()
        );
        if (mounted) setData(res);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load dashboard");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      mounted = false;
    };
  }, [selectedMonth]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  const daily = data?.daily ?? { totalSales: 0, totalBills: 0 };
  const monthly = data?.monthly ?? { totalSales: 0, totalBills: 0 };
  const trend = Array.isArray(data?.trend) ? data!.trend : [];
  const categorySales = Array.isArray(data?.categorySales) ? data!.categorySales : [];
  const topSellers = Array.isArray(data?.topSellers) ? data!.topSellers : [];

  return (
    <div className="flex flex-col gap-6 ">
      <div className="text-2xl font-bold flex items-right justify-between mr-5 font-serif ">
        <h1>DashBoard</h1>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border rounded px-2 py-1 text-xs sm:text-sm md:text-base w-24 sm:w-28 lg:w-auto"
        >
          <option className="font-serif" value="1">Jan</option>
          <option className="font-serif" value="2">Feb</option>
          <option className="font-serif" value="3">Mar</option>
          <option className="font-serif" value="4">Apr</option>
          <option className="font-serif" value="5">May</option>
          <option className="font-serif" value="6">Jun</option>
          <option className="font-serif" value="7">Jul</option>
          <option className="font-serif" value="8">Aug</option>
          <option className="font-serif" value="9">Sep</option>
          <option className="font-serif" value="10">Oct</option>
          <option className="font-serif" value="11">Nov</option>
          <option className="font-serif" value="12">Dec</option>
        </select>
                
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shadow-md p-4 rounded bg-white">
        <StatCard title="Today Sales" value={`₹${daily.totalSales}`} />
        <StatCard title="Today Bills" value={daily.totalBills} />
        <StatCard title="Month Sales" value={`₹${monthly.totalSales}`} />
        <StatCard title="Month Bills" value={monthly.totalBills} />
      </div>

      <div className="w-full p-3 drop-shadow-md rounded-md shadow-md bg-white">
        <SalesChart data={trend} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md p-4 rounded bg-white">
        <div className="w-50%">
          <CategoryPieChart data={categorySales} />
        </div>
        <div>
          <TopItemsBarChart data={topSellers} />
        </div>
      </div>
    </div>
  );
}
