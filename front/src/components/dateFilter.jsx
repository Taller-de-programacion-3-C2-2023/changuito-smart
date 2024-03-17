import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function DateFilter(props) {
  const today = new Date();
  const lastWeek = new Date()
  lastWeek.setDate(today.getDate() - 7);

  const [dates, setDates] = useState([lastWeek, today]);

  function rangeChanged(range) {
    setDates(range);
    if (range[1]) {
      props.onDateChanged(range);
    }
  }

  return (<div className="Container">
    <p> Rango de fechas </p>
    <Calendar value={dates} onChange={(e) => rangeChanged(e.value)} selectionMode="range" readOnlyInput />
    </div>);
}