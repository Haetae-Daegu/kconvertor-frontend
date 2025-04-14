import React from 'react';
import CelebrationEffect from './CelebrationEffect';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  icon: React.ReactNode;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({isOpen, onClose, message, icon}) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <CelebrationEffect isActive={isOpen} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl text-green-500">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Congratulations!
          </h2>
          <p className="text-center text-gray-600">
            {message}
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal; 