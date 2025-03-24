import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../Pages/Admin/LanguagesSupport/LanguageCreate";
import LanguagesInfo from "../../Pages/Admin/LanguagesSupport/LanguageInfo";
import LanguagesUpdate from "../../Pages/Admin/LanguagesSupport/LanguageUpdate";
import LanguagesUpdateConfirm from "../../Pages/Admin/LanguagesSupport/LanguageUpdateConfirm";
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
      path="/LanguagesUpdate"
      element={<ProtectedAdminRoute element={<LanguagesUpdate />} />}
    />
    <Route
      path="/LanguagesUpdateConfirm"
      element={<ProtectedAdminRoute element={<LanguagesUpdateConfirm />} />}
    />
  </Routes>
);

export default LanguagesListRoutes;
