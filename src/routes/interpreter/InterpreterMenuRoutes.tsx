import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Interpreter/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Interpreter/MeetingInvitationList";
import InterpreterEvaluationList from "../../Pages/Interpreter/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;
const AppMenuRoutes = () => (
  <Routes>
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
);

export default AppMenuRoutes;
