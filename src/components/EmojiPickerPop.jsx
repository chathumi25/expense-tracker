import React, { useState, Suspense } from "react";
import { LuImage, LuX } from "react-icons/lu";

// Lazy load heavy emoji picker
const EmojiPicker = React.lazy(() => import("emoji-picker-react"));

const EmojiPickerPop = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-2 mb-2 relative">

      {/* Icon Button */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-50 text-primary rounded-md">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10 sm:w-8 sm:h-8 object-cover" />
          ) : (
            <LuImage size={18} className="text-blue-600" />
          )}
        </div>

        <p className="text-[11px] sm:text-xs text-gray-700">
          {icon ? "Change" : "Pick"}
        </p>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="
          absolute left-0 top-10 
          bg-white border border-gray-300 shadow-lg rounded-xl z-50
          w-[95vw] sm:w-auto sm:min-w-[320px]
          max-w-[95vw] sm:max-w-none
        ">
          {/* Close button */}
          <button
            className="
              absolute top-1 right-1 w-6 h-6 sm:w-5 sm:h-5 
              flex items-center justify-center
              bg-white border border-gray-300 rounded-full
              z-10
            "
            onClick={() => setIsOpen(false)}
          >
            <LuX size={12} />
          </button>

          {/* Emoji Component */}
          <Suspense
            fallback={
              <div className="p-4 text-center text-sm text-gray-500">
                Loading...
              </div>
            }
          >
            <EmojiPicker
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "");
                setIsOpen(false);
              }}
              height={350}
              width="100%"
              searchDisabled={false}
              skinTonesDisabled={false}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPop;
