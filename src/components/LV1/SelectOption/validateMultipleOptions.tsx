import React, { useState } from "react";
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

interface ValidateMultipleOptionsProps {
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
  isSubmitted?: boolean;
}

const ValidateMultipleOptions: React.FC<ValidateMultipleOptionsProps> = ({
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
  isSubmitted,
}) => {
  const handleChange = (event: SelectChangeEvent<(string | number)[]>) => {
    let newValue = event.target.value as (string | number)[]; // Explicitly type as array
    newValue = newValue.filter((value) => value !== ""); // Filter out empty strings
    console.log(145, newValue);
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

  const isError = isSubmitted && value.length === 0;

  const [open, setOpen] = useState(false); // State to manage dropdown open/close

  const handleOkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false); // Close the dropdown when "OK" is clicked
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
          multiple // Enable multiple selection
          value={value}
          {...register(name, rules)}
          error={isError}
          onChange={handleChange}
          sx={{
            height,
          }}
          open={open}
          onClose={() => setOpen(false)} // Handle dropdown close
          onOpen={() => setOpen(true)} // Handle dropdown open
          disabled={disabled}
          renderValue={
            (selected: (string | number)[]) =>
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

export default ValidateMultipleOptions;
