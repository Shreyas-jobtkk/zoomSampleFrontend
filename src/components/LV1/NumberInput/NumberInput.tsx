import React from "react";
import { TextField } from "@mui/material";

interface NumberInputProps {
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Make onChange optional
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  backgroundColor?: string;
  placeholder?: string;
  height?: string;
  maxLength?: number;
  margin?: string;
  name?: string;
  disabled?: boolean; // Add disabled as an optional prop
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
  maxLength,
  margin,
  name,
  disabled = false, // Default disabled to false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // If maxLength is set, restrict the input length
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    // Call onChange if provided
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <TextField
      variant="outlined"
      value={value}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled} // Pass the disabled prop to the TextField
      slotProps={{
        htmlInput: {
          maxLength,
          type: "number",
          style: {
            borderColor,
            borderWidth,
            padding,
            borderRadius,
            backgroundColor,
            width,
            height,
            appearance: "none",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          },
        },
      }}
      sx={{
        margin,
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
