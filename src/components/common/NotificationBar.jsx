import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const NotificationBar = ({ notification, onClose }) => {
  if (!notification.message) return null;

  let bgColor, textColor, IconCmp;
  switch (notification.type) {
    case 'success': 
      bgColor = 'bg-green-500'; 
      textColor = 'text-white'; 
      IconCmp = CheckCircle; 
      break;
    case 'error': 
      bgColor = 'bg-red-500'; 
      textColor = 'text-white'; 
      IconCmp = XCircle; 
      break;
    case 'warning': 
      bgColor = 'bg-yellow-500'; 
      textColor = 'text-black'; 
      IconCmp = AlertCircle; 
      break;
    default: 
      bgColor = 'bg-blue-500'; 
      textColor = 'text-white'; 
      IconCmp = AlertCircle; 
      break; 
  }

  return (
    <div className={`fixed top-4 right-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg z-[100] flex items-center animate-fadeIn`}>
      <IconCmp size={24} className="mr-2" />
      <span>{notification.message}</span>
      <button 
        onClick={onClose} 
        className="ml-4 text-xl font-bold hover:opacity-75"
      >
        &times;
      </button>
    </div>
  );
};

export default NotificationBar;