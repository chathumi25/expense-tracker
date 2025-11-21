import React, { useEffect, useState, Suspense } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";

// Lazy-loaded components
const ExpenseOverview = React.lazy(() => import("../../components/Expense/ExpenseOverview"));
const ExpenseList = React.lazy(() => import("../../components/Expense/ExpenseList"));
const Modal = React.lazy(() => import("../../components/Modal"));
const AddExpenseForm = React.lazy(() => import("../../components/Expense/AddExpenseForm"));
const DeleteAlert = React.lazy(() => import("../../components/DeleteAlert"));

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  // Fetch all expense records
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(Array.isArray(response?.data) ? response.data : []);
      console.log("✅ Expense data fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching expenses:", error);
      toast.error("Failed to fetch expense data");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  // Add a new expense
  const handleAddExpense = async (expense) => {
    const { source, amount, date, icon } = expense;
    if (!source.trim()) { toast.error("Source is required."); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0."); return; }
    if (!date) { toast.error("Date is required."); return; }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category: source, amount, date, icon });
      toast.success("Expense added successfully!");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch (error) {
      console.error("❌ Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  // Download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully!");
    } catch (error) {
      console.error("❌ Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again later.");
    }
  };

  return (
    <DashboardLayout activeMenue="Expense">
      <div className="my-5 mx-auto">
        <Suspense fallback={<div>Loading Expense Overview...</div>}>
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </Suspense>

        <div className="mt-8">
          <Suspense fallback={<div>Loading Expense List...</div>}>
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadExpenseDetails}
            />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <Suspense fallback={<div>Loading Form...</div>}>
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </Suspense>
          </Modal>
        </Suspense>

        <Suspense fallback={null}>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <DeleteAlert
                content="Are you sure you want to delete this expense?"
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Suspense>
          </Modal>
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
