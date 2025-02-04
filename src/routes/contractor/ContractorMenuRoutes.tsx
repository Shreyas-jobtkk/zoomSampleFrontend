import { Route, Routes } from "react-router-dom";
import MeetingHistoryList from "../../components/Contractor/Entities/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../components/Contractor/Entities/MeetingInvitation/MeetingInvitationList";
import ContractorCallingMenu from "../../components/Contractor/Entities/InterpreterRequestMenu/InterpreterRequestMenu"; // Adjust the import path as needed
import InterpreterEvaluationList from "../../components/Interpreter/Entities/InterpreterEvaluation/InterpreterEvaluationList";

const AppMenuRoutes = () => (
  <Routes>
    <Route
      path="/ContractorMeetingHistoryList"
      element={<MeetingHistoryList />}
    />
    <Route
      path="/ContractorMeetingInvitationList"
      element={<MeetingInvitationList />}
    />
    <Route
      path="/ContractorsInterpreterEvaluationList"
      element={<InterpreterEvaluationList />}
    />
    <Route path="/ContractorCallingMenu" element={<ContractorCallingMenu />} />
  </Routes>
);

export default AppMenuRoutes;
