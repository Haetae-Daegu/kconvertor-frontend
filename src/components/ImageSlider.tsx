import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
  defaultImage?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, defaultImage }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
          <div key={index} className="relative w-full h-[400px] bg-black overflow-hidden">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              layout="fill"
              className="object-contain"
            />
          </div>
        ))}
    </Slider>
  );
};

export default ImageSlider; 