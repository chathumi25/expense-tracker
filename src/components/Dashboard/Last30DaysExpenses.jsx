import React, { useEffect, useState } from 'react'; //  Added useState import
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]); //  fixed variable typo (was charData)

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Last 30 Days Expenses
        </h5>
      </div>

      <CustomBarChart data={chartData} /> {/*  fixed spacing */}
    </div>
  );
};

export default Last30DaysExpenses;
