import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function Table({ data }: { data: any[] }) {
  const columnHelper = createColumnHelper<any>();
  const columns = Object.keys(data[0]).map((name: any) =>
    columnHelper.accessor(name, {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    })
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CTable hover small responsive>
      <CTableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <CTableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <CTableHeaderCell key={header.id}>
                <div className="table-header-content">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
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
    </CTable>
  );
}