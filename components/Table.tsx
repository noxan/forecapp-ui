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

import { useAppSelector } from "../src/hooks";
import { selectTargetColumn, selectTimeColumn } from "../src/store/selectors";

export default function Table({ data }: { data: any[] }) {
  const columnHelper = createColumnHelper<any>();
  const columns = Object.keys(data[0]).map((name: string) =>
    columnHelper.accessor(name, {
      cell: (info) => info.getValue(),
    })
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const timeColumn = useAppSelector(selectTimeColumn);
  const targetColumn = useAppSelector(selectTargetColumn);

  return (
    <CTable bordered hover small responsive>
      <style>
        {`
        .table-header-content {
          // max-height: 40px;
          font-weight: normal;
          // line-height: 0.9rem;
          overflow: hidden;
        }
        tbody > tr > td {
          white-space: nowrap;
          text-align: right;
        }
        `}
      </style>
      <CTableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <CTableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <CTableHeaderCell
                color={
                  header.id === timeColumn
                    ? "info"
                    : header.id === targetColumn
                    ? "success"
                    : ""
                }
                key={header.id}
              >
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
              <CTableDataCell
                color={
                  cell.id.split("_")[1] === timeColumn
                    ? "info"
                    : cell.id.split("_")[1] === targetColumn
                    ? "success"
                    : ""
                }
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </CTableDataCell>
            ))}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
}
