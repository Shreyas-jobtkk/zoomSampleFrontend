import { Route, Routes } from "react-router-dom";
import AdministratorList from "../../Pages/Admin/User/UserList/AdministratorList";
import CompaniesList from "../../Pages/Admin/Companies/CompaniesList";
import InterpreterEvaluationList from "../../Pages/Admin/InterpreterEvaluation/InterpreterEvaluationList";
import InterpretersList from "../../Pages/Admin/User/UserList/InterpretersList";
import LanguagesSupportList from "../../Pages/Admin/LanguagesSupport/LanguagesSupportList";
import LogList from "../../Pages/Admin/Log/LogList";
import MeetingHistoryList from "../../Pages/Admin/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Admin/MeetingInvitation/MeetingInvitationList";
import ContractorList from "../../Pages/Admin/User/UserList/ContractorList";
import StoreList from "../../Pages/Admin/Stores/StoreList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/AdministratorList"
      element={<ProtectedAdminRoute element={<AdministratorList />} />}
    />
    <Route
      path="/Companies/List"
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
      path="/Store/List"
      element={<ProtectedAdminRoute element={<StoreList />} />}
    />
  </Routes>
);

export default AppMenuRoutes;
