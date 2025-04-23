import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useAccommodation } from '@/hooks/useAccommodation';
import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';


const AMENITIES = [
  "TV", "Washing Machine", "Refrigerator", "Air Conditioning", "Microwave",
  "Super Single Beds", "Desk", "Balcony", "Kitchen", "Living Room", "Internet"
];

const EditAccommodationModal = ({ isOpen, onClose, accommodation }: { isOpen: boolean; onClose: () => void; accommodation: Accommodation }) => {
  const maxImages = 8;
  const minImages = 2;
  const { updateAccommodation } = useAccommodation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: accommodation.title,
    description: accommodation.description,
    price_per_month: accommodation.price_per_month,
    security_deposit: accommodation.security_deposit,
    location: accommodation.location,
    bedrooms: accommodation.bedrooms,
    bathrooms: accommodation.bathrooms,
    max_guests: accommodation.max_guests,
    minimum_stay: accommodation.minimum_stay,
    house_rules: accommodation.house_rules,
    latitude: accommodation.latitude,
    longitude: accommodation.longitude,
  });

  const [amenities, setAmenities] = useState<string[]>(accommodation.amenities);
  const [imageUrls, setImageUrls] = useState<string[]>(accommodation.image_urls);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      images.map((image) => {
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
        latitude: formData.latitude,
        longitude: formData.longitude,
        amenities: amenities,
        image_urls: imageUrls.filter(url => !url.startsWith('blob:'))
      };

      formDataToSend.append('data', JSON.stringify(accommodationData));

      await updateAccommodation(accommodation.id, formDataToSend);

      toast.success('Accommodation updated successfully!');
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Failed to update accommodation:', error);
      toast.error('Failed to update accommodation');
    }
  };

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...selectedFiles]);
      
      const newImageUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
      
      if (fileInputRef.current)
        fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    if (imageUrls[index].startsWith('blob:')) {
      const blobUrl = imageUrls[index];
      const fileIndex = Array.from(images).findIndex(
        file => URL.createObjectURL(file) === blobUrl
      );
      
      if (fileIndex !== -1) {
        const newImages = [...images];
        newImages.splice(fileIndex, 1);
        setImages(newImages);
      }
    }    
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 transform transition-all">
          <h2 className="text-2xl font-semibold mb-6">Edit Accommodation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  maxLength={200}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  maxLength={200}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Price (₩)</label>
                <input
                  type="number"
                  name="price_per_month"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.price_per_month}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Security Deposit (₩)</label>
                <input
                  type="number"
                  name="security_deposit"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.security_deposit}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Guests</label>
                <input
                  type="number"
                  name="max_guests"
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.max_guests}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Stay (nights)</label>
                <input
                  type="number"
                  name="minimum_stay"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.minimum_stay}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                name="description"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={handleChange}
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
                          setAmenities(amenities.filter(a => a !== amenity));
                        }
                      }}
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Minimum {minImages}, Maximum {maxImages})
              </label>
              <div className="mt-1 flex flex-col gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  id="images"
                  disabled={imageUrls.length >= maxImages}
                />
                <label
                  htmlFor="images"
                  className={`cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                    ${imageUrls.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add Images
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {imageUrls.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                        width={128}
                        height={128}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccommodationModal; 