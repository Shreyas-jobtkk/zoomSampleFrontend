import AdminMenuRoutes from "../admin/AdminMenuRoutes.js";
import CompanyListRoutes from "../admin/CompanyListRoutes.js";
import StoreListRoutes from "../admin/StoreListRoutes.js";
import UserRoutes from "../admin/UserRoutes.js";
import LanguagesListRoutes from "../admin/LanguagesListRoutes.js";
import AdminLogin from "../admin/LoginRoutes.js";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AdminMenu from "../../Pages/Admin/Menu/AdminMenuPage.js"; // Adjust the import path as needed
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AdminMenuRoutes />
      <CompanyListRoutes />
      <StoreListRoutes />
      <UserRoutes />
      <LanguagesListRoutes />
      <AdminLogin />
      <Routes>
        <Route
          path="/Admin/Menu"
          element={<ProtectedAdminRoute element={<AdminMenu />} />}
        />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
