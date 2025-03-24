import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ContractorLogin from "./../../Pages/Contractor/Login/ContractorLogin";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/ContractorLogin" element={<ContractorLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
