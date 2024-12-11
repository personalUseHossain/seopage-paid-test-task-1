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
// const ColumnDrag = ({
//     column,
//     idx,
//     moveColumnInTable,
//     filters,
//     handleSearchChange,
//   }) => {
//     const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable);

//     const [cursorName, setCursorName] = useState(null);

//     const isStickyColumn = column.Header === "PROJECT MANAGER"; // Identify the sticky column

//     return (
//       <th
//         ref={cursorName !== "resize" ? (node) => drag(drop(node)) : {}}
//         className={`column-header ${isStickyColumn ? "sticky" : ""}`} // Add 'sticky' class if it's the "PROJECT MANAGER" column
//         onMouseDown={(e) => setCursorName("auto")}
//         onMouseUp={() => setCursorName(null)}
//         onTouchEnd={() => setCursorName(null)}
//         onTouchStart={(e) => setCursorName("auto")}
//         {...column.getHeaderProps()}
//         key={column.id}
//       >
//         <div className="header-text">{column.Header}</div>
//         {column.canResize && (
//           <>
//             <div
//               onMouseDown={(e) => setCursorName("resize")}
//               onTouchStart={(e) => setCursorName("resize")}
//               onMouseUp={() => setCursorName(null)}
//               onTouchEnd={() => setCursorName(null)}
//               {...column.getResizerProps()}
//               className="resizer"
//             />
//             <div className="popup-message">
//               <p>Double click and drag to resize</p>
//             </div>
//           </>
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

// // ColumnDrag for Modal (Popup) reordering
// const ColumnDragInModal = ({
//   column,
//   idx,
//   moveColumnInModal,
//   moveColumnInTable,
// }) => {
//   const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable, false); // Use moveColumnInTable for actual column reordering in the table

//   return (
//     <div
//       style={{ margin: "10px 0" }}
//       ref={(node) => {
//         if (node) {
//           drag(drop(node)); // Drag and drop handling
//         }
//       }}
//       className="column-item"
//     >
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div>
//           <input
//             type="checkbox"
//             checked={column.isVisible}
//             onChange={() => moveColumnInModal(column.accessor)}
//           />
//           {column.Header}
//         </div>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//           height={20}
//           width={20}
//           className="drag-and-drop"
//         />
//       </div>
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
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Set rows per page to 10 by default
//   const [resizing, setResizing] = useState(false);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable(
//       {
//         columns: visibleColumns, // Use memoized visible columns
//         data: filteredData, // Use filtered data
//       },
//       useResizeColumns,
//       useBlockLayout
//     );

