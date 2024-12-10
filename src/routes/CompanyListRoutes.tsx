import { Route, Routes } from "react-router-dom";
import CompanyListInfo from "../Pages/Admin/AdminMenu/CompanyList/CompanyComponents/CompanyListInfoPage";
import CompanyCreate from "../Pages/Admin/AdminMenu/CompanyList/CompanyComponents/CompanyCreatePage";
import CompanyInfoEdit from "../Pages/Admin/AdminMenu/CompanyList/CompanyComponents/CompanyInfoEditPage";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const AdministratorListRoutes = () => (
  <Routes>
    <Route path="/CompanyListInfo" element={<CompanyListInfo />} />
    <Route path="/CompanyCreate" element={<CompanyCreate />} />
    <Route path="/CompanyInfoEdit" element={<CompanyInfoEdit />} />

    {/* <Route path="/AdministratorListEdit" element={<AdministratorListEdit />} /> */}
  </Routes>
);

export default AdministratorListRoutes;
