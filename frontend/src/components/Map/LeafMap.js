import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "./LeafMap.css";
// import markerIcon from "./../../images/markerIcon.png";
import customIcon from "./../../images/markerIcon.png";

const LeafMap = (props) => {
  const LeafIcon = L.Icon.extend({
    options: { iconSize: [19, 30] },
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "https://www.clipartmax.com/png/full/114-1148546_base-marker-gps-location-map-map-marker-marker-icon.png",
    }),
    purpleIcon = new LeafIcon({
      iconUrl:
        "https://www.clipartmax.com/png/full/342-3426684_location-pointer-location-pointer-purple.png",
    });

  //  Use the state hook:
  const [icon, setIcon] = useState(purpleIcon);

  const not_anom = (name) => {
    return "@" + name;
  };
  const niming = "某人";
  return (
    <MapContainer center={[40.7294, -73.9972]} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=997c57ab-80a0-4272-b23a-bee94473850b"
      />

      {/* {console.log(props.items)} */}
      {props.items.map((story) => {
        // console.log(story);
        if (story.lat != null) {
          const lat = parseFloat(story.lat);
          const lon = parseFloat(story.lon);
          //   console.log(lat);

          return (
            <Marker id={story} key={story.id} position={[lat, lon]} icon={icon}>
              <Popup>
                {!story.anonymous && not_anom(story.username)}{" "}
                {story.anonymous && niming}
                在这有故事～
              </Popup>
            </Marker>
          );
        }
      })}
    </MapContainer>
  );
};

export default LeafMap;
