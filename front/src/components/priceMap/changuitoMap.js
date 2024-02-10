import * as L from 'leaflet';
import Config from "../../config.js"

async function getBranches(lat, lon) {
  const url = `${Config.apiBase}/branches?lat=${lat}&lon=${lon}`;
  return fetch(url);
}

export class ChanguitoMap {
  setMap(map) {
    this.centerCoords = [-34.6109, -58.3776];
    this.map = map;
    this.map.on('locationfound', e => { this.onLocationFound(e);});
    this.map.on('locationerror', e => { this.onLocationError(e);});
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

  async onCenterChanged() {
    // Check if first render
    if (this.markers !== undefined) {
      console.log("Removing branches");
      this.markers.forEach(m => {this.map.removeLayer(m)});
      this.map.removeLayer(this.centerMarker);
    }
    
    const branchesResponse = await getBranches(this.centerCoords.lat, this.centerCoords.lng);
    const branches = await branchesResponse.json();
    const closestBranches = branches.slice(0,10);

    this.centerMarker = new L.marker(this.centerCoords).addTo(this.map);
    this.addBranchesMarkers(closestBranches);
  }

  onBranchSelected(e) {
    console.info("Clicked:", e);
  }

  addBranchesMarkers(branches) {
    console.log("adding branches");
    this.markers = branches.map(branch => {
      const coords = [branch.location.coordinates[1], branch.location.coordinates[0]];
      const branchName = branch.sucursalNombre;
      const branchBrand = branch.banderaDescripcion;
      const popup = L.popup({autoPan: false})
        .setContent(`${branchName} (${branchBrand})`);
      const marker = new L.marker(coords)
        .bindPopup(popup)
        .on('mouseover', function (e) { this.openPopup();})
        .on('click', e => {this.onBranchSelected(branch)});
      return marker.addTo(this.map)
    });
  }
}