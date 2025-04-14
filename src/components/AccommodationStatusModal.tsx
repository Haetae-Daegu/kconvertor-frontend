import React from 'react';
import { FaBook, FaUserSecret, FaSun } from 'react-icons/fa';
import { Accommodation } from '@/types/accommodation';

interface AccommodationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation: Accommodation;
  onStatusChange: (newStatus: "hidden" | "active" | "booked") => void;
}

const AccommodationStatusModal: React.FC<AccommodationStatusModalProps> = ({ isOpen, onClose, accommodation, onStatusChange }) => {
  if (!isOpen) return null;

  const statusOptions = [
    {
      status: "booked" as const,
      icon: <FaBook className="text-4xl text-green-500" />,
      message: "Did you find anyone for booking your apartment? Congratulations!",
      hoverColor: "hover:bg-green-100",
    },
    {
      status: "hidden" as const,
      icon: <FaUserSecret className="text-4xl text-gray-500" />,
      message: "You can hide your accommodation for later visibility",
      hoverColor: "hover:bg-gray-100",
    },
    {
      status: "active" as const,
      icon: <FaSun className="text-4xl text-yellow-500" />,
      message: "Your accommodation is available! Show it to everyone!",
      hoverColor: "hover:bg-yellow-100",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Change Accommodation Status</h2>
          
          <div className="space-y-4">
            {statusOptions.map((option) => (
              <div 
                key={option.status}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${option.hoverColor} ${
                  accommodation.status === option.status ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => onStatusChange(option.status)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{option.status}</p>
                    <p className="text-sm text-gray-600">{option.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccommodationStatusModal; 