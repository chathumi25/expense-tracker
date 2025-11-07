import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#f0fdf4] rounded-2xl shadow-lg border border-[#22c55e]/20 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-300 bg-[#eff6ff]">
          <h3 className="text-lg font-semibold text-[#068133] dark:text-[#22c55e]">
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-black hover:text-black hover:bg-red-400 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

       
      </div>
    </div>
  );
};

export default Modal;
