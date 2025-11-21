import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6 gap-2">
        {/* Cancel button (optional) */}
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        )}

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 rounded-md border border-red-500 text-red-500 bg-red-50 hover:bg-red-100 hover:border-red-600 transition-colors font-medium"
          aria-label="Confirm delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
