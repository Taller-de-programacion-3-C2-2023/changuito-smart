import "../../styles/App.css";
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

  return (
    <div>
      <ColumnedContent>
        <CartFilters
          cartProducts={cartProducts}
          onSelected={addSelectedProduct}
        ></CartFilters>
        <BranchMap/>
      </ColumnedContent>
    </div>
  );
}
