import React from 'react';

interface OptionsMenuProps {
  showOptions: boolean;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ showOptions, onEdit, onArchive, onDelete }) => {
  return (
    <div className={`absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition-all duration-300 transform ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
      <div className="py-1">
        <button 
          onClick={onEdit} 
          className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
        >
          Edit
        </button>
        <hr className="border-gray-300" />
        <button 
          onClick={onArchive} 
          className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
        >
          Archive
        </button>
        <hr className="border-gray-300" />
        <button 
          onClick={onDelete} 
          className="block px-4 py-2 bg-red-500 text-white hover:bg-red-600 w-full text-left"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OptionsMenu; 