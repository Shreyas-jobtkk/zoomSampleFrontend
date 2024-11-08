import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Option {
  label: string;
  value: string;
}

interface SelectOptionProps {
  label: string;
  options: Option[];
  width?: number;
  height?: number;
  onChange: (value: string) => void;
  value: string;
  labelText?: string; 
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  options,
  width = 150,
  height = "3.9vh",
  onChange,
  value,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: width }}>
      <InputLabel id="select-option-label">{label}</InputLabel>
      <Select
        labelId="select-option-label"
        value={value}
        onChange={handleChange}
        label={label}
        slotProps={{
          root: { sx: { height } },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectOption;
