import "../../styles/App.css";
import React, { useState } from "react";
import ProductSelector from "./productSelector";
import ProductCheckList from "./productCheckList";
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
    <div>
      <ColumnedContent>
        <>
          <CartFilters
            onSelected={addSelectedProduct}
            onUnselected={removeSelectedProduct}
            cartProducts={cartProducts}
          ></CartFilters>
          {/* <ProductSelector
            selectedProductList={selectedProductList}
            onSelected={addSelectedProduct}
          /> */}
          {/* <ProductCheckList products={cartProducts}></ProductCheckList> */}
        </>

        <BranchPricesTable selectedProductList={cartProducts} />
      </ColumnedContent>
    </div>
  );
}
