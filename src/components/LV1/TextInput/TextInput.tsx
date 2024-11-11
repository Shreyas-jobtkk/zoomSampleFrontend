import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  value: string;
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

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  borderColor = "black",
  borderWidth = "1px",
  padding = "10px",
  borderRadius,
  width = "200px",
  height = "50px",
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

export default TextInput;
