import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import Modal from "../../components/Modal";
import AddIncomeFrom from "../../components/Income/AddIncomeFrom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DeleteAlert from "../../components/DeleteAlert";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  //  Fetch all income records
  const fetchIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

      if (response?.data && Array.isArray(response.data)) {
        setIncomeData(response.data);
        console.log("✅ Income data fetched:", response.data);
      } else {
        console.warn("⚠️ No income data found or invalid format:", response.data);
        setIncomeData([]);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching incomes:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to fetch income data");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  //  Add a new income record
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

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
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      toast.success("Income added successfully!");
      console.log("✅ Added income:", response.data);

      setOpenAddIncomeModal(false);
      await fetchIncomeDetails();
    } catch (error) {
      console.error(
        "❌ Error adding income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add income");
    }
  };

  //  Download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

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

  //  Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete income details");
    }
  };

  return (
    <DashboardLayout activeMenue="Income">
      <div className="my-5 mx-auto">
        {/* Income Overview */}
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>

        {/* Income List */}
        <div className="mt-8">
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        {/*  Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeFrom onAddIncome={handleAddIncome} />
        </Modal>

        {/*  Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
