import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapPicker.module.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ChangeView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 17, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
}

function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  return null;
}

const MapPicker = ({ position, onLocationSelect }) => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[24.8607, 67.0011]}
        zoom={12}
        className={styles.map}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onLocationSelect={onLocationSelect} />

        {position && (
          <>
            <Marker position={[position.lat, position.lng]} />
            <ChangeView position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPicker;