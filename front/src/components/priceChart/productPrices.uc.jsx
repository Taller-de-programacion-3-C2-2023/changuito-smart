import React, { useEffect, useRef, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

import "../../styles/App.css";
import ColumnedContent from "../columnedContents";

ChartJS.register(...registerables);

const chartDefault = {
  labels: [],
  datasets: []
}

export default function ProductPrices(props) {
  const [chartData, setChartData] = useState(chartDefault);
  const chartRef = useRef();

  function filterUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  useEffect(
    function effectFunction() {
      const updatePriceRecord = (data) => {
        const datasets = []
        const labels = []
        for (const record of data) {
          const prices = record.prices.map(price => {
            const priceDate = new Date(price.date);
            const dateLabel = priceDate.toISOString().split('T')[0]
            labels.push(dateLabel);
            return { x: dateLabel, y: price.price }
          });
          const dataset = {
            label: "case " + record.product,
            data: prices,
            borderWidth: 1
          }
          datasets.push(dataset);
        }

        const newData = {
          labels: labels.filter(filterUnique),
          datasets: datasets
        };
        setChartData(newData);
      };

      async function fetchOptions() {
        const endpoint = `http://localhost:3030/prices/record`;
        const fromDate = '2024-01-01';
        const toDate = '2024-02-01';
        const queryString = `from='${fromDate}'&to='${toDate}'`
        const response = await fetch(`${endpoint}?${queryString}`);
        const json = await response.json();
        updatePriceRecord(json);
      }
      try {
        fetchOptions();
      } catch (err) {
        console.log("ERROR: Fetching error");
      }
    },
    []
  );

  return (
    <div className="productPricesChart">
      <ColumnedContent>
        <div></div>
        <div className="Page-content">
          <Line
            ref={chartRef}
            data={chartData}
          />
        </div>
      </ColumnedContent>
    </div>
  );
}
