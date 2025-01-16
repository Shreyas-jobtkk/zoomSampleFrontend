import { Route, Routes } from "react-router-dom";
// import StoreListInfo from "../Pages/Admin/AdminMenu/StoreList/StoreComponents/StoreInfoPage";
import StoreCreate from "../components/Admin/Entities/Stores/StoreCreate";
import StoreInfo from "../components/Admin/Entities/Stores/StoreInfo";
import StoreEdit from "../components/Admin/Entities/Stores/StoreEdit";
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
