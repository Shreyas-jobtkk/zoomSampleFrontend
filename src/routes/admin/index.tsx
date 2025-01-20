import AppMenuRoutes from "../admin/AdminMenuRoutes.js";
import CompanyListRoutes from "../admin/CompanyListRoutes.js";
import StoreListRoutes from "../admin/StoreListRoutes.js";
import UserRoutes from "../admin/UserRoutes.js";
import LanguagesListRoutes from "../admin/LanguagesListRoutes.js";
import AdminLogin from "./../../components/Admin/Login/AdminLogin"; // Adjust the import path as needed
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AdminMenu from "../../components/Admin/Menu/AdminMenuPage.js"; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AppMenuRoutes />
      <CompanyListRoutes />
      <StoreListRoutes />
      <UserRoutes />
      <LanguagesListRoutes />
      <Routes>
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