//   // Filter rows based on pagination
//   const paginatedRows = rows.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Handle search change
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

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: ".5rem",
//           flexWrap: "wrap",
//           gap: "2rem",
//         }}
//       >
//         <div style={{ display: "flex", gap: ".5rem" }}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
//             height={30}
//             width={30}
//             onClick={() => setModalOpen(true)}
//           />
//           <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//             <img
//               onClick={() => setRowGap(15)}
//               src="https://cdn-icons-png.flaticon.com/512/4196/4196762.png"
//               height={30}
//               width={30}
//               alt="Row Gap 5"
//               style={{ opacity: rowGap === 15 ? 1 : 0.5 }}
//             />
//             <img
//               onClick={() => setRowGap(10)}
//               src="https://cdn4.iconfinder.com/data/icons/layout-16/384/Four_rows-512.png"
//               height={28}
//               width={30}
//               alt="Row Gap 10"
//               style={{ opacity: rowGap === 10 ? 1 : 0.5 }}
//             />
//             <img
//               onClick={() => setRowGap(5)}
//               src="https://cdn.iconscout.com/icon/premium/png-256-thumb/five-rows-822136.png?f=webp&w=256"
//               height={23}
//               width={25}
//               alt="Row Gap 15"
//               style={{ opacity: rowGap === 5 ? 1 : 0.5, marginBottom: "2px" }}
//             />
//           </div>
//         </div>
//         <div>
//           {totalPages > 1 && (
//             <div
//               className="pagination"
//               style={{ display: "flex", gap: ".4rem" }}
//             >
//               <button
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 {"<"}
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 {">"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="table-container" {...getTableProps()}>
//         {modalOpen && (
//           <div className="modal-overlay">
//             <div className="modal">
//               <div className="modal-header">
//                 <h2>Select Columns</h2>
//                 <button
//                   className="close-button"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   X
//                 </button>
//               </div>
//               <div className="modal-body">
//                 {columns.map((column, idx) => (
//                   <ColumnDragInModal
//                     key={column.id}
//                     column={column}
//                     idx={idx}
//                     moveColumnInModal={moveColumnInModal}
//                     moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <table className="table">
//           {headerGroups.map((headerGroup, index) => (
//             <>
//               <thead>
//                 <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                   {headerGroup.headers.map((column, idx) => (
//                     <ColumnDrag
//                       key={column.id}
//                       column={column}
//                       idx={idx}
//                       moveColumnInTable={moveColumnInTable} // Pass moveColumnInTable here
//                       setResizing={setResizing}
//                       resizing={resizing}
//                       filters={filters} // Pass filters
//                       handleSearchChange={handleSearchChange} // Pass handleSearchChange function
//                     />
//                   ))}
//                 </tr>
//               </thead>
//               <tbody {...getTableBodyProps()}>
//               {paginatedRows.map((row) => {
//   prepareRow(row);
//   return (
//     <tr {...row.getRowProps()} key={row.id}>
//       {row.cells.map((cell) => {
//         const isStickyCell = cell.column.Header === "PROJECT MANAGER"; // Identify the sticky column
//         return (
//           <td
//             {...cell.getCellProps()}
//             key={cell.column.id}
//             className={`table-cell ${isStickyCell ? "sticky-cell" : ""}`} // Add 'sticky-cell' class if it's the "PROJECT MANAGER" column
//             style={{
//               ...cell.getCellProps().style,
//               padding: `${rowGap}px 10px`,
//             }}
//           >
//             {cell.render("Cell")}
//           </td>
//         );
//       })}
//     </tr>
//   );
// })}
//               </tbody>
//             </>
//           ))}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Table;

import React, { useEffect, useState } from "react";
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
  const { drag, drop } = useColumnDrag(column, idx, moveColumnInTable);

  const [cursorName, setCursorName] = useState(null);

  const isStickyColumn = column.Header === "PROJECT MANAGER"; // Identify the sticky column

  return (
    <th
      ref={cursorName !== "resize" ? (node) => drag(drop(node)) : {}}
      className={`column-header ${isStickyColumn ? "sticky" : ""}`} // Add 'sticky' class if it's the "PROJECT MANAGER" column
      onMouseDown={(e) => setCursorName("auto")}
      onMouseUp={() => setCursorName(null)}
      onTouchEnd={() => setCursorName(null)}
      onTouchStart={(e) => setCursorName("auto")}
      {...column.getHeaderProps()}
      key={column.id}
    >
      <div className="header-text">{column.Header}</div>
      {column.canResize && (
        <>
          <div
            onMouseDown={(e) => setCursorName("resize")}
            onTouchStart={(e) => setCursorName("resize")}
            onMouseUp={() => setCursorName(null)}
            onTouchEnd={() => setCursorName(null)}
            {...column.getResizerProps()}
            className="resizer"
          />
          <div className="popup-message">
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

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([{}, {}, {}]);

  const comparisonOperators = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: "=", label: "Equal to" },
    { value: "!=", label: "Not Equal to" },
    { value: "contains", label: "Contains" },
    { value: "between", label: "Between" },
  ];

  const handleAddFilter = () => {
    setSelectedFilters([
      ...selectedFilters,
      { column: "", operator: "", value: "" }, // Add an empty filter entry
    ]);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...selectedFilters];
    newFilters[index][field] = value;
    setSelectedFilters(newFilters);
  };

  // Apply the filters to the data
  const applyFilters = () => {
    // Here you can apply your logic to filter the data based on `selectedFilters`
    let filteredData = data;
  
    selectedFilters.forEach(({ column, operator, value }) => {
      // Ensure value is a string and trim and lowercase it for consistent filtering
      const trimmedValue = value && typeof value === 'string' ? value.trim().toLowerCase() : value;
  
      if (column && operator && value !== "") {
        filteredData = filteredData.filter((row) => {
          // Convert row[column] to string and lowercase for consistent filtering
          const rowValue = row[column] ? row[column].toString().trim().toLowerCase() : "";
  
          switch (operator) {
            case ">":
              return parseFloat(rowValue) > parseFloat(trimmedValue);
            case "<":
              return parseFloat(rowValue) < parseFloat(trimmedValue);
            case "=":
              return rowValue === trimmedValue;
            case "!=":
              return rowValue !== trimmedValue;
            case "contains":
              return rowValue.includes(trimmedValue);
            case "between":
              const [min, max] = trimmedValue.split(",").map((v) => parseFloat(v));
              return parseFloat(rowValue) >= min && parseFloat(rowValue) <= max;
            default:
              return true;
          }
        });
      }
    });
  
    setFilteredData(filteredData); // Update the filtered data
  };
  


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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: ".5rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
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
          <button
            onClick={() => setFilterModalOpen(true)}
            className="filter-button"
          >
            Filter
          </button>
        </div>
        <div>
          {totalPages > 1 && (
            <div
              className="pagination"
              style={{ display: "flex", gap: ".4rem" }}
            >
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

        {filterModalOpen && (
          <div className="modal-overlay">
            <div className="modal filter">
              <div className="modal-header">
                <h2>Filter Columns</h2>
                <button
                  className="close-button"
                  onClick={() => setFilterModalOpen(false)}
                >
                  X
                </button>
              </div>
              <div className="modal-body">
                <div className="filter-rows">
                  {selectedFilters.map((filter, index) => (
                    <div key={index} className="filter-row">
                      {/* Column dropdown */}
                      <select
                        value={filter.column}
                        onChange={(e) =>
                          handleFilterChange(index, "column", e.target.value)
                        }
                      >
                        <option value="">Select Column</option>
                        {columns.map((col) => (
                          <option key={col.accessor} value={col.accessor}>
                            {col.Header}
                          </option>
                        ))}
                      </select>

                      {/* Operator dropdown */}
                      <select
                        value={filter.operator}
                        onChange={(e) =>
                          handleFilterChange(index, "operator", e.target.value)
                        }
                      >
                        <option value="">Select Operator</option>
                        {comparisonOperators.map((operator) => (
                          <option key={operator.value} value={operator.value}>
                            {operator.label}
                          </option>
                        ))}
                      </select>

                      {/* Filter value input */}
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) =>
                          handleFilterChange(index, "value", e.target.value)
                        }
                        placeholder="Enter value"
                      />
                    </div>
                  ))}
                </div>

                {/* Button to add a new filter row */}
                <button className="add-filter-button" onClick={handleAddFilter}>
                  <img
                    height={13}
                    width={13}
                    src="https://icon-library.com/images/add-icon-png/add-icon-png-0.jpg"
                    alt=""
                  />
                  Add Filter
                </button>

                {/* Apply filters button */}
                <button className="apply-filters-button" onClick={applyFilters}>
                  Apply Filters
                </button>
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
                      {row.cells.map((cell) => {
                        const isStickyCell =
                          cell.column.Header === "PROJECT MANAGER"; // Identify the sticky column
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            className={`table-cell ${
                              isStickyCell ? "sticky-cell" : ""
                            }`} // Add 'sticky-cell' class if it's the "PROJECT MANAGER" column
                            style={{
                              ...cell.getCellProps().style,
                              padding: `${rowGap}px 10px`,
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
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
