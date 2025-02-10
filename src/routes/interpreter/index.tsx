import { Route, Routes } from "react-router-dom";
import InterpreterLogin from "../../components/Interpreter/Login/InterpreterLogin"; // Adjust the import path as needed
import InterpreterMenu from "../../components/Interpreter/Menu/InterpreterMenu"; // Adjust the import path as needed
import InterpreterMenuRoutes from "./InterpreterMenuRoutes";
import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedInterpreterRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <InterpreterMenuRoutes />
    <Routes>
      <Route path="/InterpreterLogin" element={<InterpreterLogin />} />
      <Route
        path="/InterpreterMenu"
        element={<ProtectedInterpreterRoute element={<InterpreterMenu />} />}
      />
    </Routes>
  </Box>
);

export default NavRoutes;
