import { Route, Routes } from "react-router-dom";
import InterpretersListInfo from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListInfo";
// import AdministratorListEdit from "../Pages/Admin/AdminMenu/AdministratorList/AdministratorListEditPage";

const InterpretersListRoutes = () => (
  <Routes>
    <Route path="/InterpretersListInfo" element={<InterpretersListInfo />} />
    {/* <Route path="/InterpretersListEdit" element={<InterpretersListEdit />} /> */}
  </Routes>
);

export default InterpretersListRoutes;
