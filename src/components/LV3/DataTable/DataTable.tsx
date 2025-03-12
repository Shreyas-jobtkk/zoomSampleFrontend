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
} from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
export interface DataTableRow {
  No: number;
  [key: string]: string | number;
}

interface DataTableProps {
  headers: string[];
  data: DataTableRow[];
  onSelectionChange?: (selectedData: DataTableRow[]) => void;
  maxHeight?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  headers,
  data,
  onSelectionChange,
  maxHeight,
}) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    new Array(headers.length).fill(150)
  );

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = data.filter((row) => selected.includes(row.No));
      onSelectionChange(selectedData);
    }
  }, [selected]); // Dependency on selected, onSelectionChange, and data

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.No);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
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

  return (
    <Box
      sx={{
        margin: "0px 1vw",
      }}
    >
      <Paper>
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
                  >
                    {header}

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
              {data.map((row) => (
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
