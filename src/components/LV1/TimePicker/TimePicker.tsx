import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface TimePickerProps {
  label?: string; // Optional label prop
  value?: Dayjs | null; // Optional value prop, can be null
  onChange?: (newValue: Dayjs | null) => void; // Optional onChange handler
  scale?: number;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label = 'Basic time picker',
  scale = 1,
  value = dayjs(), // Default value to current time
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker
        sx={{ width: 150,scale:scale,marginTop:1 }}
        label={label}
        ampm={false} // Disable AM/PM for 24-hour format
        value={value}
        onChange={onChange}
        // Using the textField prop for input rendering
        slotProps={{
          textField: {
            inputProps: {
              sx: {
                height: '1.3vh', // Set height in viewport height (vh)
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
