import { Route, Routes } from "react-router-dom";
import UserInfo from "../../components/Admin/Entities/User/UserInfo";
import UserCreate from "../../components/Admin/Entities/User/UserCreate";
import UserUpdate from "../../components/Admin/Entities/User/UserEdit";

const InterpretersListRoutes = () => (
  <Routes>
    <Route path="/UserInfo" element={<UserInfo />} />
    <Route path="/UserCreate" element={<UserCreate />} />
    <Route path="/UserUpdate" element={<UserUpdate />} />
  </Routes>
);

export default InterpretersListRoutes;
