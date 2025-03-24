import { Route, Routes } from "react-router-dom";
import UserInfo from "../../Pages/Admin/User/UserInfo";
import UserCreate from "../../Pages/Admin/User/UserCreate";
import UserUpdate from "../../Pages/Admin/User/UserUpdate";
import UserUpdateConfirm from "../../Pages/Admin/User/UserUpdateConfirm";
import ProtectedRoutes from "../ProtectedRoute";
import AdministratorList from "../../Pages/Admin/User/UserList/AdministratorList";
import InterpretersList from "../../Pages/Admin/User/UserList/InterpretersList";
import ContractorList from "../../Pages/Admin/User/UserList/ContractorList";

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
    <Route
      path="/UserUpdateConfirm"
      element={<ProtectedAdminRoute element={<UserUpdateConfirm />} />}
    />
    <Route
      path="/AdministratorList"
      element={<ProtectedAdminRoute element={<AdministratorList />} />}
    />

    <Route
      path="/InterpretersList"
      element={<ProtectedAdminRoute element={<InterpretersList />} />}
    />

    <Route
      path="/ContractorList"
      element={<ProtectedAdminRoute element={<ContractorList />} />}
    />
  </Routes>
);

export default InterpretersListRoutes;
