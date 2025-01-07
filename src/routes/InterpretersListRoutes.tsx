import { Route, Routes } from "react-router-dom";
import InterpretersListInfo from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListInfo";
import InterpretersListCreate from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListCreate";
import InterpretersListUpdate from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListUpdate";

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
