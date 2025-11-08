import React from "react";
import { Tooltip } from "recharts";

const COLORS = {
  income: "#22c55e",   // green
  expenses: "#ef4444", // red
  balance: "#3b82f6",  // blue
};

const CustomTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // full object of this point
    const name = payload[0].name?.toLowerCase() || "";
    let textColor = COLORS.expenses; // default red for expenses

    if (name.includes("income")) textColor = COLORS.income;
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
        {/*  Show source (not month/date) */}
        <p
          style={{
            color: textColor,
            fontWeight: "600",
            marginBottom: "4px",
            fontSize: "13px",
          }}
        >
          {data.source || "Unknown Source"}
        </p>

        {/*  Show amount */}
        <p
          style={{
            color: "#374151",
            fontWeight: "500",
            fontSize: "14px",
          }}
        >
          Amount:{" "}
          <span style={{ color: textColor }}>
            ${data.amount?.toLocaleString() || 0}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

//  Wrap it in Recharts Tooltip
const CustomTooltip = () => (
  <Tooltip content={<CustomTooltipContent />} wrapperStyle={{ outline: "none" }} />
);

export default CustomTooltip;
