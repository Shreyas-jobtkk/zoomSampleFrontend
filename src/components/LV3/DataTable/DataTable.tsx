import React, { useState, useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination, Select, MenuItem, FormControl, InputLabel,
    Checkbox,
    Box,
    TextField,
    IconButton,
    Button
} from '@mui/material';
import { FirstPage, LastPage, ArrowBack, ArrowForward } from '@mui/icons-material';

interface DataTableProps {
    headers: string[];
    data: Array<{ No: string | number;[key: string]: string | number }>;
    rowsPerPageOptions?: number[];
    initialRowsPerPage?: number;
    onSelectionChange?: (selectedData: Array<{ No: string | number;[key: string]: string | number }>) => void;
    maxHeight?: string;
}

const DataTable: React.FC<DataTableProps> = ({
    headers,
    data,
    initialRowsPerPage = 10,
    onSelectionChange,
    maxHeight,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [selected, setSelected] = useState<Array<string | number>>([]);
    const [allSelected, setAllSelected] = useState(false);
    const [columnWidths, setColumnWidths] = useState<number[]>(new Array(headers.length).fill(150));
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(data.filter((row) => selected.includes(row.No)));
        }
    }, [selected, onSelectionChange, data]);

    const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageNumber = Math.max(0, Math.min(totalPages - 1, parseInt(event.target.value, 10) - 1));
        setPage(pageNumber);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((row) => row.No);
            setSelected(newSelected);
            setAllSelected(true);
        } else {
            setSelected([]);
            setAllSelected(false);
        }
    };

    const handleResetSorting = () => {
        setSortColumn(null);
        setSortOrder('asc');
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
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const handleSort = (header: string) => {
        const isAsc = sortColumn === header && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortColumn(header);
    };

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;
        const sorted = [...data].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [data, sortColumn, sortOrder]);

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <Box m={2}>
            <Paper>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <IconButton disabled={page === 0} onClick={() => setPage(0)} aria-label="first page">
                        <FirstPage />
                    </IconButton>
                    <IconButton disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="previous page">
                        <ArrowBack />
                    </IconButton>
                    <TextField
                        value={isNaN(page) ? '' : page + 1}
                        onChange={handlePageInputChange}
                        type="number"
                        sx={{ width: 100, textAlign: 'center' }}
                    />
                    <Box mx={1}>/ {totalPages}</Box>
                    <IconButton disabled={page === totalPages - 1} onClick={() => setPage(page + 1)} aria-label="next page">
                        <ArrowForward />
                    </IconButton>
                    <IconButton disabled={page === totalPages - 1} onClick={() => setPage(totalPages - 1)} aria-label="last page">
                        <LastPage />
                    </IconButton>
                    <FormControl fullWidth sx={{ width: '120px' }}>
                        <InputLabel id="select-label">Rows per page</InputLabel>
                        <Select
                            labelId="select-label"
                            value={rowsPerPage}
                            label="Rows per page"
                            onChange={handleChangeRowsPerPage}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleResetSorting} sx={{ width: '100px', margin: '0px 20px' }}>
                        Reset Sort
                    </Button>
                </Box>

                <TableContainer style={{ maxHeight: maxHeight || 'none' }}>
                    <Table ref={tableRef}>
                        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', zIndex: 10 }}>
                            <TableRow>
                                <TableCell padding="checkbox" style={{ border: '1px solid gray' }}>
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && !isAllSelected()}
                                        checked={isAllSelected()}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all' }}
                                    />
                                </TableCell>
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        style={{
                                            border: '1px solid gray',
                                            width: columnWidths[index],
                                            position: 'relative',
                                            padding: '0 8px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleSort(header)}
                                    >
                                        {header}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                width: '5px',
                                                cursor: 'col-resize',
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
                                    <TableCell padding="checkbox" style={{ border: '1px solid gray' }}>
                                        <Checkbox
                                            color="primary"
                                            checked={isSelected(row.No)}
                                            onChange={() => handleClick(row.No)}
                                            inputProps={{ 'aria-labelledby': `checkbox-${row.No}` }}
                                        />
                                    </TableCell>
                                    {headers.map((header, cellIndex) => (
                                        <TableCell
                                            key={cellIndex}
                                            style={{
                                                border: '1px solid gray',
                                                padding: '0 8px',
                                                width: columnWidths[cellIndex],
                                            }}
                                        >
                                            {row[header]}
                                        </TableCell>
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



// import React, { useState, useEffect, useRef } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Checkbox,
//     Box,
// } from '@mui/material';

// interface DataTableProps {
//     headers: string[];
//     data: Array<{ No: string | number; [key: string]: string | number }>;
//     rowsPerPageOptions?: number[];
//     initialRowsPerPage?: number;
//     onSelectionChange?: (selectedData: Array<{ No: string | number; [key: string]: string | number }>) => void;
//     maxHeight?: string; // New prop for maxHeight
//     columnWidths?: number[];
//     columnAlignments?: ('left' | 'right' | 'center')[];
// }

// const DataTable: React.FC<DataTableProps> = ({
//     headers,
//     data,
//     rowsPerPageOptions = [5, 10],
//     initialRowsPerPage = 10,
//     onSelectionChange,
//     maxHeight,
//     columnWidths = [],
//     columnAlignments = [], // Default empty array
// }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
//     const [selected, setSelected] = useState<Array<string | number>>([]);
//     const [allSelected, setAllSelected] = useState(false);
//     const [columnWidthsState, setColumnWidths] = useState<number[]>(new Array(headers.length).fill(15)); // Default to 15vw

//     const tableRef = useRef<HTMLTableElement>(null);

//     useEffect(() => {
//         if (columnWidths.length > 0) {
//             setColumnWidths(columnWidths);
//         }
//     }, [columnWidths]);

//     useEffect(() => {
//         if (onSelectionChange) {
//             onSelectionChange(data.filter((row) => selected.includes(row.No)));
//         }
//     }, [selected, onSelectionChange, data]);

//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             const newSelected = data.map((row) => row.No);
//             setSelected(newSelected);
//             setAllSelected(true);
//         } else {
//             setSelected([]);
//             setAllSelected(false);
//         }
//     };

//     const handleClick = (No: string | number) => {
//         const selectedIndex = selected.indexOf(No);
//         let newSelected: Array<string | number> = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, No);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(
//                 selected.slice(0, selectedIndex),
//                 selected.slice(selectedIndex + 1)
//             );
//         }

//         setSelected(newSelected);
//     };

//     const isSelected = (No: string | number) => selected.indexOf(No) !== -1;
//     const isAllSelected = () => selected.length === data.length;

//     // Handle column resizing (optional)
//     const handleColumnResize = (index: number, event: React.MouseEvent) => {
//         const startX = event.clientX;
//         const startWidth = columnWidthsState[index];

//         const onMouseMove = (moveEvent: MouseEvent) => {
//             const newWidth = startWidth + moveEvent.clientX - startX;
//             if (newWidth > 50) {
//                 setColumnWidths((prevWidths) => {
//                     const newWidths = [...prevWidths];
//                     newWidths[index] = newWidth;
//                     return newWidths;
//                 });
//             }
//         };

//         const onMouseUp = () => {
//             window.removeEventListener('mousemove', onMouseMove);
//             window.removeEventListener('mouseup', onMouseUp);
//         };

//         window.addEventListener('mousemove', onMouseMove);
//         window.addEventListener('mouseup', onMouseUp);
//     };

//     return (
//         <Box m={2}>
//             <Paper>
//                 <Box display="flex" justifyContent="flex-start">
//                     <TablePagination
//                         component="div"
//                         count={data.length}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         rowsPerPageOptions={rowsPerPageOptions}
//                         labelRowsPerPage=""
//                         style={{ height: '52px', margin: '0', padding: '0', backgroundColor: 'white', zIndex: 2000 }}
//                     />
//                 </Box>

//                 <TableContainer style={{ maxHeight: maxHeight || 'none' }}>
//                     <Table ref={tableRef}>
//                         <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', zIndex: 10 }}>
//                             <TableRow>
//                                 <TableCell padding="checkbox" style={{ border: '1px solid gray' }}>
//                                     <Checkbox
//                                         color="primary"
//                                         indeterminate={selected.length > 0 && !isAllSelected()}
//                                         checked={isAllSelected()}
//                                         onChange={handleSelectAllClick}
//                                         inputProps={{ 'aria-label': 'select all' }}
//                                     />
//                                 </TableCell>
//                                 {headers.map((header, index) => (
//                                     <TableCell
//                                         key={index}
//                                         style={{
//                                             border: '1px solid gray',
//                                             width: `${columnWidthsState[index]}vw`, // Use vw for column widths
//                                             position: 'relative',
//                                             maxHeight: '43px',
//                                             margin: '0',
//                                             padding: '0 8px',
//                                             textAlign: columnAlignments[index] || 'left', // Apply text alignment
//                                         }}
//                                     >
//                                         {header}
//                                         <div
//                                             style={{
//                                                 position: 'absolute',
//                                                 right: 0,
//                                                 top: 0,
//                                                 bottom: 0,
//                                                 width: '5px',
//                                                 cursor: 'col-resize',
//                                             }}
//                                             onMouseDown={(event) => handleColumnResize(index, event)}
//                                         />
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {paginatedData.map((row) => (
//                                 <TableRow key={row.No} selected={isSelected(row.No)}>
//                                     <TableCell padding="checkbox" style={{ border: '1px solid gray' }}>
//                                         <Checkbox
//                                             color="primary"
//                                             checked={isSelected(row.No)}
//                                             onChange={() => handleClick(row.No)}
//                                             inputProps={{ 'aria-labelledby': `checkbox-${row.No}` }}
//                                         />
//                                     </TableCell>
//                                     {headers.map((header, cellIndex) => (
//                                         <TableCell
//                                             key={cellIndex}
//                                             style={{
//                                                 border: '1px solid gray',
//                                                 width: `${columnWidthsState[cellIndex]}vw`, // Apply vw width
//                                                 maxHeight: '43px',
//                                                 margin: '0',
//                                                 padding: '0 8px',
//                                                 textAlign: columnAlignments[cellIndex] || 'left', // Apply text alignment
//                                             }}
//                                         >
//                                             {row[header]}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>
//         </Box>
//     );
// };


// export default DataTable;

