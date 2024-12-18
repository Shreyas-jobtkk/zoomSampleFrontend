import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";

interface Option {
  label: string;
  value: string | number;
}

interface SelectMultipleOptionsProps {
  label: string;
  options: Option[];
  width?: number;
  height?: number;
  labelWidth?: string | number;
  onChange?: (value: (string | number)[]) => void; // onChange now accepts an array
  value: (string | number)[]; // value is now an array
  disabled?: boolean;
  register: any;
  name: string;
}

const SelectMultipleOptions: React.FC<SelectMultipleOptionsProps> = ({
  label,
  options,
  width = 150,
  height = 30,
  labelWidth = 100,
  onChange,
  value,
  register,
  disabled = false,
  name,
}) => {
  const handleChange = (event: SelectChangeEvent<(string | number)[]>) => {
    const newValue = event.target.value as (string | number)[]; // Explicitly type as array
    if (onChange) {
      onChange(newValue); // Pass the new array of selected values
    }
  };

  const rules = {
    required: true, // Ensures the field is not empty
    validate: {
      notWhitespace: (value: any) => {
        // Ensure value is a string before applying trim
        return String(value).trim() !== "";
      },
    },
  };

  const isError = value.length === 0;

  return (
    <Box display="flex" alignItems="center">
      {/* Label */}
      <Typography
        variant="body1"
        sx={{
          width: labelWidth,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>

      {/* Select Dropdown */}
      <FormControl
        variant="outlined"
        sx={{
          minWidth: width,
        }}
      >
        <Select
          multiple // Enable multiple selection
          value={value}
          {...register(name, rules)}
          error={isError}
          onChange={handleChange}
          sx={{
            height,
          }}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectMultipleOptions;
