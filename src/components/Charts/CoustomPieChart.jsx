import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

const COLORS = {
  income: "#22c55e",
  expenses: "#ef4444",
  balance: "#3b82f6",
};

const CustomPieChart = ({ data, label, totalAmount }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-full h-96 md:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={160}
            label={false}
            onClick={(_, index) => setActiveIndex(index === activeIndex ? null : index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.type]}
                stroke={index === activeIndex ? "#000" : "none"}
                strokeWidth={index === activeIndex ? 3 : 1}
                cursor="pointer"
              />
            ))}
          </Pie>

          {/* ✅ Custom tooltip (colorful border + text) */}
          <CustomTooltip />

          {/* Legend */}
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center total label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-primary font-semibold">{label}</span>
        <span className="text-2xl md:text-3xl font-bold text-gray-900">
          ${totalAmount.toLocaleString()}
        </span>

        {activeIndex !== null && (
          <span
            className="mt-2 text-lg font-semibold"
            style={{ color: COLORS[data[activeIndex].type] }}
          >
            {data[activeIndex].name}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomPieChart;
