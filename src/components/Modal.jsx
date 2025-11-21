import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose} // Close when clicking outside modal
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#f0fdf4] rounded-2xl shadow-lg border border-[#22c55e]/20 overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-300 bg-[#eff6ff]">
          <h3
            id="modal-title"
            className="text-lg font-semibold text-primary dark:text-primary"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-black hover:text-black hover:bg-red-400 rounded-lg w-8 h-8 flex items-center justify-center transition-colors duration-200"
            aria-label="Close modal"
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
