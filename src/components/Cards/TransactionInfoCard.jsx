import React from "react";
import { LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
}) => {
  const isExpense = type === "expense";

  return (
    <div
      className={`group relative flex items-center justify-between gap-4 mt-3 p-4 rounded-xl border
        shadow-sm transition-all duration-300 transform
        ${
          isExpense
            ? "border-red-200 bg-gradient-to-r from-red-50/70 to-red-100/40 hover:from-red-100 hover:to-red-200 hover:border-red-400"
            : "border-green-200 bg-gradient-to-r from-green-50/70 to-green-100/40 hover:from-green-100 hover:to-green-200 hover:border-green-400"
        }
        hover:shadow-lg hover:-translate-y-1`}
    >
      {/* ===== Icon Section ===== */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center text-xl rounded-full shadow-sm
            ${
              isExpense
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
        >
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : isExpense ? (
            <LuTrendingDown />
          ) : (
            <LuTrendingUp />
          )}
        </div>

        {/* ===== Info Section ===== */}
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-sm capitalize">
            {title || "Unnamed Transaction"}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

      {/* ===== Amount Section ===== */}
      <div
        className={`text-sm font-semibold ${
          isExpense ? "text-red-600" : "text-green-600"
        }`}
      >
        {isExpense ? "-" : "+"}${amount || "0.00"}
      </div>

      {/* ===== Delete Button ===== */}
      {!hideDeleteBtn && (
        <button
          className="absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 
          text-gray-400 hover:text-red-600"
          title="Delete"
        >
          <LuTrash2 size={18} />
        </button>
      )}
    </div>
  );
};

export default TransactionInfoCard;
