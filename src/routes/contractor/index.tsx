import ResponderMenu from "../../Pages/Contractor/ContractorMenu";
import { Route, Routes } from "react-router-dom";
import ContractorMenuRoutes from "./ContractorMenuRoutes";
import ContractorLoginRoutes from "./LoginRoutes";
import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedContractRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <ContractorMenuRoutes />
    <ContractorLoginRoutes />
    <Routes>
      <Route
        path="/Contractor/Menu"
        element={<ProtectedContractRoute element={<ResponderMenu />} />}
      />
    </Routes>
  </Box>
);

export default NavRoutes;
