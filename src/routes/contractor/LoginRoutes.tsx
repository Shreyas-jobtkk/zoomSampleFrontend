import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ContractorLogin from "../../Pages/Contractor/ContractorLogin";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/Contractor/login" element={<ContractorLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
