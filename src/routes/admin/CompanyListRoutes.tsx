import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../components/Admin/Entities/Companies/CompanyInfo";
import CompanyCreate from "../../components/Admin/Entities/Companies/CompanyCreate";
import CompanyEdit from "../../components/Admin/Entities/Companies/CompanyEdit";
import CompanyEditConfirm from "../../components/Admin/Entities/Companies/CompanyEditConfirm";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AdministratorListRoutes = () => (
  <Routes>
    <Route
      path="/CompanyInfo"
      element={<ProtectedAdminRoute element={<CompanyInfo />} />}
    />
    <Route
      path="/CompanyCreate"
      element={<ProtectedAdminRoute element={<CompanyCreate />} />}
    />
    <Route
      path="/CompanyEdit"
      element={<ProtectedAdminRoute element={<CompanyEdit />} />}
    />
    <Route path="/CompanyEditConfirm" element={<CompanyEditConfirm />} />
  </Routes>
);

export default AdministratorListRoutes;
