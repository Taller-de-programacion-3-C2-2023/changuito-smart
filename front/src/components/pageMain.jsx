import "../App.css";

import React, { useRef, useState, useEffect } from "react";
import Config from "../config.js";
import { Toast } from 'primereact/toast';
import ProductPrices from "./priceChart/productPrices.uc";
import CartFilters from "./cartFilters";
import ToastLocation from "./toastLocation";
import ColumnedContent from "./columnedContents";
import BranchPricesTable from "./changuiListPrices/cartBranches";
import DateFilter from "./dateFilter";
import BranchMap from "./priceMap/branchMap"
import ViewMenu from "./viewMenu"

const MAX_PRODUCTS_PER_CART = 5;

function load(key, emptyValue = []) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : emptyValue;
}

export default function Main(props) {
  const [location, setLocation] = useState(() => load('location', Config.defaultLocation));
  const [activeIndex, setActiveIndex] = useState(() => load('activeIndex', 0));
  const [cartProducts, setCartProducts] = useState(() => load('cartProducts', []));
  const [cartsByBranches, setCartsByBranches] = useState([]);

  const warnToast = useRef(null);

  const today = new Date();
  const lastWeek = new Date()
  lastWeek.setDate(today.getDate() - 7);
  const [filterDates, setFilterDates] = useState([lastWeek, today]);

 
  useEffect(
    function effectFunction() {

      function cartsUrl() {
        const endpoint = `${Config.apiBase}/cart`
        const productsQueryString = cartProducts.map((p) => `products=${p.id}`).join("&")
        console.log(productsQueryString)
        const locationQueryString = location ? `lat=${location.latitude}&lon=${location.longitude}` : ""
        return `${endpoint}?${productsQueryString}&${locationQueryString}`
      }

      function productsById() {
        return cartProducts.reduce((acc, curr) => {
          acc[curr.id] = curr
          return acc
        }, {})
      }

      function cartProductsWithQuantities(productsByBranches, quantities) {
        let totalPrice = 0
        productsByBranches.cartProducts = productsByBranches.cartProducts.map(prod => {
          const { productId: id, price: unitPrice } = prod
          const { quantity, name } = quantities[id]
          const total = quantity * unitPrice
          totalPrice += total
          
          return {  id, name, unitPrice, quantity, total}
        })
        productsByBranches.totalPrice = totalPrice
        productsByBranches.allProducts = cartProducts.length === productsByBranches.cartProducts.length
      }
      
      async function setCarts() {
        if (!cartProducts.length) {
          setCartsByBranches([]);
          return;
        }
        const response = await fetch(cartsUrl());
        const carts = await response.json();
        const products = productsById() 
        
        carts.forEach(cart => {
          cartProductsWithQuantities(cart, products)
        });

        console.log("CART TRANFORMATION ", carts);
        setCartsByBranches(carts);
      }
      try {
        window.sessionStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        // window.sessionStorage.setItem('activeIndex', activeIndex);
        // window.sessionStorage.setItem('location', JSON.stringify(location));
        setCarts();
      } catch (err) {
        console.log("ERROR: Fetching error on BranchPricesTable");
      }
  }, [cartProducts, location])

  function addSelectedProduct(productSelected) {
    if (cartProducts.length === MAX_PRODUCTS_PER_CART) {
      const toastData = {
        severity: "error",
        summary: "Límite de productos alcanzado",
        detail: "No se puede agregar más productos al carrito"
      }
      warnToast.current.show(toastData); 
    } else {
      setCartProducts(cartProducts.concat(productSelected));
    }
  }

  function removeSelectedProduct(productSelected) {
    setCartProducts(cartProducts.filter((x) => x._id !== productSelected._id));
  }

  function refresh() {
    //todo optimizar deep copy
    setCartProducts(JSON.parse(JSON.stringify(cartProducts)));
  }

  function setInitialLocation(acceptGetLocation) {
    if (!acceptGetLocation) {
      const [latitude, longitude] = [-34.6109, -58.3776]
      console.log("rejectSetLocationClick [latitude, longitude]", latitude, longitude);
      setLocation({ latitude, longitude })
      return 
    } 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          const { latitude, longitude } = position.coords
          console.log("acceptSetLocationClick [latitude, longitude]", latitude, longitude);
          setLocation({ latitude, longitude })
        },
        () => console.log("Unable to retrieve your location")
      );
    } else {
      console.log("acceptSetLocationClick but Geolocation not supported");
    }
    console.log("END LOCATION SET");
  }

  return (
    <>
      <Toast ref={warnToast} position="top-center"/> 
      {location.default ? <ToastLocation accept={() => setInitialLocation(true)} reject={() => setInitialLocation(false)}/> : null}
      <div className="Main">
        <ViewMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex}></ViewMenu>
        <ColumnedContent>
          <div>
            <CartFilters
              onUnselected={removeSelectedProduct}
              onSelected={addSelectedProduct}
                cartProducts={cartProducts}
                refresh={refresh}
                clean={() => setCartProducts([])}
                activeMultiplicity={ !(activeIndex === 2)}
            ></CartFilters>
            {activeIndex === 2 &&
              <DateFilter onDateChanged={setFilterDates}/>
            }
          </div>

          <div className="Container-grey">
            {activeIndex === 0 && <BranchPricesTable cartsByBranches={cartsByBranches} cartProductsLength={cartProducts.length} />}
            {activeIndex === 1 && <BranchMap cartsByBranches={cartsByBranches} cartProductsLength={cartProducts.length} location={location} updateLocation={setLocation} />}
            {activeIndex === 2 && <ProductPrices selectedProductList={cartProducts} filterDates={filterDates} />}
          </div>
        </ColumnedContent>
      </div>
    </>
  );
}
