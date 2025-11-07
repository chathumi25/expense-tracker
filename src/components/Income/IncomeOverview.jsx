import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomIncomeBarChart from "../Charts/CustomIncomeBarChart";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(transactions)) return;

    // Aggregate transactions by source
    const aggregatedData = transactions
      .map((t) => ({
        source: t.source?.toString().trim() || "Unknown",
        amount: Number(t.amount) || 0,
      }))
      .filter((t) => t.source && t.amount > 0)
      .reduce((acc, item) => {
        const existing = acc.find((i) => i.source === item.source);
        if (existing) {
          existing.amount += item.amount;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);

    setChartData(aggregatedData);
    console.log("✅ Income chart data:", aggregatedData); // Debug
  }, [transactions]);

  return (
    <div className="card bg-white dark:bg-[#f0fdf4] rounded-2xl shadow-md border border-[#22c55e]/20 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-xl font-semibold text-[#065f46]">
            Income Overview
          </h5>
          <p className="text-gray-800 text-sm">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        {/* Add Income Button */}
        <button
          onClick={onAddIncome}
          className="add-btn flex items-center gap-1.5 text-sm font-medium text-[#068133] bg-[#f0fdf4] border border-[#22c55e] rounded-lg px-4 py-2 hover:bg-[#22c55e] hover:text-white transition"
        >
          <LuPlus /> Add Income
        </button>
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <CustomIncomeBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
