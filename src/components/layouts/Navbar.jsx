import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenue }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className="flex items-center justify-between gap-5 
                 py-4 px-7 sticky top-0 z-40 border-b border-blue-200/40 
                 backdrop-blur-[2px]"
      style={{
        backgroundColor: 'rgba(239, 246, 255, 0.9)', 
        color: 'rgba(0, 0, 0, 1)',            
        fontWeight: 600,
        fontSize: '18px',
        boxShadow: '0 0 10px rgba(37, 99, 235, 0.1)',
      }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="block lg:hidden transition-transform duration-200 hover:scale-110"
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl text-[rgba(20,70,200,0.85)]" />
        ) : (
          <HiOutlineMenu className="text-2xl text-[rgba(20,70,200,0.85)]" />
        )}
      </button>

      {/* Navbar Title */}
      <h2
        className="text-lg md:text-xl font-bold tracking-wide"
        style={{ color: 'rgba(20, 70, 200, 0.9)' }}
      >
        Expense Tracker
      </h2>

      {/* Sidebar overlay */}
      {openSideMenu && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setOpenSideMenu(false)}
        >
          <div
            className="bg-black/20 w-full lg:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <SideMenu activeMenue={activeMenue} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
