import { Route, Routes } from "react-router-dom";
import UserInfo from "../../components/Admin/Entities/User/UserInfo";
import UserCreate from "../../components/Admin/Entities/User/UserCreate";
import UserUpdate from "../../components/Admin/Entities/User/UserEdit";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const InterpretersListRoutes = () => (
  <Routes>
    <Route
      path="/UserInfo"
      element={<ProtectedAdminRoute element={<UserInfo />} />}
    />
    <Route
      path="/UserCreate"
      element={<ProtectedAdminRoute element={<UserCreate />} />}
    />
    <Route
      path="/UserUpdate"
      element={<ProtectedAdminRoute element={<UserUpdate />} />}
    />
  </Routes>
);

export default InterpretersListRoutes;
