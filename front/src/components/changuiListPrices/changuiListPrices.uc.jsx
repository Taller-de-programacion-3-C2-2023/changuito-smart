import "../../styles/App.css";
import React, { useState } from "react";
import ProductSelector from "./productSelector";
import ProductCheckList from "./productCheckList";
import BranchPricesTable from "./branchesPricesTable";
import ColumnedContent from "../Columns";

export default function UseCaseList(props) {
  // const [lastProductSelected, setLastProductSelected] = useState(undefined);
  const [selectedProductList, setSelectdProductsList] = useState([]);

  function addSelectedProduct(productSelected) {
    setSelectdProductsList(selectedProductList.concat(productSelected));
  }

  return (
    <>
      <ColumnedContent>
        <div className="Page-filters">
          <ProductSelector
            selectedProductList={selectedProductList}
            onSelected={addSelectedProduct}
          />
          <ProductCheckList products={selectedProductList}></ProductCheckList>
        </div>

        <BranchPricesTable selectedProductList={selectedProductList} />
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
    </>
  );
}
