import * as L from "leaflet";
import Config from "../../config.js";

async function getBranches(lat, lon, products) {
  let url = `${Config.apiBase}/cart?lat=${lat}&lon=${lon}`;
  const productFilter = products.map((p) => `products=${p}`);
  if (productFilter.length) url = url.concat("&", productFilter.join("&"));
  console.log(`request on ${url}`);
  return fetch(url);
}

export class ChanguitoMap {
  productsSelected;
  centerCoords;

  constructor(centerCoords = [-34.6109, -58.3776]) {
    this.centerCoords = centerCoords;
  }

  setMap(map) {
    this.map = map;
    this.map.on("locationfound", (e) => {
      this.map.panTo([e.latitude, e.longitude]);
      if (this.onLocationFound) {
        this.onLocationFound(e);
      }
    });
    this.map.on("locationerror", (e) => {
      this.onLocationError(e);
    });
  }

  locate(curLocation) {
    if (curLocation) {
      this.onMoveEnd([curLocation.latitude, curLocation.longitude]);
    } else {
      this.map.locate();
    }
  }

  onLocationError(e) {
    console.log(e);
    alert("Location access failed.");
  }

  async onMoveEnd(centerCoords) {
    this.centerCoords = centerCoords;
    await this.onCenterChanged();
  }

  setProduct(productsSelected) {
    this.productsSelected = productsSelected;
  }

  async onCenterChanged() {
    // Check if first render
    if (this.markers !== undefined) {
      console.log("Removing branches");
      this.markers.forEach((m) => {
        this.map.removeLayer(m);
      });
      this.map.removeLayer(this.centerMarker);
    }

    const branchesResponse = await getBranches(
      this.centerCoords.lat,
      this.centerCoords.lng,
      this.productsSelected
    );
    const branches = await branchesResponse.json();
    console.log("Got branches:", branches);
    // [
    //   {
    //     "_id": "4-1-289",
    //     "cartPrice": 740,
    //     "cartLength": 1,
    //     "cartProducts": [
    //       {
    //         "productId": "7798260050226",
    //         "price": 740
    //       }
    //     ],
    //     "branch": {
    //       "_id": "65ec7967934334f0014b2edb",
    //       "banderaId": 1,
    //       "sucursalNombre": "LIMA",
    //       "id": "4-1-289",
    //       "sucursalTipo": "Autoservicio",
    //       "provincia": "AR-C",
    //       "direccion": "Lima 899",
    //       "banderaDescripcion": "ESTACION LIMA S.A.",
    //       "localidad": "CAPITAL FEDERAL",
    //       "comercioRazonSocial": "Estación Lima S.A.",
    //       "comercioId": 4,
    //       "sucursalId": "289",
    //       "location": {
    //         "type": "Point",
    //         "coordinates": [
    //           -58.38147,
    //           -34.617902
    //         ]
    //       },
    //       "dist": {
    //         "calculated": 15793.149854922538,
    //         "location": {
    //           "type": "Point",
    //           "coordinates": [
    //             -58.38147,
    //             -34.617902
    //           ]
    //         }
    //       }
    //     }
    //   }
    // ]
    const closestBranches = branches.slice(0, 10);

    this.centerMarker = new L.marker(this.centerCoords).addTo(this.map);
    this.addBranchesMarkers(closestBranches);
  }

  onBranchSelected(e) {
    console.info("Clicked:", e);
  }

  addBranchesMarkers(markers) {
    const self = this;
    console.log("adding markers");
    this.markers = markers.map((marker) => {
      const coords = [
        marker.branch.location.coordinates[1],
        marker.branch.location.coordinates[0],
      ];
      const content = self.getMarkerContent(marker);
      const popup = L.popup({ autoPan: false }).setContent(content);
      const lMarker = new L.marker(coords)
        .bindPopup(popup)
        .on("mouseover", function (e) {
          this.openPopup();
        })
        .on("click", (e) => {
          this.onBranchSelected(marker);
        });
      return lMarker.addTo(this.map);
    });
  }

  roundToNearest100(number) {
    return Math.round(number / 100) * 100;
  }

  getMarkerContent(marker) {
    const branchName = marker.branch.sucursalNombre;
    const branchBrand = marker.branch.banderaDescripcion;
    const branchTotal = marker.cartPrice;
    const branchDistance = this.roundToNearest100(marker.branch.dist.calculated);
    const productCount = marker.cartProducts.length;

    return `<div class="mapPopup">
      <div class="branchName">${branchName}</div>
      (${branchBrand})
      <ul>${productCount} de ${this.productsSelected.length} productos</ul>
      <ul>A ${branchDistance} metros</ul>
      <div class="branchTotal">Total: ${branchTotal}</div>
      </div>`;
  }
}
