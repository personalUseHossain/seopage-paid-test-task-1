// import React from 'react';
// import { useTable, useResizeColumns, useBlockLayout } from 'react-table';
// import '@/styles/Table.css'; // For custom styles (optional)

// const Table = ({ columns, data }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useResizeColumns,
//     useBlockLayout
//   );

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <table className="table">
//         <thead>
//           {headerGroups.map(headerGroup => {
//             const headerProps = headerGroup.getHeaderGroupProps();
//             const { key, ...restHeaderProps } = headerProps; // Extract key
//             return (
//               <tr {...restHeaderProps} key={key}>
//                 {headerGroup.headers.map(column => (
//                   <th
//                     {...column.getHeaderProps(column.getResizerProps())}
//                     style={{
//                       width: column.width || 'auto',
//                       position: 'sticky',
//                       top: 0,
//                       backgroundColor: '#fff',
//                       zIndex: 1,
//                       paddingRight: '10px',
//                       userSelect: 'none',
//                     }}
//                     key={column.id} // Add a unique key for the column header
//                   >
//                     {column.render('Header')}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         style={{
//                           position: 'absolute',
//                           right: 0,
//                           top: 0,
//                           bottom: 0,
//                           width: '10px',
//                           cursor: 'col-resize',
//                         }}
//                       />
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             );
//           })}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             const rowProps = row.getRowProps();
//             const { key, ...restRowProps } = rowProps; // Extract key
//             return (
//               <tr {...restRowProps} key={key}>
//                 {row.cells.map(cell => {
//                   const cellProps = cell.getCellProps();
//                   const { key, ...restCellProps } = cellProps; // Extract key
//                   return (
//                     <td {...restCellProps} key={key} style={{ width: cell.column.width }}>
//                       {cell.render('Cell')}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// import React, { useState } from 'react';
// import { useTable, useResizeColumns, useBlockLayout } from 'react-table';
// import { useDrag, useDrop } from 'react-dnd';
// import '@/styles/Table.css'; // For custom styles (optional)

// // Custom hook for column dragging
// const useColumnDrag = (column, index, moveColumn, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: 'column',
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing, // Allow drag only if not resizing
//   });

//   const [, drop] = useDrop({
//     accept: 'column',
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         moveColumn(item.index, index); // Move column to new position
//         item.index = index; // Update dragged item's index
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// // Table component with drag-and-drop for columns
// const Table = ({ dataColumns: initialColumns, data }) => {
//   const [columns, setColumns] = useState(initialColumns); // Use state to track column order
//   const [resizing, setResizing] = useState(false); // Track resizing state

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useResizeColumns,
//     useBlockLayout
//   );

//   // Column reordering function
//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns); // Trigger re-render with updated columns
//   };

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <table className="table">
//         <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => {
//                 const { drag, drop, preview } = useColumnDrag(
//                   column,
//                   idx,
//                   moveColumn,
//                   resizing // Pass the resizing state to prevent drag interference
//                 );
//                 return (
//                   <th
//                     ref={(node) => {
//                       drag(drop(node)); // Apply drag and drop to column header
//                     }}
//                     {...column.getHeaderProps()}
//                     style={{
//                       width: column.width || 'auto',
//                     //   position: 'sticky',
//                     //   top: 0,
//                     //   backgroundColor: '#fff',
//                     //   zIndex: 1,
//                     //   paddingRight: '10px',
//                     //   userSelect: 'none',
//                     }}
//                     key={column.id}
//                   >
//                     {column.render('Header')}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         style={{
//                           position: 'absolute',
//                           right: 0,
//                           top: 0,
//                           bottom: 0,
//                           width: '10px',
//                           cursor: 'col-resize',
//                         }}
//                         onMouseDown={() => setResizing(true)} // Track when resizing starts
//                         onMouseUp={() => setResizing(false)} // Reset resizing state when done
//                         onTouchStart={() => setResizing(true)} // For touch events
//                         onTouchEnd={() => setResizing(false)} // For touch events
//                       />
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     key={cell.column.id}
//                     style={{ width: cell.column.width }}
//                   >
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// import React, { useEffect, useState } from "react";
// import { useTable, useResizeColumns, useBlockLayout } from "react-table";
// import { useDrag, useDrop } from "react-dnd";
// import "@/styles/Table.css";

// const useColumnDrag = (column, index, moveColumn, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: "column",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing,
//   });

