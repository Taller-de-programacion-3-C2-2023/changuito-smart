import "leaflet/dist/leaflet.css";
import "primereact/resources/primereact.css"; // core css

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import  PopupContent from "./popupContent";
import { Icon } from "leaflet";


export default function BranchMap2(props) {
  const [mapCenter, setMapCenter] = useState({
    lat: props.location.latitude,
    lng: props.location.longitude,
  });
  const [centerChange, setCenterChange] = useState(false)


  const COLORS = {
    LOCATION_CENTER: "grey",
    CIRCLE: "grey",
    INCOMPLETE_CART: "orange",
    COMPLETE_CART: "green"
  }

  const branchIcons = (color = "blue")=> {
    return new Icon({
      iconUrl:
    `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }

  function MapHooks() {
    const map = useMapEvents({
      click: () => {
        console.log("location  map.locate():", map.getZoom());
        map.locate();
        map.setView(mapCenter, map.getZoom() * 1.1);
      },
      mousemove: (event) => {
        if (centerChange) {
          map.setView(mapCenter)
          setCenterChange(false)
        }
      }
    });
    return null;
  }

  function onMarkerDragEnd(event) {
    var latlng = event.target.getLatLng();
    console.log("dragend :", mapCenter)
    console.log("dragend :", latlng.lat, latlng.lng)
    setMapCenter(latlng)
    setCenterChange(true)
    props.updateLocation({ latitude: latlng.lat, longitude: latlng.lng })
}

  return (
    <div id="map" className="Container Container-grey Result-size">
      <h3>{`Resultados encontrados para los productos seleccionados`}</h3>
      <div className="Container">
        <MapContainer
          className="information-result"
          center={mapCenter}
          zoom={15}
          maxZoom={20}
          scrollWheelZoom={true}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={mapCenter} radius={1000} color={COLORS.CIRCLE} />
          <Marker position={mapCenter} icon={branchIcons(COLORS.LOCATION_CENTER)} draggable
            eventHandlers={{ dragend: onMarkerDragEnd}}
          >
            <Tooltip>Usted esta aqui</Tooltip>
          </Marker>
          {props.cartsByBranches.map((cart) => {
            const [lng, lat] = cart.branch.location.coordinates;
            const position = { lat, lng };

            return (
              <Marker
                key={cart.branch.id}
                position={position}
                icon={cart.allProducts ? branchIcons(COLORS.COMPLETE_CART): branchIcons(COLORS.INCOMPLETE_CART) }
              >
                <Popup>
                  <PopupContent branch={cart.branch} cartInfo={{total: cart.totalPrice, isFull: cart.allProducts}}></PopupContent>
                </Popup>
                <Tooltip
                  content={`Distancia ${
                    Math.round(cart.branch.dist.calculated) / 1000
                  } kms.`}
                ></Tooltip>
              </Marker>
            );
          })}
          <MapHooks />
        </MapContainer>
      </div>
    </div>
  );
}
