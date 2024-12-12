import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type TextAreaFieldProps = {
  label: string;
  name?: string;
  disabled?: boolean;
  error?: string;
  rows?: number; // Number of rows for the textarea
  margin?: string | number; // Optional margin prop
  value?: string; // Controlled value for the textarea
  register?: any;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // onChange handler
  labelWidth?: string | number; // Optional label width
  maxLength?: number; // Optional maxLength for the textarea
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  disabled,
  error,
  rows = 4, // Default number of rows
  margin, // Default margin value
  value = "", // Default value is an empty string
  onChange, // onChange handler
  labelWidth = "120px", // Default label width
  maxLength, // Optional maxLength
  register,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        margin: margin, // Apply optional margin
      }}
    >
      <Typography
        sx={{
          width: labelWidth, // Use labelWidth or default to "120px"
          marginRight: 2, // Add spacing between label and textarea
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        error={!!error}
        {...register(name)}
        helperText={error}
        multiline
        disabled={disabled}
        rows={rows} // Handle number of rows for the textarea
        value={value} // Set the value from props
        onChange={onChange} // Set the onChange handler
        slotProps={{
          htmlInput: {
            maxLength, // Apply maxLength to the input field
          },
        }}
        variant="outlined" // Optional: you can choose 'filled' or 'standard' as well
      />
    </Box>
  );
};

export default TextAreaField;
