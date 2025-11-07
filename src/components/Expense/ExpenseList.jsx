import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment/moment';

function ExpenseList({ transactions, onDelete, onDownload }) {
  return (
    <div className='card bg-gradient-to-r from-red-50/70 to-yellow-50/70 border border-red-200 rounded-2xl shadow-md p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-semibold text-[#b91c1c]'>Expense Sources</h5>
        <button
          className='flex items-center gap-1 text-white font-medium bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow'
          onClick={onDownload}
        >
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Transaction Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category} // Use category as title
            icon={expense.icon} // Use icon if available
            date={moment(expense.date).format("DD MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
