import React, { useState } from "react";
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
  value: (string | number)[]; // value is now an array
  onChange?: (value: (string | number)[]) => void; // Optional callback for handling changes
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
  const handleChange = (event: SelectChangeEvent<(string | number)[]>) => {
    let newValue = event.target.value as (string | number)[]; // Explicitly type as array
    newValue = newValue.filter((value) => value !== ""); // Filter out empty strings
    console.log(245, newValue);
    if (onChange) {
      onChange(newValue); // Pass the new array of selected values
    }
  };

  const [open, setOpen] = useState(false); // State to manage dropdown open/close

  const handleOkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false); // Close the dropdown when "OK" is clicked
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
          open={open}
          onChange={handleChange}
          sx={{
            height,
          }}
          onClose={() => setOpen(false)} // Handle dropdown close
          onOpen={() => setOpen(true)} // Handle dropdown open
          disabled={disabled}
          renderValue={
            (selected) =>
              selected
                .map((val) => {
                  if (val !== "") {
                    return options.find((option) => option.value === val)
                      ?.label;
                  }
                  return null; // Return null if val is an empty string
                })
                .filter(Boolean) // Remove any null values from the array
                .join(", ") // Join the remaining labels with a comma
          }
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleOkClick}
            sx={{
              justifyContent: "right",
              fontWeight: "bold",
              color: "primary.main",
              "&.Mui-selected": { backgroundColor: "transparent" },
            }}
            value=""
          >
            OK
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleOptionsSelect;
