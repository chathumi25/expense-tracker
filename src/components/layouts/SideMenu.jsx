import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar'; 

const SideMenu = ({ activeMenue }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="side-menu">
      {/* === Profile Section === */}
      <div className="profile-section">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || 'User'}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="profile-name">{user?.fullName || 'User'}</h5>
        <div className="profile-divider"></div>
      </div>

      {/* === Menu List === */}
      <ul>
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
