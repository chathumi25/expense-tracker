import React, { useEffect, useState, Suspense } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from "../../utils/helper";

// Dynamic import for code splitting
const CustomLineChart = React.lazy(() => import('../Charts/CustomLineChart'));

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(transactions)) return;
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className='card bg-white shadow-md rounded-xl p-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
        <div>
          <h5 className="text-xl font-semibold text-[#b91c1c]">Expense Overview</h5>
          <p className="text-gray-800 text-sm mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 text-sm font-medium text-[#b91c1c] bg-[#f0f9ff] border border-[#f87171] rounded-lg px-4 py-2 mt-4 md:mt-0 hover:bg-[#f87171] hover:text-white transition"
          onClick={onAddExpense}
        >
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>

      {/* Chart Section */}
      <div className='mt-8'>
        <Suspense fallback={<div>Loading chart...</div>}>
          <CustomLineChart data={chartData} />
        </Suspense>
      </div>
    </div>
  );
};

export default ExpenseOverview;
