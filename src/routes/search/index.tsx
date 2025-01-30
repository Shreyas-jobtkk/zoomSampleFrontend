import { Route, Routes } from "react-router-dom";
import ContractorSearch from "../../components/Admin/Entities/User/Contractor/ContractorSearch"; // Adjust the import path as needed

const NavRoutes = () => (
  <Routes>
    <Route path="/ContractorSearch" element={<ContractorSearch />} />
  </Routes>
);

export default NavRoutes;
