import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";

interface HeaderItem {
  label: string;
  key: string;
}

interface GenericTableProps<T> {
  headers: HeaderItem[];
  data: T[];
  rowRenderer: (item: T, idx: number) => React.ReactNode;
}

const DataTable = <T,>({
  headers,
  data,
  rowRenderer
}: GenericTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead key={idx} className="font-semibold text-black">
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={idx}>{rowRenderer(item, idx)}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
