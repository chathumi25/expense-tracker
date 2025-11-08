import React, { useContext } from 'react';
import Navbar from '../layouts/Navbar';
import SideMenu from '../layouts/SideMenu';
import { UserContext } from '../../context/userContext';

const DashboardLayout = ({ children, activeMenue }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(16,185,129,0.05) 50%, rgba(248,113,113,0.05) 100%)",
        //  soft gradient: green → blue → very light red-pink
      }}
    >
      {/* === Top Navbar === */}
      <Navbar activeMenue={activeMenue} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* === Fixed Sidebar === */}
          <div className="hidden lg:block w-64 bg-[#eff6ff]/80 shadow-md border-r border-blue-100 fixed top-[64px] bottom-0 left-0">
            <SideMenu activeMenue={activeMenue} />
          </div>

          {/* === Main Dashboard Content === */}
          <div className="flex-1 overflow-auto p-5 lg:ml-64 mt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
