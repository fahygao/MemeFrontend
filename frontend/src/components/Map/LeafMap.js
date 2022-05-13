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
        <Popup>@Fahygaof 在这里留过言哦～</Popup>
      </Marker>
      <Marker position={[40.7303, -73.9953]}>
        <Popup>@Eric 在这里留过言哦～</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafMap;
