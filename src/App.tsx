// App.tsx
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.scss";
import { List } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <List className="app-nav-bar">
          <li>
            <Link to="/Contractor">契約者</Link>
          </li>
          <li>
            <Link to="/Interpreter">通訳者</Link>
          </li>
          <li>
            <Link to="/Admin">管理者</Link>
          </li>
          <li>
            <Link to="/zoomApiMeetingsJoin">Join</Link>
          </li>
          <li>
            <Link to="/zoomApiMeetingsHost">Host</Link>
          </li>
        </List>
      </nav>
      <AppRoutes />
    </Router>
  );
};

export default App;
