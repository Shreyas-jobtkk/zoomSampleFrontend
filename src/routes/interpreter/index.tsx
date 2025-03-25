import { Route, Routes } from "react-router-dom";
import InterpreterMenu from "../../Pages/Interpreter/InterpreterMenu"; // Adjust the import path as needed
import InterpreterLoginRoutes from "./LoginRoutes";
import MeetingHistoryList from "../../Pages/Interpreter/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Interpreter/MeetingInvitationList";
import InterpreterEvaluationList from "../../Pages/Interpreter/InterpreterEvaluationList";

import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <InterpreterLoginRoutes />
    <Routes>
      <Route
        path="/Interpreter/Menu"
        element={<ProtectedInterpreterRoute element={<InterpreterMenu />} />}
      />
      <Route
        path="/Interpreter/MeetingHistoryList"
        element={<ProtectedInterpreterRoute element={<MeetingHistoryList />} />}
      />
      <Route
        path="/Interpreter/InterpreterEvaluationList"
        element={
          <ProtectedInterpreterRoute element={<InterpreterEvaluationList />} />
        }
      />
      <Route
        path="/Interpreter/MeetingInvitationList"
        element={
          <ProtectedInterpreterRoute element={<MeetingInvitationList />} />
        }
      />
    </Routes>
  </Box>
);

export default NavRoutes;
