import Config from "../../config.js";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Checkbox } from "primereact/checkbox";

export default function BranchPricesTable(props) {
  const [branchesCart, setBranchesCart] = useState([]);
  const [expandedRows, setExpandedRows] = useState();
  const [productQuantities, setProductQuantities] = useState({});
  const toast = useRef(null);


  useEffect(
    function effectFunction() {
      function productsQuantity() {
        return props.selectedProductList.reduce((acc, curr) => {
          // console.log("curr   ", acc)
          acc[curr.id] = curr.quantity
          return acc
        }, {})
      }

      async function fetchOptions() {
        setProductQuantities(productsQuantity())
        console.log("setProductQuantities  ", productQuantities)

        if (!props.selectedProductList.length) {
          setBranchesCart([]);
          return;
        }
        const endpoint = `${Config.apiBase}/cart`;
        const queryString = props.selectedProductList.reduce(
          (prev, cur) => `${prev}&products=${cur.id}`,
          "?"
        );
        const response = await fetch(`${endpoint}?${queryString}`);
        const json = await response.json();
        // update quantity
        // console.log(" JSONJSONSOJOSNS ", json) no funciona, como que se carga con delauy
        // // p.cartProducts.reduce((prev, curr) => prev += productQuantities[curr.productId] * curr.price, 0)
        // for (const branch of json) {
        //   console.log(branch)
        //   branch["totalPrice"] = branch.cartProducts.reduce((prev, curr) => prev += productQuantities[curr.productId] * curr.price, 0)
        //   branch.cartProducts = branch.cartProducts.map(p => ({...p , quantity: productQuantities[p.productId]}))
        // }
        console.log("OK: Fetching response BranchPricesTable: ", json);
        // [
        //   {
        //     "_id": "10-3-633",
        //     "cartPrice": 4700,
        //     "cartLength": 3,
        //     "cartProducts": [
        //       {
        //         "productId": "7791675909226",
        //         "price": 1490
        //       },
        //       {
        //         "productId": "7790387015317",
        //         "price": 2000
        //       },
        //       {
        //         "productId": "7790710334535",
        //         "price": 1210
        //       }
        //     ],
        //     "branch": {
        //       "_id": "654ff72f7189d2c75c4c2468",
        //       "banderaId": 3,
        //       "sucursalNombre": "Bolívar 270",
        //       "id": "10-3-633",
        //       "sucursalTipo": "Autoservicio",
        //       "provincia": "AR-C",
        //       "direccion": "Bolívar 270",
        //       "banderaDescripcion": "Express",
        //       "localidad": "Ciudad Autónoma de Buenos Aires",
        //       "comercioRazonSocial": "INC S.A.",
        //       "comercioId": 10,
        //       "sucursalId": "633",
        //       "location": {
        //         "type": "Point",
        //         "coordinates": [
        //           -58.37334,
        //           -34.611219
        //         ]
        //       },
        //       "dist": {
        //         "calculated": 391.906459006686,
        //         "location": {
        //           "type": "Point",
        //           "coordinates": [
        //             -58.37334,
        //             -34.611219
        //           ]
        //         }
        //       }
        //     }
        //   },
        //   {
        //     "_id": "15-1-631",
        //     "cartPrice": 3240.62,
        //     "cartLength": 2,
        //     "cartProducts": [
        //       {
        //         "productId": "7790387015317",
        //         "price": 2101.5
        //       },
        //       {
        //         "productId": "7790710334535",
        //         "price": 1139.12
        //       }
        //     ],
        //     "branch": {
        //       "_id": "654ff72f7189d2c75c4c22fe",
        //       "banderaId": 1,
        //       "sucursalNombre": "631 - CAPITAL FEDERAL",
        //       "id": "15-1-631",
        //       "sucursalTipo": "Autoservicio",
        //       "provincia": "AR-C",
        //       "direccion": "Cl Moreno 968",
        //       "banderaDescripcion": "Supermercados DIA",
        //       "localidad": "CAPITAL FEDERAL",
        //       "comercioRazonSocial": "DIA Argentina S.A",
        //       "comercioId": 15,
        //       "sucursalId": "631",
        //       "location": {
        //         "type": "Point",
        //         "coordinates": [
        //           -58.380073,
        //           -34.612132
        //         ]
        //       },
        //       "dist": {
        //         "calculated": 264.8454832199348,
        //         "location": {
        //           "type": "Point",
        //           "coordinates": [
        //             -58.380073,
        //             -34.612132
        //           ]
        //         }
        //       }
        //     }
        //   },
        //   {
        //     "_id": "10-3-571",
        //     "cartPrice": 4489,
        //     "cartLength": 3,
        //     "cartProducts": [
        //       {
        //         "productId": "7791675909226",
        //         "price": 1490
        //       },
        //       {
        //         "productId": "7790387015317",
        //         "price": 2000
        //       },
        //       {
        //         "productId": "7790710334535",
        //         "price": 999
        //       }
        //     ],
        //     "branch": {
        //       "_id": "654ff72f7189d2c75c4c2508",
        //       "banderaId": 3,
        //       "sucursalNombre": "Tacuarí 89",
        //       "id": "10-3-571",
        //       "sucursalTipo": "Autoservicio",
        //       "provincia": "AR-C",
        //       "direccion": "Tacuarí 89",
        //       "banderaDescripcion": "Express",
        //       "localidad": "Ciudad Autónoma de Buenos Aires",
        //       "comercioRazonSocial": "INC S.A.",
        //       "comercioId": 10,
        //       "sucursalId": "571",
        //       "location": {
        //         "type": "Point",
        //         "coordinates": [
        //           -58.379243,
        //           -34.609305
        //         ]
        //       },
        //       "dist": {
        //         "calculated": 232.7762250239437,
        //         "location": {
        //           "type": "Point",
        //           "coordinates": [
        //             -58.379243,
        //             -34.609305
        //           ]
        //         }
        //       }
        //     }
        //   },
        // ]
        setBranchesCart(json);
      }
      try {
        
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error on BranchPricesTable");
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
  
  const footer = `Se encontraron ${
    branchesCart ? branchesCart.length : 0
  } sucursales cercanas.`;

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
          (prod) => (prod.id === prodIdPrice.productId) 
        ),
      };
    });
    console.log("rowExpansionTemplate ", productsData);

    return (
      <div className="p-2">
        <DataTable value={productsData} showGridlines size="small">
          <Column field="name" header="Producto" sortable></Column>
          <Column field="quantity" header="Cantidad" ></Column>
          <Column
            field="price"
            header="Precio unitario"
            body={(p) => formatCurrency(p.price)}
            sortable
          ></Column>
          <Column
            field="price"
            header="total"
            body={(p) => formatCurrency(p.price * p.quantity)}
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  };

  const cartCompleteBodyTemplate = (rowData) => {
    const allProducts = rowData.cartProducts.length === props.selectedProductList.length
    return <i className={classNames('pi', { 'true-icon pi-check-circle': allProducts, 'false-icon pi-times-circle': !allProducts })}>
      {rowData.cartProducts.length}
    </i>;
  };
  const allowExpansion = (rowData) => {
    return rowData.cartProducts.length > 0;
  };

  return (
    <div className="changuito-map">
      <h3>
        {`Resultados encontrados para ${props.selectedProductList.length} productos seleccionados`}
      </h3>
      <div className="Container">
        <Toast ref={toast} />
        <DataTable
          value={branchesCart}
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
            header="Total unitario"
            body={(p) => formatCurrency(p.cartPrice)}
            sortable
          ></Column>
          <Column
            header="Precio"
            body={(p) => formatCurrency(p.cartProducts.reduce((prev, curr) => prev += productQuantities[curr.productId] * curr.price, 0))}
            sortable
          ></Column>
          <Column style={{ maxWidth: '5rem' }} header={<Checkbox disabled></Checkbox>}
            // dataType="boolean"
            sortable
            body={cartCompleteBodyTemplate}
            // filter
            // filterElement={verifiedRowFilterTemplate} 
            // body={(data) => {
            //   if (data.cartProducts.length === props.selectedProductList.length) {
            //     return (<Tag value rounded icon="pi pi-circle" severity={'success'} ></Tag>)
            //   }
            //   else
            //     return (<Tag rounded icon="pi pi-exclamation-triangle" severity={'warning'}></Tag>)
            // }}
            />
        </DataTable>
      </div>
    </div>
  );
}
