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
      path="/Admin/Store/Info"
      element={<ProtectedAdminRoute element={<StoreInfo />} />}
    />
    <Route
      path="/Admin/Store/Create"
      element={<ProtectedAdminRoute element={<StoreCreate />} />}
    />
    <Route
      path="/Admin/Store/Update"
      element={<ProtectedAdminRoute element={<StoreUpdate />} />}
    />
    <Route
      path="/Admin/Store/UpdateConfirm"
      element={<ProtectedAdminRoute element={<StoreUpdateConfirm />} />}
    />
    <Route
      path="/Admin/Store/List"
      element={<ProtectedAdminRoute element={<StoreList />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
