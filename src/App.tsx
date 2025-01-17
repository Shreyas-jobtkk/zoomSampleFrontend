// App.tsx
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.scss";
import { List } from "@mui/material";
import { Box } from "@mui/joy";

const App: React.FC = () => {
  return (
    <Box className="video-chat-app">
      <Router>
        <nav>
          <List className="app-nav-bar">
            <li>
              <Link to="/ResponderLogin">通訳希望者</Link>
            </li>
            <li>
              <Link to="/InterpreterLogin">通訳者</Link>
            </li>
            <li>
              <Link to="/AdminLogin">管理者</Link>
            </li>
            <li>
              <Link to="/Sample">サンプル</Link>
            </li>
            <li>
              <Link to="/Sample2">サンプル2</Link>
            </li>
          </List>
        </nav>
        <div></div>
        <AppRoutes />
      </Router>
    </Box>
  );
};

export default App;
