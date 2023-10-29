import "../styles/App.css";
import NavegationBar from "./navegationBar";

export default function PageContent(props) {
  const contentComponent = props.children;
  return (
    <>
      <NavegationBar />
      <section className="App-page">{contentComponent}</section>
    </>
  );
}
