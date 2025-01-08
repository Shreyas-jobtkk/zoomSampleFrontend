import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";

// Define the types for the options
interface Option {
  value: string | number;
  label: string;
}

// Define the props for the component
interface MultipleOptionsSelectProps {
  label: string;
  options: Option[];
  value: string[]; // Controlled value passed from parent
  onChange?: (selectedValues: string[]) => void; // Optional callback for handling changes
  labelWidth?: string | number;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const MultipleOptionsSelect: React.FC<MultipleOptionsSelectProps> = ({
  label,
  options,
  value,
  onChange,
  labelWidth = 100,
  width = 150,
  height = 30,
  disabled = false,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValues = event.target.value as string[];
    if (onChange) {
      onChange(newValues); // Notify parent of the change if onChange is provided
    }
  };

  return (
    <Box display="flex" alignItems="center">
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
      <FormControl
        variant="outlined"
        sx={{
          minWidth: width,
        }}
      >
        <Select
          multiple
          value={value}
          onChange={handleChange}
          sx={{
            height,
          }}
          disabled={disabled}
          renderValue={
            (selected) =>
              selected
                .map(
                  (val) => options.find((option) => option.value === val)?.label
                )
                .join(", ") // Map values to their corresponding labels
          }
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

export default MultipleOptionsSelect;
