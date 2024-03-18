import React, { useEffect, useState } from "react";
import Config from "../config.js";
import logo from "../images/fiuba-logo.png";

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
        <img src={logo} alt="Logo" className="Logo" />
        <div>
          <div>
            <p>Facultad de Ingeniería de la Univerisidad de Buenos Aires.</p>
          </div>
          <div>
          <p>Última actualización de precios: {scrapDate}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
