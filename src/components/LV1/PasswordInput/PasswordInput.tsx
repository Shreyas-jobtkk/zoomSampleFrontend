import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  borderRadius?: string;
  width?: string;
  backgroundColor?: string;
  placeholder?: string;
  height?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  borderColor = 'black',
  borderWidth = '1px',
  padding = '10px',
  borderRadius,
  backgroundColor = 'white',
  placeholder = '',
  width = '200px',
  height = '50px',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <TextField
      type={isPasswordVisible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      variant="outlined"
      placeholder={placeholder}
      slotProps={{
        input: {
          style: {
            borderColor,
            borderWidth,
            padding,
            borderRadius,
            backgroundColor,
            height,
            width,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordInput;
