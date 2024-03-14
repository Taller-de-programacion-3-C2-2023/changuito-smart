import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { formatCurrency } from "../helpers/formatCurrency";

export default function BranchPricesTable(props) {
  const [expandedRows, setExpandedRows] = useState();
  const toast = useRef(null);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Sucursales</span>
      {/* <Button icon="pi pi-refresh" rounded raised /> */}
    </div>
  );
  
  const footer = `Se encontraron ${
    props.cartsByBranches ? props.cartsByBranches.length : 0
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

  const rowExpansionTemplate = (cart) => {
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
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column style={{ minWidth: '15rem' }}
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
