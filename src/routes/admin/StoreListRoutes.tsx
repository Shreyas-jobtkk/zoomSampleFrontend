import { Route, Routes } from "react-router-dom";
import StoreCreate from "../../components/Admin/Entities/Stores/StoreCreate";
import StoreInfo from "../../components/Admin/Entities/Stores/StoreInfo";
import StoreEdit from "../../components/Admin/Entities/Stores/StoreEdit";
import ProtectedRoute from "../ProtectedRoute";

const AdministratorListRoutes = () => (
  <Routes>
    <Route
      path="/StoreInfo"
      element={<ProtectedRoute element={<StoreInfo />} />}
    />
    <Route
      path="/StoreCreate"
      element={<ProtectedRoute element={<StoreCreate />} />}
    />
    <Route
      path="/StoreEdit"
      element={<ProtectedRoute element={<StoreEdit />} />}
    />
  </Routes>
);

export default AdministratorListRoutes;
