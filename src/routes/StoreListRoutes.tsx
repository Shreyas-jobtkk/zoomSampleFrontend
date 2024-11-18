import { Route, Routes } from "react-router-dom";
import StoreListInfo from "../Pages/Admin/AdminMenu/StoreList/StoreListInfoPage";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/StoreListInfo" element={<StoreListInfo />} />
    {/* <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} /> */}
  </Routes>
);

export default AdministratorListRoutes;
