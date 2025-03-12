import { useRouter } from "next/router";
import Image from "next/image";
import { useAccommodation } from "@/hooks/useAccommodation";
import { useEffect } from "react";

const AccommodationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { accommodation, getAccommodationById } = useAccommodation();

  useEffect(() => {
    if (id) {
      getAccommodationById(Number(id));
    }
  }, [id, getAccommodationById]);

  if (!accommodation) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => router.back()} 
        className="mb-4 flex items-center p-2 text-black hover:text-gray-600 text-2xl"
      >
        ←
      </button>
      <h1 className="text-2xl font-bold">{accommodation.title}</h1>
      <Image
        width={600}
        height={400}
        src={accommodation?.image_urls?.[0] || "/default.jpg"}
        alt={accommodation.title}
        className="rounded-lg my-4"
      />
      <p className="text-gray-700">{accommodation.description}</p>
      <p className="text-lg font-semibold mt-2">₩{accommodation.price_per_month?.toLocaleString()} / month</p>
      <p className="text-gray-600">Deposit: ₩{accommodation.security_deposit?.toLocaleString()}</p>
      <p className="text-gray-600">{accommodation.bedrooms} bed • {accommodation.bathrooms} bath</p>
      <p className="text-gray-600">Location: {accommodation.location}</p>
    </div>
  );
};

export default AccommodationDetails;
