import CompanyRoutes from "./CompanyRoutes.js";
import StoreRoutes from "./StoreRoutes.js";
import UserRoutes from "../admin/UserRoutes.js";
import LanguagesRoutes from "./LanguagesRoutes.js";
import AdminLogin from "../admin/LoginRoutes.js";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AdminMenu from "../../Pages/Admin/Menu/AdminMenuPage.js"; // Adjust the import path as needed
import ProtectedRoutes from "../ProtectedRoute";
import InterpreterEvaluationList from "../../Pages/Admin/InterpreterEvaluation/InterpreterEvaluationList";
import LogList from "../../Pages/Admin/Log/LogList";
import MeetingHistoryList from "../../Pages/Admin/MeetingHistory/MeetingHistoryList";
import MeetingInvitationList from "../../Pages/Admin/MeetingInvitation/MeetingInvitationList.js";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <CompanyRoutes />
      <StoreRoutes />
      <UserRoutes />
      <LanguagesRoutes />
      <AdminLogin />
      <Routes>
        <Route
          path="/Admin/Menu"
          element={<ProtectedAdminRoute element={<AdminMenu />} />}
        />
        <Route
          path="/Admin/InterpreterEvaluationList"
          element={
            <ProtectedAdminRoute element={<InterpreterEvaluationList />} />
          }
        />
        <Route
          path="/Admin/LogList"
          element={<ProtectedAdminRoute element={<LogList />} />}
        />
        <Route
          path="/Admin/MeetingHistoryList"
          element={<ProtectedAdminRoute element={<MeetingHistoryList />} />}
        />
        <Route
          path="/Admin/MeetingInvitationList"
          element={<ProtectedAdminRoute element={<MeetingInvitationList />} />}
        />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
