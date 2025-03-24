import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Interpreter/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Interpreter/MeetingInvitation/MeetingInvitationList";
import InterpreterEvaluationList from "../../Pages/Interpreter/InterpreterEvaluation/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;
const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/Interpreter/Menu/MeetingHistoryList"
      element={<ProtectedInterpreterRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/Interpreter/Menu/InterpreterEvaluationList"
      element={
        <ProtectedInterpreterRoute element={<InterpreterEvaluationList />} />
      }
    />
    <Route
      path="/Interpreter/Menu/MeetingInvitationList"
      element={
        <ProtectedInterpreterRoute element={<MeetingInvitationList />} />
      }
    />
  </Routes>
);

export default AppMenuRoutes;
