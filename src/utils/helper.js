import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandSeparators = (num) => {
  if (num === null || isNaN(num)) return "";
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// ---------------- Expense Chart ----------------
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: Number(item?.amount) || 0,
  }));

  return chartData;
};

// ---------------- Income Chart ----------------
export const prepareIncomeBarChartData = (data = []) => {
  const incomeData = data.filter((item) => !item.type || item.type === "income");

  const sortedData = [...incomeData].sort(
    (a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
  );

  return sortedData.map((item) => ({
    month: moment(item.date || item.createdAt).format("Do MMM"),
    amount: Number(item.amount) || 0,
  }));
};

// ---------------- Expense Line Chart ----------------
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: Number(item?.amount) || 0,
    // ✅ Added source field (uses category, source, or title from transaction)
    source: item?.source || item?.category || item?.title || 'Unknown Source',
  }));

  return chartData;
};
