// import TranslatorHomePage from '../components/TranslatorHomePage'
import { Route, Routes } from "react-router-dom";
import UserMenu from "../Pages/User/UserMenuPage"; // Adjust the import path as needed
// import UserLogin from '../Pages/User/UserLoginPage'; // Adjust the import path as needed

import TranslatorLogin from "../Pages/Translator/TranslatorLoginPage"; // Adjust the import path as needed
import TranslatorMenu from "../Pages/Translator/TranslatorMenuPage"; // Adjust the import path as needed

import AdminLogin from "../Pages/Admin/AdminLoginPage"; // Adjust the import path as needed
import AdminMenu from "../Pages/Admin/AdminMenuPage"; // Adjust the import path as needed
// import CompaniesList from '../Pages/Admin/AdminMenu/CompaniesListPage';

import Sample from "../Pages/Sample/Sample"; // Adjust the import path as needed

import ResponderLogin from "../Pages/Responder/ResponderLoginPage"; // Adjust the import path as needed
import ResponderMenu from "../Pages/Responder/ResponderMenuPage";

const NavRoutes = () => (
  <Routes>
    <Route path="/ResponderLogin" element={<ResponderLogin />} />
    <Route path="/UserMenu" element={<UserMenu />} />
    <Route path="/TranslatorLogin" element={<TranslatorLogin />} />
    <Route path="/Sample" element={<Sample />} />
    <Route path="/TranslatorMenu" element={<TranslatorMenu />} />
    <Route path="/AdminLogin" element={<AdminLogin />} />
    <Route path="/AdminMenu" element={<AdminMenu />} />
    <Route path="/ResponderMenu" element={<ResponderMenu />} />
    {/* <Route path="/CompaniesList" element={<CompaniesList />} /> */}
  </Routes>
);

export default NavRoutes;
