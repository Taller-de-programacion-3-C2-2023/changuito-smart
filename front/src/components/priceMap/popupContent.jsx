import React, { useState } from "react";
import { formatCurrency } from "../helpers/formatCurrency";

export default function PopupContent(props) {
  return (
    <div>
      <i className="pi pi-shopping-cart text-primary-500 text-2xl"></i>
      <h3 className="m-0 text-3xl font-bold ">
        {props.branch.banderaDescripcion}
      </h3>
      <hr></hr>
      <div className="flex flex-column gap-4 w-full">
        <div class="flex align-items-center justify-content-start">
          <p className="m-0 font-semibold text-base ">
            {props.branch.sucursalTipo}
          </p>
          <p className="m-0 font-italic text-base ">
            - {props.branch.direccion}
          </p>
        </div>
        <p className="m-0 font-bold text-base ">
          Total: {formatCurrency(props.cartInfo.total)}
        </p>
      </div>
    </div>
  );
}