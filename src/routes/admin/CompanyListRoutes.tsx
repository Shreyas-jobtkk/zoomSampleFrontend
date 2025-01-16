import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../components/Admin/Entities/Companies/CompanyInfo";
import CompanyCreate from "../../components/Admin/Entities/Companies/CompanyCreate";
import CompanyInfoEdit from "../../components/Admin/Entities/Companies/CompanyEdit";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/CompanyInfo" element={<CompanyInfo />} />
    <Route path="/CompanyCreate" element={<CompanyCreate />} />
    <Route path="/CompanyInfoEdit" element={<CompanyInfoEdit />} />
  </Routes>
);

export default AdministratorListRoutes;
