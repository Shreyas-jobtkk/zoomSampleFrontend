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

interface SelectOptionProps {
  label: string;
  options: Option[];
  width?: number;
  height?: number;
  labelWidth?: string | number;
  onChange: (value: string) => void;
  value: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  options,
  width = 150,
  height = 30,
  labelWidth = 100,
  onChange,
  value,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

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
          // ml: 1, // Optional: Adds some margin between label and Select
        }}
      >
        <Select
          value={value}
          onChange={handleChange}
          sx={{
            height,
          }}
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

export default SelectOption;
