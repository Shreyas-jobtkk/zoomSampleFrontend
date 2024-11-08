import React from 'react';
import Button from '@mui/material/Button';

interface LoginButtonProps {
  onClick: () => void; // Function to call when button is clicked
  label: string; // Text to display on the button
  disabled?: boolean; // Optional: Disable the button
  backgroundColor?: string; // Optional: Button background color
  width?: string; // Optional: Button width
  padding?: string; // Optional: Button padding
  margin?: string; // Optional: Button margin
  height?: string; // Optional: Button height
  textAlign?: 'left' | 'right' | 'center'; // Text alignment
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  label,
  disabled = false,
  backgroundColor = 'lightgray', // Default background color
  width = '120px', // Default width
  padding = '5px 20px', // Default padding
  margin = '0', // Default margin
  height = '40px',
  textAlign = 'center',
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained" // Use "outlined" or "text" for different styles
      sx={{
        backgroundColor,
        color: 'black', // Set text color to black
        width,
        padding,
        margin,
        height,
        textAlign,
        '&:hover': {
          backgroundColor: 'darkgray', // Optional: Change background on hover
        },
      }}
    >
      {label}
    </Button>
  );
};

export default LoginButton;
