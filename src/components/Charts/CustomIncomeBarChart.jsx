import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomIncomeBarChart = ({ data = [] }) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [chartData, setChartData] = useState([]);

  // 💙💚 Bar colors
  const getBarColor = (index) => {
    if (index === hoveredBar) return "#7dd3fc"; // hover sky blue
    if (index === selectedBar) return "#15803d"; // deep green selected
    return index % 2 === 0 ? "#2563EB" : "#93C5FD"; // alternate blue shades
  };

  // ✅ Aggregate data by source
  useEffect(() => {
    if (!Array.isArray(data)) return;

    // Map and filter valid items
    const validData = data
      .map((item) => ({
        source: item.source?.toString().trim() || "",
        amount: Number(item.amount) || 0,
      }))
      .filter((item) => item.source && item.amount > 0);

    // Aggregate by source
    const aggregated = validData.reduce((acc, item) => {
      const existing = acc.find((i) => i.source === item.source);
      if (existing) {
        existing.amount += item.amount;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    setChartData(aggregated);
    console.log("✅ Aggregated chartData:", aggregated);
  }, [data]);

  // Dynamic bar width
  const dynamicBarSize =
    chartData.length > 0 ? Math.max(20, Math.floor(400 / chartData.length)) : 50;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const { source, amount } = payload[0]?.payload || {};
    if (!source || amount === undefined) return null;

    return (
      <div className="bar-tooltip bg-white shadow-md rounded-md p-2 border border-gray-200">
        <p className="text-xs font-semibold text-[#065f46] mb-1">{source}</p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="font-medium text-[#16a34a]">
            ${amount.toLocaleString()}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div
      className="mt-14 mb-6 rounded-2xl shadow-md border border-[#22c55e]/20 p-4"
      style={{
        background: "linear-gradient(to bottom right, #ecfdf5, #eff6ff)",
      }}
    >
      

      <div className="chart-wrapper w-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            barSize={dynamicBarSize}
            barCategoryGap="8%"
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(209, 213, 219, 0.7)" />
            <XAxis
              dataKey="source"
              tick={{ fontSize: 12, fill: "#1e3a8a" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#065f46" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(37,99,235,0.08)" }} />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              onClick={(_, index) => setSelectedBar(index)}
              onMouseEnter={(_, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(index)}
                  cursor="pointer"
                  style={{
                    transition: "all 0.3s ease-in-out",
                    filter:
                      index === hoveredBar
                        ? "drop-shadow(0 3px 6px rgba(37,99,235,0.3))"
                        : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomIncomeBarChart;
