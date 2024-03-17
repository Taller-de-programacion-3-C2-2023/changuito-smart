import React, { useState } from "react";
import { formatCurrency } from "../helpers/formatCurrency";

export default function PopupContent(props) {
  return (
    <div >
      <i className="pi pi-shopping-cart text-primary-500 text-2xl"></i>
      <h3 className="m-0 text-3xl font-bold ">{props.branch.banderaDescripcion}</h3>
      <hr></hr>
      <div className="flex flex-column gap-4 w-full">
        <p className="m-0 font-semibold text-base ">
          {props.branch.sucursalTipo}
        </p>
        <p className="m-0  font-bold ">
          Total: {formatCurrency(props.cartInfo.total)} 
        </p>
      </div>
    </div>
  );
}
// {
//   "branch": {
//     "_id": "65ec7967934334f0014b2edb",
//     "banderaId": 1,
//     "sucursalNombre": "LIMA",
//     "id": "4-1-289",
//     "sucursalTipo": "Autoservicio",
//     "provincia": "AR-C",
//     "direccion": "Lima 899",
//     "banderaDescripcion": "ESTACION LIMA S.A.",
//     "localidad": "CAPITAL FEDERAL",
//     "comercioRazonSocial": "Estación Lima S.A.",
//     "comercioId": 4,
//     "sucursalId": "289",
//     "location": {
//       "type": "Point",
//       "coordinates": [
//         -58.38147,
//         -34.617902
//       ]
//     },
//     "dist": {
//       "calculated": 856.3026985333439,
//       "location": {
//         "type": "Point",
//         "coordinates": [
//           -58.38147,
//           -34.617902
//         ]
//       }
//     }
//   }
// }