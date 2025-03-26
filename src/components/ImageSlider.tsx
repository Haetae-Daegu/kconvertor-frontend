import { useState } from 'react';
import Image from 'next/image';
import { FaExpand, FaTimes } from 'react-icons/fa';
interface ImageSliderProps {
  images: string[];
  enableFullscreen?: boolean;
  thumbnailSize?: 'small' | 'medium' | 'large';
  cropMode?: 'none' | 'smart';
}

const ImageSlider = ({ 
  images, 
  enableFullscreen = true, 
  thumbnailSize = 'medium',
  cropMode = 'smart' 
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const thumbnailSizeClass = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-20 w-20'
  }[thumbnailSize];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg h-[400px]">
        <Image 
          src={images[currentIndex]} 
          alt={`Accommodation photo ${currentIndex + 1}`}
          className={`${cropMode === 'smart' ? 'object-cover' : 'object-contain'}`}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          priority={currentIndex === 0}
        />
        
        {enableFullscreen && (
          <button 
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-md"
          >
            <FaExpand />
          </button>
        )}
      </div>

      <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
        {images.map((img, id) => (
          <button 
            key={id} 
            onClick={() => setCurrentIndex(id)}
            className={`${thumbnailSizeClass} rounded-md overflow-hidden border-2 transition-all relative ${
              id === currentIndex ? 'border-blue-500 opacity-100' : 'border-transparent opacity-70'
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${id + 1}`} 
              className="object-cover"
              fill
              sizes="(max-width: 768px) 96px, 128px"
            />
          </button>
        ))}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>
          
          <div className="relative w-full h-full max-w-screen-lg max-h-screen">
            <Image 
              src={images[currentIndex]} 
              alt={`Accommodation photo ${currentIndex + 1}`}
              className="object-contain"
              fill
              sizes="100vw"
              quality={90}
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_img, id) => (
              <button 
                key={id} 
                onClick={() => setCurrentIndex(id)}
                className={`h-3 w-3 rounded-full transition-all ${
                  id === currentIndex ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;