import React, { useState } from "react";
import ListItem from "../listItem";

export default function ProductCheckList(props) {
  return (
    <>
      <div>
        <label>Selected products:</label>
      </div>

      {props.products.map((product) => {
        return <ListItem>{product}</ListItem>;
      })}
    </>
  );
}
