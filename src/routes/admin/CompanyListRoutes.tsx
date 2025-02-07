import { Route, Routes } from "react-router-dom";
import CompanyInfo from "../../components/Admin/Entities/Companies/CompanyInfo";
import CompanyCreate from "../../components/Admin/Entities/Companies/CompanyCreate";
import CompanyEdit from "../../components/Admin/Entities/Companies/CompanyEdit";
import ProtectedRoute from "../ProtectedRoute";

const AdministratorListRoutes = () => (
  <Routes>
    <Route
      path="/CompanyInfo"
      element={<ProtectedRoute element={<CompanyInfo />} />}
    />
    <Route
      path="/CompanyCreate"
      element={<ProtectedRoute element={<CompanyCreate />} />}
    />
    <Route
      path="/CompanyEdit"
      element={<ProtectedRoute element={<CompanyEdit />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
