import 'leaflet/dist/leaflet.css'
import React from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { ChanguitoMap } from "./ChanguitoMap.js";
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const changuitoMap = new ChanguitoMap();
let moveEndHandling = false;

export default function BranchMap(props) {
  function MapHooks() {
    const map = useMap();
    changuitoMap.setMap(map);
    map.on('moveend', async e => {
      if (!moveEndHandling) {
        moveEndHandling = true;
        await changuitoMap.onMoveEnd(map.getCenter());
        moveEndHandling = false;
      }
    });
    return null;
  }
  
  return (
    <>
      <MapContainer
        className="changuito-map"
        center={[-34.6109, -58.3776]}
        zoom={4}
        maxZoom={19}
        scrollWheelZoom={true}>
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapHooks />
      </MapContainer>
    </>
  );
}
