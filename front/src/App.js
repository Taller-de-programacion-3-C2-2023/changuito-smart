import "./styles/App.css";
import MainPage from "./components/mainPage";
import PageContent from "./components/pageContent";
import BranchMap from "./components/branchMap";

import UseCaseList from "./components/changuiListPrices/changuiListPrices.uc";
function App() {
  return (
    <div className="App">
      <MainPage pageName="[LOGO] ChanguitoSmart">
        <PageContent>
          <UseCaseList />
          <BranchMap />
        </PageContent>
      </MainPage>
    </div>
  );
}

export default App;
