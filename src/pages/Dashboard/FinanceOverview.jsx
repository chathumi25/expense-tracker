import React from "react";
import CoustomPieChart from "../../components/Charts/CoustomPieChart";


const COLORS = {
  income: "#22c55e",
  expenses: "#ef4444",
  balance: "#3b82f6",
};

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Total Income", value: totalIncome, type: "income" },
    { name: "Total Expenses", value: totalExpenses, type: "expenses" },
    { name: "Total Balance", value: totalBalance, type: "balance" },
  ];

  return (
    <div className="card w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 tracking-wide">
          Finance Overview
        </h5>
      </div>

      {/* Reuse Custom Pie Chart */}
      <CoustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        showTextAchor={true}
      />
    </div>
  );
};

export default FinanceOverview;
