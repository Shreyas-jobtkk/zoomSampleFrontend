import { Route, Routes } from "react-router-dom";
import UserInfo from "../../Pages/Admin/User/UserInfo";
import UserCreate from "../../Pages/Admin/User/UserCreate";
import UserUpdate from "../../Pages/Admin/User/UserUpdate";
import UserUpdateConfirm from "../../Pages/Admin/User/UserUpdateConfirm";
import ProtectedRoutes from "../ProtectedRoute";
import AdministratorList from "../../Pages/Admin/User/List/AdministratorList";
import InterpretersList from "../../Pages/Admin/User/List/InterpretersList";
import ContractorList from "../../Pages/Admin/User/List/ContractorList";

const { ProtectedAdminRoute } = ProtectedRoutes;

const InterpretersListRoutes = () => (
  <Routes>
    <Route
      path="/Admin/User/Info"
      element={<ProtectedAdminRoute element={<UserInfo />} />}
    />
    <Route
      path="/Admin/User/Create"
      element={<ProtectedAdminRoute element={<UserCreate />} />}
    />
    <Route
      path="/Admin/User/Update"
      element={<ProtectedAdminRoute element={<UserUpdate />} />}
    />
    <Route
      path="/Admin/User/UpdateConfirm"
      element={<ProtectedAdminRoute element={<UserUpdateConfirm />} />}
    />
    <Route
      path="/Admin/User/AdministratorList"
      element={<ProtectedAdminRoute element={<AdministratorList />} />}
    />

    <Route
      path="/Admin/User/InterpretersList"
      element={<ProtectedAdminRoute element={<InterpretersList />} />}
    />

    <Route
      path="/Admin/User/ContractorList"
      element={<ProtectedAdminRoute element={<ContractorList />} />}
    />
  </Routes>
);

export default InterpretersListRoutes;
