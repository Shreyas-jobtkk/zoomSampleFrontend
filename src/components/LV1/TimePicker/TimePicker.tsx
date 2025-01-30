import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import { useState } from "react";
interface TimePickerProps {
  label?: string; // Optional label prop
  onChange?: (newValue: Dayjs | null) => void; // Optional onChange handler
}

const TimePicker: React.FC<TimePickerProps> = ({
  label = "Time Picker",
  onChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker
        label={label}
        value={selectedTime} // Bind value to the component
        ampm={false} // Use 24-hour format
        onChange={handleChange} // Handle change event if provided
        slotProps={{
          textField: {
            inputProps: {
              sx: {
                height: "12px", // Set a fixed height for the input field
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
