import React from "react";
import { TextField } from "@mui/material";

interface NumberInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  backgroundColor?: string;
  placeholder?: string;
  height?: string;
  maxLength?: number; // Add maxLength prop
  margin?: string; // Add marginLeft as an optional prop
  name?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  borderColor = "black",
  borderWidth = "1px",
  padding = "0px 4px ",
  borderRadius,
  width = "70px",
  height = "30px",
  backgroundColor = "white",
  placeholder,
  maxLength, // Access the maxLength prop
  margin, // Access the marginLeft prop
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // If maxLength is set, restrict the input length
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    onChange(e);
  };

  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      slotProps={{
        htmlInput: {
          maxLength, // Set maxLength on the input element (applies to the string version)
          type: "number", // Restricts input to numbers
          style: {
            borderColor,
            borderWidth,
            padding,
            borderRadius,
            backgroundColor,
            width,
            height,
            appearance: "none", // Hide default arrows
            MozAppearance: "textfield", // Firefox
            WebkitAppearance: "none", // Chrome/Safari
          },
        },
      }}
      sx={{
        margin, // Apply marginLeft if provided
        // Additional CSS to hide the spinner arrows in WebKit browsers
        "& input[type='number']::-webkit-outer-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
        "& input[type='number']::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      }}
    />
  );
};

export default NumberInput;
