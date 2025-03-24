import CompanyRoutes from "./CompanyRoutes.js";
import StoreRoutes from "./StoreRoutes.js";
import UserRoutes from "../admin/UserRoutes.js";
import LanguagesRoutes from "./LanguagesRoutes.js";
import AdminLogin from "../admin/LoginRoutes.js";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AdminMenu from "../../Pages/Admin/AdminMenuPage.js"; // Adjust the import path as needed
import ProtectedRoutes from "../ProtectedRoute";
import InterpreterEvaluationList from "../../Pages/Admin/InterpreterEvaluationList.js";
import LogList from "../../Pages/Admin/LogList.js";
import MeetingHistoryList from "../../Pages/Admin/MeetingHistoryList.js";
import MeetingInvitationList from "../../Pages/Admin/MeetingInvitationList.js";

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
