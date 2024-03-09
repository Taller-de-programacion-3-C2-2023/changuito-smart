import "../App.css";
import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
// import PriceMap from "./priceMap/priceMap.uc";
// import UseCaseList from "./changuiListPrices/cartPrices.uc";
import ProductPrices from "./priceChart/productPrices.uc";
import CartFilters from "./cartFilters";
import ColumnedContent from "./columnedContents";
import BranchPricesTable from "./changuiListPrices/cartBranches";
import BranchMap from "./priceMap/branchMap"

export default function Main(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  function addSelectedProduct(productSelected) {
    setCartProducts(cartProducts.concat(productSelected));
    console.info("cartProducts:    ",cartProducts);
  }

  function removeSelectedProduct(productSelected) {
    setCartProducts(cartProducts.filter((x) => x._id !== productSelected._id));
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
        <CartFilters
          onUnselected={removeSelectedProduct}
          onSelected={addSelectedProduct}
          cartProducts={cartProducts}
        ></CartFilters>
        <div className="Container">
          {activeIndex === 0 && <BranchPricesTable selectedProductList={cartProducts} />}
          {activeIndex === 1 && <BranchMap selectedProductList={cartProducts} />}
          {activeIndex === 2 && <ProductPrices />}
        </div>
        
      </ColumnedContent>
    </div>
  );
}
