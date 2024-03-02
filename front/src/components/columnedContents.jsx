import React, { useRef } from "react";
import { useContainerDimensions } from "./helpers/useContainerDimensions.js";
import { Container, Section, Bar } from "@column-resizer/react";
import { Splitter, SplitterPanel } from "primereact/splitter";

export default function Column(props) {
  const componentRef = useRef();
  const { width, h } = useContainerDimensions(componentRef);

  return (
    // <Splitter style={{ height: "300px" }}>
    //   <SplitterPanel className="flex align-items-center justify-content-center">
    //     {props.children[0]}
    //   </SplitterPanel>
    //   <SplitterPanel className="flex align-items-center justify-content-center">
    //     {props.children[1]}
    //   </SplitterPanel>
    // </Splitter>
    <Container ref={componentRef}>
      <Section
        defaultSize={0.2 * width}
        minSize={0.15 * width}
        maxSize={0.4 * width}
        className="changuito-col"
      >
        {props.children[0]}
      </Section>
      <Bar size={0.005 * width} style={{ cursor: "col-resize" }} />
      <Section
        defaultSize={0.8 * width}
        maxSize={0.85 * width}
        minSize={0.6 * width}
        className="changuito-col"
      >
        {props.children[1]}
      </Section>
    </Container>
  );
}
