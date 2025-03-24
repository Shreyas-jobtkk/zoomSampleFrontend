import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Contractor/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Contractor/MeetingInvitationList";
import ContractorCallingMenu from "../../Pages/Contractor/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../Pages/Contractor/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedContractRoute } = ProtectedRoutes;

const ContractorMenuRoutes = () => (
  <Routes>
    <Route
      path="/Contractor/MeetingHistoryList"
      element={<ProtectedContractRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/Contractor/MeetingInvitationList"
      element={<ProtectedContractRoute element={<MeetingInvitationList />} />}
    />
    <Route
      path="/Contractor/InterpreterEvaluationList"
      element={
        <ProtectedContractRoute element={<InterpreterEvaluationList />} />
      }
    />
    <Route
      path="/Contractor/CallingMenu"
      element={<ProtectedContractRoute element={<ContractorCallingMenu />} />}
    />
  </Routes>
);

export default ContractorMenuRoutes;
