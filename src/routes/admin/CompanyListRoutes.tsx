import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../components/Admin/Entities/Companies/CompanyInfo";
import CompanyCreate from "../../components/Admin/Entities/Companies/CompanyCreate";
import CompanyEdit from "../../components/Admin/Entities/Companies/CompanyEdit";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/CompanyInfo" element={<CompanyInfo />} />
    <Route path="/CompanyCreate" element={<CompanyCreate />} />
    <Route path="/CompanyEdit" element={<CompanyEdit />} />
  </Routes>
);

export default AdministratorListRoutes;
