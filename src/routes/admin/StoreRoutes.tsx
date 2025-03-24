import { Route, Routes } from "react-router-dom";
import StoreCreate from "../../Pages/Admin/Stores/StoreCreate";
import StoreInfo from "../../Pages/Admin/Stores/StoreInfo";
import StoreUpdate from "../../Pages/Admin/Stores/StoreUpdate";
import StoreUpdateConfirm from "../../Pages/Admin/Stores/StoreUpdateConfirm";
import ProtectedRoutes from "../ProtectedRoute";
import StoreList from "../../Pages/Admin/Stores/StoreList";

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
    <Route
      path="/Store/List"
      element={<ProtectedAdminRoute element={<StoreList />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
