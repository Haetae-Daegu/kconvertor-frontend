import React from "react";
import Image from 'next/image';
import appart from "public/appart.jpg";
import appart2 from "public/appart2.jpg";
import appart3 from "public/appart3.png";

const apartments = [
  {
    id: 1,
    name: "IVYHOUSE",
    dailyPrice: "₩20,000 - ₩25,000 / day",
    monthlyPrice: "₩320,000 - ₩480,000 / month",
    distance: "162m from Main Gate",
    image: appart,
  },
  {
    id: 2,
    name: "Goodstay",
    dailyPrice: "₩20,000 / day",
    monthlyPrice: "₩450,000 / month",
    distance: "173m from East Gate",
    image: appart2,
  },
  {
    id: 3,
    name: "One Room Goshiwon",
    dailyPrice: "₩55,000 / day",
    monthlyPrice: "₩500,000 - ₩700,000 / month",
    distance: "236m from east Gate",
    image: appart3,
  },
  {
    id: 3,
    name: "One Room Goshiwon",
    dailyPrice: "₩55,000 / day",
    monthlyPrice: "₩500,000 - ₩700,000 / month",
    distance: "236m from east Gate",
    image: appart3,
  },
  {
    id: 4,
    name: "One Room Goshiwon",
    dailyPrice: "₩55,000 / day",
    monthlyPrice: "₩500,000 - ₩700,000 / month",
    distance: "236m from east Gate",
    image: appart3,
  },
  {
    id: 5,
    name: "One Room Goshiwon",
    dailyPrice: "₩55,000 / day",
    monthlyPrice: "₩500,000 - ₩700,000 / month",
    distance: "236m from east Gate",
    image: appart3,
  },
];

const ApartmentList = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto h-[400px] md:h-[600px] overflow-y-auto p-4">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="bg-white rounded-lg shadow p-4 ">
            <Image
              src={apartment.image}
              alt={apartment.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{apartment.name}</h3>
                <p className="text-sm text-gray-600">{apartment.monthlyPrice}</p>
                <p className="text-xs text-gray-500">{apartment.distance}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{apartment.dailyPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ApartmentList;
