// App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "./App.scss";

import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <NavBar />
      </nav>
      <AppRoutes />
    </Router>
  );
};

export default App;
