import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type ValidationInputFieldProps = {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: boolean;
  maxLength?: number; // Optional dynamic maxLength
  labelWidth?: string | number; // Optional label width
  width?: string | number; // Optional input width
  inputHeight?: string | number; // Optional input height
  fontSize?: string; // Optional font size for label and TextField
  value?: string | null; // Controlled value for the input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Controlled onChange handler
  isSubmitted?: boolean;
};

const ValidationInputField: React.FC<ValidationInputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  labelWidth = "85px", // Default label width
  width = "200px", // Default input width
  inputHeight = "30px", // Default input height
  fontSize, // Font size for label and TextField
  value, // Controlled value
  onChange, // Controlled onChange
  isSubmitted,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const rules = {
    required: true, // Ensures the field is not empty
    validate: {
      notWhitespace: (value: any) => {
        // Ensure value is a string before applying trim
        return String(value).trim() !== "";
      },
      isValidEmail: (value: any) => {
        if (type === "email") {
          // Email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value) || "Invalid email address";
        }
        return true;
      },
    },
  };

  const isError =
    isSubmitted &&
    (!value ||
      (typeof value === "string" && value.trim().length === 0) ||
      (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)));

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        width: `calc(${labelWidth} + ${width})`, // Ensure the width is the sum of label and input field width
        height: inputHeight, // Ensure input height matches
      }}
    >
      {/* Label */}
      <Typography
        variant="body1"
        sx={{
          width: labelWidth, // Apply label width
          fontSize, // Apply font size for the label
          whiteSpace: "nowrap", // Prevent label from shrinking or wrapping
        }}
      >
        {label}
      </Typography>

      <TextField
        variant="outlined"
        type={type === "password" && !showPassword ? "password" : "type"}
        {...register(name, rules)}
        fullWidth
        onKeyDown={(event) => {
          if (type === "none") {
            event.preventDefault(); // Prevent any key input
            // pointerEvents: "none",
            const target = event.target as HTMLElement;
            target.style.pointerEvents = "none";
          }
        }}
        error={isError || error}
        value={value} // Set controlled value
        onChange={onChange} // Handle onChange for controlled input
        sx={{
          width: width, // Apply input width
          "& .MuiOutlinedInput-root": {
            height: inputHeight, // Match input height
            fontSize, // Apply font size to the input text
            pointerEvents: type === "none" ? "none" : "auto",
            "& input": {
              padding: "4px", // Adjust padding
            },
          },
        }}
        slotProps={{
          input: {
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          },
        }}
      />
    </Box>
  );
};

export default ValidationInputField;
