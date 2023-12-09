// import "./styles/App.css";

import "./styles/Page.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import BranchMap from "./components/branchMap";
import UseCaseList from "./components/changuiListPrices/cartPrices.uc";
import Header from "./components/pageHeader";
import Footer from "./components/pageFooter";
import Main from "./components/pageMain";

function App() {
  return (
    // <PrimeReactProvider>
    <div className="Page">
      <Header />
      {/* <UseCaseList /> */}
      <Main />
      <Footer />
    </div>
    // </PrimeReactProvider>
  );
}

export default App;
