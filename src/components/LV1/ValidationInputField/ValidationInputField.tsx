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
  error?: string;
  rules?: object;
  maxLength?: number; // Optional dynamic maxLength
  required?: boolean; // Optional required state
  labelWidth?: string | number; // Optional label width
  width?: string | number; // Optional input width
  inputHeight?: string | number; // Optional input height
  fontSize?: string; // Optional font size for label and TextField
  disabled?: boolean; // Optional disabled state
  value?: string; // Controlled value for the input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Controlled onChange handler
};

const ValidationInputField: React.FC<ValidationInputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  // error,
  rules = {},
  required = true, // Default required is true
  labelWidth = "85px", // Default label width
  width = "200px", // Default input width
  inputHeight = "30px", // Default input height
  fontSize, // Font size for label and TextField
  disabled = false, // Default disabled state is false
  value, // Controlled value
  onChange, // Controlled onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const dynamicRules = {
    // ...(required && { required: `${label} is required` }), // Add required validation only if required is true

    ...(required
      ? {
          validate: {
            // checkForWhitespace: (value: string) => value.trim().length > 0,
            checkForWhitespace: (value: string) => value.trim().length > 0,
          },
        }
      : {}),
    ...rules, // Allow custom rules to override default rules
  };

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

        {/* Display current length if maxLength is set */}
      </Typography>

      {/* Input Field */}
      <TextField
        variant="outlined"
        type={type === "password" && !showPassword ? "password" : "text"}
        {...register(name, dynamicRules)}
        fullWidth
        error={
          (!!required &&
            (!value ||
              (typeof value === "string" && value.trim().length === 0))) ||
          disabled
        }
        // Show error only if there's an error and no default value
        // helperText={!value ? error : undefined} // Show helper text only if there's no default value
        // helperText={
        //   !!required &&
        //   (!value || (typeof value === "string" && value.trim().length === 0))
        //     ? `${label} is required and cannot be empty or contain only spaces`
        //     : undefined
        // }
        disabled={disabled} // Disable editing based on the disabled prop
        value={value} // Set controlled value
        onChange={onChange} // Handle onChange for controlled input
        sx={{
          width: width, // Apply input width
          "& .MuiOutlinedInput-root": {
            height: inputHeight, // Match input height
            fontSize, // Apply font size to the input text
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
