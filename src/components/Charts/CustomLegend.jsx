import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-5">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: `${entry.color}22`,
            color: entry.color,
          }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
