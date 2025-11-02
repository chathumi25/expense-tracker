// CharAvatar.jsx
import React from 'react';

const CharAvatar = ({
  fullName = 'User',
  size = 90, // matches your .profile-image / .profile-placeholder size
  fontSize = 24, // roughly matches text-2xl
}) => {
  // Get initials from fullName
  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map((n) => n[0].toUpperCase()).join('');
    return initials.slice(0, 2); // Max 2 letters
  };

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${fontSize}px`,
        color: 'rgba(20, 70, 200, 0.85)',
        fontWeight: '700',
        boxShadow: '0 0 10px rgba(37, 99, 235, 0.15)',
        border: '3px solid rgba(38, 34, 90)',
        transition: 'all 0.3s ease-in-out',
      }}
      className="hover:scale-105 hover:shadow-lg"
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
