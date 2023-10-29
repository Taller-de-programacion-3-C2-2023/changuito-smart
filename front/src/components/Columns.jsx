import React from "react";
import { Container, Section, Bar } from "@column-resizer/react";

export default function Column(props) {
  return (
    <Container>
      <Section className="Column-left">{props.children[0]}</Section>
      <Section>{props.children[1]}</Section>
    </Container>
  );
}
