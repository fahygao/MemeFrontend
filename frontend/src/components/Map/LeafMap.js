import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./LeafMap.css";

const LeafMap = (props) => {
  //   const myFilter = ["hue:180deg", "invert:100%"];

  const not_anom = (name) => {
    return "@" + name;
  };
  const niming = "某人";
  return (
    <MapContainer center={[40.7294, -73.9972]} zoom={11} scrollWheelZoom={true}>
      {/* <TileLayer
        attribution='<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
        url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        filter={myFilter}
      /> */}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
