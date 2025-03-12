import { useRouter } from "next/router";
import Image from "next/image";
import { useAccommodation } from "@/hooks/useAccommodation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const AccommodationDetails = () => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { accommodation, getAccommodationById, deleteAccommodation } = useAccommodation();

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
            <div className={`absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition-all duration-300 transform ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              <div className="py-1">
                <button 
                  onClick={() => {/* Logic to edit the accommodation */}} 
                  className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </button>
                <hr className="border-gray-300" />
                <button 
                  onClick={() => {/* Logic to archive the accommodation */}} 
                  className="block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                >
                  Archive
                </button>
                <hr className="border-gray-300" />
                <button 
                  onClick={handleDelete} 
                  className="block px-4 py-2 bg-red-500 text-white hover:bg-red-600 w-full text-left"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <h1 className="text-2xl font-bold">{accommodation.title}</h1>
      <Image
        width={600}
        height={400}
        src={accommodation?.image_urls?.[0] || "/default.jpg"}
        alt={accommodation.title}
        className="rounded-lg my-4"
      />
      <p className="text-gray-700">{accommodation.description}</p>
      <p className="text-lg font-semibold mt-2">Amenities :</p>
      <div className="grid grid-cols-2 gap-4">
        {accommodation.amenities?.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">
              <i className="fa-solid fa-check"></i>
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      <p className="text-lg font-semibold mt-2">₩{accommodation.price_per_month?.toLocaleString()} / month</p>
      <p className="text-gray-600">Deposit: ₩{accommodation.security_deposit?.toLocaleString()}</p>
      <p className="text-gray-600">{accommodation.bedrooms} bed • {accommodation.bathrooms} bath</p>
      <p className="text-gray-600">Location: {accommodation.location}</p>
    </div>
  );
};

export default AccommodationDetails;
