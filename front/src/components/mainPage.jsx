import "../styles/App.css";

export default function MainPage(props) {
  const pageContentComponent = props.children;
  return (
    <>
      <header className="App-header">
        <h1>{props.pageName}</h1>
      </header>
      <section className="App-page">{pageContentComponent}</section>
      <footer className="App-header">
        <h4>Footer</h4>
      </footer>
    </>
  );
}
