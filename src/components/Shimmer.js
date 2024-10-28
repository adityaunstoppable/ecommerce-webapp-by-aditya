// src/components/Shimmer.js
import React from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-56 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="flex items-center">
          <div className="h-5 w-5 bg-gray-300 rounded-full mr-1"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
      <div className="w-full bg-gray-300 h-10 rounded"></div>
    </div>
  );
};

export default Shimmer;
