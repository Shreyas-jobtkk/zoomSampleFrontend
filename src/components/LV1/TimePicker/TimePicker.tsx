import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

interface TimePickerProps {
  label?: string; // Optional label prop
  value?: Dayjs | null; // Optional value prop
  onChange?: (newValue: Dayjs | null) => void; // Optional onChange handler
}

const TimePicker: React.FC<TimePickerProps> = ({
  label = "Time Picker",
  value = null,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker
        label={label}
        value={value} // Bind value to the component
        ampm={false} // Use 24-hour format
        onChange={onChange} // Handle change event if provided
        slotProps={{
          textField: {
            inputProps: {
              sx: {
                height: "0px", // Set a fixed height for the input field
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
