import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../components/Admin/Entities/LanguagesSupport/LanguagesCreatePage";
import LanguagesInfo from "../../components/Admin/Entities/LanguagesSupport/LanguagesInfoPage";
import LanguagesEdit from "../../components/Admin/Entities/LanguagesSupport/LanguagesEditPage";
import LanguagesEditConfirm from "../../components/Admin/Entities/LanguagesSupport/LanguagesEditConfirmPage";
import ProtectedRoutes from "../ProtectedRoute";

const { ProtectedAdminRoute } = ProtectedRoutes;

const LanguagesListRoutes = () => (
  <Routes>
    <Route
      path="/LanguagesCreate"
      element={<ProtectedAdminRoute element={<LanguagesCreate />} />}
    />
    <Route
      path="/LanguagesInfo"
      element={<ProtectedAdminRoute element={<LanguagesInfo />} />}
    />
    <Route
      path="/LanguagesEdit"
      element={<ProtectedAdminRoute element={<LanguagesEdit />} />}
    />
    <Route
      path="/LanguagesEditConfirm"
      element={<ProtectedAdminRoute element={<LanguagesEditConfirm />} />}
    />
  </Routes>
);

export default LanguagesListRoutes;
