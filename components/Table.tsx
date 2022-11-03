import { useReducer, useState } from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableFoot,
} from "@coreui/react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const buildColumns = (initialData: any) => {
  const columnHelper = createColumnHelper<any>();

  // const headerColumn = Object.keys(initialData[0]);
  const headerColumn = initialData.columns as any;

  return headerColumn.map((name: any) =>
    columnHelper.accessor(name, {
      cell: (info) => {
        console.log(info);
        return info.getValue();
      },
      // footer: (info) => info.column.id,
    })
  );
};

export default function Table({ initialData }: { initialData: any }) {
  const temp = initialData.values.map((row: any) => {
    const obj = {} as any;
    initialData.columns.forEach((col: any, index: number) => {
      obj[col] = row[index];
    });
    return obj;
  });

  const [data, setData] = useState(() => [...temp]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns: buildColumns(initialData),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CTable>
      <CTableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <CTableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <CTableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        ))}
      </CTableHead>
      <CTableBody>
        {table.getRowModel().rows.map((row) => (
          <CTableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <CTableDataCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </CTableDataCell>
            ))}
          </CTableRow>
        ))}
      </CTableBody>
      <CTableFoot>
        {table.getFooterGroups().map((footerGroup) => (
          <CTableRow key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <CTableDataCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </CTableDataCell>
            ))}
          </CTableRow>
        ))}
      </CTableFoot>
    </CTable>
  );
}
