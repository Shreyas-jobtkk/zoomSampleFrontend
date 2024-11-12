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
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  borderColor = "black",
  borderWidth = "1px",
  padding = "10px",
  borderRadius,
  width = "200px",
  height = "40px",
  backgroundColor = "white",
  placeholder,
}) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      slotProps={{
        input: {
          type: "number", // Restricts input to numbers
          style: {
            borderColor,
            borderWidth,
            padding,
            borderRadius,
            backgroundColor,
            width,
            height,
          },
        },
      }}
    />
  );
};

export default NumberInput;
