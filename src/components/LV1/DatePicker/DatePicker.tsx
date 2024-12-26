import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface DatePickerProps {
  label?: string; // Optional label prop
  onDateChange?: (date: Dayjs | null) => void; // Callback for date change
}

const DatePicker: React.FC<DatePickerProps> = ({
  label = "DatePicker",
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        value={selectedDate}
        onChange={handleChange}
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

export default DatePicker;
