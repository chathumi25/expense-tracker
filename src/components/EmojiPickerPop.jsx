import React, { useState, Suspense } from 'react';
import { LuImage, LuX } from "react-icons/lu";

// Lazy load the heavy EmojiPicker component
const EmojiPicker = React.lazy(() => import('emoji-picker-react'));

const EmojiPickerPop = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-2 mb-2">
      {/* Icon Button */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-8 h-8 flex items-center justify-center text-lg bg-blue-50 text-primary rounded-md">
          {icon ? (
            <img src={icon} alt="Icon" className="w-8 h-8" />
          ) : (
            <LuImage size={16} />
          )}
        </div>
        <p className="text-xs">{icon ? "Change" : "Pick"}</p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="relative z-50">
          <button
            className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute top-1 right-1 cursor-pointer z-10"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={12} />
          </button>

          {/* Lazy load with Suspense */}
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <EmojiPicker
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
              height={300}   // small height
              width={520}    // wider width
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPop;
