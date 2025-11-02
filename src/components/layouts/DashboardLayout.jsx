import React, { useContext } from 'react';
import Navbar from '../layouts/Navbar';
import SideMenu from '../layouts/SideMenu';
import { UserContext } from '../../context/userContext';

const DashboardLayout = ({ children, activeMenue }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <Navbar activeMenue={activeMenue} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* === Fixed Sidebar (no scrollbar) === */}
          <div className="hidden lg:block w-64 bg-white shadow-md border-r border-gray-200 fixed top-16 bottom-0 left-0">
            <SideMenu activeMenue={activeMenue} />
          </div>

          {/* === Scrollable Main Dashboard Content === */}
          <div className="flex-1 overflow-auto p-5 lg:ml-64 mt-16">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
