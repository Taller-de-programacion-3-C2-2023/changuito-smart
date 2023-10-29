import React from "react";

export default function ListItem(props) {
  const product = props.children;
  return (
    <div className="Item-list">
      <label>
        <input id={product.id} type="checkbox" /> {product.nombre}
      </label>
    </div>
  );
}
