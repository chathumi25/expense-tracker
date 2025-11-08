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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imgUploadRes = await uploadImage(file);
      const imageUrl = imgUploadRes.imageUrl;

      setTempImage(imageUrl);
      setChangesMade(true);
      setActionType('upload');
    } catch (err) {
      console.error('Image upload failed:', err);
      setMessage("Upload failed! Please try again.");
      setTimeout(() => setMessage(''), 2000);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setTempImage('');
    setChangesMade(true);
    setActionType('delete');
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/auth/update-profile-image`,
        { imageUrl: tempImage || null }, // send null if deleted
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data.user;

      // Update context and localStorage
      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Show success message
      setMessage(actionType === 'upload' ? 'Upload successful!' : 'Delete successful!');

      // Sync tempImage with backend user profileImage
      setTempImage(updatedUser.profileImage || '');

      // Hide Save Changes button
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
                className="absolute bottom-0 right-0 z-20 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-500 shadow-md transition flex items-center justify-center"
              >
                <LuTrash size={12} />
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
                className="absolute bottom-0 right-0 z-20 bg-blue-900 text-white p-1.5 rounded-full hover:bg-blue-700 shadow-md transition flex items-center justify-center"
              >
                {uploading ? (
                  <span className="animate-pulse text-[10px] px-1">...</span>
                ) : (
                  <LuUpload size={12} />
                )}
              </button>
            </>
          )}
        </div>

        {/* Save Changes Button */}
        {changesMade && (
          <button
            onClick={handleSaveChanges}
            className="mt-3 bg-blue-200 hover:bg-blue-300 text-primary px-3 py-1 rounded-md flex items-center gap-1 shadow-sm text-sm"
          >
            <LuCheck size={12} /> Save
          </button>
        )}

        {/* Success / Info Message */}
        {message && (
          <p className="mt-2 text-xs text-green-600">{message}</p>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <h5 className="profile-name mt-2 text-sm font-medium">{user?.fullName || 'User'}</h5>
        <div className="profile-divider mt-2"></div>
      </div>

      <ul className="w-full mt-3">
        {SIDE_MENU_DATA.map((item, index) => (
          <li
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeMenue === item.label ? 'active' : ''
            }`}
          >
            <item.icon className="text-lg" />
            <span className="text-[14px]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
