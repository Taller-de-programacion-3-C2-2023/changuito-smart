import React from "react";
import { TabMenu } from "primereact/tabmenu";

export default function ViewMenu(props) {
  const menuItems = [
    {
      label: "Lista de precios",
      icon: "pi pi-list",
    },
    {
      label: "Mapa de sucursales",
      icon: "pi pi-map",
    },
    {
      label: "Evolucion de precios",
      icon: "pi pi-chart-line",
    }
  ]

  return (
    <TabMenu
      model={menuItems}
      activeIndex={props.activeIndex}
      onTabChange={(e) => props.setActiveIndex(e.index)}
    />
  );
}
