import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN


const Map = () => {
  const defaultPos: [number, number] = [35.85395132289147, 128.4871227258607]
  return (
    <MapContainer center={defaultPos} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="map-container">
      <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`} />
    </MapContainer>
  );
};

export default Map;