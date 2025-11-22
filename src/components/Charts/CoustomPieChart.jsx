import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  income: "#22c55e",   // green
  expenses: "#ef4444", // red
  balance: "#3b82f6",  // blue
};

const CustomPieChart = ({ data, label, totalAmount }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || data.length === 0) return null;

  // Format numbers with commas
  const formatAmount = (amt) => `Rs ${Number(amt).toLocaleString("en-IN")}`;

  //  Custom Tooltip with dynamic color border/text
  const CustomStyledTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const color = entry?.payload?.type ? COLORS[entry.payload.type] : "#000";
      return (
        <div
          className="p-3 rounded-lg shadow-md bg-white text-sm font-medium"
          style={{
            border: `2px solid ${color}`,
            color,
            minWidth: "140px",
            textAlign: "center",
          }}
        >
          <p className="font-semibold">{entry.name}</p>
          <p className="text-base">{formatAmount(entry.value)}</p>
        </div>
      );
    }
    return null;
  };

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
            innerRadius={100}
            outerRadius={140}
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

          <Tooltip content={<CustomStyledTooltip />} />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center total label and active section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-primary font-semibold">{label}</span>
        <span className="text-2xl md:text-3xl font-bold text-gray-900">
          {formatAmount(totalAmount)}
        </span>

        {activeIndex !== null && (
          <span
            className="mt-3 text-lg font-semibold px-3 py-1 rounded-full bg-white shadow-sm border"
            style={{
              borderColor: COLORS[data[activeIndex].type],
              color: COLORS[data[activeIndex].type],
            }}
          >
            {data[activeIndex].name}: {formatAmount(data[activeIndex].value)}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomPieChart;
