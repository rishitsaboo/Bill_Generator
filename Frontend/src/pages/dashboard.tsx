import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardApi";
import type { DashboardData } from "../types/dashboard";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import TopItemsBarChart from "../components/dashboard/TopItemsBarChart";

export default function DashBoard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");
        const today = new Date();
        const res = await getDashboardData(
          today.getFullYear(),
          today.getMonth() + 1,
          today.toISOString()
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
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;

  const daily = data?.daily ?? { totalSales: 0, totalBills: 0 };
  const monthly = data?.monthly ?? { totalSales: 0, totalBills: 0 };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl font-bold">
        <h1>DashBoard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today Sales" value={daily.totalSales} />
        <StatCard title="Today Bills" value={daily.totalBills} />
        <StatCard title="Month Sales" value={monthly.totalSales} />
        <StatCard title="Month Bills" value={monthly.totalBills} />
      </div>

      <div className="w-full p-3 drop-shadow-md rounded-md">
        <SalesChart data={data?.trend ?? []} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-50%">
          <CategoryPieChart data={data?.categorySales ?? []} />
        </div>
        <div>
          <TopItemsBarChart data={data?.topSellers ?? []} />
        </div>
      </div>
    </div>
  );
}
