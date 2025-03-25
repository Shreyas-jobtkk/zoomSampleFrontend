// Header.tsx
import React from "react";
import Typography from "@mui/material/Typography";

interface MenuHeaderProps {
  title: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return (
    <Typography variant="h5" className="header-title">
      {title}
    </Typography>
  );
};

export default MenuHeader;
