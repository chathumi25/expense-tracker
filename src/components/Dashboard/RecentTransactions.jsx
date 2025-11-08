import React, { useMemo } from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  //  Combine and sort both income & expense by newest date
  const sortedTransactions = useMemo(() => {
    return [...transactions]
      .filter((t) => t.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Recent Transactions
        </h5>

       
      </div>

      {/* Content */}
      <div className="mt-6 space-y-3">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((item, index) => (
            <TransactionInfoCard
              key={item._id || item.id || index}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent transactions.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
