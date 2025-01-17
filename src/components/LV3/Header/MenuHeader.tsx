// Header.tsx
import React from "react";
import Typography from "@mui/material/Typography";

interface MenuHeaderProps {
  title: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return (
    <Typography sx={{ padding: "1vh" }} variant="h5" className="menu-title">
      {title}
    </Typography>
  );
};

export default MenuHeader;
