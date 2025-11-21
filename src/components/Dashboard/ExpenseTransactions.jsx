import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">Expenses</h5>
        <button
          className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.slice(0, 5).map((expense, index) => (
          <TransactionInfoCard
            key={expense.id || expense._id || index} // safer fallback key
            icon={expense.icon}
            title={expense.category || "Unknown"}
            amount={Number(expense.amount) || 0}
            date={expense.date ? moment(expense.date).format("DD MMM YYYY") : "N/A"}
            type="expense"
            hideDeleteBtn
          />
        ))}

        {transactions.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-2">
            No expenses available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
