import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <div className="card bg-gradient-to-r from-blue-50/70 to-green-50/70 border border-green-200 rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-[#065f46]">Income Sources</h5>
        <button
          className="flex items-center gap-1 text-white font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow transition-colors duration-200"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      {/* Transaction Cards */}
      {transactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions.map((income) => (
            <TransactionInfoCard
              key={income._id || income.id}
              title={income.source || "Unknown"}
              icon={income.icon || null}
              date={income.date ? moment(income.date).format("DD MMM YYYY") : "N/A"}
              amount={Number(income.amount) || 0}
              type="income"
              onDelete={() => onDelete(income._id || income.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No income records available.</p>
      )}
    </div>
  );
};

export default IncomeList;
