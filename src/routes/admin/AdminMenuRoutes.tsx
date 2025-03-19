import { Route, Routes } from "react-router-dom";
import AdministratorList from "../../Pages/Admin/Entities/User/Administrator/AdministratorList";
import CompaniesList from "../../Pages/Admin/Entities/Companies/CompaniesList";
import InterpreterEvaluationList from "../../Pages/Admin/Entities/InterpreterEvaluation/InterpreterEvaluationList";
import InterpretersList from "../../Pages/Admin/Entities/User/Interpreter/InterpretersList";
import LanguagesSupportList from "../../Pages/Admin/Entities/LanguagesSupport/LanguagesSupportList";
import LogList from "../../Pages/Admin/Entities/Log/LogList";
import MeetingHistoryList from "../../Pages/Admin/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Admin/Entities/MeetingInvitation/MeetingInvitationList";
import ContractorList from "../../Pages/Admin/Entities/User/Contractor/ContractorList";
import StoreList from "../../Pages/Admin/Entities/Stores/StoreList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/AdministratorList"
      element={<ProtectedAdminRoute element={<AdministratorList />} />}
    />
    <Route
      path="/CompaniesList"
      element={<ProtectedAdminRoute element={<CompaniesList />} />}
    />
    <Route
      path="/AdminsInterpreterEvaluationList"
      element={<ProtectedAdminRoute element={<InterpreterEvaluationList />} />}
    />
    <Route
      path="/InterpretersList"
      element={<ProtectedAdminRoute element={<InterpretersList />} />}
    />
    <Route
      path="/LanguagesSupportList"
      element={<ProtectedAdminRoute element={<LanguagesSupportList />} />}
    />
    <Route
      path="/LogList"
      element={<ProtectedAdminRoute element={<LogList />} />}
    />
    <Route
      path="/AdminMeetingHistoryList"
      element={<ProtectedAdminRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/AdminMeetingInvitationList"
      element={<ProtectedAdminRoute element={<MeetingInvitationList />} />}
    />
    <Route
      path="/ContractorList"
      element={<ProtectedAdminRoute element={<ContractorList />} />}
    />
    <Route
      path="/StoreList"
      element={<ProtectedAdminRoute element={<StoreList />} />}
    />
  </Routes>
);

export default AppMenuRoutes;
