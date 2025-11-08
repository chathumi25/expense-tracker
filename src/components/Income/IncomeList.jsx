import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment/moment';

function IncomeList({ transactions, onDelete, onDownload }) {
  return (
    <div className='card bg-gradient-to-r from-blue-50/70 to-green-50/70 border border-green-200 rounded-2xl shadow-md p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-semibold text-[#065f46]'>Income Sources</h5>
        <button
          className='flex items-center gap-1 text-white font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow'
          onClick={onDownload}
        >
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Transaction Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon} //  Use icon if available
            date={moment(income.date).format("DD MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
