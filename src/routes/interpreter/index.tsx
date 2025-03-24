import { Route, Routes } from "react-router-dom";
import InterpreterMenu from "../../Pages/Interpreter/Menu/InterpreterMenu"; // Adjust the import path as needed
import InterpreterMenuRoutes from "./InterpreterMenuRoutes";
import InterpreterLoginRoutes from "./LoginRoutes";

import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <InterpreterMenuRoutes />
    <InterpreterLoginRoutes />
    <Routes>
      <Route
        path="/Interpreter/Menu"
        element={<ProtectedInterpreterRoute element={<InterpreterMenu />} />}
      />
    </Routes>
  </Box>
);

export default NavRoutes;
