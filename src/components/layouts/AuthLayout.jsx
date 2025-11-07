import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AuthLayout = ({ children }) => {
  const chartData = [
    { name: "Jan", income: 80, expense: 40 },
    { name: "Feb", income: 160, expense: 60 },
    { name: "Mar", income: 230, expense: 80 },
    { name: "Apr", income: 180, expense: 70 },
    { name: "May", income: 90, expense: 30 },
    { name: "Jun", income: 210, expense: 60 },
    { name: "Jul", income: 220, expense: 70 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 relative overflow-hidden">
      {/* ✨ Animated Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-white to-green-200 animate-[pulse_8s_infinite_alternate] opacity-60 blur-3xl"></div>

      {/* Left Section (Form Side) */}
      <div className="w-screen h-screen md:w-[60vw] px-10 pt-10 pb-10 flex flex-col items-center justify-between relative z-10">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
          .gradient-title {
            background: linear-gradient(90deg, #1e3a8a, #2563eb, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>

        {/* Title */}
        <h2 className="text-6xl md:text-7xl font-extrabold gradient-title tracking-wide animate-fadeIn drop-shadow-lg text-center mt-10">
          Expense Tracker
        </h2>

        {/* Login/Register Form */}
        <div className="flex-1 flex items-center justify-center w-full animate-fadeIn">
          {children}
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          © {new Date().getFullYear()} Expense Tracker — All Rights Reserved
        </p>
      </div>

      {/* Right Section (Chart Side) */}
      <div className="hidden md:flex flex-col justify-center items-center w-[40vw] h-screen bg-gradient-to-br from-blue-200 via-white to-green-200 relative overflow-hidden p-8">
        {/* Decorative Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-blue-500 absolute -top-7 -left-5 opacity-30 animate-pulse" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-primary absolute top-[30%] -right-10 opacity-40" />
        <div className="w-48 h-48 rounded-[40px] bg-green-400 absolute -bottom-7 -left-5 opacity-25 animate-pulse" />

        {/* Chart Section */}
        <div className="z-20 bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-8 w-full max-w-xl transform hover:scale-[1.02] transition">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                All Transactions
              </h3>
              <p className="text-xs text-gray-500">2nd Jan to 24th Dec</p>
            </div>
            <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium hover:bg-blue-200 transition">
              View More
            </button>
          </div>

          {/* Bigger Chart */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="expense" fill="#60A5FA" radius={[6, 6, 0, 0]} barSize={22} />
                <Bar dataKey="income" fill="#1E3A8A" radius={[6, 6, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
