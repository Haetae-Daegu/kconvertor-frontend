import { useState } from 'react';
import { useAccommodation } from '@/hooks/useAccommodation';
import { toast } from 'react-hot-toast';

const AMENITIES = [
  "TV", "Washing Machine", "Refrigerator", "Air Conditioning", "Microwave",
  "Super Single Beds", "Desk", "Balcony", "Kitchen", "Living Room", "Internet"
];

const demoData = {
  title: "Keimyung Sharehouse - Room Test",
  description: "Cozy room with Fully furnished and So nice location! Since 2015 many french students stayed here every year. Features kitchen, livingroom and balcony.",
  price_per_month: "800000",
  security_deposit: "6000000",
  location: "Keimyung, Daegu, South Korea",
  bedrooms: "2",
  bathrooms: "1",
  max_guests: "3",
  minimum_stay: "1",
  house_rules: "Direct contract with landlord. NO AGENCY FEE. Utilities not included",
  latitude: "35.8714",
  longitude: "128.6014",
};

const CreateAccommodationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { createAccommodation } = useAccommodation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_month: '',
    security_deposit: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    max_guests: '',
    minimum_stay: '1',
    house_rules: '',
    latitude: '',
    longitude: '',
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const maxImages = 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Creating accommodation...');
    
    try {
      const formDataToSend = new FormData();
      
      images.map((image) => {
        console.log('Adding image:', image.name, image.type);
        formDataToSend.append('images[]', image, image.name);
      });

      const accommodationData = {
        title: formData.title,
        description: formData.description,
        price_per_month: Number(formData.price_per_month),
        security_deposit: Number(formData.security_deposit) || 0,
        location: formData.location,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms), 
        max_guests: Number(formData.max_guests),
        minimum_stay: Number(formData.minimum_stay),
        house_rules: formData.house_rules,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        amenities: amenities
      };

      formDataToSend.append('data', JSON.stringify(accommodationData));

      console.log('FormData content:');
      Array.from(formDataToSend.entries()).map(([key, value]) => 
        console.log(key, value)
      );

      await createAccommodation(formDataToSend);
      toast.success('Accommodation created successfully!', {
        id: loadingToast,
      });
      setFormData({
        title: '',
        description: '',
        price_per_month: '',
        security_deposit: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        max_guests: '',
        minimum_stay: '1',
        house_rules: '',
        latitude: '',
        longitude: '',
      });
      setAmenities([]);
      setImages([]);
      onClose();

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error('Failed to create accommodation', {
        id: loadingToast,
      });
      console.error('Failed to create accommodation:', error);
    }
  };

  const fillDemoData = () => {
    setFormData(demoData);
    setAmenities(["TV", "Washing Machine", "Internet", "Air Conditioning"]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create New Listing</h2>
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={fillDemoData}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                Fill Demo Data
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  maxLength={200}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  maxLength={200}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Price (₩)</label>
                <input
                  type="number"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.price_per_month}
                  onChange={(e) => setFormData({...formData, price_per_month: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Security Deposit (₩)</label>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.security_deposit}
                  onChange={(e) => setFormData({...formData, security_deposit: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Guests</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.max_guests}
                  onChange={(e) => setFormData({...formData, max_guests: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Stay (nights)</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.minimum_stay}
                  onChange={(e) => setFormData({...formData, minimum_stay: e.target.value})}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">House Rules</label>
              <textarea
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.house_rules}
                onChange={(e) => setFormData({...formData, house_rules: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAmenities([...amenities, amenity]);
                        } else {
                          setAmenities(amenities.filter(a => a != amenity));
                        }
                      }}
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Maximum {maxImages})
              </label>
              <div className="mt-1 flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                  disabled={images.length >= maxImages}
                />
                <label
                  htmlFor="images"
                  className={`cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                    ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Images
                </label>
                
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccommodationModal;