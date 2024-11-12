import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface TextBoxProps {
  label: string;
  width?: string; // Optional width prop for TextField
  height?: string; // Optional height for the Box in vh
  fontSize?: string; // Optional font size for label and TextField in em
  labelWidth?: string; // Optional label width prop
  // margin?: string;
  disabled?: boolean; // Optional disabled prop to disable editing
  [key: string]: any; // Allow other props to be passed
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  width = "150px",
  height = "35px", // Default height for Box in vh
  fontSize, // Default font size in em for label and TextField
  labelWidth = "85px", // Default label width
  disabled = true, // Default disabled state is false
  // margin,
  ...props
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        height, // Apply height for the Box in vh
      }}
    >
      <label
        style={{
          width: labelWidth, // Apply width for label
          fontSize, // Apply font size for the label in em
          display: "flex", // Ensure the label aligns with input
          alignItems: "center", // Center the label text vertically
        }}
      >
        {label}
      </label>
      <TextField
        variant="outlined"
        sx={{
          width, // Apply width for TextField
          height: "100%", // Make TextField take the full height of the Box
          "& .MuiOutlinedInput-root": {
            fontSize, // Apply font size to the input text in em
            height: "100%", // Make the input field take the full height
          },
        }}
        disabled={disabled} // Disable editing based on the disabled prop
        {...props} // Spread any additional props (like value, onChange, etc.)
      />
    </Box>
  );
};

export default TextBox;
