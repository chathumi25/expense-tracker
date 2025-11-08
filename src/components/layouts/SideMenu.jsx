import React, { useContext, useState, useRef } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';
import uploadImage from '../../utils/uploadImage';
import { LuUpload, LuTrash, LuCheck } from "react-icons/lu";
import axios from 'axios';
import { BASE_URL } from '../../utils/apiPaths';

const SideMenu = ({ activeMenue }) => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [tempImage, setTempImage] = useState(user?.profileImage || '');
  const [changesMade, setChangesMade] = useState(false);
  const [actionType, setActionType] = useState(''); // 'upload' or 'delete'
  const [message, setMessage] = useState('');

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Upload image handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imgUploadRes = await uploadImage(file); // upload to server
      const imageUrl = imgUploadRes.imageUrl;
      setTempImage(imageUrl);
      setChangesMade(true);
      setActionType('upload');
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  // Delete image handler
  const handleDeleteImage = () => {
    setTempImage('');
    setChangesMade(true);
    setActionType('delete');
  };

  // Trigger hidden file input
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Save changes button
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/v1/auth/update-profile-image`, // ✅ fixed endpoint
        { imageUrl: tempImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data.user;
      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Show success message
      setMessage(actionType === 'upload' ? 'Upload successful!' : 'Delete successful!');

      // Hide Save Changes button after click
      setChangesMade(false);
      setActionType('');

      // Hide message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error("Failed to save changes:", err);
      setMessage("Error! Please try again.");
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="side-menu">
      <div className="profile-section flex flex-col items-center text-center relative">
        <div className="relative inline-block w-20 h-20">
          {tempImage ? (
            <>
              <img
                src={tempImage + `?t=${new Date().getTime()}`}
                alt="Profile"
                className="profile-image rounded-full w-full h-full object-cover"
              />
              <button
                onClick={handleDeleteImage}
                title="Delete Photo"
                className="absolute bottom-0 right-0 z-20 bg-primary text-white p-1 rounded-full hover:bg-red-500 shadow-md transition flex items-center justify-center"
              >
                <LuTrash size={13} />
              </button>
            </>
          ) : (
            <>
              <CharAvatar
                fullName={user?.fullName || 'User'}
                width="w-20"
                height="h-20"
                style="text-xl"
              />
              <button
                onClick={triggerUpload}
                title="Upload Photo"
                className="absolute bottom-0 right-0 z-20 bg-primary text-white p-1 rounded-full hover:bg-blue-700 shadow-md transition flex items-center justify-center"
              >
                {uploading ? (
                  <span className="animate-pulse text-[10px] px-1">...</span>
                ) : (
                  <LuUpload size={13} />
                )}
              </button>
            </>
          )}
        </div>

        {/* Save Changes Button */}
        {changesMade && (
          <button
            onClick={handleSaveChanges}
            className="mt-5 bg-blue-200 hover:bg-blue-300 text-primary px-2 py-1 rounded flex items-center gap-1 text-sm shadow-md transition"
          >
            <LuCheck size={12} /> Save Changes
          </button>
        )}

        {/* Success / Info Message */}
        {message && (
          <p className="mt-2 text-sm text-blue-600">{message}</p>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <h5 className="profile-name mt-2">{user?.fullName || 'User'}</h5>
        <div className="profile-divider"></div>
      </div>

      <ul className="w-full">
        {SIDE_MENU_DATA.map((item, index) => (
          <li
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              activeMenue === item.label ? 'active' : ''
            }`}
          >
            <item.icon className="text-lg" />
            <span className="text-[15px]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
