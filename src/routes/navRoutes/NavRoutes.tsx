import { Route, Routes } from "react-router-dom";
import UserMenu from "../../Pages/User/UserMenuPage"; // Adjust the import path as needed
import InterpreterLogin from "../../components/Interpreter/Login/InterpreterLogin"; // Adjust the import path as needed
import InterpreterMenu from "../../Pages/Interpreter/InterpreterMenuPage"; // Adjust the import path as needed
import AdminLogin from "../../components/Admin/Login/AdminLogin"; // Adjust the import path as needed
import AdminMenu from "../../Pages/Admin/AdminMenuPage"; // Adjust the import path as needed
import Sample from "../../Pages/Sample/Sample"; // Adjust the import path as needed
import Sample2 from "../../Pages/zoomApiMeetings/Sample"; // Adjust the import path as needed
import ResponderLogin from "../../components/Contractor/Login/ContractorLogin"; // Adjust the import path as needed
import ResponderMenu from "../../Pages/Responder/ResponderMenuPage";

const NavRoutes = () => (
  <Routes>
    <Route path="/ResponderLogin" element={<ResponderLogin />} />
    <Route path="/UserMenu" element={<UserMenu />} />
    <Route path="/InterpreterLogin" element={<InterpreterLogin />} />
    <Route path="/Sample" element={<Sample />} />
    <Route path="/Sample2" element={<Sample2 />} />
    <Route path="/InterpreterMenu" element={<InterpreterMenu />} />
    <Route path="/AdminLogin" element={<AdminLogin />} />
    <Route path="/AdminMenu" element={<AdminMenu />} />
    <Route path="/ResponderMenu" element={<ResponderMenu />} />
    {/* <Route path="/CompaniesList" element={<CompaniesList />} /> */}
  </Routes>
);

export default NavRoutes;
