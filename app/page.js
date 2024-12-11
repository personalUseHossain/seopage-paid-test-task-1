'use client';

import { useState, useEffect } from 'react';
import Table from '../components/Table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
  const [tableData, setTableData] = useState({ data: [], columns: [] }); // Data for the active table
  const [activeTableIndex, setActiveTableIndex] = useState(0); // Track the active table
  const [loading, setLoading] = useState(false); // Loading state

  const tableDetails = [
    {
      name: 'Predefined Cycle',
      api: 'https://retoolapi.dev/cV9K7f/predefined_cycle',
    },
    {
      name: 'No. of Projects',
      api: 'https://retoolapi.dev/raJ2QY/no_of_projects',
    },
    {
      name: 'Total Project Value',
      api: 'https://retoolapi.dev/qQwvdU/total_project_value',
    },
    {
      name: 'Total Released Amount',
      api: 'https://retoolapi.dev/g8dYiX/total_released_amount',
    },
    {
      name: 'No. of Fully Completed Project',
      api: 'https://retoolapi.dev/Ap1WeY/no_of_fully_completed_project',
    },
    {
      name: 'Project Completion Rate',
      api: 'https://retoolapi.dev/q0JzIY/project_completion_rate',
    },
    {
      name: 'Milestone Completion Rate',
      api: 'https://retoolapi.dev/hPaSQx/milestone_completion_rate',
    },
    {
      name: 'Task Completion Rate',
      api: 'https://retoolapi.dev/JxFjNL/task_completion_rate',
    },
    {
      name: 'Average Project Completion Time',
      api: 'https://retoolapi.dev/5uR4BW/average_project_completion_time',
    },
    {
      name: 'No of Upsale/Cross Sales',
      api: 'https://retoolapi.dev/4W877W/no_of_upsale_cross_sales',
    },
    {
      name: 'Value of Upsale/Crosssale',
      api: 'https://retoolapi.dev/pptYJy/value_of_upsale_cross_sale',
    },
    {
      name: 'Canceled Projects',
      api: 'https://retoolapi.dev/XbPWst/canceled_projects',
    },
    {
      name: 'Delayed Projects',
      api: 'https://retoolapi.dev/psFpKa/delayed_projects',
    },
    {
      name: 'Delayed Completed',
      api: 'https://retoolapi.dev/lJOP3J/delayed_completed',
    },
  ];

  // Function to fetch data for the active table
  const fetchDataForActiveTable = async (index) => {
    setLoading(true); // Set loading to true while fetching data
    const { api } = tableDetails[index]; // Get the API URL for the active table
    try {
      const response = await fetch(api);
      const fetchedData = await response.json();

      // Dynamically create columns based on the keys of the first object in the fetched data
      const columnKeys = Object.keys(fetchedData[0] || {});
      const generatedColumns = columnKeys.map((key) => ({
        Header: key.replace(/_/g, ' ').toUpperCase(),
        accessor: key,
      }));

      setTableData({ data: fetchedData, columns: generatedColumns }); // Set the active table's data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch data for the active table when the component mounts or when the active table changes
  useEffect(() => {
    fetchDataForActiveTable(activeTableIndex);
  }, [activeTableIndex]); // Dependency on activeTableIndex to refetch data when the table changes

  // Show loading state while data is being fetched
  if (loading) return <div>Loading...</div>;

  return (
    <div style={{paddingLeft: ".5rem", paddingRight: ".5rem"}}>
      <h1>Table</h1>

      {/* Table Tabs */}
      

      {/* Render the selected table */}
      <DndProvider backend={HTML5Backend}>
        <Table
          dataColumns={tableData.columns}  // Get columns of active table
          data={tableData.data}  // Get data of active table
        />
      </DndProvider>
      <div className="table-tabs" style={{overflow: "scroll", marginTop: "10px"}}>
        {tableDetails.map((table, index) => (
          <button
            key={table.name}
            onClick={() => setActiveTableIndex(index)} // Switch table on click
            className={index === activeTableIndex ? 'active' : ''}
          >
            {table.name}
          </button>
        ))}
      </div>
    </div>
  );
}
