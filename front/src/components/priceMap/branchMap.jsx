import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Config from "../../config.js";
import { ChanguitoMap } from "./changuitoMap.js";
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
  const [mapCenter, setMapCenter] = useState([-34.6109, -58.3776]);

  useEffect(
    function effectFunction() {
      async function updateMap() {
        const idProducts = props.selectedProductList.map((p) => p.id);
        changuitoMap.setProduct(idProducts);
        await changuitoMap.onCenterChanged();
        console.log("BranchMap   actualizando producto: ", idProducts);
      }
      try {
        updateMap();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    [props.selectedProductList]
  );

  function MapHooks() {
    const map = useMap();
    changuitoMap.setMap(map);
    map.invalidateSize();
    map.on("moveend", async (e) => {
      if (!moveEndHandling) {
        moveEndHandling = true;
        await changuitoMap.onMoveEnd(map.getCenter());
        moveEndHandling = false;
      }
    });
    return null;
  }

  return (
    <div id="map">
      <MapContainer
        className="changuito-map"
        center={mapCenter}
        zoom={10}
        maxZoom={19}
        scrollWheelZoom={true}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapHooks />
      </MapContainer>
    </div>
  );
}
