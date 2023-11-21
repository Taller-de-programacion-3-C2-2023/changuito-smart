import "../../styles/App.css";
import React, { useState, useEffect } from "react";
import logo from "../../logo.svg";
import DataTable from "react-data-table-component";

export default function BranchPricesTable(props) {
  const [prices, setprices] = useState([]);
  const [pending, setPending] = React.useState(true);

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        if (!props.selectedProductList.length) {
          return;
        }
        setPending(false);
        const endpoint = `http://localhost:3030/cart`;
        const queryString = props.selectedProductList.reduce(
          (prev, cur) => `${prev}&products=${cur.id}`,
          "?"
        );
        const response = await fetch(`${endpoint}?${queryString}`);
        const json = await response.json();
        console.log("OK: Fetching response: ", json);
        setprices(json);
      }
      try {
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    [props.selectedProductList]
  );

  const columns = [
    {
      name: "Sucursal",
      selector: (row) => row.branch.sucursalNombre,
    },
    {
      name: "Direccion",
      selector: (row) => row.branch.direccion,
    },
    {
      name: "Localidad",
      selector: (row) => row.branch.localidad,
    },
    {
      name: "Precio",
      selector: (row) => row.cartPrice,
    },
  ];

  return (
    <div className="Page-content">
      <h3>
        {" "}
        Results with {props.selectedProductList.length} products selected
      </h3>
      <DataTable
        title="Products"
        columns={columns}
        data={prices}
        progressPending={pending}
        progressComponent={<img src={logo} className="App-logo" alt="logo" />}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}
