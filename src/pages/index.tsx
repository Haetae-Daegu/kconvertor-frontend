// import SocialLinks from '@/components/SocialLinks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AccommodationList from '@/components/AccommodationList';

export default function Main() {
  const MapNoSSR = dynamic(() => import("@/components/Map"), { ssr: false });

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] overflow-hidden">
        <Image
          src="/KMU2.jpg"
          alt="KMU Banner"
          fill
          objectFit="cover"
          priority
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Korean Convertor</h1>
        </div>
      </div>
      
      <div className="flex-1 py-10 px-4">
        <p className="text-lg font-semibold mb-4">Featured Locations</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <MapNoSSR />
          </div>
          <div className="w-full md:w-1/4 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
            <AccommodationList />
          </div>
          <div className="w-full md:w-1/4 min-h-[400px] md:min-h-[600px] border border-gray-300 rounded-lg shadow-lg p-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              
              <div className="space-y-2">
                <h3 className="font-medium">Budget mensuel</h3>
                <input type="range" className="w-full" min="300000" max="1000000" step="50000" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₩300,000</span>
                  <span>₩1,000,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Distance maximum</h3>
                <select className="w-full p-2 border rounded">
                  <option>100m</option>
                  <option>200m</option>
                  <option>500m</option>
                  <option>1km</option>
                </select>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Commodités</h3>
                <div className="space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Wifi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Meublé
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Climatisation
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
