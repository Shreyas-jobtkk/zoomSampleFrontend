import { Route, Routes } from "react-router-dom";
import AdministratorList from "../components/Admin/Entities/Administrator/AdministratorList";
import CompaniesList from "../components/Admin/Entities/Companies/CompaniesList";
import InterpreterEvaluationList from "../components/Admin/Entities/InterpreterEvaluation/InterpreterEvaluationList";
import InterpretersList from "../components/Admin/Entities/Interpreter/InterpretersList";
import LanguagesSupportList from "../components/Admin/Entities/LanguagesSupport/LanguagesSupportList";
import LogList from "../components/Admin/Entities/Log/LogList";
import MeetingHistoryList from "../components/Admin/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../components/Admin/Entities/MeetingInvitation/MeetingInvitationList";
import ContractorList from "../components/Admin/Entities/Contractor/ContractorList";
import StoreList from "../components/Admin/Entities/Stores/StoreList";

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
    <Route path="/ContractorList" element={<ContractorList />} />
    <Route path="/StoreList" element={<StoreList />} />
  </Routes>
);

export default AppMenuRoutes;
