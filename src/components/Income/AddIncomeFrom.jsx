import React, { useState } from 'react';
import EmojiPickerPop from '../EmojiPickerPop';

const AddIncomeFrom = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-4">
      {/* Source */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Income Source</label>

        <EmojiPickerPop
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Freelance, Salary, etc"
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Amount</label>
        <input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          placeholder="Enter amount"
          type="number"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Date</label>
        <input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeFrom;
