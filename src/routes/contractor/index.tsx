import ResponderLogin from "../../components/Contractor/Login/ContractorLogin"; // Adjust the import path as needed
import ResponderMenu from "../../Pages/Contractor/ContractorMenu";
import { Route, Routes } from "react-router-dom";
import ContractorCallingMenu from "../../Pages/Contractor/ContractorCallingMenu"; // Adjust the import path as needed

const NavRoutes = () => (
  <Routes>
    <Route path="/ResponderLogin" element={<ResponderLogin />} />
    <Route path="/ResponderMenu" element={<ResponderMenu />} />
    <Route path="/ContractorCallingMenu" element={<ContractorCallingMenu />} />
  </Routes>
);

export default NavRoutes;
