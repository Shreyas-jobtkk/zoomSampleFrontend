import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../Pages/Admin/Companies/CompanyInfo";
import CompanyCreate from "../../Pages/Admin/Companies/CompanyCreate";
import CompanyUpdate from "../../Pages/Admin/Companies/CompanyUpdate";
import CompanyUpdateConfirm from "../../Pages/Admin/Companies/CompanyUpdateConfirm";
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
      path="/CompanyUpdate"
      element={<ProtectedAdminRoute element={<CompanyUpdate />} />}
    />
    <Route path="/CompanyUpdateConfirm" element={<CompanyUpdateConfirm />} />
  </Routes>
);

export default AdministratorListRoutes;
