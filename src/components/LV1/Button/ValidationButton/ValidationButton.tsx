import React from "react";
import Button from "@mui/material/Button";

type ValidationButtonProps = {
  variant?: "text" | "outlined" | "contained"; // Button variant
  type?: "button" | "submit" | "reset"; // Button type
  fullWidth?: boolean; // Whether the button should take full width
  onClick?: () => void; // Function to call when button is clicked
  disabled?: boolean; // Optionally disable the button
  label: string; // Text to display on the button
  width?: string; // Optional button width
  padding?: string; // Optional button padding
  margin?: string; // Optional button margin
  height?: string; // Optional button height
};

const ValidationButton: React.FC<ValidationButtonProps> = ({
  variant = "contained", // Default variant is 'contained'
  type = "button", // Default type is 'button'
  fullWidth = false, // Default fullWidth is false
  onClick,
  disabled = false,
  label, // Use label prop for button text
  width = "70px", // Default width
  padding = "10px", // Default padding
  margin = "0 5px", // Default margin
  height = "30px", // Default height
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick} // Call onClick when button is clicked
      disabled={disabled}
      style={{
        backgroundColor: "lightgray", // Light gray background color
        color: "black", // Black text color
        width,
        padding,
        margin,
        height,
        textAlign: "center", // Align text to the left
        justifyContent: "center", // Align content to the start (left)
        whiteSpace: "nowrap", // Prevent text from wrapping to the next line
        overflow: "hidden", // Hide overflow text if it exceeds button width
        textOverflow: "ellipsis", // Optionally, show ellipsis when text overflows
        textTransform: "none", // Prevent uppercase transformation
        opacity: disabled ? 0.5 : 1, // Apply opacity when disabled
      }}
    >
      {label} {/* Display label inside the button */}
    </Button>
  );
};

export default ValidationButton;
