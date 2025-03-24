import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../Pages/Admin/Companies/CompanyInfo";
import CompanyCreate from "../../Pages/Admin/Companies/CompanyCreate";
import CompanyUpdate from "../../Pages/Admin/Companies/CompanyUpdate";
import CompanyUpdateConfirm from "../../Pages/Admin/Companies/CompanyUpdateConfirm";
import ProtectedRoutes from "../ProtectedRoute";
import CompaniesList from "../../Pages/Admin/Companies/CompaniesList";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AdministratorListRoutes = () => (
  <Routes>
    <Route
      path="/Admin/Company/Info"
      element={<ProtectedAdminRoute element={<CompanyInfo />} />}
    />
    <Route
      path="/Admin/Company/Create"
      element={<ProtectedAdminRoute element={<CompanyCreate />} />}
    />
    <Route
      path="/Admin/Company/Update"
      element={<ProtectedAdminRoute element={<CompanyUpdate />} />}
    />
    <Route
      path="/Admin/Companies/List"
      element={<ProtectedAdminRoute element={<CompaniesList />} />}
    />
    <Route
      path="/Admin/Company/UpdateConfirm"
      element={<CompanyUpdateConfirm />}
    />
  </Routes>
);

export default AdministratorListRoutes;
