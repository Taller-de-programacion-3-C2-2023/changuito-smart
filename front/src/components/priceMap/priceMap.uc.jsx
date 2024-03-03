import "../../App.css";
import React, { useState } from "react";
import BranchMap from "./branchMap";
import CartFilters from "../changuiListPrices/cartFilters";
import ColumnedContent from "../columnedContents";

export default function PriceMap(props) {
  const [cartProducts, setCartProducts] = useState([]);

  function addSelectedProduct(productSelected) {
    setCartProducts(cartProducts.concat(productSelected));
    console.info(cartProducts);
  }

  function removeSelectedProduct(productSelected) {
    setCartProducts(cartProducts.filter((x) => x._id !== productSelected._id));
  }

  return (
    <div className="Container">
      <ColumnedContent>
        <CartFilters
          onUnselected={removeSelectedProduct}
          onSelected={addSelectedProduct}
          cartProducts={cartProducts}
        ></CartFilters>
        <BranchMap selectedProductList={cartProducts} />
      </ColumnedContent>
    </div>
  );
}
