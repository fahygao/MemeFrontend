import React, { useContext } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "./LeafMap.css";
import AuthContext from "../../context/AuthContext";
// import markerIcon from "./../../images/markerIcon.png";
import customIcon from "./../../images/markerIcon.png";
// import orangeIcon from "./../../images/location_orange.svg";

const LeafMap = (props) => {
  let { coordinates, zoom } = useContext(AuthContext);

  const DefaultIcon = L.icon({
    iconUrl: customIcon,
    iconSize: new L.Point(20, 20),
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const not_anom = (name) => {
    return "@" + name;
  };
  const niming = "某人";
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=997c57ab-80a0-4272-b23a-bee94473850b"
      />
      {/* {console.log(props.items)} */}
      {props.items.map((story) => {
        // console.log(story);
        if (story.lat != null) {
          const lat = parseFloat(story.lat);
          const lon = parseFloat(story.lon);
          //   console.log(lat);

          return (
            <Marker id={story} key={story.id} position={[lat, lon]}>
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
