import Config from "../config.js";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";

export default function CartFilters(props) {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState("");

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        const endpoint = `${Config.apiBase}/products`;
        const queryString = `name=${productFilter}`;
        const response = await fetch(`${endpoint}?${queryString}`);
        const json = await response.json();
        console.log("OK: Fetching response:  ", json.length, "  ", queryString);
        if (json.length) {
          setProducts(json.slice(0, 10));
        }
      }
      try {
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    [productFilter]
  );

  function onProductSelection(e) {
    props.onSelected({ ...e.value, enable: true });
  }

  function onProductCancel(item) {
    props.onUnselected(item);
  }

  const itemTemplate = (data) => {
    return (
      <div key={data._id} className="flex align-items-center">
        <div>
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            aria-label="Cancel"
            onClick={() => onProductCancel(data)}
          />
        </div>
        <div>
          <label htmlFor={data._id} className="ml-2">
            {data.name}
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      <h3> Selecciona los productos de tu changuito</h3>
      <Dropdown
        // value={selectedProductList}
        onChange={onProductSelection}
        options={products}
        optionLabel="name"
        filter
        showFilterClear
        onFilter={(e) => {
          console.log(">>>>> ", e.filter);
          setProductFilter(e.filter);
        }}
        virtualScrollerOptions={{ itemSize: 38 }}
        placeholder="Selecciona producto"
        className="flex align-items-center padding:30px"
        emptyFilterMessage="No hay produtos disponibles"
      />
      <div className="card">
        <DataScroller
          header="Mi changuito"
          value={props.cartProducts}
          itemTemplate={itemTemplate}
          rows={5}
          // inline
          buffer={4}
          emptyMessage="Aun no se han seleccionado productos"
        />
      </div>

      {/* <ProductSelector
        selectedProductList={props.selectedProductList}
        onSelected={props.addSelectedProduct}
      />
      <ProductCheckList products={props.selectedProductList}></ProductCheckList> */}
    </>
  );
}
