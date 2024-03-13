import React, { useEffect, useState } from "react";
import Config from "../config.js";

export default function Footer(props) {
  const [scrapDate, setScrapDate] = useState("...");

  useEffect(
    function effectFunction() {
      async function getScrapDate() {
        const endpoint = `${Config.apiBase}/lastScrapDate`;
        const response = await fetch(endpoint);
        setScrapDate(await response.text())
      }
      try {
        getScrapDate();
      } catch (err) {
        console.log("ERROR: Fetching error", err);
      }
    },
    []
  );

  return (
    // <div className="Footer">
    <footer className="Footer">
      <div className="FooterContent">
        <img src="tu_imagen.png" alt="Logo" className="Logo" />
        <div>
          <div>
          <p>Este es un trabajo práctico para la facultad.</p>
          </div>
          <div>
          <p>Ultima actualización de precios: {scrapDate}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
