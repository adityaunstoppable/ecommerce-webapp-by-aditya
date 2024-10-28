import React from 'react';

const Toast = ({ message, type, onClose }) => {
  const backgroundColor = type === 'success' ? 'bg-green-200' : 'bg-red-400'; // Light green for success, light red for error
  const textColor = type === 'success' ? 'text-black' : 'text-white'; // Black text for success, white for error

  return (
    <div className={`px-6 py-4 rounded shadow-md relative ${backgroundColor} ${textColor}`}>
      <div>{message}</div>
      <button className="absolute top-1 right-1 text-gray-600" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
