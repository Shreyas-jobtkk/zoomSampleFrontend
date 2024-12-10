import { Route, Routes } from "react-router-dom";
import StoreListInfo from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreListInfoPage";
import StoreCreate from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreCreatePage";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/StoreListInfo" element={<StoreListInfo />} />
    <Route path="/StoreCreate" element={<StoreCreate />} />
    {/* <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} /> */}
  </Routes>
);

export default AdministratorListRoutes;
