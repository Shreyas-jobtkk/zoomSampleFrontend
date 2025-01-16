import { Route, Routes } from "react-router-dom";
import LanguagesCreate from "../../components/Admin/Entities/LanguagesSupport/LanguagesCreatePage";
import LanguagesInfo from "../../components/Admin/Entities/LanguagesSupport/LanguagesInfoPage";
import LanguagesEdit from "../../components/Admin/Entities/LanguagesSupport/LanguagesEditPage";

const LanguagesListRoutes = () => (
  <Routes>
    <Route path="/LanguagesCreate" element={<LanguagesCreate />} />
    <Route path="/LanguagesInfo" element={<LanguagesInfo />} />
    <Route path="/LanguagesEdit" element={<LanguagesEdit />} />
  </Routes>
);

export default LanguagesListRoutes;
