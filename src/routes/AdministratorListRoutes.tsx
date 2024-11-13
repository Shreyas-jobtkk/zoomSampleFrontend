import { Route, Routes } from "react-router-dom";
import AdministratorListInfo from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListInfoPage";
import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/AdministratorListInfo" element={<AdministratorListInfo />} />
    <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} />
  </Routes>
);

export default AdministratorListRoutes;
