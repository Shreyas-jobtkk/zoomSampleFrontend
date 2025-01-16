import { Route, Routes } from "react-router-dom";
import StoreCreate from "../../components/Admin/Entities/Stores/StoreCreate";
import StoreInfo from "../../components/Admin/Entities/Stores/StoreInfo";
import StoreEdit from "../../components/Admin/Entities/Stores/StoreEdit";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/StoreInfo" element={<StoreInfo />} />
    <Route path="/StoreCreate" element={<StoreCreate />} />
    <Route path="/StoreEdit" element={<StoreEdit />} />
  </Routes>
);

export default AdministratorListRoutes;
