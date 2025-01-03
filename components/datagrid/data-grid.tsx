import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import StatusIndicator from "./status-indicator";
import { Button } from "../ui/button";
import { LucideDownload } from "lucide-react";
import { TableCell } from "../ui/table";
import DataTable from "./table";

interface DataItem {
  name: string;
  device: string;
  path: string;
  status: string;
}

interface DataGridProps {
  data: DataItem[];
}

const DataGrid: React.FC<DataGridProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Table headers
  const headers = [
    { label: "", key: "checkbox" },
    { label: "Name", key: "name" },
    { label: "Device", key: "device" },
    { label: "Path", key: "path" },
    { label: "Status", key: "status" }
  ];

  // Handler for individual row selection
  const handleRowSelect = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  // Handler for "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      const allIndices = new Set<number>();
      data.forEach((_, idx) => allIndices.add(idx));
      setSelectedRows(allIndices);
    }
  };

  // Determine if "Select All" should be checked or indeterminate
  const isAllSelected = selectedRows.size === data.length;
  const isIndeterminate = selectedRows.size > 0 && !isAllSelected;

  // Determine label for selection
  const selectionLabel =
    selectedRows.size === 0 ? "None Selected" : `${selectedRows.size} Selected`;

  // Determine if "Download Selected" button should be enabled
  const allSelectedAvailable = Array.from(selectedRows).every(
    (idx) => data[idx].status.toLowerCase() === "available"
  );

  // Handler for "Download Selected" button
  const handleDownload = () => {
    const selectedData = Array.from(selectedRows).map((idx) => data[idx]);
    const formattedData = selectedData
      .map(
        (item) => `Name: ${item.name} Device: ${item.device} Path: ${item.path}`
      )
      .join("\n");

    alert(`Downloaded Items\n\n${formattedData}`);
  };

  // Row rendering logic
  const renderRow = (item: DataItem, idx: number) => (
    <>
      <TableCell className="flex items-center justify-center">
        <Checkbox
          checked={selectedRows.has(idx)}
          onCheckedChange={() => handleRowSelect(idx)}
          disabled={item.status.toLowerCase() !== "available"}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.device}</TableCell>
      <TableCell>{item.path}</TableCell>
      <TableCell>
        <StatusIndicator status={item.status} />
      </TableCell>
    </>
  );

  return (
    <div className="px-0 py-4 bg-white shadow-lg">
      <div className="mb-2 flex items-center justify-between pr-1">
        <div className="flex items-center gap-1 pl-4">
          <Checkbox
            checked={
              isAllSelected ? true : isIndeterminate ? "indeterminate" : false
            }
            onCheckedChange={handleSelectAll}
          />
          <span className="ml-2 text-sm text-gray-700">{selectionLabel}</span>
        </div>
        <Button
          disabled={selectedRows.size === 0 || !allSelectedAvailable}
          onClick={handleDownload}
          size="sm"
          variant="ghost"
          className="gap-1"
        >
          <LucideDownload />
          Download Selected
        </Button>
      </div>
      <DataTable headers={headers} data={data} rowRenderer={renderRow} />
    </div>
  );
};

export default DataGrid;
