import { useRouter } from "next/router";
import { useAccommodation } from "@/hooks/useAccommodation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import ImageSlider from "@/components/ImageSlider";
import OptionsMenu from "@/components/OptionsMenu";
import EditAccommodationModal from "@/components/EditAccommodationModal";

const AccommodationDetails = () => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { accommodation, getAccommodationById, deleteAccommodation } = useAccommodation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getAccommodationById(Number(id));
    }
  }, [id, getAccommodationById]);

  const handleDelete = async () => {
    try {
      const response = await deleteAccommodation(Number(id));
      if (response.status === 200) {
        toast.success("Accommodation deleted successfully!");
        router.push('/');
      } else {
        const errorData = response.data.message;
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the accommodation.");
    }
  };

  if (!accommodation) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="mb-4 flex items-center p-2 text-black hover:text-gray-600 text-2xl"
        >
          ←
        </button>
        
        <div className="relative inline-block text-left">
          <button 
            onClick={() => setShowOptions(!showOptions)} 
            className="mb-4 px-6 py-3 text-black hover:text-gray-600 text-2xl"
          >
            ...
          </button>

          {showOptions && (
            <OptionsMenu 
              showOptions={showOptions}
              onEdit={() => setEditModalOpen(true)}
              onArchive={() => console.log("Archive")} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </div>
      
      <ImageSlider 
        images={accommodation?.image_urls || []} 
      />
      <h1 className="text-2xl font-bold">{accommodation.title}</h1>
      <p className="text-gray-700">{accommodation.description}</p>
      <p className="text-lg font-semibold mt-2">Amenities :</p>
      <div className="grid grid-cols-2 gap-4">
        {accommodation.amenities?.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <span className="ml-2">{amenity}</span>
          </div>
        ))}
      </div>
      <p className="text-lg font-semibold mt-2">₩{accommodation.price_per_month?.toLocaleString()} / month</p>
      <p className="text-gray-600">Deposit: ₩{accommodation.security_deposit?.toLocaleString()}</p>
      <p className="text-gray-600">{accommodation.bedrooms} bed • {accommodation.bathrooms} bath</p>
      <p className="text-gray-600">Location: {accommodation.location}</p>

      <EditAccommodationModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        accommodation={accommodation} 
      />
    </div>
  );
};

export default AccommodationDetails;
