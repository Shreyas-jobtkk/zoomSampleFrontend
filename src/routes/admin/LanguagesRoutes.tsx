import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../Pages/Admin/LanguagesSupport/LanguageCreate";
import LanguagesInfo from "../../Pages/Admin/LanguagesSupport/LanguageInfo";
import LanguagesUpdate from "../../Pages/Admin/LanguagesSupport/LanguageUpdate";
import LanguagesUpdateConfirm from "../../Pages/Admin/LanguagesSupport/LanguageUpdateConfirm";
import ProtectedRoutes from "../ProtectedRoute";
import LanguagesSupportList from "../../Pages/Admin/LanguagesSupport/LanguagesSupportList";

const { ProtectedAdminRoute } = ProtectedRoutes;

const LanguagesListRoutes = () => (
  <Routes>
    <Route
      path="/Admin/Language/Create"
      element={<ProtectedAdminRoute element={<LanguagesCreate />} />}
    />
    <Route
      path="/Admin/Language/Info"
      element={<ProtectedAdminRoute element={<LanguagesInfo />} />}
    />
    <Route
      path="/Admin/Language/Update"
      element={<ProtectedAdminRoute element={<LanguagesUpdate />} />}
    />
    <Route
      path="/Admin/Language/UpdateConfirm"
      element={<ProtectedAdminRoute element={<LanguagesUpdateConfirm />} />}
    />
    <Route
      path="/Admin/LanguagesSupport/List"
      element={<ProtectedAdminRoute element={<LanguagesSupportList />} />}
    />
  </Routes>
);

export default LanguagesListRoutes;
