import { Route, Routes } from "react-router-dom";
// import StoreListInfo from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreInfoPage";
import StoreCreate from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreCreatePage";
import StoreInfo from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreInfoPage";
import StoreEdit from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreEditPage";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/StoreInfo" element={<StoreInfo />} />
    <Route path="/StoreCreate" element={<StoreCreate />} />
    <Route path="/StoreEdit" element={<StoreEdit />} />
    {/* <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} /> */}
  </Routes>
);

export default AdministratorListRoutes;
