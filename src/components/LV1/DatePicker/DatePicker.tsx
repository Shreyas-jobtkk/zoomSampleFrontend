import { useState } from "react"; // Import useState
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs type
import "dayjs/locale/ja"; // Import Japanese locale

// Define the props type
interface DatePickerProps {
  label?: string; // Optional label prop
  onDateChange?: (date: Dayjs | null) => void; // Callback function for date change
  scale?: number; // Optional scale prop to adjust component size
}

// Rename the component to DatePicker
const DatePicker: React.FC<DatePickerProps> = ({
  label = "DatePicker",
  onDateChange,
  scale = 1,
}) => {
  // Set Day.js locale to Japanese
  dayjs.locale("ja");

  // Create a state variable to track the selected date
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue); // Update state
    if (onDateChange) {
      onDateChange(newValue); // Call the provided callback function with the new value
    }
  };

  // Calculate the scale-related styles
  const scaleStyles = {
    transform: `scale(${scale})`, // Scale the component
    transformOrigin: "top left", // Optional: set the origin of scaling
    transition: "transform 0.2s ease", // Optional: smooth transition
    width: `${100 / scale}%`, // Adjust the width to avoid overflow when scaling up
    height: `${100 / scale}%`, // Adjust the height to avoid overflow when scaling up
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div style={scaleStyles}>
          {" "}
          {/* Apply scaling to the entire DatePicker */}
          <MuiDatePicker
            label={label} // Use label prop for customization
            value={selectedDate} // Bind the selected date to the DatePicker
            format="YYYY/MM/DD"
            onChange={handleChange} // Update state and notify parent on date change
            // Override TextField's height using `slotProps.input`
            slotProps={{
              textField: {
                inputProps: {
                  sx: {
                    height: "1.3vh", // Set height in viewport height (vh)
                  },
                },
              },
            }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
