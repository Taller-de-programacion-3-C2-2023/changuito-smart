import React, { useState } from "react";
import CartFilters from "./cartFilters";
import BranchPricesTable from "./cartBranches";
import ColumnedContent from "../columnedContents";

export default function UseCaseList(props) {
  // const [lastProductSelected, setLastProductSelected] = useState(undefined);
  const [cartProducts, setCartProducts] = useState([]);

  function addSelectedProduct(productSelected) {
    setCartProducts(cartProducts.concat(productSelected));
  }

  function removeSelectedProduct(productSelected) {
    setCartProducts(cartProducts.filter((x) => x._id !== productSelected._id));
  }

  return (
    <div className="Container">
      <ColumnedContent>
        <>
          <CartFilters
            onSelected={addSelectedProduct}
            onUnselected={removeSelectedProduct}
            cartProducts={cartProducts}
          ></CartFilters>
        </>

        <BranchPricesTable selectedProductList={cartProducts} />
      </ColumnedContent>
    </div>
  );
}
