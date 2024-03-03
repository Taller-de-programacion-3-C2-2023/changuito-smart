import Config from "../../config.js";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function BranchPricesTable(props) {
  const [prices, setprices] = useState([]);
  const [expandedRows, setExpandedRows] = useState();
  const toast = useRef(null);

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        if (!props.selectedProductList.length) {
          setprices([]);
          return;
        }
        const endpoint = `${Config.apiBase}/cart`;
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

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Sucursales</span>
      {/* <Button icon="pi pi-refresh" rounded raised /> */}
    </div>
  );
  const footer = `In total there are ${
    prices ? prices.length : 0
  } branches near your location.`;

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  const rowExpansionTemplate = (price) => {
    const productsData = price.cartProducts.map((prodIdPrice) => {
      return {
        price: prodIdPrice.price,
        ...props.selectedProductList.find(
          (prod) => (prod.id === prodIdPrice.productId) & prod.enable
        ),
      };
    });
    console.log("rowExpansionTemplate ", productsData);

    return (
      <div className="p-2">
        <DataTable value={productsData} showGridlines size="small">
          <Column field="name" header="Producto" sortable></Column>
          <Column
            field="price"
            header="Precio unitario"
            body={(p) => formatCurrency(p.price)}
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.cartProducts.length > 0;
  };

  return (
    <div className="changuito-map">
      <h3>
        {" "}
        Results with {props.selectedProductList.length} products selected
      </h3>
      <div className="card">
        <Toast ref={toast} />
        <DataTable
          value={prices}
          header={header}
          footer={footer}
          size={"normal"}
          paginator
          rows={5}
          rowsPerPageOptions={[2, 5, 10, 25, 50]}
          tableStyle={{ minWidth: "60rem" }}
          expandedRows={expandedRows}
          onRowToggle={(e) => {
            setExpandedRows(e.data);
          }}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          scrollable
          scrollHeight="500px"
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column
            field="branch.banderaDescripcion"
            header="Sucursal"
            sortable
          ></Column>
          <Column field="branch.direccion" header="Direccion"></Column>
          <Column field="branch.localidad" header="Localidad"></Column>
          <Column
            field="cartPrice"
            header="Precio"
            body={(p) => formatCurrency(p.cartPrice)}
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
