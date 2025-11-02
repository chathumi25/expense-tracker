const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Convert userId to ObjectId once
    const userObjectId = new Types.ObjectId(userId);

    // Total income & expenses
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 days income
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: sixtyDaysAgo },
    }).sort({ date: -1 });

    const totalIncomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tnx) => sum + tnx.amount,
      0
    );

    // Last 30 days expenses
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    const totalExpensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tnx) => sum + tnx.amount,
      0
    );

    // Last 5 transactions
    const lastIncomeTransactions = (
      await Income.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)
    ).map((tnx) => ({ ...tnx.toObject(), type: "income" }));

    const lastExpenseTransactions = (
      await Expense.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)
    ).map((tnx) => ({ ...tnx.toObject(), type: "expense" }));

    const recentTransactions = [...lastIncomeTransactions, ...lastExpenseTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Send final response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      last30DaysExpenses: {
        total: totalExpensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: totalIncomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
