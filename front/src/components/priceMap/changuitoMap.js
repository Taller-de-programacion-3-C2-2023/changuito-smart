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
      this.onLocationFound(e);
    });
    this.map.on("locationerror", (e) => {
      this.onLocationError(e);
    });
  }

  locate() {
    this.map.locate();
  }

  onLocationFound(e) {
    this.map.panTo([e.latitude, e.longitude]);
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

  getMarkerContent(marker) {
    const branchName = marker.branch.sucursalNombre;
    const branchBrand = marker.branch.banderaDescripcion;
    const branchTotal = marker.cartPrice;
    const productCount = marker.cartProducts.length;

    return `<div class="mapPopup">
      <div class="branchName">${branchName}</div>
      (${branchBrand})
      <ul>${productCount} de ${this.productsSelected.length} productos</ul>
      <div class="branchTotal">Total: ${branchTotal}</div>
      </div>`;
  }
}
