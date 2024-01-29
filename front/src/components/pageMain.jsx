import React, { useState } from "react";
import "../styles/Page.css";
import { TabMenu } from "primereact/tabmenu";
import BranchMap from "./branchMap";
import UseCaseList from "./changuiListPrices/cartPrices.uc";

export default function Main(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = [
    {
      label: "Cart",
    },
    {
      label: "Map",
    },
    //   , icon: 'pi pi-fw pi-home'
  ];

  return (
    <div className="Main">
      <TabMenu
        model={menuItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
      {activeIndex === 0 && <UseCaseList />}
      {activeIndex === 1 && <BranchMap />}
    </div>
  );
}
