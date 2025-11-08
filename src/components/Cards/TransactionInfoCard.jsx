import React from "react";
import { LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isExpense = type === "expense";

  // Gradient for card background
  const bgGradient = isExpense
    ? "from-blue-50/70 to-red-50/40 border-blue-200 hover:from-blue-100 hover:to-red-100 hover:border-red-400"
    : "from-blue-50/70 to-green-50/70 border-green-200 hover:from-blue-100 hover:to-green-100 hover:border-green-400";

  // Icon background
  const iconBg = isExpense ? "bg-red-100 text-red-600" : "bg-green-100 text-blue-600";

  // Amount text color
  const amountColor = isExpense ? "text-red-600" : "text-green-600";

  // Format number with commas
  const formatAmount = (amt) => {
    if (!amt) return "0.00";
    return Number(amt).toLocaleString("en-IN"); // Indian number format
  };

  return (
    <div
      className={`relative flex items-center justify-between gap-4 mt-3 p-4 rounded-xl border
        shadow-sm transition-all duration-300 transform
        bg-gradient-to-r ${bgGradient}
        hover:shadow-lg hover:-translate-y-1`}
    >
      {/* ===== Icon Section ===== */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center text-xl rounded-full shadow-sm ${iconBg}`}
        >
          {icon ? <img src={icon} alt={title} className="w-6 h-6" /> : isExpense ? <LuTrendingDown /> : <LuTrendingUp />}
        </div>

        {/* ===== Info Section ===== */}
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-sm capitalize">{title || "Unnamed Transaction"}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

      {/* ===== Amount & Delete Section ===== */}
      <div className="flex items-center gap-3">
        <div className={`text-sm font-semibold ${amountColor}`}>
          {isExpense ? "-" : "+"}Rs {formatAmount(amount)}
        </div>

        {/* Delete Button */}
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-600 transition-all duration-300"
            title="Delete"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
