import React, { useEffect, useState, Suspense } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

// Lazy-loaded components
const IncomeOverview = React.lazy(() => import("../../components/Income/IncomeOverview"));
const IncomeList = React.lazy(() => import("../../components/Income/IncomeList"));
const Modal = React.lazy(() => import("../../components/Modal"));
const AddIncomeForm = React.lazy(() => import("../../components/Income/AddIncomeFrom"));
const DeleteAlert = React.lazy(() => import("../../components/DeleteAlert"));

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  // Fetch all income records
  const fetchIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(Array.isArray(response?.data) ? response.data : []);
      console.log("✅ Income data fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching incomes:", error.response?.data?.message || error.message);
      toast.error("Failed to fetch income data");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  // Add a new income record
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) { toast.error("Source is required."); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0."); return; }
    if (!date) { toast.error("Date is required."); return; }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
      toast.success("Income added successfully!");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch (error) {
      console.error("❌ Error adding income:", error.response?.data?.message || error.message);
      toast.error("Failed to add income");
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("❌ Error deleting income:", error.response?.data?.message || error.message);
      toast.error("Failed to delete income details");
    }
  };

  // Download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.error("❌ Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again later.");
    }
  };

  return (
    <DashboardLayout activeMenue="Income">
      <div className="my-5 mx-auto">
        <Suspense fallback={<div>Loading Income Overview...</div>}>
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </Suspense>

        <div className="mt-8">
          <Suspense fallback={<div>Loading Income List...</div>}>
            <IncomeList
              transactions={incomeData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadIncomeDetails}
            />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <Suspense fallback={<div>Loading Form...</div>}>
              <AddIncomeForm onAddIncome={handleAddIncome} />
            </Suspense>
          </Modal>
        </Suspense>

        <Suspense fallback={null}>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <DeleteAlert
                content="Are you sure you want to delete this income details?"
                onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Suspense>
          </Modal>
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default Income;
