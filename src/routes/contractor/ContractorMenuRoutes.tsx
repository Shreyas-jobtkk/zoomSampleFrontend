import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../components/Contractor/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../components/Contractor/Entities/MeetingInvitation/MeetingInvitationList";
import ContractorCallingMenu from "../../components/Contractor/Entities/InterpreterRequestMenu/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../components/Interpreter/Entities/InterpreterEvaluation/InterpreterEvaluationList";
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
