import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Contractor/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Contractor/MeetingInvitation/MeetingInvitationList";
import ContractorCallingMenu from "../../Pages/Contractor/InterpreterRequestMenu/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../Pages/Contractor/InterpreterEvaluation/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedContractRoute } = ProtectedRoutes;

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/ContractorMeetingHistoryList"
      element={<ProtectedContractRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/ContractorMeetingInvitationList"
      element={<ProtectedContractRoute element={<MeetingInvitationList />} />}
    />
    <Route
      path="/ContractorsInterpreterEvaluationList"
      element={
        <ProtectedContractRoute element={<InterpreterEvaluationList />} />
      }
    />
    <Route
      path="/ContractorCallingMenu"
      element={<ProtectedContractRoute element={<ContractorCallingMenu />} />}
    />
  </Routes>
);

export default AppMenuRoutes;
