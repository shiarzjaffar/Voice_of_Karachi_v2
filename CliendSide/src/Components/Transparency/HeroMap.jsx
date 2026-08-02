import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

import styles from "./HeroMap.module.css";

const KARACHI = [24.8607, 67.0011];

const MapController = ({ selectedArea }) => {
  const map = useMap();

  useEffect(() => {

    if (!selectedArea) {
      map.flyTo(KARACHI, 11);
      return;
    }

    map.flyTo(
      [selectedArea.lat, selectedArea.lng],
      14
    );

  }, [selectedArea, map]);

  return null;
};

const HeatLayer = ({ heatmapData }) => {

  const map = useMap();

  useEffect(() => {

    if (!heatmapData.length) return;

    const points = heatmapData.map(point => [
      point.lat,
      point.lng,
      point.intensity || 1,
    ]);

    const heat = L.heatLayer(points, {
      radius: 35,
      blur: 30,
      maxZoom: 17,
      minOpacity: 0.35,
      max: 1.0,
      gradient: {
        0.2: "#22c55e",
        0.4: "#84cc16",
        0.6: "#eab308",
        0.8: "#f97316",
        1.0: "#ef4444",
      },
    });

    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };

  }, [map, heatmapData]);

  return null;
};

export default function HeroMap({
  heatmapData = [],
  selectedArea,
}) {

  return (

    <section className={styles.container}>

      <div className={styles.overlay}>
        <h1>Transparency Center</h1>
        <p>Live Civic Situation Across Karachi</p>
        <span>Updated Just Now</span>
      </div>

      <MapContainer
        center={KARACHI}
        zoom={11}
        className={styles.map}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          selectedArea={selectedArea}
        />

        <HeatLayer
          heatmapData={heatmapData}
        />

      </MapContainer>

    </section>

  );

}