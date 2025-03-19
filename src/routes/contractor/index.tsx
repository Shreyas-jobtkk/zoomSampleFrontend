import ContractorLogin from "../../Pages/Contractor/Login/ContractorLogin"; // Adjust the import path as needed
import ResponderMenu from "../../Pages/Contractor/Menu/ContractorMenu";
import { Route, Routes } from "react-router-dom";
import ContractorMenuRoutes from "./ContractorMenuRoutes";
import { Box } from "@mui/material";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedContractRoute } = ProtectedRoutes;

const NavRoutes = () => (
  <Box>
    <ContractorMenuRoutes />
    <Routes>
      <Route path="/ContractorLogin" element={<ContractorLogin />} />
      <Route
        path="/ContractorMenu"
        element={<ProtectedContractRoute element={<ResponderMenu />} />}
      />
    </Routes>
  </Box>
);

export default NavRoutes;
