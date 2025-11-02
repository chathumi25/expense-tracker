import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">Expenses</h5>
       <button
                 className="card-btn flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-800"
                 onClick={onSeeMore}
               >
                 See All <LuArrowRight className="text-base" />
               </button>
      </div>

      {/* Transactions List */}
      <div className="mt-6">
        {transactions.slice(0, 5).map((expense, index) => (
          <TransactionInfoCard
            key={expense.id || index} // fallback key to avoid warnings
            icon={expense.icon}
            title={expense.category || "Unknown"}
            amount={expense.amount || 0}
            date={expense.date ? moment(expense.date).format('DD MMM YYYY') : "N/A"} // unified format
            type="expense"
            hideDeleteBtn
          />
        ))}
        {transactions.length === 0 && (
          <p className="text-gray-500 text-sm text-center">No expenses available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
