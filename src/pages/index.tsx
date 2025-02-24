import SocialLinks from '@/components/SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import KMU2 from '@/assets/KMU2.jpg'; // Import de l'image
import CurrencyChart from './chart/chart';
import Convert from './currency/convert';

export default function Main() {
  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <Image
          src={KMU2}
          alt="KMU Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold">Korean Convertor</h1>
          <p className="mt-2 text-lg">Convertissez facilement vos devises</p>
          <div className="mt-4 w-80 sm:w-96">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SocialLinks />
            <Convert />
            <CurrencyChart />
        </div>
      </div>
    </div>
  );
}