//   const [, drop] = useDrop({
//     accept: "column",
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         moveColumn(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// const Table = ({ dataColumns: initialColumns, data }) => {
//   // Initialize state with columns, filters, modalOpen
//   const [columns, setColumns] = useState(
//     initialColumns.map((col) => ({ ...col, isVisible: col.isVisible !== false }))
//   );
//   const [resizing, setResizing] = useState(false);
//   const [filters, setFilters] = useState(
//     initialColumns.reduce((acc, col) => {
//       acc[col.Header] = ""; // Correct initialization using col.accessor
//       return acc;
//     }, {})
//   );
//   const [modalOpen, setModalOpen] = useState(false);

//   // Handle search input for column filters
//   const handleSearchChange = (e, columnId) => {
//     setFilters({
//       ...filters,
//       [columnId]: e.target.value,
//     });
//   };

//   const [filteredData, setFilterdData] = useState(data)

//   useEffect(() => {
//     // Apply the filter to the data when filters, columns, or data change
//     const newFilteredData = data.filter((row) => {
//       return columns.every((column) => {
//         // Get the filter value for the current column
//         const columnFilter = filters[column.accessor] && filters[column.accessor].toLowerCase();

//         // If no filter is set for this column, include all values
//         if (!columnFilter) return true;

//         const cellValue = row[column.accessor];
//         // Check if the cell value includes the filter text (case insensitive)
//         return (
//           cellValue &&
//           cellValue.toString().toLowerCase().includes(columnFilter)
//         );
//       });
//     });

//     // Update the filteredData state
//     setFilterdData(newFilteredData);
//   }, [filters, data, columns]); // Depend on filters, data, and columns

//   useEffect(()=>{
//     console.log(filteredData)
//   }, [filteredData])

//   // Manage visible columns based on the state
//   const [visibleColumns, setVisibleColumns] = useState(columns.filter((col) => col.isVisible));

//   useEffect(() => {
//     setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
//   }, [columns]);

//   // Table setup using react-table hooks
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//   useTable(
//     {
//       columns: visibleColumns, // Use memoized visible columns
//       data: filteredData, // Use filtered data
//     },
//     useResizeColumns,
//     useBlockLayout
//   );

//   // Move columns when dragged
//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns);
//   };

//   // Toggle visibility of a column
//   const toggleColumnVisibility = (columnID) => {
//     const newColumns = columns.map((col) =>
//       col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
//     );

//     // Filter out columns where isVisible is false
//     const visibleColumns = newColumns.filter((col) => col.isVisible);

//     // Update the state with the new columns
//     setColumns(newColumns);

//     // Optionally update visibleColumns state if you manage it separately
//     setVisibleColumns(visibleColumns);

//     console.log(newColumns); // Check the updated columns
//     console.log(visibleColumns); // Check the visible columns
//   };

//   const [rowGap, setRowGap] = useState(5)

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//         height={30}
//         width={30}
//         onClick={() => setModalOpen(true)}
//       />

// <div style={{display: "flex", gap: "5px", alignItems: "center"}}>
//   <img
//     onClick={() => setRowGap(5)}
//     src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//     height={30}
//     width={30}
//     alt="Row Gap 5"
//     style={{ opacity: rowGap === 5 ? 1 : 0.5 }} // Set opacity for active state
//   />
//   <img
//     onClick={() => setRowGap(10)}
//     src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//     height={28}
//     width={30}
//     alt="Row Gap 10"
//     style={{ opacity: rowGap === 10 ? 1 : 0.5 }} // Set opacity for active state
//   />
//   <img
//     onClick={() => setRowGap(15)}
//     src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//     height={23}
//     width={25}
//     alt="Row Gap 15"
//     style={{ opacity: rowGap === 15 ? 1 : 0.5, marginBottom: "2px" }} // Set opacity for active state
//   />
// </div>

//       {/* Modal for column visibility toggles */}
//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>Select Columns</h2>
//               <button className="close-button" onClick={() => setModalOpen(false)}>
//                 X
//               </button>
//             </div>
//             <div className="modal-body">
//               <ul className="checkbox-list">
//                 {columns.map((column) => (
//                   <li key={column.id} className="checkbox-item">
//                     <label htmlFor={column.id} className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         id={column.id}
//                         checked={column.isVisible}
//                         onChange={() => toggleColumnVisibility(column.accessor)}
//                       />
//                       {column.Header}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="modal-footer">
//               <button className="close-button" onClick={() => setModalOpen(false)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table rendering */}
//       <table className="table">
//         <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => {
//                 const { drag, drop, preview } = useColumnDrag(
//                   column,
//                   idx,
//                   moveColumn,
//                   resizing
//                 );

//                 return (
//                   <th
//                     ref={(node) => {
//                       drag(drop(node));
//                     }}
//                     {...column.getHeaderProps()}
//                     key={column.id}
//                     className="column-header"
//                   >
//                     {column.render("Header")}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         className="resizer"
//                         onMouseDown={() => setResizing(true)}
//                         onMouseUp={() => setResizing(false)}
//                         onTouchStart={() => setResizing(true)}
//                         onTouchEnd={() => setResizing(false)}
//                       />
//                     )}
//                     <div className="search-container">
//                       <input
//                         type="text"
//                         placeholder={`Search ${column.render("Header")}`}
//                         value={filters[column.Header] || ""}
//                         onChange={(e) =>{
//                             handleSearchChange(e, column.Header)
//                         }}
//                         className="search-input"
//                       />
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//                 <tr
//                 {...row.getRowProps()}
//                 key={row.id}
//               >
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()} style={{
//                     ...cell.getCellProps().style,
//                       padding: `${rowGap}px 10px`,
//                     }}  key={cell.column.id} className="table-cell">
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// import React, { useEffect, useState } from "react";
// import { useTable, useResizeColumns, useBlockLayout } from "react-table";
// import { useDrag, useDrop } from "react-dnd";
// import "@/styles/Table.css";

// const useColumnDrag = (column, index, moveColumn, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: "column",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing,
//   });

//   const [, drop] = useDrop({
//     accept: "column",
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         moveColumn(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// const Table = ({ dataColumns: initialColumns, data }) => {
//   const [columns, setColumns] = useState(
//     initialColumns.map((col) => ({
//       ...col,
//       isVisible: col.isVisible !== false,
//     }))
//   );
//   const [resizing, setResizing] = useState(false);
//   const [filters, setFilters] = useState(
//     initialColumns.reduce((acc, col) => {
//       acc[col.accessor] = ""; // Correct initialization using col.accessor
//       return acc;
//     }, {})
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rowGap, setRowGap] = useState(15);
//   const [filteredData, setFilteredData] = useState(data);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.filter((col) => col.isVisible)
//   );

//   const handleSearchChange = (e, columnId) => {
//     setFilters({
//       ...filters,
//       [columnId]: e.target.value,
//     });

//     const newFilteredData = filteredData.filter((row) => {
//       return row[columnId].toLowerCase().includes(e.target.value);
//     });

//     setFilteredData(newFilteredData);
//   };

//   useEffect(() => {
//     setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
//   }, [columns]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns: visibleColumns, // Use memoized visible columns
//         data: filteredData, // Use filtered data
//       },
//       useResizeColumns,
//       useBlockLayout
//     );

//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns);
//   };

//   const toggleColumnVisibility = (columnID) => {
//     const newColumns = columns.map((col) =>
//       col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
//     );

//     // const visibleColumns = newColumns.filter((col) => col.isVisible);
//     setColumns(newColumns);
//     // setVisibleColumns(visibleColumns);
//   };

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//         height={30}
//         width={30}
//         onClick={() => setModalOpen(true)}
//       />

//       <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//         <img
//           onClick={() => setRowGap(15)}
//           src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//           height={30}
//           width={30}
//           alt="Row Gap 5"
//           style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(10)}
//           src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//           height={28}
//           width={30}
//           alt="Row Gap 10"
//           style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(5)}
//           src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//           height={23}
//           width={25}
//           alt="Row Gap 15"
//           style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
//         />
//       </div>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>Select Columns</h2>
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 X
//               </button>
//             </div>
//             <div className="modal-body">
//               {columns.map((column) => (
//                 <label
//                   key={column.id}
//                   htmlFor={column.id}
//                   className="checkbox-label"
//                 >
//                   <input
//                     type="checkbox"
//                     id={column.id}
//                     checked={column.isVisible}
//                     onChange={() => toggleColumnVisibility(column.accessor)}
//                   />
//                   {column.Header}
//                 </label>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table">
//       <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => {
//                 const { drag, drop, preview } = useColumnDrag(
//                   column,
//                   idx,
//                   moveColumn,
//                   resizing
//                 );

//                 return (
//                   <th
//                     ref={(node) => {
//                       drag(drop(node));
//                     }}
//                     {...column.getHeaderProps()}
//                     key={column.id}
//                     className="column-header"
//                   >
//                     {column.render("Header")}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         className="resizer"
//                         onMouseDown={() => setResizing(true)}
//                         onMouseUp={() => setResizing(false)}
//                         onTouchStart={() => setResizing(true)}
//                         onTouchEnd={() => setResizing(false)}
//                       />
//                     )}
//                     <div className="search-container">
//                       <input
//                         type="text"
//                         placeholder={`Search ${column.render("Header")}`}
//                         value={filters[column.id] || ""}
//                         onChange={(e) => handleSearchChange(e, column.id)}
//                         className="search-input"
//                       />
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       ...cell.getCellProps().style,
//                       padding: `${rowGap}px 10px`,
//                     }}
//                     key={cell.column.id}
//                     className="table-cell"
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

// import React, { useEffect, useState } from "react";
// import { useTable, useResizeColumns, useBlockLayout } from "react-table";
// import { useDrag, useDrop } from "react-dnd";
// import "@/styles/Table.css";

// const useColumnDrag = (column, index, moveColumn, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: "column",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing,
//   });

//   const [, drop] = useDrop({
//     accept: "column",
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         moveColumn(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// const Table = ({ dataColumns: initialColumns, data }) => {
//   const [columns, setColumns] = useState(
//     initialColumns.map((col) => ({
//       ...col,
//       isVisible: col.isVisible !== false,
//     }))
//   );
//   const [resizing, setResizing] = useState(false);
//   const [filters, setFilters] = useState(
//     initialColumns.reduce((acc, col) => {
//       acc[col.accessor] = ""; // Correct initialization using col.accessor
//       return acc;
//     }, {})
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rowGap, setRowGap] = useState(15);
//   const [filteredData, setFilteredData] = useState(data);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.filter((col) => col.isVisible)
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns: visibleColumns, // Use memoized visible columns
//         data: filteredData, // Use filtered data
//       },
//       useResizeColumns,
//       useBlockLayout
//     );

//   const handleSearchChange = (e, columnId) => {
//     setFilters({
//         ...filters,
//         [columnId]: e.target.value,
//       });

//     if(e.target.value === '') {
//         return setFilteredData(data)
//     }

//     const newFilteredData = filteredData.filter((row) => {
//       return row[columnId].toLowerCase().includes(e.target.value);
//     });

//     setFilteredData(newFilteredData);
//   };

//   useEffect(() => {
//     setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
//   }, [columns]);

//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns);
//   };

//   const toggleColumnVisibility = (columnID) => {
//     const newColumns = columns.map((col) =>
//       col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
//     );

//     setColumns(newColumns);
//   };

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//         height={30}
//         width={30}
//         onClick={() => setModalOpen(true)}
//       />

//       <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//         <img
//           onClick={() => setRowGap(15)}
//           src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//           height={30}
//           width={30}
//           alt="Row Gap 5"
//           style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(10)}
//           src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//           height={28}
//           width={30}
//           alt="Row Gap 10"
//           style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(5)}
//           src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//           height={23}
//           width={25}
//           alt="Row Gap 15"
//           style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
//         />
//       </div>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>Select Columns</h2>
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 X
//               </button>
//             </div>
//             <div className="modal-body">
//               {columns.map((column) => (
//                 <label
//                   key={column.id}
//                   htmlFor={column.id}
//                   className="checkbox-label"
//                 >
//                   <input
//                     type="checkbox"
//                     id={column.id}
//                     checked={column.isVisible}
//                     onChange={() => toggleColumnVisibility(column.accessor)}
//                   />
//                   {column.Header}
//                 </label>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table">
//         <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => {
//                 const { drag, drop, preview } = useColumnDrag(
//                   column,
//                   idx,
//                   moveColumn,
//                   resizing
//                 );

//                 return (
//                   <th
//                     ref={(node) => {
//                       drag(drop(node));
//                     }}
//                     {...column.getHeaderProps()}
//                     key={column.id}
//                     className="column-header"
//                   >
//                     {column.render("Header")}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         className="resizer"
//                         onMouseDown={() => setResizing(true)}
//                         onMouseUp={() => setResizing(false)}
//                         onTouchStart={() => setResizing(true)}
//                         onTouchEnd={() => setResizing(false)}
//                       />
//                     )}
//                     <div className="search-container">
//                       <input
//                         type="text"
//                         placeholder={`Search ${column.render("Header")}`}
//                         value={filters[column.id] || ""}
//                         onChange={(e) => handleSearchChange(e, column.id)}
//                         className="search-input"
//                       />
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       ...cell.getCellProps().style,
//                       padding: `${rowGap}px 10px`,
//                     }}
//                     key={cell.column.id}
//                     className="table-cell"
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;



// import React, { useEffect, useState } from "react";
// import { useTable, useResizeColumns, useBlockLayout } from "react-table";
// import { useDrag, useDrop } from "react-dnd";
// import "@/styles/Table.css";

// // Custom hook for column drag
// const useColumnDrag = (column, index, moveColumn, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: "column",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing,
//   });

//   const [, drop] = useDrop({
//     accept: "column",
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         moveColumn(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// // ColumnDrag component that uses the useColumnDrag hook
// const ColumnDrag = ({ column, idx, moveColumn, resizing, filters, handleSearchChange }) => {
//     const { drag, drop } = useColumnDrag(column, idx, moveColumn, resizing);
  
//     return (
//       <th
//         ref={(node) => {
//           if (node) {
//             drag(drop(node)); // Attach drag/drop handlers
//           }
//         }}
//         {...column.getHeaderProps()}
//         key={column.id}
//         className="column-header"
//       >
//         {column.render("Header")}
//         {column.canResize && (
//           <div
//             {...column.getResizerProps()}
//             className="resizer"
//             onMouseDown={() => setResizing(true)}
//             onMouseUp={() => setResizing(false)}
//             onTouchStart={() => setResizing(true)}
//             onTouchEnd={() => setResizing(false)}
//           />
//         )}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder={`Search ${column.render("Header")}`}
//             value={filters[column.id] || ""}
//             onChange={(e) => handleSearchChange(e, column.id)}
//             className="search-input"
//           />
//         </div>
//       </th>
//     );
//   };

// const Table = ({ dataColumns: initialColumns, data }) => {
//   const [columns, setColumns] = useState(
//     initialColumns.map((col) => ({
//       ...col,
//       isVisible: col.isVisible !== false,
//     }))
//   );
//   const [resizing, setResizing] = useState(false);
//   const [filters, setFilters] = useState(
//     initialColumns.reduce((acc, col) => {
//       acc[col.accessor] = ""; // Correct initialization using col.accessor
//       return acc;
//     }, {})
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rowGap, setRowGap] = useState(15);
//   const [filteredData, setFilteredData] = useState(data);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.filter((col) => col.isVisible)
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns: visibleColumns, // Use memoized visible columns
//         data: filteredData, // Use filtered data
//       },
//       useResizeColumns,
//       useBlockLayout
//     );

//   const handleSearchChange = (e, columnId) => {
//     setFilters({
//       ...filters,
//       [columnId]: e.target.value,
//     });

//     if (e.target.value === "") {
//       return setFilteredData(data);
//     }

//     const newFilteredData = filteredData.filter((row) => {
//       return row[columnId].toLowerCase().includes(e.target.value);
//     });

//     setFilteredData(newFilteredData);
//   };

//   useEffect(() => {
//     setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
//   }, [columns]);

//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns);
//   };

//   const toggleColumnVisibility = (columnID) => {
//     const newColumns = columns.map((col) =>
//       col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
//     );

//     setColumns(newColumns);
//   };

//   return (
//     <div className="table-container" {...getTableProps()}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//         height={30}
//         width={30}
//         onClick={() => setModalOpen(true)}
//       />

//       <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//         <img
//           onClick={() => setRowGap(15)}
//           src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//           height={30}
//           width={30}
//           alt="Row Gap 5"
//           style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(10)}
//           src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//           height={28}
//           width={30}
//           alt="Row Gap 10"
//           style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(5)}
//           src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//           height={23}
//           width={25}
//           alt="Row Gap 15"
//           style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
//         />
//       </div>

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>Select Columns</h2>
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 X
//               </button>
//             </div>
//             <div className="modal-body">
//               {columns.map((column) => (
//                 <label
//                   key={column.id}
//                   htmlFor={column.id}
//                   className="checkbox-label"
//                 >
//                   <input
//                     type="checkbox"
//                     id={column.id}
//                     checked={column.isVisible}
//                     onChange={() => toggleColumnVisibility(column.accessor)}
//                   />
//                   {column.Header}
//                 </label>
//               ))}
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table">
//         <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => (
//   <ColumnDrag
//     key={column.id}
//     column={column}
//     idx={idx}
//     moveColumn={moveColumn}
//     resizing={resizing}
//     filters={filters}              // Pass filters
//     handleSearchChange={handleSearchChange}  // Pass handleSearchChange function
//   />
// ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       ...cell.getCellProps().style,
//                       padding: `${rowGap}px 10px`,
//                     }}
//                     key={cell.column.id}
//                     className="table-cell"
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;


// import React, { useEffect, useState } from "react";
// import { useTable, useResizeColumns, useBlockLayout } from "react-table";
// import { useDrag, useDrop } from "react-dnd";
// import "@/styles/Table.css";

// // Custom hook for column drag
// const useColumnDrag = (column, index, moveColumnInTable, isResizing) => {
//   const [, drag, preview] = useDrag({
//     type: "column",
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing,
//   });

//   const [, drop] = useDrop({
//     accept: "column",
//     hover: (item, monitor) => {
//       if (item.index !== index) {
//         // Move the column in the table
//         moveColumnInTable(item.index, index); // Call moveColumnInTable here
//         item.index = index;
//       }
//     },
//   });

//   return { drag, drop, preview };
// };

// // ColumnDrag component for table header columns
// const ColumnDrag = ({ column, idx, moveColumnInTable, resizing, setResizing, filters, handleSearchChange }) => {
//   const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable, resizing); // Pass moveColumnInTable here

//   return (
//     <th
//       ref={(node) => {
//         if (node) {
//           drag(drop(node)); // Attach drag/drop handlers
//         }
//       }}
//       {...column.getHeaderProps()}
//       key={column.id}
//       className="column-header"
//     >
//       {column.render("Header")}
//       {column.canResize && (
//         <>
//         {console.log('hello')}
// <div
//         {...column.getResizerProps()}
//         className="resizer"
//         onMouseDown={() => setResizing(false)}  // Set resizing to true when mouse is down
//         onMouseUp={() => setResizing(false)}   // Set resizing to false when mouse is up
//         onTouchStart={() => setResizing(true)} // For touch devices
//         onTouchEnd={() => setResizing(false)}  // For touch devices
//       />
//         </>

//       )}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder={`Search ${column.render("Header")}`}
//           value={filters[column.id] || ""}
//           onChange={(e) => handleSearchChange(e, column.id)}
//           className="search-input"
//         />
//       </div>
//     </th>
//   );
// };

// // ColumnDrag for Modal (Popup) reordering
// const ColumnDragInModal = ({ column, idx, moveColumnInModal, moveColumnInTable }) => {
//   const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable, false); // Use moveColumnInTable for actual column reordering in the table

//   return (
//     <div
//     style={{margin: "10px 0"}}
//       ref={(node) => {
//         if (node) {
//           drag(drop(node));
//         }
//       }}
//       className="column-item"
//     >
//       <input
//         type="checkbox"
//         checked={column.isVisible}
//         onChange={() => moveColumnInModal(column.accessor)}
//       />
//       {column.Header}
//     </div>
//   );
// };

// const Table = ({ dataColumns: initialColumns, data }) => {
//   const [columns, setColumns] = useState(
//     initialColumns.map((col) => ({
//       ...col,
//       isVisible: col.isVisible !== false,
//     }))
//   );
//   const [filters, setFilters] = useState(
//     initialColumns.reduce((acc, col) => {
//       acc[col.accessor] = ""; // Correct initialization using col.accessor
//       return acc;
//     }, {})
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [rowGap, setRowGap] = useState(15);
//   const [filteredData, setFilteredData] = useState(data);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.filter((col) => col.isVisible)
//   );
//   const [resizing, setResizing] = useState(false); // Define resizing state


//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns: visibleColumns, // Use memoized visible columns
//         data: filteredData, // Use filtered data
//       },
//       useResizeColumns,
//       useBlockLayout
//     );

//   const handleSearchChange = (e, columnId) => {
//     setFilters({
//       ...filters,
//       [columnId]: e.target.value,
//     });

//     if (e.target.value === "") {
//       return setFilteredData(data);
//     }

//     const newFilteredData = filteredData.filter((row) => {
//       return row[columnId].toLowerCase().includes(e.target.value);
//     });

//     setFilteredData(newFilteredData);
//   };

//   useEffect(() => {
//     setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
//   }, [columns]);

//   const moveColumnInTable = (fromIndex, toIndex) => {
//     const updatedColumns = [...columns];
//     const [movedColumn] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, movedColumn);
//     setColumns(updatedColumns);
//   };

//   const moveColumnInModal = (columnID) => {
//     const newColumns = columns.map((col) =>
//       col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
//     );
//     setColumns(newColumns); // Update the columns with the new visibility state
//   };

//   return (
//     <>
//     <div style={{display: "flex", gap: '1rem'}}>
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//         height={30}
//         width={30}
//         onClick={() => setModalOpen(true)}
//       />
//       <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//         <img
//           onClick={() => setRowGap(15)}
//           src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//           height={30}
//           width={30}
//           alt="Row Gap 5"
//           style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(10)}
//           src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//           height={28}
//           width={30}
//           alt="Row Gap 10"
//           style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
//         />
//         <img
//           onClick={() => setRowGap(5)}
//           src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//           height={23}
//           width={25}
//           alt="Row Gap 15"
//           style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
//         />
//       </div>
//       </div>
//     <div className="table-container" {...getTableProps()}>
      

//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>Select Columns</h2>
//               <button
//                 className="close-button"
//                 onClick={() => setModalOpen(false)}
//               >
//                 X
//               </button>
//             </div>
//             <div className="modal-body">
//               {columns.map((column, idx) => (
//                 <ColumnDragInModal
//                   key={column.id}
//                   column={column}
//                   idx={idx}
//                   moveColumnInModal={moveColumnInModal}
//                   moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table">
//         <thead>
//           {headerGroups.map((headerGroup, index) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, idx) => (
//                 <ColumnDrag
//                   key={column.id}
//                   column={column}
//                   idx={idx}
//                   moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
//                   setResizing={setResizing}
//                   resizing={resizing}
//                   filters={filters}              // Pass filters
//                   handleSearchChange={handleSearchChange}  // Pass handleSearchChange function
//                 />
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} key={row.id}>
//                 {row.cells.map((cell) => (
//                   <td
//                     {...cell.getCellProps()}
//                     style={{
//                       ...cell.getCellProps().style,
//                       padding: `${rowGap}px 10px`,
//                     }}
//                     key={cell.column.id}
//                     className="table-cell"
//                   >
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// };

// export default Table;

import React, { useEffect, useRef, useState } from "react";
import { useTable, useResizeColumns, useBlockLayout } from "react-table";
import { useDrag, useDrop } from "react-dnd";
import "@/styles/Table.css";

// Custom hook for column drag
const useColumnDrag = (column, index, moveColumnInTable, isResizing) => {
  const [, drag, preview] = useDrag({
    type: "column",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => !isResizing,
  });

  const [, drop] = useDrop({
    accept: "column",
    hover: (item, monitor) => {
      if (item.index !== index) {
        // Move the column in the table
        moveColumnInTable(item.index, index); // Call moveColumnInTable here
        item.index = index;
      }
    },
  });

  return { drag, drop, preview };
};

// ColumnDrag component for table header columns
const ColumnDrag = ({
  column,
  idx,
  moveColumnInTable,
  filters,
  handleSearchChange,
}) => {
  const { drag, drop } = useColumnDrag(
    column,
    idx,
    moveColumnInTable,
  );

  const [cursorName, setCursorName] = useState(null);
  

  // Function to get the current cursor style
 

  // Handle Mouse Down event
  const handleMouseDown = (event) => {
    setCursorName(event); // Store the cursor style in state
  };


  return (
    <th
    ref={cursorName !== "resize" ?(node) => {
      if (node) {
        drag(drop(node)); // Attach drag/drop handlers if not resizing
      }
    } : {}}
      onMouseDown={(e) => handleMouseDown("auto")} // Track cursor on mouse down
      onMouseUp={()=>{
        setCursorName(null)
      }}
      onTouchEnd={()=>setCursorName(null)}
      onTouchStart={(e)=>handleMouseDown("auto")}
      {...column.getHeaderProps()}
      key={column.id}
      className="column-header"
    >
      <div className="header-text">{column.Header}</div>

      {column.canResize && (
        <>
          <div
            onMouseDown={(e) => {
                handleMouseDown("resize")
            }} // Track cursor on mouse down
            onTouchStart={(e)=>handleMouseDown("resize")}
            onMouseUp={()=>{
                setCursorName(null)
            }}
            onTouchEnd={()=>setCursorName(null)}
            {...column.getResizerProps()}
            className="resizer"
          />
          <div className="popup-message" >
            <p>Double click and drag to resize</p>
          </div>
        </>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder={`Search ${column.render("Header")}`}
          value={filters[column.id] || ""}
          onChange={(e) => handleSearchChange(e, column.id)}
          className="search-input"
        />
      </div>
    </th>
  );
};



// ColumnDrag for Modal (Popup) reordering
const ColumnDragInModal = ({
  column,
  idx,
  moveColumnInModal,
  moveColumnInTable,
}) => {
  const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable, false); // Use moveColumnInTable for actual column reordering in the table

  return (
    <div
  style={{ margin: "10px 0" }}
  ref={(node) => {
    if (node) {
      drag(drop(node)); // Drag and drop handling
    }
  }}
  className="column-item"
>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div>
      <input
        type="checkbox"
        checked={column.isVisible}
        onChange={() => moveColumnInModal(column.accessor)}
      />
      {column.Header}
    </div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
      height={20}
      width={20}
      className="drag-and-drop"
    />
  </div>
</div>

  );
};

const Table = ({ dataColumns: initialColumns, data }) => {
  const [columns, setColumns] = useState(
    initialColumns.map((col) => ({
      ...col,
      isVisible: col.isVisible !== false,
    }))
  );
  const [filters, setFilters] = useState(
    initialColumns.reduce((acc, col) => {
      acc[col.accessor] = ""; // Correct initialization using col.accessor
      return acc;
    }, {})
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [rowGap, setRowGap] = useState(15);
  const [filteredData, setFilteredData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter((col) => col.isVisible)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set rows per page to 10 by default
  const [resizing, setResizing] = useState(false);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: visibleColumns, // Use memoized visible columns
        data: filteredData, // Use filtered data
      },
      useResizeColumns,
      useBlockLayout
    );

  // Filter rows based on pagination
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle search change
  const handleSearchChange = (e, columnId) => {
    setFilters({
      ...filters,
      [columnId]: e.target.value,
    });

    if (e.target.value === "") {
      return setFilteredData(data);
    }

    const newFilteredData = filteredData.filter((row) => {
      return row[columnId].toLowerCase().includes(e.target.value);
    });

    setFilteredData(newFilteredData);
  };

  useEffect(() => {
    setVisibleColumns(columns.filter((col) => col.isVisible)); // Update visible columns when columns change
  }, [columns]);

  const moveColumnInTable = (fromIndex, toIndex) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const moveColumnInModal = (columnID) => {
    const newColumns = columns.map((col) =>
      col.accessor === columnID ? { ...col, isVisible: !col.isVisible } : col
    );
    setColumns(newColumns); // Update the columns with the new visibility state
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: ".5rem"}}>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
          height={30}
          width={30}
          onClick={() => setModalOpen(true)}
        />
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <img
            onClick={() => setRowGap(15)}
            src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
            height={30}
            width={30}
            alt="Row Gap 5"
            style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
          />
          <img
            onClick={() => setRowGap(10)}
            src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
            height={28}
            width={30}
            alt="Row Gap 10"
            style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
          />
          <img
            onClick={() => setRowGap(5)}
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
            height={23}
            width={25}
            alt="Row Gap 15"
            style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
          />
        </div>
      </div>
      <div>
      {totalPages > 1 && (
          <div className="pagination" style={{display: "flex", gap: ".4rem"}}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
      </div>

      <div className="table-container" {...getTableProps()}>
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Select Columns</h2>
                <button
                  className="close-button"
                  onClick={() => setModalOpen(false)}
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                {columns.map((column, idx) => (
                  <ColumnDragInModal
                    key={column.id}
                    column={column}
                    idx={idx}
                    moveColumnInModal={moveColumnInModal}
                    moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <table className="table">
            {headerGroups.map((headerGroup, index) => (
                <>
          <thead>
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, idx) => (
                  <ColumnDrag
                    key={column.id}
                    column={column}
                    idx={idx}
                    moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
                    setResizing={setResizing}
                    resizing={resizing}
                    filters={filters} // Pass filters
                    handleSearchChange={handleSearchChange} // Pass handleSearchChange function
                  />
                ))}
              </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {paginatedRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        ...cell.getCellProps().style,
                        padding: `${rowGap}px 10px`,
                      }}
                      key={cell.column.id}
                      className="table-cell"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          </>
            ))}

        </table>
      </div>
    </>
  );
};

export default Table;

