import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import InterpreterLogin from "./../../Pages/Interpreter/Login/InterpreterLogin";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/Interpreter" element={<InterpreterLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
