import React from "react";

export default function ListItem(props) {
  return (
    <div className="Item-list">
      <label>
        <input id={product.id} type="checkbox" /> {product.name}
      </label>
    </div>
  );
}
