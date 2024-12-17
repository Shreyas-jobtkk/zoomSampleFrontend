import { Route, Routes } from "react-router-dom";
import InterpretersListInfo from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListInfo";
import InterpretersListCreate from "../Pages/Admin/AdminMenu/InterpretersList/InterpretersListComponents/InterpretersListCreate";

const InterpretersListRoutes = () => (
  <Routes>
    <Route path="/InterpretersListInfo" element={<InterpretersListInfo />} />
    <Route
      path="/InterpretersListCreate"
      element={<InterpretersListCreate />}
    />
  </Routes>
);

export default InterpretersListRoutes;
