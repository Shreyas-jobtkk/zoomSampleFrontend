import AdminRoutes from "./admin/index.js";
import ContractorRoutes from "./contractor/index.js";
import InterpreterRoutes from "./interpreter/index.js";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Sample from "../Pages/Sample/Sample.js"; // Adjust the import path as needed
import Sample2 from "../Pages/zoomApiMeetings/Sample.js"; // Adjust the import path as needed

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
