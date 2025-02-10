import { Route, Routes } from "react-router-dom";
import StoreCreate from "../../components/Admin/Entities/Stores/StoreCreate";
import StoreInfo from "../../components/Admin/Entities/Stores/StoreInfo";
import StoreEdit from "../../components/Admin/Entities/Stores/StoreEdit";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const AdministratorListRoutes = () => (
  <Routes>
    <Route
      path="/StoreInfo"
      element={<ProtectedAdminRoute element={<StoreInfo />} />}
    />
    <Route
      path="/StoreCreate"
      element={<ProtectedAdminRoute element={<StoreCreate />} />}
    />
    <Route
      path="/StoreEdit"
      element={<ProtectedAdminRoute element={<StoreEdit />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
