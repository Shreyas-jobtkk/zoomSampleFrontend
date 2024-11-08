// Header.tsx
import React from 'react';
import Typography from '@mui/material/Typography';

interface MenuHeaderProps {
  title: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return (
    <Typography sx={{ margin: '0 1vw', padding:"1vh",height:"6vh" }} variant="h5"  className="menu-title">
      {title}
    </Typography>
  );
};

export default MenuHeader;
