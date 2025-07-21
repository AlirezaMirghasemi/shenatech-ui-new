import { useAuth } from "@/hooks/useAuth";
import useTable from "@/hooks/useTable";
import {
  IDynamicTableAction,
  IDynamicTableColumn,
} from "@/interfaces/IDynamicTable";
import { Checkbox, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function DynamicTableHead<
  T extends { id: number; status: string },
>({
  dynamicTableColumns,
  dynamicTableActions,
  dynamicTableCheckbox,
  dynamicTableData,
  handleTable,
}: {
  dynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableActions: IDynamicTableAction<T>[];
  dynamicTableCheckbox?: boolean;
  dynamicTableData: T[];
  handleTable: ReturnType<typeof useTable<T>>;
}) {
  const { user } = useAuth();

  const userRolesName = (user && user.role_names) ?? [];
  //TODO: چک کردن اینکه کاربر دسترسی دارد یا نه
  return (
    <>
      <TableHead className="sticky top-0  z-10 max-md:hidden">
        <TableRow className="border-b">
          {dynamicTableColumns.map(
            (column) =>
              (column.roles == null ||
                userRolesName.some((role) => column.roles?.includes(role))) && (
                <TableHeadCell
                  key={column.accessor.toString()}
                  className={
                    column.HeadCellClassName
                      ? `${column.HeadCellClassName} py-3 px-4 font-semibold whitespace-nowrap`
                      : "py-3 px-4 font-semibold whitespace-nowrap"
                  }
                  aria-label={column.ariaLabel || column.header.toString()}
                >
                  {column.header}
                </TableHeadCell>
              )
          )}
          {dynamicTableActions && (
            <TableHeadCell className="py-3 px-4 w-32">عملیات</TableHeadCell>
          )}
          {dynamicTableCheckbox && (
            <TableHeadCell
              className={
                dynamicTableColumns[0].className
                  ? `py-3 px-4 w-12 ${dynamicTableColumns[0].className} `
                  : "py-3 px-4 w-12"
              }
            >
              <Checkbox
                checked={
                  handleTable.handleSelect.selectedIds.size > 0 &&
                  handleTable.handleSelect.selectedIds.size ===
                    dynamicTableData.length
                }
                indeterminate={
                  handleTable.handleSelect.selectedIds.size > 0 &&
                  handleTable.handleSelect.selectedIds.size <
                    dynamicTableData.length
                }
                onChange={(e) => {
                  if (dynamicTableData.length === 0) return;

                  if (dynamicTableCheckbox) {
                    handleTable.handleSelect.toggleAll(
                      dynamicTableData,
                      e.target.checked
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
