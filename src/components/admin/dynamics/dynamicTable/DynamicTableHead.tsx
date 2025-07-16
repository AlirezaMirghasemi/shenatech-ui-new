import { toggleAll } from "@/helpers/TableWithCheckBox";
import { ICheckBoxTable, IDynamicTableAction, IDynamicTableColumn } from "@/interfaces/IDynamicTable";
import { Checkbox, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function DynamicTableHead<T extends object>({
  dynamicTableColumns,
  dynamicTableActions,
  dynamicTableCheckbox,
  dynamicTableData,
  dynamicTableRowKey,
}: {
  dynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableActions: IDynamicTableAction<T>[];
  dynamicTableCheckbox?: ICheckBoxTable;
  dynamicTableData: T[];
  dynamicTableRowKey: keyof T;
}) {
  return (
    <>
      <TableHead>
        <TableRow>
          {dynamicTableColumns.map((column) => (
            <TableHeadCell
              key={column.accessor.toString()}
              className={
                column.HeadCellClassName ? column.HeadCellClassName : ""
              }
              aria-label={column.ariaLabel || column.header.toString()}
            >
              {column.header}
            </TableHeadCell>
          ))}
          {dynamicTableActions && <TableHeadCell>عملیات</TableHeadCell>}
          {dynamicTableCheckbox && (
            <TableHeadCell className={dynamicTableColumns[0].className ?? ""}>
              <Checkbox
                checked={
                  dynamicTableCheckbox.selectedIds.size > 0 &&
                  dynamicTableCheckbox.selectedIds.size ===
                    dynamicTableData.length
                }
                indeterminate={
                  dynamicTableCheckbox.selectedIds.size > 0 &&
                  dynamicTableCheckbox.selectedIds.size <
                   dynamicTableData.length
                }
                onChange={(e) => {
                  if (dynamicTableData.length === 0) return;
                  if (
                    dynamicTableCheckbox &&
                    dynamicTableCheckbox.setSelectedIds
                  ) {
                    toggleAll(
                      e.target.checked,
                      dynamicTableCheckbox.setSelectedIds,
                      dynamicTableData.map((row) => ({
                        id: row[dynamicTableRowKey] as number,
                      }))
                    );
                  }
                }}
                aria-label="Select all"
                className="mx-auto"
              />
            </TableHeadCell>
          )}
        </TableRow>
      </TableHead>
    </>
  );
}
