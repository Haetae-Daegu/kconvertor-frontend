
import React from 'react';

const Loading = () => {
    return (
    <div className="grid grid-cols-1 gap-4 w-full mx-auto h-[400px] md:h-[600px] overflow-y-auto p-2">
      {[1, 2, 3].map((index) => (
      <div 
        key={index} 
        className="bg-white rounded-lg shadow-sm animate-pulse"
        style={{ 
          animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationDelay: `${index * 0.2}s` 
        }}
      >
        <div className="relative h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        <div className="p-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 mb-2 animate-shimmer"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gradien    t-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-shimmer"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/3 animate-shimmer"></div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Loading;