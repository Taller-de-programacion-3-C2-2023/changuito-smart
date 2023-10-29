import logo from "./logo.svg";
import "./styles/App.css";
import Selector from "./components/Selector";
import Column from "./components/Columns";

function App() {
  return (
    <div class="flex-container" className="App">
      {/* <header className="App-header">
        <div className="Selector-contenedor">
          <Selector />
        </div>
        <img src={logo} className="App-logo" alt="logo" /> 
         <p>REACT APP</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <header className="App-header">
        <h1>Header</h1>
      </header>
      <nav className="navbar">The Software House - Container pattern</nav>
      <section className="App-page">
        <Column>
          <Selector />
          <div>
            <h3> Titulo columna dos</h3>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </Column>
      </section>

      <footer className="App-header">
        <h4>Footer</h4>
      </footer>
      {/* <main className="App-header">
        <div className="Selector-contenedor">
          <Column>
            <Selector />
            <h3> Titulo columna dos</h3>
          </Column>
        </div>
      </main> */}
    </div>
  );
}

{
  /* <div className="container">
      <nav className="navbar">The Software House - Container pattern</nav>
      <main className="main">
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            {data?.results.map(({ id, name, image }) => {
              return (
                <div key={id} className="character">
                  <img className="image" src={image} alt={name} />
                  <p className="name">{name}</p>
                </div>
              );
            })}
          </>
        )}
      </main>
    </div> */
}

export default App;
