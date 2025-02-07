import { Route, Routes } from "react-router-dom";
import UserInfo from "../../components/Admin/Entities/User/UserInfo";
import UserCreate from "../../components/Admin/Entities/User/UserCreate";
import UserUpdate from "../../components/Admin/Entities/User/UserEdit";
import ProtectedRoute from "../ProtectedRoute";

const InterpretersListRoutes = () => (
  <Routes>
    <Route
      path="/UserInfo"
      element={<ProtectedRoute element={<UserInfo />} />}
    />
    <Route
      path="/UserCreate"
      element={<ProtectedRoute element={<UserCreate />} />}
    />
    <Route
      path="/UserUpdate"
      element={<ProtectedRoute element={<UserUpdate />} />}
    />
  </Routes>
);

export default InterpretersListRoutes;
