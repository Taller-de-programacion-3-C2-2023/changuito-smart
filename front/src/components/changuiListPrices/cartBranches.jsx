import Config from "../../config.js";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';

export default function BranchPricesTable(props) {
  // const [branchesCart, setBranchesCart] = useState([]);
  const [expandedRows, setExpandedRows] = useState();
  // const [productQuantities, setProductQuantities] = useState({});
  const toast = useRef(null);


  // useEffect(
  //   function effectFunction() {
  //     function productsQuantity() {
  //       return props.selectedProductList.reduce((acc, curr) => {
  //         // console.log("curr   ", acc)
  //         acc[curr.id] = curr.quantity
  //         return acc
  //       }, {})
  //     }

  //     async function fetchOptions() {
  //       setProductQuantities(productsQuantity())
  //       console.log("setProductQuantities  ", productQuantities)

  //       if (!props.selectedProductList.length) {
  //         setBranchesCart([]);
  //         return;
  //       }
  //       const endpoint = `${Config.apiBase}/cart`;
  //       const queryString = props.selectedProductList.reduce(
  //         (prev, cur) => `${prev}&products=${cur.id}`,
  //         "?"
  //       );
  //       const response = await fetch(`${endpoint}?${queryString}`);
  //       const json = await response.json();
  //       console.log("OK: Fetching response BranchPricesTable: ", json);
  //       // [
  //       //   {
  //       //     "_id": "10-3-633",
  //       //     "cartPrice": 4700,
  //       //     "cartLength": 3,
  //       //     "cartProducts": [
  //       //       {
  //       //         "productId": "7791675909226",
  //       //         "price": 1490
  //       //       },
  //       //       {
  //       //         "productId": "7790387015317",
  //       //         "price": 2000
  //       //       },
  //       //       {
  //       //         "productId": "7790710334535",
  //       //         "price": 1210
  //       //       }
  //       //     ],
  //       //     "branch": {
  //       //       "_id": "654ff72f7189d2c75c4c2468",
  //       //       "banderaId": 3,
  //       //       "sucursalNombre": "Bolívar 270",
  //       //       "id": "10-3-633",
  //       //       "sucursalTipo": "Autoservicio",
  //       //       "provincia": "AR-C",
  //       //       "direccion": "Bolívar 270",
  //       //       "banderaDescripcion": "Express",
  //       //       "localidad": "Ciudad Autónoma de Buenos Aires",
  //       //       "comercioRazonSocial": "INC S.A.",
  //       //       "comercioId": 10,
  //       //       "sucursalId": "633",
  //       //       "location": {
  //       //         "type": "Point",
  //       //         "coordinates": [
  //       //           -58.37334,
  //       //           -34.611219
  //       //         ]
  //       //       },
  //       //       "dist": {
  //       //         "calculated": 391.906459006686,
  //       //         "location": {
  //       //           "type": "Point",
  //       //           "coordinates": [
  //       //             -58.37334,
  //       //             -34.611219
  //       //           ]
  //       //         }
  //       //       }
  //       //     }
  //       //   },
  //       //   {
  //       //     "_id": "15-1-631",
  //       //     "cartPrice": 3240.62,
  //       //     "cartLength": 2,
  //       //     "cartProducts": [
  //       //       {
  //       //         "productId": "7790387015317",
  //       //         "price": 2101.5
  //       //       },
  //       //       {
  //       //         "productId": "7790710334535",
  //       //         "price": 1139.12
  //       //       }
  //       //     ],
  //       //     "branch": {
  //       //       "_id": "654ff72f7189d2c75c4c22fe",
  //       //       "banderaId": 1,
  //       //       "sucursalNombre": "631 - CAPITAL FEDERAL",
  //       //       "id": "15-1-631",
  //       //       "sucursalTipo": "Autoservicio",
  //       //       "provincia": "AR-C",
  //       //       "direccion": "Cl Moreno 968",
  //       //       "banderaDescripcion": "Supermercados DIA",
  //       //       "localidad": "CAPITAL FEDERAL",
  //       //       "comercioRazonSocial": "DIA Argentina S.A",
  //       //       "comercioId": 15,
  //       //       "sucursalId": "631",
  //       //       "location": {
  //       //         "type": "Point",
  //       //         "coordinates": [
  //       //           -58.380073,
  //       //           -34.612132
  //       //         ]
  //       //       },
  //       //       "dist": {
  //       //         "calculated": 264.8454832199348,
  //       //         "location": {
  //       //           "type": "Point",
  //       //           "coordinates": [
  //       //             -58.380073,
  //       //             -34.612132
  //       //           ]
  //       //         }
  //       //       }
  //       //     }
  //       //   },
  //       //   {
  //       //     "_id": "10-3-571",
  //       //     "cartPrice": 4489,
  //       //     "cartLength": 3,
  //       //     "cartProducts": [
  //       //       {
  //       //         "productId": "7791675909226",
  //       //         "price": 1490
  //       //       },
  //       //       {
  //       //         "productId": "7790387015317",
  //       //         "price": 2000
  //       //       },
  //       //       {
  //       //         "productId": "7790710334535",
  //       //         "price": 999
  //       //       }
  //       //     ],
  //       //     "branch": {
  //       //       "_id": "654ff72f7189d2c75c4c2508",
  //       //       "banderaId": 3,
  //       //       "sucursalNombre": "Tacuarí 89",
  //       //       "id": "10-3-571",
  //       //       "sucursalTipo": "Autoservicio",
  //       //       "provincia": "AR-C",
  //       //       "direccion": "Tacuarí 89",
  //       //       "banderaDescripcion": "Express",
  //       //       "localidad": "Ciudad Autónoma de Buenos Aires",
  //       //       "comercioRazonSocial": "INC S.A.",
  //       //       "comercioId": 10,
  //       //       "sucursalId": "571",
  //       //       "location": {
  //       //         "type": "Point",
  //       //         "coordinates": [
  //       //           -58.379243,
  //       //           -34.609305
  //       //         ]
  //       //       },
  //       //       "dist": {
  //       //         "calculated": 232.7762250239437,
  //       //         "location": {
  //       //           "type": "Point",
  //       //           "coordinates": [
  //       //             -58.379243,
  //       //             -34.609305
  //       //           ]
  //       //         }
  //       //       }
  //       //     }
  //       //   },
  //       // ]
  //       setBranchesCart(json);
  //     }
  //     try {
        
  //       fetchOptions();
  //     } catch (err) {
  //       console.log("ERROR: Fetching error on BranchPricesTable");
  //     }
  //   },
  //   [props.selectedProductList]
  // );
  

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Sucursales</span>
      {/* <Button icon="pi pi-refresh" rounded raised /> */}
    </div>
  );
  
  const footer = `Se encontraron ${
    props.cartsByBranches ? props.cartsByBranches.length : 0
  } sucursales cercanas.`;
  // const footer = `Se encontraron ${
  //   branchesCart ? branchesCart.length : 0
  // } sucursales cercanas.`;

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

  // TODO MOVER A UN HELPER
  const formatCurrency = (value) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  const rowExpansionTemplate = (cart) => {
    // const productsData = cart.cartProducts
    // // const productsData = price.cartProducts.map((prodIdPrice) => {
    //   return {
    //     price: prodIdPrice.price,
    //     ...props.selectedProductList.find(
    //       (prod) => (prod.id === prodIdPrice.productId) 
    //     ),
    //   };
    // });
    // console.log("rowExpansionTemplate ", productsData);

    return (
      <div className="p-2">
        <DataTable value={cart.cartProducts} showGridlines size="small">
          <Column style={{ minWidth: '20rem' }} field="name" header="Producto" sortable></Column>
          <Column style={{ minWidth: '8rem' }} field="quantity" header="Cantidad" ></Column>
          <Column
            style={{ minWidth: '8rem' }}
            // field="price"
            field="unitPrice"
            header="Precio unitario"
            body={(p) => formatCurrency(p.unitPrice)}
            sortable
          ></Column>
          <Column
            style={{ minWidth: '8rem' }}
            field="total"
            // field="price"
            header="Precio total"
            body={(p) => formatCurrency(p.total)}
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  };

  const cartCompleteBodyTemplate = (rowData) => {
    console.log("cartCompleteBodyTemplate  ", props.cartProductsLength, rowData.cartProducts)
  
    const allProducts = rowData.cartLength === props.cartProductsLength
    return <Tag value rounded severity={allProducts? 'success':'warning'} >

      <i className={classNames('pi', { 'true-icon pi-shopping-cart': allProducts, 'false-icon pi-shopping-cart': !allProducts })}>
        {` ${rowData.cartLength}`}
      </i>
    </Tag>
  };
  const allowExpansion = (rowData) => {
    return rowData.cartProducts.length > 0;
  };

  return (
    <div className="Container Container-grey Result-size">
      <h3>
        {`Resultados encontrados para ${props.cartProductsLength} productos seleccionados`}
      </h3>
      <div className="Container">
        <Toast ref={toast} />
        <DataTable
          className="information-result"
          value={props.cartsByBranches}
          header={header}
          footer={footer}
          size={"normal"}
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{last} de {totalRecords}"
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
          sortField="cartLength" sortOrder={-1}
          // sortMode="multiple"  TODO no entiendo bien como funciona, a veces no me funciona el sort del precio
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column
            style={{ minWidth: '15rem' }}
            field="branch.banderaDescripcion"
            header="Sucursal"
            sortable
            filter filterPlaceholder="Buscar por sucursal" 
          ></Column>
          <Column style={{ minWidth: '18rem' }} field="branch.direccion" header="Direccion"></Column>
          <Column style={{ minWidth: '18rem' }} field="branch.localidad" header="Localidad"></Column>
          <Column
            style={{ minWidth: '10rem' }}
            header="Precio"
            body={(p) => formatCurrency(p.totalPrice)}
            // body={(p) => formatCurrency(p.cartProducts.reduce((prev, curr) => prev += productQuantities[curr.productId] * curr.price, 0))}
            sortable
          ></Column>
          <Column style={{ maxWidth: '6rem' }}
            sortField="cartLength"
            sortable
            body={cartCompleteBodyTemplate}
            />
        </DataTable>
      </div>
    </div>
  );
}
