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
  onChange: (value: string) => void; // onChange expects a string value
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
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value); // Pass the value to onChange as string
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
