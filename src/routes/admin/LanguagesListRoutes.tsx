import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../Pages/Admin/Entities/LanguagesSupport/LanguageCreate";
import LanguagesInfo from "../../Pages/Admin/Entities/LanguagesSupport/LanguageInfo";
import LanguagesUpdate from "../../Pages/Admin/Entities/LanguagesSupport/LanguageUpdate";
import LanguagesUpdateConfirm from "../../Pages/Admin/Entities/LanguagesSupport/LanguageUpdateConfirm";
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
