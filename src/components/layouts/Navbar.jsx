import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenue }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-40">
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="block lg:hidden"
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setOpenSideMenu(false)}
        >
          <div
            className="bg-black/20 w-full lg:hidden"
            // stop click propagation for menu
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
