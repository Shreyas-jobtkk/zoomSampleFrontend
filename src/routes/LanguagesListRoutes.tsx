import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../Pages/Admin/AdminMenu/LanguagesList/LanguagesListComponents/LanguagesCreatePage";
import LanguagesInfo from "../Pages/Admin/AdminMenu/LanguagesList/LanguagesListComponents/LanguagesInfoPage";
import LanguagesEdit from "../Pages/Admin/AdminMenu/LanguagesList/LanguagesListComponents/LanguagesEditPage";

const LanguagesListRoutes = () => (
  <Routes>
    <Route path="/LanguagesCreate" element={<LanguagesCreate />} />
    <Route path="/LanguagesInfo" element={<LanguagesInfo />} />
    <Route path="/LanguagesEdit" element={<LanguagesEdit />} />
  </Routes>
);

export default LanguagesListRoutes;
