import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordBoxWithLabelProps {
  label: string;
  width?: string;
  height?: string;
  fontSize?: string;
  labelWidth?: string;
  [key: string]: any;
}

const PasswordBoxWithLabel: React.FC<PasswordBoxWithLabelProps> = ({
  label,
  width = "150px",
  height = "30px",
  fontSize,
  labelWidth = "85px",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        height,
        width: `calc(${labelWidth} + ${width})`, // Ensures the width is a fixed sum of labelWidth + width
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize,
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap", // Prevent label from shrinking
        }}
      >
        {label}
      </label>
      <TextField
        type={showPassword ? "text" : "password"}
        variant="outlined"
        sx={{
          width,
          height: "100%",
          "& .MuiOutlinedInput-root": {
            fontSize,
            height: "100%",
          },
        }}
        {...props}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default PasswordBoxWithLabel;
