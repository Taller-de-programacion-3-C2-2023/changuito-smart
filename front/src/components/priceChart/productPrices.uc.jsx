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

  function filterUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function buildDateLabels(minDate, maxDate) {
    const labels = [];

    while (minDate <= maxDate) {
      const dateLabel = minDate.toISOString().split("T")[0];
      labels.push(dateLabel);
      minDate.setDate(minDate.getDate() + 1);
    }
    return labels;
  }

  useEffect(function effectFunction() {
    const updatePriceRecord = (data) => {
      const datasets = [];
      let minDate = new Date();
      let maxDate = new Date();
      for (const record of data) {
        const prices = record.prices.map((price) => {
          const priceDate = new Date(price.date);
          minDate = minDate < priceDate ? minDate : priceDate;
          maxDate = maxDate > priceDate ? maxDate : priceDate;
          const dateLabel = priceDate.toISOString().split("T")[0];
          return { x: dateLabel, y: price.price };
        });
        const dataset = {
          label: "case " + record._id,
          data: prices,  /// las coordenadas 
          borderWidth: 1,
        };
        datasets.push(dataset);
      }

      const labels = buildDateLabels(minDate, maxDate);

      const newData = {
        labels,  // quiero que se muestr 11/12/333
        datasets: datasets,  // es cada punto del grafico en formato de coordenadas
      };
      setChartData(newData);
    };

    async function fetchOptions() {
      const endpoint = `http://localhost:3030/prices/record`;
      const fromDate = "2024-03-01";
      const toDate = "2024-03-04";
      const selectedProductList = [
        { id: 7791675909196 },
        { id: 7795735000328 },
      ];
      const queryProductString = selectedProductList.reduce(
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
      console.log("ERROR: Fetching error");
    }
  }, []);

  return <Line ref={chartRef} data={chartData} />;
}
