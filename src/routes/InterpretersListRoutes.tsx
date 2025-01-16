import { Route, Routes } from "react-router-dom";
import InterpretersListInfo from "../../src/components/Admin/Entities/User/UserInfo";
// import InterpretersListCreate from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListCreate";
import InterpretersListCreate from "../../src/components/Admin/Entities/User/UserCreate";
import InterpretersListUpdate from "../../src/components/Admin/Entities/User/UserEdit";

const InterpretersListRoutes = () => (
  <Routes>
    <Route path="/InterpretersListInfo" element={<InterpretersListInfo />} />
    <Route
      path="/InterpretersListCreate"
      element={<InterpretersListCreate />}
    />
    <Route
      path="/InterpretersListUpdate"
      element={<InterpretersListUpdate />}
    />
  </Routes>
);

export default InterpretersListRoutes;
