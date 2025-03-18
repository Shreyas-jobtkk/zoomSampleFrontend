import { Route, Routes } from "react-router-dom";
import StoreCreate from "../../components/Admin/Entities/Stores/StoreCreate";
import StoreInfo from "../../components/Admin/Entities/Stores/StoreInfo";
import StoreUpdate from "../../components/Admin/Entities/Stores/StoreUpdate";
import StoreUpdateConfirm from "../../components/Admin/Entities/Stores/StoreUpdateConfirm";
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
      path="/StoreUpdate"
      element={<ProtectedAdminRoute element={<StoreUpdate />} />}
    />
    <Route
      path="/StoreUpdateConfirm"
      element={<ProtectedAdminRoute element={<StoreUpdateConfirm />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
