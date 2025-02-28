import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  ArrowBack,
  ArrowForward,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import SelectOption from "../../LV1/SelectOption/SelectOption";
import ButtonAtom from "../../LV1/Button/ButtonAtom/ButtonAtom";
import NumberInput from "../../LV1/NumberInput/NumberInput";
import Tooltip from "@mui/material/Tooltip";
export interface DataTableRow {
  No: number;
  [key: string]: string | number;
}

interface DataTableProps {
  headers: string[];
  data: DataTableRow[];
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  onSelectionChange?: (selectedData: DataTableRow[]) => void;
  maxHeight?: string;
  onClick?: () => void;
  operationButton?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  headers,
  data,
  initialRowsPerPage = 10,
  onSelectionChange,
  maxHeight,
  onClick,
  operationButton,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selected, setSelected] = useState<Array<string | number>>([]);
  // const [allSelected, setAllSelected] = useState(false);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    new Array(headers.length).fill(150)
  );
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = data.filter((row) => selected.includes(row.No));
      // Trigger onSelectionChange only if there's a change in the selected rows
      onSelectionChange(selectedData);
    }
  }, [selected]); // Dependency on selected, onSelectionChange, and data

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pageNumber = Math.max(-1, parseInt(event.target.value, 10) - 1);
    setPage(pageNumber);
  };

  const handleChangeRowsPerPage = (value: string | number) => {
    setRowsPerPage(typeof value === "string" ? parseInt(value, 10) : value);
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.No);
      setSelected(newSelected);
      // setAllSelected(true);
    } else {
      setSelected([]);
      // setAllSelected(false);
    }
  };

  const handleResetSorting = () => {
    setSortColumn(null);
    setSortOrder("asc");
  };

  const handleClick = (No: string | number) => {
    const selectedIndex = selected.indexOf(No);
    let newSelected: Array<string | number> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, No);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (No: string | number) => selected.indexOf(No) !== -1;
  const isAllSelected = () => selected.length === data.length;

  const handleColumnResize = (index: number, event: React.MouseEvent) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + moveEvent.clientX - startX;
      if (newWidth > 50) {
        setColumnWidths((prevWidths) => {
          const newWidths = [...prevWidths];
          newWidths[index] = newWidth;
          return newWidths;
        });
      }
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleSort = (header: string) => {
    const isAsc = sortColumn === header && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(header);
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    const sorted = [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortColumn, sortOrder]);

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Box
      sx={{
        margin: "0px 1vw",
      }}
    >
      <Paper>
        {/* <NumberInput
          value={numberValue}
          onChange={handleInputChange}
        /> */}
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {onClick && operationButton && (
            <ButtonAtom
              onClick={onClick} // Pass the existing onClick handler
              label={operationButton || "Default Button Label"} // Default label if none is passed
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
          {/* <Button variant="contained" onClick={handleResetSorting} sx={{ width: '100px', margin: '0px 20px' }}>
                        Reset Sort
                    </Button> */}
          <ButtonAtom onClick={handleResetSorting} label="Reset" />
        </Box>

        <TableContainer style={{ maxHeight: maxHeight || "none" }}>
          <Table ref={tableRef}>
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "lightgray",
                zIndex: 10,
                boxShadow: "0 -20px",
              }}
            >
              <TableRow>
                <TableCell
                  padding="checkbox"
                  style={{ border: "1px solid gray" }}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && !isAllSelected()}
                    checked={isAllSelected()}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all" }}
                  />
                </TableCell>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{
                      border: "1px solid gray",
                      width: columnWidths[index],
                      position: "relative",
                      padding: "0 8px",
                      cursor: "pointer",
                      textAlign: index === 0 ? "right" : "left",
                    }}
                    onClick={() => handleSort(header)}
                  >
                    {header}
                    {sortColumn === header &&
                      (sortOrder === "asc" ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      ))}

                    <Box
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "5px",
                        cursor: "col-resize",
                      }}
                      onMouseDown={(event) => handleColumnResize(index, event)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.No} selected={isSelected(row.No)}>
                  <TableCell
                    padding="checkbox"
                    style={{ border: "1px solid gray" }}
                  >
                    <Checkbox
                      color="primary"
                      checked={isSelected(row.No)}
                      onChange={() => handleClick(row.No)}
                      inputProps={{ "aria-labelledby": `checkbox-${row.No}` }}
                    />
                  </TableCell>
                  {headers.map((header, cellIndex) => (
                    <Tooltip title={row[header]} key={`${header}-${cellIndex}`}>
                      <TableCell
                        key={cellIndex}
                        style={{
                          border: "1px solid gray",
                          padding: "0 8px",
                          width: columnWidths[cellIndex],
                          textAlign: cellIndex === 0 ? "right" : "left",
                          minWidth: "1vw",
                          maxWidth: "1vw",
                          overflow: "hidden",
                        }}
                      >
                        {row[header]}
                      </TableCell>
                    </Tooltip>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
