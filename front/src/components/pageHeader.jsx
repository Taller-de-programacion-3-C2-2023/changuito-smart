import React from "react";
import logo from "../images/changuito-logo.png";

console.log(logo);

export default function Header(props) {
  return (
    <header className="Header">
      <img src={logo} alt="Logo" />
    </header>
  );
}
