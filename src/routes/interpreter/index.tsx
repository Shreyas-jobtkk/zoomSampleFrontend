import { Route, Routes } from "react-router-dom";
import InterpreterLogin from "../../components/Interpreter/Login/InterpreterLogin"; // Adjust the import path as needed
import InterpreterMenu from "../../Pages/Interpreter/InterpreterMenuPage"; // Adjust the import path as needed

const NavRoutes = () => (
  <Routes>
    <Route path="/InterpreterLogin" element={<InterpreterLogin />} />
    <Route path="/InterpreterMenu" element={<InterpreterMenu />} />{" "}
  </Routes>
);

export default NavRoutes;
