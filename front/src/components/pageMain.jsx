import "../App.css";

import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import ProductPrices from "./priceChart/productPrices.uc";
import CartFilters from "./cartFilters";
import ColumnedContent from "./columnedContents";
import BranchPricesTable from "./changuiListPrices/cartBranches";
import DateFilter from "./dateFilter";
import BranchMap from "./priceMap/branchMap"

export default function Main(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const today = new Date();
  const lastWeek = new Date()
  lastWeek.setDate(today.getDate() - 7);
  const [filterDates, setFilterDates] = useState([lastWeek, today]);

  function addSelectedProduct(productSelected) {
    setCartProducts(cartProducts.concat(productSelected));
  }

  function removeSelectedProduct(productSelected) {
    setCartProducts(cartProducts.filter((x) => x._id !== productSelected._id));
  }

  function refresh() {
    //todo optimizar deep copy
    setCartProducts(JSON.parse(JSON.stringify(cartProducts)));
  }

  function cleanProducts() {
    setCartProducts([]);
  }

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
      <ColumnedContent>
        <div>
        <CartFilters
          onUnselected={removeSelectedProduct}
          onSelected={addSelectedProduct}
            cartProducts={cartProducts}
            refresh={refresh}
            clean={cleanProducts}
        ></CartFilters>
        {activeIndex === 2 &&
          <DateFilter onDateChanged={setFilterDates}/>
        }
        </div>
        <div className="Container-grey">
          {activeIndex === 0 && <BranchPricesTable selectedProductList={cartProducts} />}
          {activeIndex === 1 && <BranchMap selectedProductList={cartProducts} />}
          {activeIndex === 2 && <ProductPrices selectedProductList={cartProducts} filterDates={filterDates} />}
        </div>
        
      </ColumnedContent>
    </div>
  );
}
