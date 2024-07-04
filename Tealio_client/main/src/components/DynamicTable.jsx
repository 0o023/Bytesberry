import React from 'react';
import { useParams } from 'react-router-dom';
import TableComponent from './TableComponent'; // Adjust the import path based on your actual project structure

const DynamicTable = () => {
  const { tableName } = useParams();

  return <TableComponent tableName={tableName} />;
};

export default DynamicTable;
