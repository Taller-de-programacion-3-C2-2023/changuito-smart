// import "./styles/App.css";

import "./styles/Page.css";
import Header from "./components/pageHeader";
import Footer from "./components/pageFooter";
import Main from "./components/pageMain";

function App() {
  return (
    <div className="Page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
