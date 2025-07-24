import { useAuth } from "@/hooks/useAuth";
import useTable from "@/hooks/useTable";
import { IDynamicTableColumn } from "@/interfaces/IDynamicTable";
import { Checkbox, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useMemo } from "react";

export default function DynamicTableHead<
  T extends { id: number; status: string },
>({
  dynamicTableColumns,
  dynamicTableCheckbox,
  dynamicTableData,
  handleTable,
  hasRowActions = false,
}: {
  dynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableCheckbox?: boolean;
  dynamicTableData: T[];
  handleTable: ReturnType<typeof useTable<T>>;
  hasRowActions?: boolean;
}) {
  const { user } = useAuth();
  const userRolesName = user?.role_names ?? [];

  const hasVisibleColumns = useMemo(() =>
    dynamicTableColumns.some(
      column => !column.roles || column.roles.some(r => userRolesName.includes(r))
    ),
    [dynamicTableColumns, userRolesName]
  );

  const allSelected = useMemo(() =>
    dynamicTableData.length > 0 &&
    handleTable.handleSelect.selectedIds.size === dynamicTableData.length,
    [dynamicTableData, handleTable.handleSelect.selectedIds]
  );

  const indeterminate = useMemo(() =>
    handleTable.handleSelect.selectedIds.size > 0 &&
    handleTable.handleSelect.selectedIds.size < dynamicTableData.length,
    [dynamicTableData, handleTable.handleSelect.selectedIds]
  );

  return (
    <TableHead className="sticky top-0 z-10 max-md:hidden">
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

        {hasRowActions && hasVisibleColumns && (
          <TableHeadCell className="py-3 px-4 w-32">عملیات</TableHeadCell>
        )}

        {dynamicTableCheckbox && hasVisibleColumns && (
          <TableHeadCell className="py-3 px-4 w-12 text-center">
            <Checkbox
              checked={allSelected}
              indeterminate={indeterminate}
              onChange={(e) => {
                if (dynamicTableData.length === 0) return;
                handleTable.handleSelect.toggleAll(
                  dynamicTableData,
                  e.target.checked
                );
              }}
              aria-label="Select all"
              className="mx-auto"
            />
          </TableHeadCell>
        )}
      </TableRow>
    </TableHead>
  );
}
