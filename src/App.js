import LoginPage from "./Components/LandingPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./Components/StateManagment/CommonContext";
import AuthentatePage from "./Components/Home/AuthentatePage";
import PowerBIPortfolioReports from "./Components/PowerBiPages/PowerBIPortfolioReports";
import PowerBIAnalysisReports from "./Components/PowerBiPages/PowerBIAnalysisReports";
import PowerBIDiveDeepReports from "./Components/PowerBiPages/PowerBIDiveDeepReports";
import MatsuriAi from "./Components/OtherPages/MAtsuriAi";
import Error404 from "./Components/OtherPages/Error404";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <DataProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/home" element={<AuthentatePage />}>
            <Route path="portfolio" element={<PowerBIPortfolioReports />} />
            <Route path="dive-deep" element={<PowerBIDiveDeepReports />} />
            <Route path="analysis" element={<PowerBIAnalysisReports />} />
            <Route path="matsuri-ai" element={<MatsuriAi />} />
          </Route>

          <Route path="*" element={<Error404 />} />

        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
