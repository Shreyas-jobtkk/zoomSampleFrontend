import React from "react";
import { Button } from "@mui/material";

interface ButtonAtomProps {
  onClick: () => void; // Function to call when button is clicked
  label: string; // Text to display on the button
  disabled?: boolean; // Optional: Disable the button
  width?: string; // Optional: Button width
  padding?: string; // Optional: Button padding
  margin?: string; // Optional: Button margin
  height?: string; // Optional: Button height
}

const ButtonAtom: React.FC<ButtonAtomProps> = ({
  onClick,
  label,
  disabled = false,
  width = "70px", // Default width
  padding = "5px 20px", // Default padding
  margin = "5px", // Default margin
  height = "25px", // Default height
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained" // MUI button variant
      style={{
        backgroundColor: "lightgray", // Light gray background color
        color: "black", // Black text color
        width,
        padding,
        margin,
        height,
        textAlign: "left", // Align text to the left
        justifyContent: "flex-start", // Align content to the start (left)
        fontSize: "14px", // Set a base font size
        whiteSpace: "nowrap", // Prevent text from wrapping to the next line
        overflow: "hidden", // Hide overflow text if it exceeds button width
        textOverflow: "ellipsis", // Optionally, show ellipsis when text overflows
        textTransform: "none", // Prevent uppercase transformation
        opacity: disabled ? 0.5 : 1, // Apply opacity when disabled
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonAtom;
