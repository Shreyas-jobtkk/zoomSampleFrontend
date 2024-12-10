import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ButtonAtom from "../Button/ButtonAtom/ButtonAtom";
import { Height } from "@mui/icons-material";

// Define the props interface
interface SelectableModalProps<T> {
  title: string;
  options: T[]; // Generic type for options array
  onOptionSelect: (value: T) => void; // Passing the entire selected option back
  label: string;
  valueKey: keyof T; // Key for unique identification (e.g., company_no)
  displayKey: keyof T; // Key for display text (e.g., company_name)
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "80vh", // Set the height of the modal
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Allow vertical scrolling if the content overflows
};

// The SelectableModal component
const SelectableModal = <T,>({
  title,
  options,
  onOptionSelect,
  label,
  valueKey,
  displayKey,
}: SelectableModalProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOptionClick = (value: T) => {
    onOptionSelect(value);
    setOpen(false); // Close the modal after selection
  };

  // Get the maximum length of the company number for consistent padding
  const maxLength = Math.max(
    ...options.map((option) => String(option[valueKey]).length)
  );

  return (
    <div>
      <ButtonAtom onClick={handleOpen} label={label} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{
          backdrop: Backdrop, // Use the 'slots' prop to specify the Backdrop component
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <List>
              {options.map((option, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleOptionClick(option)}>
                    {/* Pad the company number for alignment */}
                    <ListItemText
                      primary={`${String(option[valueKey]).padStart(
                        maxLength,
                        " "
                      )}.    ${option[displayKey]}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Button onClick={handleClose} color="secondary" sx={{ mt: 2 }}>
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SelectableModal;
