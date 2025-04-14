import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAccommodation } from "@/hooks/useAccommodation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

import ImageSlider from "@/components/ImageSlider";
import OptionsMenu from "@/components/OptionsMenu";
import EditAccommodationModal from "@/components/EditAccommodationModal";
import AccommodationToggleStatus from "@/components/AccommodationToggleStatus";
import ContactHostPanel from "@/components/ContactHostPanel";
import Loading from "@/components/Loading";
import CongratulationsModal from "@/components/CongratulationsModal";

import { FaTv, FaSnowflake, FaBed, FaDesktop, FaUtensils, FaCouch, FaWifi, FaDoorOpen, FaBook } from 'react-icons/fa';
import { MdMicrowave } from "react-icons/md";
import { RiFridgeFill } from "react-icons/ri";
import { LuWashingMachine } from "react-icons/lu";
import { isOwner } from '@/utils/authUtils';
import { User } from "@/types/user";
import { useUser } from "@/hooks/useUser";

const AMENITIES = [
  { name: "TV", icon: <FaTv /> },
  { name: "Washing Machine", icon: <LuWashingMachine /> },
  { name: "Refrigerator", icon: <RiFridgeFill /> },
  { name: "Air Conditioning", icon: <FaSnowflake /> },
  { name: "Microwave", icon: <MdMicrowave /> },
  { name: "Super Single Beds", icon: <FaBed /> },
  { name: "Desk", icon: <FaDesktop /> },
  { name: "Balcony", icon: <FaDoorOpen/> },
  { name: "Kitchen", icon: <FaUtensils /> },
  { name: "Living Room", icon: <FaCouch /> },
  { name: "Internet", icon: <FaWifi /> },
  { name: "Air Conditioner", icon: <FaSnowflake /> },
];

const AccommodationDetails = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { accommodation, getAccommodationById, deleteAccommodation, updateAccommodationStatus } = useAccommodation();
  const { getUserById } = useUser();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const MapNoSSR = dynamic(() => import("@/components/Map"), { ssr: false });
  const [hostInfo, setHostInfo] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getAccommodationById(Number(id)).then(() => {
        setIsLoading(false);
      });
    }
  }, [id, getAccommodationById]);

  useEffect(() => {
    if (accommodation && accommodation.host_id) {
      getUserById(accommodation.host_id).then(data => {
        setHostInfo(data);
      });
    }
  }, [accommodation, getUserById]);

  if (isLoading) return <Loading />;

  const handleDelete = async () => {
    try {
      const response = await deleteAccommodation(Number(id));
      if (response.status === 200) {
        router.push('/');
        toast.success("Accommodation deleted successfully!");
      } else {
        const errorData = response.data.message;
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      toast.error("An error occurred while deleting the accommodation.");
    }
  };

  const handleStatusChange = async (newStatus: "hidden" | "active" | "booked") => {
    try {
      if (id) {
        await updateAccommodationStatus(Number(id), newStatus);
        if (newStatus === "booked") {
          setShowCongratulations(true);
        }
        toast.success(`Status updated successfully !`);
      }
    } catch {
      toast.error("Error updating accommodation status.");
    }
  };

  if (!accommodation) return <Loading />;

  return (
    <>
    <div className="container mx-auto p-4 overflow-auto">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="mb-4 flex items-center p-2 text-black hover:text-gray-600 text-2xl"
        >
          ←
        </button>
        
        {accommodation && isOwner(accommodation.host_id) && (
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
                onDelete={handleDelete} 
              />
            )}
          </div>
        )}
      </div>
      <EditAccommodationModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        accommodation={accommodation}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-5xl font-bold mb-4">{accommodation.title}</h1>
          
          <ImageSlider 
            images={accommodation?.image_urls || []}
            enableFullscreen={true}
            thumbnailSize="medium"
            cropMode="smart"
          />
          {isOwner(accommodation.host_id) && (
            <AccommodationToggleStatus 
              accommodation={accommodation}
              onStatusChange={handleStatusChange}
            />
          )}
          <div className="mt-10">
            <h1 className="text-3xl font-bold mt-2 mb-4 border-b border-gray-300">Description</h1>
            <div className="whitespace-pre-line mt-4 text-gray-700">
              {accommodation?.description}
            </div>
            <h1 className="text-3xl font-bold mt-2 mb-4 border-b border-gray-300">House Rules</h1>
            <div className="whitespace-pre-line mt-4 text-gray-700">
              {accommodation?.house_rules}
            </div>
            <h1 className="text-3xl font-semibold mt-4 mb-4 border-b border-gray-300">Facilities</h1>
            <div className="grid grid-cols-2 gap-4">
              {AMENITIES.filter(amenity => accommodation.amenities?.includes(amenity.name)).map((amenity, index) => (
                <div key={index} className="flex items-center">
                  {amenity.icon}
                  <span className="ml-2">{amenity.name}</span>
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-semibold mt-4 mb-4 border-b border-gray-300">Pricing</h1>
            <p className="text-lg font-semibold mt-2">₩{accommodation.price_per_month?.toLocaleString()} / month</p>
            <p className="text-gray-600">Deposit: ₩{accommodation.security_deposit?.toLocaleString()}</p>
            <p className="text-gray-600">{accommodation.bedrooms} bed • {accommodation.bathrooms} bath</p>
            <p className="text-gray-600">Location: {accommodation.location}</p>
            <h1 className="text-2xl font-bold mt-4 mb-4 border-b border-gray-300">MAP</h1>
            <div className="w-full h-[500px] mt-1 ml-0">
              <MapNoSSR accommodations={[accommodation]} defaultPos={[accommodation.latitude, accommodation.longitude]} />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <ContactHostPanel 
            hostInfo={hostInfo} 
            accommodation={accommodation}
          />
        </div>
      </div>
    </div>

    <CongratulationsModal
      isOpen={showCongratulations}
      onClose={() => setShowCongratulations(false)}
      message="Your accommodation has been successfully marked as booked! 🎉 Thank you for using our platform!"
      icon={<FaBook />}
    />
    </>
  );
};

export default AccommodationDetails;
