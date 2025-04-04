import AdminRoutes from "./admin/index.js";
import ContractorRoutes from "./contractor/index.js";
import InterpreterRoutes from "./interpreter/index.js";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import BadRequest from "../Pages/badRequestPage.js";
import Join from "../Pages/CommentScreen/Participant/participant.js"; // Adjust the import path as needed
import Host from "../Pages/CommentScreen/Host/host.js"; // Adjust the import path as needed

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <AdminRoutes />
      <ContractorRoutes />
      <InterpreterRoutes />
      <Routes>
        <Route path="/zoomApiMeetingsJoin" element={<Join />} />
        <Route path="/zoomApiMeetingsHost" element={<Host />} />

        <Route path="/BadRequest" element={<BadRequest />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
