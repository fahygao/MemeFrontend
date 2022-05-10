import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./LeafMap.css";

const LeafMap = () => {
  return (
    <MapContainer center={[40.7294, -73.9972]} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.7294, -73.9972]}>
        <Popup>@Fahy 在这里留过言哦～</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafMap;
