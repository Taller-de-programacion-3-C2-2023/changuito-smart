import "./styles/App.css";
import MainPage from "./components/mainPage";
import PageContent from "./components/pageContent";

import UseCaseList from "./components/changuiListPrices/changuiListPrices.uc";
function App() {
  return (
    <div className="App">
      <MainPage pageName="[LOGO] ChanguitoSmart">
        <PageContent>
          <UseCaseList />
        </PageContent>
      </MainPage>
    </div>
  );
}

export default App;
