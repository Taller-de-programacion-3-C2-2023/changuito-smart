import Config from "../../config.js"
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataScroller } from "primereact/datascroller";

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
        setProducts(json.slice(0, 10));
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

    props.onSelected(e.value);
  }

  const itemTemplate = (data) => {
    return (
      <div className="flex flex-row">
        <span>{data.name}</span>
      </div>
    );
  };

  return (
    <>
      <p>Create your cart</p>

      <Dropdown
        // value={selectedProductList}
        onChange={onProductSelection}
        options={products}
        optionLabel="name"
        filter
        showFilterClear
        onFilter={(e) => setProductFilter(e.filter)}
        virtualScrollerOptions={{ itemSize: 38 }}
        placeholder="Select some produts"
        className="flex align-items-center"
        // className="w-full md:w-14rem"
      />

      <div className="card">
        <DataScroller
          value={props.cartProducts}
          itemTemplate={itemTemplate}
          rows={5}
          inline
          buffer={4}
          emptyMessage="No product selected"
          header="Your selected products"
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
