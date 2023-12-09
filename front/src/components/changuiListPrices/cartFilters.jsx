import React, { useState, useEffect } from "react";
// import ProductSelector from "./productSelector";
// import ProductCheckList from "./productCheckList";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";

export default function CartFilters(props) {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState("");

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        const endpount = `http://localhost:3030/products`;
        const queryString = `name=${productFilter}`;
        const response = await fetch(`${endpount}?${queryString}`);
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
    // [productFilter, input]
  );

  //   const onSearchProduct = (e) => {};

  function onProductSelection(e) {
    // e.target:{name: null, id: null, value: {… lo de abajo}}
    // e.value
    // brand:// "SIN MARCA"
    // id:// "7791675909226"
    // name:// "Aceituna Negra 150 Gr"
    // presntation:// "150.0 gr"
    // _id:// "655bf16bd99f1801d5d88186"
    // const selectedId = e.value.id;
    // const productSelected = cartProducts.filter((x) => x.id === selectedId);
    props.onSelected(e.value);
  }

  const itemTemplate = (data) => {
    return (
      <div className="flex flex-row">
        <span>{data.name}</span>
        {/* <Button
          icon="pi pi-times"
          // disabled={data.inventoryStatus === "OUTOFSTOCK"}
          // MULTIPLICIDAD
        ></Button> */}
      </div>
      //     <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
      //       <span className="text-2xl font-semibold">${data.name}</span>
      //     </div>
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
