import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { es } from "./helpers/es";

export default function DateFilter(props) {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const [dates, setDates] = useState([lastWeek, today]);
  addLocale("es", es);

  function rangeChanged(range) {
    setDates(range);
    if (range[1]) {
      props.onDateChanged(range);
    }
  }

  return (
    <div className="Container ">
      <div className="flex-auto">
          <label htmlFor="buttondisplay" className="font-bold block mb-3">
            <h3>Rango de fechas</h3>
          </label>
        <Calendar
          value={dates}
          onChange={(e) => rangeChanged(e.value)}
          selectionMode="range"
          readOnlyInput
          locale="es"
          showIcon
        />
      </div>
    </div>
  );
}
