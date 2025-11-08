import React from "react";
import CustomPieChart from "../../components/Charts/CoustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  //  Ensure numbers (avoid strings or undefined)
  const safeBalance = Number(totalBalance) || 0;
  const safeIncome = Number(totalIncome) || 0;
  const safeExpenses = Number(totalExpenses) || 0;

  const balanceData = [
    { name: "Total Income", value: safeIncome, type: "income" },
    { name: "Total Expenses", value: safeExpenses, type: "expenses" },
    { name: "Total Balance", value: safeBalance, type: "balance" },
  ];

  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Finance Overview
        </h5>
      </div>

      {/*  Correct component name and props */}
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={safeBalance}
      />
    </div>
  );
};

export default FinanceOverview;
