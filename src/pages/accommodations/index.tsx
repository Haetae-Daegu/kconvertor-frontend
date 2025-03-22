import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAccommodation } from '@/hooks/useAccommodation';
import CreateAccommodationModal from '@/components/CreateAccommodationModal';
import Loading from '@/components/Loading';
import { AxiosError } from 'axios';
import { FaGhost } from 'react-icons/fa';

const MyAccommodations: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { accommodations, deleteAccommodation, getAccommodationByUser, error, isLoading } = useAccommodation();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    getAccommodationByUser();
  }, [user, router, getAccommodationByUser]);


  const handleDelete = (id: string) => {
    setAccommodationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!accommodationToDelete) return;
    
    try {
      await deleteAccommodation(Number(accommodationToDelete));
      toast.success('Accommodation successfully deleted');
      setShowDeleteModal(false);
      setAccommodationToDelete(null);
    } catch (error: unknown) {
      const err = error as AxiosError;
      toast.error(err.message || 'Error while deleting');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAccommodationToDelete(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px]">
        <FaGhost className="w-16 h-16 mb-2 animate-bounce" />
        <p className="text-red-500">There was an error loading the data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Accommodations</h1>
      
      {accommodations.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="mb-4">You don't have any accommodations yet.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Create an accommodation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => (
            <div 
              key={accommodation.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <div 
                className="cursor-pointer" 
                onClick={() => router.push(`/accommodation/${accommodation.id}`)}
              >
                <div className="h-48 relative">
                  <Image 
                    src={accommodation.image_urls[0] || '/placeholder-accommodation.jpg'} 
                    alt={accommodation.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{accommodation.title}</h3>
                  <p className="text-gray-600 mt-1">{accommodation.location}</p>
                  <p className="text-gray-800 font-medium mt-2">{accommodation.price_per_month} Wons per month</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(accommodation.id.toString())}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                aria-label="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <CreateAccommodationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this accommodation? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccommodations; 