import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AdminLogin from "../../Pages/Admin/AdminLogin";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/Admin/login" element={<AdminLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
