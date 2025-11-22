import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from "react-icons/lu";

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
        <div className="relative">
          <button
            className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute top-1 right-1 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={12} />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            
            /** 👇 WIDER WIDTH, SAME HEIGHT */
            height={300}       // small height stays
            width={520}        // increased width
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPop;
