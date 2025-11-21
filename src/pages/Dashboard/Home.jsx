import React, { useEffect, useState, useContext, useRef } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuCircleDollarSign } from "react-icons/lu";
import { addThousandSeparators } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../pages/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  const { user } = useContext(UserContext);
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prevent double fetch in React 18 StrictMode
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!user || fetchedRef.current) return;

    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        console.log("✅ Dashboard Data:", response.data);
        setDashboardData(response.data || null);
      } catch (error) {
        console.error(
          "❌ Dashboard fetch error:",
          error.response?.data || error.message || error
        );
        setDashboardData(null);
      } finally {
        fetchedRef.current = true; // ensure we only fetch once
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout activeMenue="Dashboard">
        <div className="text-center my-10">Loading Dashboard...</div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout activeMenue="Dashboard">
        <div className="text-center my-10 text-red-600">
          No dashboard data available.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenue="Dashboard">
      <div className="my-5 mx-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoCard
            icon={<LuCircleDollarSign />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparators(dashboardData.totalIncome || 0)}
            color="bg-green-600"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeparators(dashboardData.totalExpenses || 0)}
            color="bg-red-500"
          />
        </div>

        {/* Detailed sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
         <RecentTransactions
            transactions={dashboardData.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData.totalBalance || 0}
            totalIncome={dashboardData.totalIncome || 0}
            totalExpenses={dashboardData.totalExpenses || 0}
          />
          <ExpenseTransactions
            transactions={dashboardData.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData.last30DaysExpenses?.transactions || []}
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions|| []}
            onSeeMore={() => navigate("/income")}
          />
          <RecentIncomeWithChart
            data={dashboardData.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalincome={dashboardData.totalIncome || 0}
          />
          

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
