// import TranslatorHomePage from '../components/TranslatorHomePage'
import { Route, Routes } from "react-router-dom";
import AdministratorList from "../Pages/Admin/AdminMenu/AdministratorListPage";
import CompaniesList from "../Pages/Admin/AdminMenu/CompaniesListPage";
import InterpreterEvaluationList from "../Pages/Admin/AdminMenu/InterpreterEvaluationListPage";
import InterpretersList from "../Pages/Admin/AdminMenu/InterpretersListPage";
import LanguagesSupportList from "../Pages/Admin/AdminMenu/LanguagesSupportListPage";
import LogList from "../Pages/Admin/AdminMenu/LogListPage";
import MeetingHistoryList from "../Pages/Admin/AdminMenu/MeetingHistoryListPage";
import MeetingInvitationList from "../Pages/Admin/AdminMenu/MeetingInvitationListPage";
import RespondersListPage from "../Pages/Admin/AdminMenu/RespondersListPage";
import StoreListPage from "../Pages/Admin/AdminMenu/StoreListPage";

const AppMenuRoutes = () => (
  <Routes>
    <Route path="/AdministratorList" element={<AdministratorList />} />
    <Route path="/CompaniesList" element={<CompaniesList />} />
    <Route
      path="/InterpreterEvaluationList"
      element={<InterpreterEvaluationList />}
    />
    <Route path="/InterpretersList" element={<InterpretersList />} />
    <Route path="/LanguagesSupportList" element={<LanguagesSupportList />} />
    <Route path="/LogList" element={<LogList />} />
    <Route path="/MeetingHistoryList" element={<MeetingHistoryList />} />
    <Route path="/MeetingInvitationList" element={<MeetingInvitationList />} />
    <Route path="/RespondersList" element={<RespondersListPage />} />
    <Route path="/StoreList" element={<StoreListPage />} />
  </Routes>
);

export default AppMenuRoutes;
