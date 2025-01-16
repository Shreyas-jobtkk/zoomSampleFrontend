import AdminRoutes from "../../src/routes/admin/index.js";
import ContractorRoutes from "../../src/routes/contractor/index.js";
import InterpreterRoutes from "../../src/routes/interpreter/index.js";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Sample from "../Pages/Sample/Sample"; // Adjust the import path as needed
import Sample2 from "../Pages/zoomApiMeetings/Sample"; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AdminRoutes />
      <ContractorRoutes />
      <InterpreterRoutes />
      <Routes>
        <Route path="/Sample" element={<Sample />} />
        <Route path="/Sample2" element={<Sample2 />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
