import { Route, Routes } from "react-router-dom";
import AdministratorList from "../../components/Admin/Entities/User/Administrator/AdministratorList";
import CompaniesList from "../../components/Admin/Entities/Companies/CompaniesList";
import InterpreterEvaluationList from "../../components/Admin/Entities/InterpreterEvaluation/InterpreterEvaluationList";
import InterpretersList from "../../components/Admin/Entities/User/Interpreter/InterpretersList";
import LanguagesSupportList from "../../components/Admin/Entities/LanguagesSupport/LanguagesSupportList";
import LogList from "../../components/Admin/Entities/Log/LogList";
import MeetingHistoryList from "../../components/Admin/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../components/Admin/Entities/MeetingInvitation/MeetingInvitationList";
import ContractorList from "../../components/Admin/Entities/User/Contractor/ContractorList";
import StoreList from "../../components/Admin/Entities/Stores/StoreList";
import ProtectedRoute from "../ProtectedRoute";

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/AdministratorList"
      element={<ProtectedRoute element={<AdministratorList />} />}
    />
    <Route
      path="/CompaniesList"
      element={<ProtectedRoute element={<CompaniesList />} />}
    />
    <Route
      path="/AdminsInterpreterEvaluationList"
      element={<ProtectedRoute element={<InterpreterEvaluationList />} />}
    />
    <Route
      path="/InterpretersList"
      element={<ProtectedRoute element={<InterpretersList />} />}
    />
    <Route
      path="/LanguagesSupportList"
      element={<ProtectedRoute element={<LanguagesSupportList />} />}
    />
    <Route path="/LogList" element={<ProtectedRoute element={<LogList />} />} />
    <Route
      path="/AdminMeetingHistoryList"
      element={<ProtectedRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/AdminMeetingInvitationList"
      element={<ProtectedRoute element={<MeetingInvitationList />} />}
    />
    <Route
      path="/ContractorList"
      element={<ProtectedRoute element={<ContractorList />} />}
    />
    <Route
      path="/StoreList"
      element={<ProtectedRoute element={<StoreList />} />}
    />
  </Routes>
);

export default AppMenuRoutes;
