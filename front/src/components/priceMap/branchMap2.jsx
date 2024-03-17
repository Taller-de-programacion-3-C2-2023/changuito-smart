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
// import Config from "../../config.js";
import  PopupContent from "./popupContent";
// import "leaflet/dist/leaflet.css";
// import iconMarker from "leaflet/dist/images/marker-icon.png";
// import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Icon } from "leaflet";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: iconRetina,
//   iconUrl: iconMarker,
//   shadowUrl: iconShadow,
// });

// const changuitoMap = new ChanguitoMap();
// let moveEndHandling = false;

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
  const centerMarker = new Icon({
    
  });

  const branchIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  // // const branchIcon = new Icon({
  // //   // className: "pi bold pi-shopping-cart font-size: 5rem bac",
  // //   iconUrl: require('../../images/cart-icon.png'), //'cart-map-icon',
  // //   // shadowUrl: 'leaf-shadow.png',
  // //   iconSize:     [15, 15], // size of the icon
  // //   // shadowSize:   [50, 64], // size of the shadow
  // //   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // //   shadowAnchor: [4, 62],  // the same for the shadow
  // //   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  // // });

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

  function branchPopUp(cart) {
    const {
      banderaDescripcion: branchName,
      sucursalTipo: branchBrand,
      dist: { calculated: branchDistance },
    } = cart.branch;
    return `<section className="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 " style={{ borderRadius: '10px' }}>
          <i className="pi pi-shopping-cart text-primary-500 text-2xl"></i>
          <div className="flex flex-column gap-4 w-full">
              <p className="m-0 font-semibold text-base text-white">${branchName}</p>
              <p className="m-0 text-base text-white text-700">${branchBrand}</p>
          </div>
      </section>`;
    // <div>
    //   <div>${branchName}</div>
    //   (${branchBrand})
    //   <ul>
    //     ${cart.cartLength} de ${props.cartProductsLength} productos
    //   </ul>
    //   <ul>A ${branchDistance} metros</ul>
    //   <div>Total: ${cart.totalPrice}</div>
    // </div>
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
