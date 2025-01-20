import AdminRoutes from "./admin/index.js";
import ContractorRoutes from "./contractor/index.js";
import InterpreterRoutes from "./interpreter/index.js";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Join from "../Pages/zoomApiMeetingsJoin/Sample.js"; // Adjust the import path as needed
import Host from "../Pages/zoomApiMeetingsHost/Sample.js"; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AdminRoutes />
      <ContractorRoutes />
      <InterpreterRoutes />
      <Routes>
        <Route path="/zoomApiMeetingsJoin" element={<Join />} />
        <Route path="/zoomApiMeetingsHost" element={<Host />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
