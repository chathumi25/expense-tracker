import React, { useMemo, useState } from "react";
import Last60DaysIncomePieChart from "../Charts/Last60DaysIncomePieChart";

const COLORS = ["#22C55E", "#16A34A", "#4ADE80", "#86EFAC", "#BBF7D0"];

const RecentIncomeWithChart = ({ data = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const chartData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return [{ name: "Income", value: 0, color: COLORS[0] }];
    }

    return data.map((item, index) => ({
      name: item?.source || `Income ${index + 1}`,
      value: Number(item?.amount) || 0,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  const totalIncome = useMemo(
    () => data.reduce((sum, item) => sum + Number(item?.amount || 0), 0),
    [data]
  );

  const visibleItems = showAll ? chartData : chartData.slice(0, 6);
  const hasMore = chartData.length > 6;

  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Last 60 Days Income
        </h5>
      </div>

      {/* Chart Section */}
      <div className="flex justify-center items-center mb-6">
        <Last60DaysIncomePieChart
          data={chartData}
          totalAmount={totalIncome}
          small={showAll} // shrink chart when showing all
        />
      </div>

      {/* Horizontal Labels (no values) */}
      <div className="flex flex-wrap justify-center gap-4">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="font-medium text-gray-700 text-sm">{item.name}</span>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-medium hover:underline"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
