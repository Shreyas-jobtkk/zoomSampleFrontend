// App.tsx
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./App-Routes";
import "./App.scss";
// import "./App-Routes.js";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul className="app-nav-bar">
          <li>
            <Link to="/ResponderLogin">通訳希望者</Link>
          </li>
          <li>
            <Link to="/TranslatorLogin">通訳者</Link>
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
        </ul>
      </nav>
      <div></div>
      <AppRoutes />
    </Router>
  );
};

export default App;
