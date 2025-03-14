import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <div className="custom-dot">
        <Image
          src={images[i]}
          alt={`Thumbnail ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
          priority
          className="object-cover rounded"
        />
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
        <div key={index} className="relative w-full h-[400px] overflow-hidden">
          <Image
            src={url}
            alt={`Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            priority
            className="object-contain"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider; 