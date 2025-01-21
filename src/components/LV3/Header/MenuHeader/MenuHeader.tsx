// Header.tsx
import React from "react";
import Typography from "@mui/material/Typography";
import classes from "../styles/Header.module.scss";

interface MenuHeaderProps {
  title: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return (
    <Typography variant="h5" className={classes.headerTitle}>
      {title}
    </Typography>
  );
};

export default MenuHeader;
