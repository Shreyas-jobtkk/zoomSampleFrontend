import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../components/Interpreter/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../components/Interpreter/Entities/MeetingInvitation/MeetingInvitationList";
import InterpreterEvaluationList from "../../components/Interpreter/Entities/InterpreterEvaluation/InterpreterEvaluationList";

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/InterpreterMeetingHistoryList"
      element={<MeetingHistoryList />}
    />
    <Route
      path="/InterpretersInterpreterEvaluationList"
      element={<InterpreterEvaluationList />}
    />
    <Route
      path="/InterpreterMeetingInvitationList"
      element={<MeetingInvitationList />}
    />
  </Routes>
);

export default AppMenuRoutes;
