import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

function ExpenseList({ transactions = [], onDelete, onDownload }) {
  return (
    <div className='card bg-gradient-to-r from-red-50/70 to-yellow-50/70 border border-red-200 rounded-2xl shadow-md p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-semibold text-[#b91c1c]'>Expense Sources</h5>
        <button
          className='flex items-center gap-1 text-white font-medium bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow transition'
          onClick={onDownload}
        >
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Transaction Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id || expense.id} // fallback key
              title={expense.category || "Unknown"} 
              icon={expense.icon || null} 
              date={expense.date ? moment(expense.date).format("DD MMM YYYY") : "N/A"}
              amount={expense.amount || 0}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center col-span-full">
            No expenses available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
