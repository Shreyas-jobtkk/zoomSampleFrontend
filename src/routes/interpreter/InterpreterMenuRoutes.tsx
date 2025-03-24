import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../Pages/Interpreter/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Interpreter/MeetingInvitation/MeetingInvitationList";
import InterpreterEvaluationList from "../../Pages/Interpreter/InterpreterEvaluation/InterpreterEvaluationList";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;
const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/InterpreterMeetingHistoryList"
      // element={<MeetingHistoryList />}
      element={<ProtectedInterpreterRoute element={<MeetingHistoryList />} />}
    />
    <Route
      path="/InterpretersInterpreterEvaluationList"
      // element={<InterpreterEvaluationList />}
      element={
        <ProtectedInterpreterRoute element={<InterpreterEvaluationList />} />
      }
    />
    <Route
      path="/InterpreterMeetingInvitationList"
      // element={<MeetingInvitationList />}
      element={
        <ProtectedInterpreterRoute element={<MeetingInvitationList />} />
      }
    />
  </Routes>
);

export default AppMenuRoutes;
