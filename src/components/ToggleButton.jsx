import React from "react";

const ToggleButton = ({ isVisible, onToggle, className = "" }) => {
  return (
    <button
      className={`rounded-lg bg-blue-500 p-2 hover:bg-gray-300 ${className}`}
      onClick={onToggle}
    >
      {isVisible ? "-" : "+"}
    </button>
  );
};

export default ToggleButton;
