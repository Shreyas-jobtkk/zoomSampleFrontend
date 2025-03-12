import React, { useState, useEffect } from "react";
import { Paper, Box, IconButton } from "@mui/material";
import {
  FirstPage,
  LastPage,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import SelectOption from "../../LV1/SelectOption/SelectOption";
import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import NumberInput from "../../LV1/NumberInput/NumberInput";

interface DataTableProps {
  rowsPerPageOptions?: number[];
  onSelectionChange?: (selectedData: any) => void;
  maxHeight?: string;
  onClickNew?: () => void;
  onClickReset?: () => void;
  totalPages: number;
  onPageChange?: (page: number) => void; // New prop to send page back to parent
}

const DataTable: React.FC<DataTableProps> = ({
  onClickNew,
  onClickReset,
  onSelectionChange,
  totalPages,
  onPageChange, // Destructure the onPageChange prop
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pageNumber = Math.max(-1, parseInt(event.target.value, 10) - 1);
    setPage(pageNumber);
  };

  const handleChangeRowsPerPage = (value: string | number) => {
    const newRowsPerPage =
      typeof value === "string" ? parseInt(value, 10) : value;
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to the first page
    if (onSelectionChange) {
      onSelectionChange([{ No: 1, rowsPerPage: newRowsPerPage }]); // Pass updated rowsPerPage to parent
    }
  };

  useEffect(() => {
    if (onPageChange) {
      onPageChange(page); // Send page value to parent whenever it changes
    }
  }, [page, onPageChange]);

  return (
    <Box
      sx={{
        margin: "0px 1vw",
      }}
    >
      <Paper>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {onClickNew && (
            <ButtonAtom
              onClick={onClickNew} // Pass the existing onClick handler
              label={"新規"} // Default label if none is passed
            />
          )}
          <IconButton
            disabled={page === 0}
            onClick={() => setPage(0)}
            aria-label="first page"
          >
            <FirstPage />
          </IconButton>
          <IconButton
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            aria-label="previous page"
          >
            <ArrowBack />
          </IconButton>

          <NumberInput
            value={page + 1}
            onChange={handlePageInputChange}
            width="50px"
            height="30px"
          />
          <Box mx={1}>/ {totalPages}</Box>
          <IconButton
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            aria-label="next page"
          >
            <ArrowForward />
          </IconButton>
          <IconButton
            disabled={page === totalPages - 1}
            onClick={() => setPage(totalPages - 1)}
            aria-label="last page"
          >
            <LastPage />
          </IconButton>

          <SelectOption
            label="Rows per page"
            options={[
              { label: "5", value: 5 },
              { label: "10", value: 10 },
            ]}
            width={50}
            labelWidth={120}
            value={rowsPerPage.toString()}
            onChange={handleChangeRowsPerPage}
          />

          <ButtonAtom onClick={onClickReset} label="Reset" />
        </Box>
      </Paper>
    </Box>
  );
};

export default DataTable;
