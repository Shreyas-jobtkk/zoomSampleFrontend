import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../components/Admin/Entities/LanguagesSupport/LanguagesCreatePage";
import LanguagesInfo from "../../components/Admin/Entities/LanguagesSupport/LanguagesInfoPage";
import LanguagesEdit from "../../components/Admin/Entities/LanguagesSupport/LanguagesEditPage";
import ProtectedRoute from "../ProtectedRoute";

const LanguagesListRoutes = () => (
  <Routes>
    <Route
      path="/LanguagesCreate"
      element={<ProtectedRoute element={<LanguagesCreate />} />}
    />
    <Route
      path="/LanguagesInfo"
      element={<ProtectedRoute element={<LanguagesInfo />} />}
    />
    <Route
      path="/LanguagesEdit"
      element={<ProtectedRoute element={<LanguagesEdit />} />}
    />
  </Routes>
);

export default LanguagesListRoutes;
