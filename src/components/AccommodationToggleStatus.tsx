import React, { useState } from 'react';
import { FaBook, FaUserSecret, FaSun } from "react-icons/fa";
import { Accommodation } from '@/types/accommodation';
import AccommodationStatusModal from './AccommodationStatusModal';

interface AccommodationToggleStatusProps {
  accommodation: Accommodation;
  onStatusChange: (newStatus: "hidden" | "active" | "booked") => void;
}

const AccommodationToggleStatus: React.FC<AccommodationToggleStatusProps> = ({ 
  accommodation,
  onStatusChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'booked':
        return {
          icon: <FaBook className="text-xl" />,
          text: "Booked",
          color: "bg-green-100 text-green-800 border-green-300",
          hoverColor: "hover:bg-green-200"
        };
      case 'hidden':
        return {
          icon: <FaUserSecret className="text-xl" />,
          text: "Hidden",
          color: "bg-gray-100 text-gray-800 border-gray-300",
          hoverColor: "hover:bg-gray-200"
        };
      case 'active':
        return {
          icon: <FaSun className="text-xl" />,
          text: "Available",
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          hoverColor: "hover:bg-yellow-200"
        };
      default:
        return {
          icon: <FaUserSecret className="text-xl" />,
          text: "Hidden",
          color: "bg-gray-100 text-gray-800 border-gray-300",
          hoverColor: "hover:bg-gray-200"
        };
    }
  };

  const statusInfo = getStatusInfo(accommodation.status);

  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${statusInfo.color} ${statusInfo.hoverColor} transition-colors`}
      >
        {statusInfo.icon}
        <span>{statusInfo.text}</span>
        <span className="text-xs ml-2">(Click to change)</span>
      </button>

      <AccommodationStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accommodation={accommodation}
        onStatusChange={(newStatus) => {
          onStatusChange(newStatus);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default AccommodationToggleStatus;