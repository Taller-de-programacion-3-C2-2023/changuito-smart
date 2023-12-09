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

  return (
    <div>
      <ColumnedContent>
        <>
          <CartFilters
            onSelected={addSelectedProduct}
            cartProducts={cartProducts}
          ></CartFilters>
          {/* <ProductSelector
            selectedProductList={selectedProductList}
            onSelected={addSelectedProduct}
          /> */}
          {/* <ProductCheckList products={cartProducts}></ProductCheckList> */}
        </>

        <BranchPricesTable selectedProductList={cartProducts} />
        {/* <div className="Page-content">
          <h3> Results with {selectedProductList.length} products selected</h3>
          <DataTable
            title="Products"
            columns={columns}
            data={selectedProductList}
            progressPending={pending}
            progressComponent={
              <img src={logo} className="App-logo" alt="logo" />
            }
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div> */}
      </ColumnedContent>
    </div>
  );
}
