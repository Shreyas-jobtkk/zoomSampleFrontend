import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Contractor/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Contractor/MeetingInvitation/MeetingInvitationList";
import ContractorCallingMenu from "../../Pages/Contractor/InterpreterRequestMenu/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../Pages/Contractor/InterpreterEvaluation/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedContractRoute } = ProtectedRoutes;

const ContractorMenuRoutes = () => (
  <Routes>
    <Route
      path="/Contractor/Menu/MeetingHistoryList"
      element={<ProtectedContractRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/Contractor/Menu/MeetingInvitationList"
      element={<ProtectedContractRoute element={<MeetingInvitationList />} />}
    />
    <Route
      path="/Contractor/Menu/InterpreterEvaluationList"
      element={
        <ProtectedContractRoute element={<InterpreterEvaluationList />} />
      }
    />
    <Route
      path="/Contractor/Menu/CallingMenu"
      element={<ProtectedContractRoute element={<ContractorCallingMenu />} />}
    />
  </Routes>
);

export default ContractorMenuRoutes;
