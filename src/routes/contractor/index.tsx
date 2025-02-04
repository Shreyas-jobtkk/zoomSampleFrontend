import ContractorLogin from "../../components/Contractor/Login/ContractorLogin"; // Adjust the import path as needed
import ResponderMenu from "../../components/Contractor/Menu/ContractorMenu";
import { Route, Routes } from "react-router-dom";
import ContractorMenuRoutes from "./ContractorMenuRoutes";
import { Box } from "@mui/material";
const NavRoutes = () => (
  <Box>
    <ContractorMenuRoutes />
    <Routes>
      <Route path="/ContractorLogin" element={<ContractorLogin />} />
      <Route path="/ContractorMenu" element={<ResponderMenu />} />
    </Routes>
  </Box>
);

export default NavRoutes;
