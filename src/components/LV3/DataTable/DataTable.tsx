import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

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
  const [sortedData, setSortedData] = useState<DataTableRow[]>([...data]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = sortedData.filter((row) =>
        selected.includes(row.No)
      );
      onSelectionChange(selectedData);
    }
  }, [selected, sortedData]);

  useEffect(() => {
    setSortedData([...data]); // Reset table data on prop change
  }, [data]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? sortedData.map((row) => row.No) : []);
  };

  const handleClick = (No: string | number) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(No);
      if (selectedIndex === -1) return [...prevSelected, No];
      return prevSelected.filter((id) => id !== No);
    });
  };

  const isSelected = (No: string | number) => selected.includes(No);
  const isAllSelected = () => selected.length === sortedData.length;

  const handleSort = (header: string) => {
    const direction =
      sortConfig?.key === header && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    const sorted = [...sortedData].sort((a, b) => {
      if (a[header] < b[header]) return direction === "asc" ? -1 : 1;
      if (a[header] > b[header]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortConfig({ key: header, direction });
  };

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
    <Box sx={{ margin: "0px 1vw" }}>
      <Paper>
        <TableContainer style={{ maxHeight: maxHeight || "none" }}>
          <Table ref={tableRef}>
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "lightgray",
                zIndex: 10,
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
                    {header}{" "}
                    {sortConfig?.key === header ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )
                    ) : (
                      ""
                    )}
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
              {sortedData.map((row) => (
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
