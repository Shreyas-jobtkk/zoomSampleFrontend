import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import InterpreterLogin from "../../Pages/Interpreter/InterpreterLogin";

const AppRoutes: React.FC = () => {
  return (
    <Box>
      <Routes>
        <Route path="/Interpreter/login" element={<InterpreterLogin />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
