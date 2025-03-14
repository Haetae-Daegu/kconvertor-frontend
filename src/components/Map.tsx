import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React from 'react';
import { Accommodation } from '@/types/accommodation';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

interface MapProps {
  accommodations: Accommodation[];
}

const Map: React.FC<MapProps> = ({ accommodations }) => {
  const defaultPos: [number, number] = [35.85395132289147, 128.4871227258607]

  return (
    <MapContainer center={defaultPos} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="map-container">
      <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`} />

      {accommodations.map((accommodation) => (
        <Marker key={accommodation.id} position={[accommodation.latitude, accommodation.longitude]}>
          <Popup>
            <div>
              <img src={accommodation.image_urls[0]} alt={accommodation.title} style={{ width: '100%', height: 'auto' }} />
              <h3>{accommodation.title}</h3>
              <p><span>₩{accommodation.price_per_month} / month </span></p>
              <h3>{accommodation.max_guests} guests</h3>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;