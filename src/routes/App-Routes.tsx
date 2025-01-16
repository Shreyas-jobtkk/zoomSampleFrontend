import NavRoutes from "./navRoutes/NavRoutes.js";
import AppMenuRoutes from "./admin/AdminMenuRoutes.js";
import CompanyListRoutes from "./admin/CompanyListRoutes.js";
import StoreListRoutes from "./admin/StoreListRoutes.js";
import UserRoutes from "./admin/UserRoutes.js";
import LanguagesListRoutes from "./admin/LanguagesListRoutes.js";
import { Box } from "@mui/material";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AppMenuRoutes />
      <CompanyListRoutes />
      <StoreListRoutes />
      <UserRoutes />
      <LanguagesListRoutes />
      <NavRoutes />
    </Box>
  );
};

export default AppRoutes;
