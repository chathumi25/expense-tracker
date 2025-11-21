import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Income</h5>
        <button
          className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* List of recent transactions */}
      <div className="space-y-3">
        {transactions.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source || "Income"}
            icon={item.icon}
            date={item.date ? moment(item.date).format("DD MMM YYYY") : "-"}
            amount={Number(item.amount) || 0}
            type="income"
            hideDeleteBtn
          />
        ))}

        {transactions.length === 0 && (
          <p className="text-center text-gray-500 mt-2">No recent income found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
