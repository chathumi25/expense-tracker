import React, { useState, useRef, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Keep previewUrl in sync with `image` and cleanup object URLs
  useEffect(() => {
    if (image) {
      // if image is already a URL string (e.g., editing existing profile), use it.
      const isString = typeof image === "string";
      const preview = isString ? image : URL.createObjectURL(image);
      setPreviewUrl(preview);

      return () => {
        if (!isString) {
          URL.revokeObjectURL(preview);
        }
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // update the image state
      setImage(file);
      // preview handled in useEffect
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div
          className='relative w-20 h-20 rounded-full bg-[#a9c6f5] flex flex-col justify-center items-center cursor-pointer'
          onClick={onChooseFile}
        >
          <LuUser size={30} className='text-primary item-center justify-center ' />
          

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center absolute bottom-0 right-0  bg-primary text #a9c6f5 p-1 rounded-full'
            onClick={onChooseFile}
          >
            <LuUpload size={12} className='text-white' />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewUrl}
            alt="Profile photo"
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white  absolute bottom-0 right-0 bg-red-500 p-1 rounded-full'
            onClick={handleRemoveImage}
          >
            <LuTrash size={12} className='text-white' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
