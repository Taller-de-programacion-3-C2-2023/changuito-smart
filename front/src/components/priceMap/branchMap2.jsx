import "leaflet/dist/leaflet.css";
import "primereact/resources/primereact.css"; // core css

import React, { useState, useEffect } from "react";
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
      locationfound: (location) => {
        console.log("location found:", location);
      },
      locationerror: (err) => {
        console.log("location error:", err);
      },
      dragend: (event) => {
        console.log("dragend :", event.dist);
        map.locate();
        console.log("update location :", map.locate().getCenter());
      },
      moveend: async (e) => {
        // if (!moveEndHandling) {
        //   moveEndHandling = true;
        //   await changuitoMap.onMoveEnd(map.getCenter(), props.cartsByBranches);
        //   moveEndHandling = false;
      },
      //MARKER bindPopup click mouseover -- REEMPLAZO DEL TOOLTIP
    });
    return null;
  }

  return (
    <div id="map" className="Container Container-grey Result-size">
      <h3>{`Resultados encontrados para los productos seleccionados`}</h3>
      <div className="Container">
        <MapContainer
          className="information-result"
          center={mapCenter}
          zoom={13}
          maxZoom={19}
          scrollWheelZoom={true}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={mapCenter} radius={1000} color={COLORS.CIRCLE} />
          <Marker position={mapCenter} icon={branchIcons(COLORS.LOCATION_CENTER)} draggable>
            <Tooltip>Usted esta aqui</Tooltip>
            {/* <Popup></Popup> */}
          </Marker>
          {props.cartsByBranches.map((cart) => {
            // const position = [51.505, -0.09]
            const [lng, lat] = cart.branch.location.coordinates;
            const position = { lat, lng };

            return (
              <Marker
                key={cart.branch.id}
                position={position}
                icon={cart.allProducts ? branchIcons(COLORS.COMPLETE_CART): branchIcons(COLORS.INCOMPLETE_CART) }
              >
                <Popup
                  // className={"leaflet-popup-content-wrapper-gray"}
                  // content={branchPopUp(cart)}
                  // eventHandlers={{
                  //   click: () => {
                  //     console.log('marker clicked')
                  //   },
                  // }}
                >
                  <PopupContent branch={cart.branch} cartInfo={{total: cart.totalPrice, isFull: cart.allProducts}}></PopupContent>
                  {/* <b>{cart.branch.comercioRazonSocial}</b><br />
            <em>{cart.branch.comercioRazonSocial}</em><br />
            Category: {cart.branch.comercioRazonSocial}<br /> */}
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
      {/* <but  ton>CLICK</button> */}
    </div>
  );
}
