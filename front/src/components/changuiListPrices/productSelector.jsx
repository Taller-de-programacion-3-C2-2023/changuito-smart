import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import Config from "../../config.js"


export default function ProductSelector(props) {
  const [productSearched, setProductSearched] = useState("");
  const [productsList, setProductsList] = useState([]);
  // const [input, setInput] = useState("");
  // const [isSearching, setIsSearching] = useState(true);

  useEffect(
    function effectFunction() {
      async function fetchOptions() {
        const endpoint = `${Config.apiBase}/products`;
        const queryString = `name=${productSearched}`;
        const response = await fetch(`${endpoint}?${queryString}`);
        const json = await response.json();
        console.log("OK: Fetching response: ", json);
        setProductsList(json);
      }
      try {
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    [productSearched]
    // [productSearched, input]
  );

  const onSearchProduct = (e) => {
    const productName = e.target.value;
    setProductSearched(productName);
  };

  function onProductSelection(e) {
    const selectedId = e.target.value;
    const productSelected = productsList.filter((x) => x.id === selectedId);
    props.onSelected(productSelected);
  }

  return (
    <>
      <div>
        <label>
          Search:
          <input defaultValue="product..." onChange={onSearchProduct} />
        </label>
      </div>
      <div>
        <select
          name="productsSelector"
          onChange={onProductSelection}
          defaultMenuIsOpen
        >
          {productsList.map((item) => (
            <option
              className="Selector-options"
              key={item.id}
              value={item.id}
              label={item.name}
            />
          ))}
        </select>
      </div>
    </>
  );
}
