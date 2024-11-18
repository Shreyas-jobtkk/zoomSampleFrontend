import { Route, Routes } from "react-router-dom";
import CompanyListInfo from "../Pages/Admin/AdminMenu/CompanyList/CompanyListInfoPage";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/CompanyListInfo" element={<CompanyListInfo />} />
    {/* <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} /> */}
  </Routes>
);

export default AdministratorListRoutes;
