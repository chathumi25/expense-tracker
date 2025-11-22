import React from "react";
import CustomPieChart from "../../components/Charts/CoustomPieChart"; // fixed typo in import

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  // Ensure numbers (avoid strings or undefined)
  const safeBalance = Number(totalBalance) || 0;
  const safeIncome = Number(totalIncome) || 0;
  const safeExpenses = Number(totalExpenses) || 0;

  const balanceData = [
    { name: "Total Income", value: safeIncome, type: "income" },
    { name: "Total Expenses", value: safeExpenses, type: "expenses" },
    { name: "Total Balance", value: safeBalance, type: "balance" },
  ];

  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide">
          Finance Overview
        </h5>
      </div>

      {/* Pie Chart */}
      <div className="w-full">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={safeBalance}
        />
      </div>
    </div>
  );
};

export default FinanceOverview;
