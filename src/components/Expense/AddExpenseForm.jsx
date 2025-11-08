import React, { useState } from 'react';
import EmojiPickerPop from '../EmojiPickerPop';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  const handleSubmit = () => {
    const source = expense.source.trim();
    const amount = parseFloat(expense.amount);
    const date = expense.date;
    const icon = expense.icon || "💰";

    //  Validation
    if (!source) {
      alert("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      alert("Date is required");
      return;
    }

    //  Send data to backend (map source → category)
    onAddExpense({ source, amount, date, icon });

    //  Clear form
    setExpense({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <div className="space-y-4">
      {/* Source */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Expense Source</label>
        <EmojiPickerPop
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <input
          value={expense.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Food, Transport, Bills, etc"
          type="text"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Amount</label>
        <input
          value={expense.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          placeholder="Enter amount"
          type="number"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Date</label>
        <input
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 text-white bg-[#b91c1c] hover:bg-[#7f1d1d] rounded-md transition-colors"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
