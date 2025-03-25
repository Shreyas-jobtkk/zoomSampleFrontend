import React from "react";
import { Link } from "react-router-dom";
import { List } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <List className="app-nav-bar">
      <li>
        <Link to="/Contractor/login">契約者</Link>
      </li>
      <li>
        <Link to="/Interpreter/login">通訳者</Link>
      </li>
      <li>
        <Link to="/Admin/login">管理者</Link>
      </li>
      <li>
        <Link to="/zoomApiMeetingsJoin">Join</Link>
      </li>
      <li>
        <Link to="/zoomApiMeetingsHost">Host</Link>
      </li>
    </List>
  );
};

export default NavBar;
