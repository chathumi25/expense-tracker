import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DEFAULT_COLORS = ["#22C55E", "#16A34A", "#4ADE80", "#86EFAC", "#BBF7D0"];

const Last60DaysIncomePieChart = ({ data = [], totalAmount = 0, small = false }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const chartData =
    data.length > 0
      ? data
      : [{ name: "Income", value: totalAmount, color: DEFAULT_COLORS[0] }];

  const innerRadius = small ? 100 : 120;
  const outerRadius = small ? 140 : 160;

  return (
    <div className="relative w-full h-80 md:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            label={false}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={(_, index) =>
              setActiveIndex(index === activeIndex ? null : index)
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                stroke={index === activeIndex ? "#000" : "none"}
                strokeWidth={index === activeIndex ? 3 : 1}
                cursor="pointer"
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, value, color } = payload[0];
                return (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      border: `2px solid ${color}`,
                      borderRadius: "8px",
                      padding: "8px 12px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p style={{ color: color, fontWeight: 600, marginBottom: 4 }}>
                      {name}
                    </p>
                    <p style={{ color: color, fontWeight: 500 }}>
                      ${value.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
            wrapperStyle={{ outline: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center total only */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span className="text-primary font-semibold text-lg">Total Income</span>
        <span className="mt-1 text-2xl md:text-2xl font-bold text-black">
          ${totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Last60DaysIncomePieChart;
