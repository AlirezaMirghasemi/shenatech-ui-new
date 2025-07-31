import { TableBody, TableCell, TableRow, Checkbox } from "flowbite-react";
import { IDynamicTableColumn } from "@/interfaces/IDynamicTable";
import { useAuth } from "@/hooks/useAuth";
import useTable from "@/hooks/useTable";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";
import { DynamicTableActionCell } from "./DynamicTableActionCell";

export default function DynamicTableBody<
  T extends { id: number; status: string },
>({
  dynamicTableData,
  dynamicTableRowKey,
  dynamicTableClassName,
  dynamicTableCheckbox,
  DynamicTableColumns,
  getRowActions,
  actionCellClassName,
  handleTable,
  actionContext,
}: {
  dynamicTableData: T[];
  dynamicTableRowKey: keyof T;
  dynamicTableClassName?: (row: T) => string;
  dynamicTableCheckbox?: boolean;
  DynamicTableColumns: IDynamicTableColumn<T>[];
  getRowActions?: (row: T) => ActionConfig<T>[];
  actionCellClassName?: string;
  handleTable: ReturnType<typeof useTable<T>>;
  actionContext: ActionContext<T>;
}) {
  const { user } = useAuth();
  const userRolesName = user?.role_names ?? [];

  return (
    <TableBody className="divide-y">
      {dynamicTableData.map((row) => {
        const actions = getRowActions?.(row) || [];
        const hasRowActions = !!getRowActions;

        const isSelected = handleTable.handleSelect.selectedIds.has(
          row[dynamicTableRowKey] as number
        );

        return (
          <TableRow
            key={String(row[dynamicTableRowKey])}
            className={`${dynamicTableClassName?.(row) || ""} ${
              isSelected ? "!bg-accent/25" : ""
            }`}
          >
            {DynamicTableColumns.map((column) => {
              const hasPermission =
                !column.roles ||
                column.roles.some((role) => userRolesName.includes(role));

              if (!hasPermission) return null;

              return (
                <TableCell
                  key={column.accessor.toString()}
                  className={column.className || "py-3 px-4"}
                >
                  {column.cellRenderer
                    ? column.cellRenderer(row)
                    : String(row[column.accessor])}
                </TableCell>
              );
            })}

            {actions.length != 0 ? (
              <TableCell className={actionCellClassName || "py-3 px-4"}>
                <DynamicTableActionCell
                  item={row}
                  actions={actions}
                  context={actionContext}
                />
              </TableCell>
            ) : (
              hasRowActions && (
                <TableCell className={actionCellClassName || "py-3 px-4"}>
                  ---
                </TableCell>
              )
            )}

            {dynamicTableCheckbox && (
              <TableCell className="py-3 px-4 w-12 text-center">
                <Checkbox
                  checked={isSelected}
                  onChange={() => {
                    handleTable.handleSelect.toggleRow(
                      row[dynamicTableRowKey] as number,
                      row
                    );
                  }}
                />
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
