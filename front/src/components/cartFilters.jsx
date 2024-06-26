import Config from "../config.js";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

const MAX_PRODUCT = 6;
const MAX_PRODUCT_OPTIONS = 15;

export default function CartFilters(props) {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState("");

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        const endpoint = `${Config.apiBase}/products`;
        const queryString = `name=${productFilter}`;
        const response = await fetch(`${endpoint}?${queryString}`);
        const reqProducts = await response.json();
        const optionProducts = reqProducts.filter(option => 
            props.cartProducts.findIndex(existingProd => option.id === existingProd.id) === -1
            ).slice(0, MAX_PRODUCT_OPTIONS);
        if (optionProducts.length) {
          setProducts(optionProducts);
        }
        // [
        //   {
        //     "_id": "655bf16bd99f1801d5d88186",
        //     "id": "7791675909226",
        //     "name": "Aceituna Negra 150 Gr",
        //     "presntation": "150.0 gr",
        //     "brand": "SIN MARCA"
        //   },
        //   {
        //     "_id": "655bf16bd99f1801d5d88187",
        //     "id": "7792070054375",
        //     "name": "Aceitunas Negras Doypack Nucete 220 Gr",
        //     "presntation": "220.0 gr",
        //     "brand": "NUCETE"
        //   }
        // ]
      }
      try {
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    [productFilter, props.cartProducts]
  );

  function onProductSelection(e) {
    props.onSelected({ ...e.value, enable: true, quantity: 1 });
  }

  function onProductCancel(item) {
    props.onUnselected(item);
  }

  const itemTemplate = (data) => {
    return (
      <div key={data._id} className="expand flex-row flex-wrap p-1 ">
          <Button className="font-normal p-button md:font-light vertical-align-baseline"
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            aria-label="Cancel"
            onClick={() => onProductCancel(data)}
          />
            <label htmlFor={data._id} className="font- md:font-light vertical-align-baseline">
              {data.name}
            </label>
            {props.activeMultiplicity? productsQuantity(data): null}
        </div>
    );
  };


  function productsQuantity(data) {
    return (<InputNumber className="right w-min "
            value={data.quantity}
            onValueChange={(e) => {
              data.quantity = e.value;
              props.refresh()
            }}
            showButtons
            buttonLayout="horizontal"
            step={1}
            decrementButtonClassName="p-button-outlined p-button-rounded p-button-danger opacity-60"
            incrementButtonClassName="p-button-outlined p-button-rounded p-button-success opacity-60"
            incrementButtonIcon="pi pi-plus "
            decrementButtonIcon="pi pi-minus"
            mode="decimal"
            min={1}
          max={10}
          size={1}
          />)
  }

  return (
    <div className="Container Container-white">
      <h3> Selecciona los productos de tu changuito</h3>
      <Dropdown
        // value={selectedProductList}
        onChange={onProductSelection}
        options={products}
        optionLabel="name"
        filter
        showFilterClear
        onFilter={(e) => setProductFilter(e.filter)}
        virtualScrollerOptions={{ itemSize: 38 }}
        placeholder="Selecciona producto"
        className="flex align-items-center padding:30px"
      />
      <div className="CartProducts">
        <DataScroller
          header="Mi changuito"
          value={props.cartProducts}
          itemTemplate={itemTemplate}
          rows={MAX_PRODUCT * 10}
          // inline
          // buffer={4}
          emptyMessage="Aun no se han seleccionado productos"
        />
      </div>

    </div>
  );
}
