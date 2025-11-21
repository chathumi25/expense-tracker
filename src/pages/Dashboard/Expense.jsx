import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  //  Fetch all expense records
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response?.data && Array.isArray(response.data)) {
        setExpenseData(response.data);
      } else {
        setExpenseData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching expenses:", error);
      toast.error("Failed to fetch expense data");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  //  Add a new expense
  const handleAddExpense = async (expense) => {
    const { source, amount, date, icon } = expense;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: source, // map 'source' → 'category'
        amount,
        date,
        icon,
      });

      toast.success("Expense added successfully!");
      setOpenAddExpenseModal(false);
      await fetchExpenseDetails();
    } catch (error) {
      console.error("❌ Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  };

  //  Delete expense
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

  //  Download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      // Create blob URL for Excel download
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
        {/* Expense Overview */}
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>

        {/* Expense List */}
        <div className="mt-8">
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}  
          />
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Expense Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
