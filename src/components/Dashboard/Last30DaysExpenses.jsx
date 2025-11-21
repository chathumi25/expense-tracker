import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Last 30 Days Expenses
        </h5>
      </div>

      {/* Bar Chart */}
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
