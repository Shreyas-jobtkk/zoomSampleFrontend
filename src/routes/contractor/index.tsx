import ResponderMenu from "../../Pages/Contractor/ContractorMenu";
import { Route, Routes } from "react-router-dom";
import ContractorLoginRoutes from "./LoginRoutes";
import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";
import MeetingHistoryList from "../../Pages/Contractor/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Contractor/MeetingInvitationList";
import ContractorCallingMenu from "../../Pages/Contractor/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../Pages/Contractor/InterpreterEvaluationList";

const { ProtectedContractRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <ContractorLoginRoutes />
    <Routes>
      <Route
        path="/Contractor/Menu"
        element={<ProtectedContractRoute element={<ResponderMenu />} />}
      />
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
        path="/Contractor/InterpretRequest"
        element={<ProtectedContractRoute element={<ContractorCallingMenu />} />}
      />
    </Routes>
  </Box>
);

export default NavRoutes;
