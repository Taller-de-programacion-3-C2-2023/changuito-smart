import "../../styles/App.css";
import React, { useState } from "react";
import ProductSelector from "./productSelector";
import ProductCheckList from "./productCheckList";
import ColumnedContent from "../Columns";
import logo from "../../logo.svg";
import DataTable from "react-data-table-component";

export default function UseCaseList(props) {
  // const [lastProductSelected, setLastProductSelected] = useState(undefined);
  const [selectedProductList, setSelectdProductsList] = useState([]);
  const [pending, setPending] = React.useState(true);

  function addSelectedProduct(productSelected) {
    setSelectdProductsList(selectedProductList.concat(productSelected));
    setPending(false);
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.nombre,
    },
    {
      name: "Min price",
      selector: (row) => row.precioMax,
    },
    {
      name: "Max price",
      selector: (row) => row.precioMin,
    },
  ];

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

        <div className="Page-content">
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
        </div>
      </ColumnedContent>
    </>
  );
}
