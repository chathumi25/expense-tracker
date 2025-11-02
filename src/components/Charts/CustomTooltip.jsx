import React from "react";
import { Tooltip } from "recharts";

const COLORS = {
  income: "#22c55e",   // green
  expenses: "#ef4444", // red
  balance: "#3b82f6",  // blue
};

const CustomTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const name = payload[0].name.toLowerCase();
    let textColor = "#3b82f6";

    if (name.includes("income")) textColor = COLORS.income;
    else if (name.includes("expense")) textColor = COLORS.expenses;
    else if (name.includes("balance")) textColor = COLORS.balance;

    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          border: `2px solid ${textColor}`,
          borderRadius: "8px",
          padding: "8px 12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ color: textColor, fontWeight: "600", marginBottom: "4px" }}>
          {payload[0].name}
        </p>
        <p style={{ color: textColor, fontWeight: "500" }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// ✅ Wrap it with Recharts Tooltip
const CustomTooltip = () => (
  <Tooltip
    content={<CustomTooltipContent />}
    wrapperStyle={{ outline: "none" }}
  />
);

export default CustomTooltip;
