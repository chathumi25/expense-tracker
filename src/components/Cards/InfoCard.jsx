// src/components/Cards/InfoCard.jsx
import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex gap-5 items-center bg-blue-50 p-5 rounded-2xl border border-gray-300/60 shadow-md 
                 hover:shadow-xl hover:border-blue-300 transition-all duration-300 ease-in-out 
                 hover:-translate-y-1"
    >
      {/* Icon Container */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl shadow-lg ${color}`}
        style={{
          background: color === "bg-primary" ? "var(--color-primary)" : undefined,
          boxShadow: "0 4px 15px rgba(37, 99, 235, 0.25)",
        }}
      >
        {icon}
      </div>

      {/* Label and Value */}
      <div>
        <h6 className="text-sm font-medium text-[#0a1a6e] opacity-80 mb-1 tracking-wide">
          {label}
        </h6>
        <span className="text-[22px] font-semibold text-[#020748ee]">
          ${value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
