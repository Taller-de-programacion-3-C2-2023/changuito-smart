import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Colors, registerables } from "chart.js";

ChartJS.register(...registerables);
ChartJS.register(Colors);

const chartDefault = {
  labels: [],
  datasets: [],
};

export default function ProductPrices(props) {
  const [chartData, setChartData] = useState(chartDefault);
  const chartRef = useRef();

  function buildDateLabels(minDate, maxDate) {
    const labels = [];
    let curDate = new Date(minDate);

    while (curDate <= maxDate) {
      const dateLabel = curDate.toISOString().split("T")[0];
      labels.push(dateLabel);
      curDate.setDate(curDate.getDate() + 1);
    }
    return labels;
  }

  useEffect(function effectFunction() {
    const updatePriceRecord = (data) => {
      const nameMap = {}
      props.selectedProductList.forEach(prod => nameMap[prod.id] = prod.name)
      const datasets = [];
      for (const record of data) {
        const prices = record.prices.map((price) => {
          const priceDate = new Date(price.date);
          const dateLabel = priceDate.toISOString().split("T")[0];
          return { x: dateLabel, y: price.price };
        });
        const dataset = {
          label: nameMap[record._id],
          data: prices,  /// las coordenadas 
          borderWidth: 1,
        };
        datasets.push(dataset);
      }

      const labels = buildDateLabels(props.filterDates[0], props.filterDates[1]);

      const newData = {
        labels,  // quiero que se muestr 11/12/333
        datasets: datasets,  // es cada punto del grafico en formato de coordenadas
      };
      setChartData(newData);
    };

    async function fetchOptions() {
      const endpoint = `http://localhost:3030/prices/record`;
      const fromDate = props.filterDates[0];
      const toDate = props.filterDates[1];
      console.log(`fromDate ${fromDate}, toDate ${toDate}`)

      const queryProductString = props.selectedProductList.reduce(
        (prev, cur) => `${prev}&products=${cur.id}`,
        ""
      );
      const queryDateString = `from='${fromDate}'&to='${toDate}'`;
      const response = await fetch(
        `${endpoint}?${queryProductString}&${queryDateString}`
      );
      const json = await response.json();
      updatePriceRecord(json);
    }
    try {
      fetchOptions();
    } catch (err) {
      console.log("ERROR: Fetching error ProductPrices");
    }
  }, [props.selectedProductList, props.filterDates]);

  return (
    <div className="Container Container-grey Result-size" >
      <h3>
        {`Resultados encontrados para los productos seleccionados`}
      </h3>
      <div className="Container">
        <Line ref={chartRef} data={chartData} />
      </div>
    </div>
  )
}
