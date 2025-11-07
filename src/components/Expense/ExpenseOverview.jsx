import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from '../Charts/customLineChart';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className='card '>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
        <div>
          <h5 className="text-xl font-semibold text-[#b91c1c]"
>Expense Overview</h5>
          <p className="text-gray-800 text-sm">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 text-sm font-medium text-[#b91c1c] bg-[#f0f9ff] border border-[#f87171] rounded-lg px-4 py-2 hover:bg-[#f87171] hover:text-[#2563eb] hover:border-primary hover:text-primary transition"
          onClick={onAddExpense}
        >
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>

      {/* Chart Section */}
      <div className='mt-10'>
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
