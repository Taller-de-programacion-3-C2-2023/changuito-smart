import "../styles/App.css";
import logo from "../logo.svg";
import Selector from "./Selector";
import Column from "./Columns";

export default function ColumnedContent(props) {
  const [leftComponent, rigthComponent] = props.children;
  return (
    <>
      <Column>
        {leftComponent}
        {rigthComponent}
      </Column>
    </>
  );
}
