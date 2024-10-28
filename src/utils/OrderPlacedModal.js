import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ y: '-100vh', opacity: 0 }} 
        animate={{ y: '0', opacity: 1 }} 
        exit={{ y: '100vh', opacity: 0 }} 
        className="bg-white p-6 rounded shadow-lg w-1/3"
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
