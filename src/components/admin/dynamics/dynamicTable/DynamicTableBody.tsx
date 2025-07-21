import {
  Button,
  ButtonGroup,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import {
  IDynamicTableAction,
  IDynamicTableColumn,
} from "@/interfaces/IDynamicTable";
import { useAuth } from "@/hooks/useAuth";
import { CommonStatus } from "@/constants/data/CommonStatus";
import useTable from "@/hooks/useTable";

export default function DynamicTableBody<
  T extends { id: number; status: string | CommonStatus },
>({
  dynamicTableData,
  dynamicTableRowKey,
  dynamicTableClassName,
  dynamicTableCheckbox,
  DynamicTableColumns,
  dynamicTableActions,
  actionCellClassName,
  handleTable,
}: {
  dynamicTableData: T[];
  dynamicTableRowKey: keyof T;
  dynamicTableClassName?: (row: T) => string;
  dynamicTableCheckbox?: boolean;
  DynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableActions?: IDynamicTableAction<T>[];
  actionCellClassName?: string;
  handleTable: ReturnType<typeof useTable<T>>;
}) {
  const { user } = useAuth();

  const userRolesName = (user && user.role_names) ?? [];
  const selectedIdsSize: number =
    handleTable.handleSelect.selectedIds.size ?? 0;
  return (
    <>
      <TableBody className="divide-y ">
        {dynamicTableData.map((row) => (
          <TableRow
            key={String(row[dynamicTableRowKey])}
            className={`
    ${dynamicTableClassName?.(row) ?? ""}
    ${
      dynamicTableCheckbox &&
      handleTable.handleSelect.selectedIds.has(
        row[dynamicTableRowKey] as number
      )
        ? "!bg-accent/25"
        : ""
    }
  `}
          >
            {DynamicTableColumns.map(
              (column) =>
                (column.roles == null ||
                  userRolesName.some((role) =>
                    column.roles?.includes(role)
                  )) && (
                  <TableCell
                    data-label={column.header}
                    key={column.accessor.toString()}
                    className={
                      column.className
                        ? `${column.className} py-3 px-4 whitespace-nowrap max-md:grid max-md:grid-cols-3 max-md:gap-2 max-md:items-center max-md:before:content-[attr(data-label)] max-md:before:font-semibold `
                        : "py-3 px-4 whitespace-nowrap max-md:grid max-md:grid-cols-3 max-md:gap-2 max-md:items-center max-md:before:content-[attr(data-label)] max-md:before:font-semibold "
                    }
                  >
                    {column.cellRenderer
                      ? column.cellRenderer(row)
                      : String(row[column.accessor])}
                  </TableCell>
                )
            )}
            {dynamicTableActions && (
              <TableCell
                className={
                  actionCellClassName
                    ? `${actionCellClassName} py-3 px-4 max-md:grid max-md:grid-cols-3 max-md:gap-2 max-md:items-center max-md:before:content-['عملیات'] max-md:before:font-semibold `
                    : "py-3 px-4 max-md:grid max-md:grid-cols-3 max-md:gap-2 max-md:items-center max-md:before:content-['عملیات'] max-md:before:font-semibold "
                }
              >
                <div className="flex flex-wrap gap-1">
                  <ButtonGroup>
                    {dynamicTableActions.map((action) =>
                      action.actionRenderer ? (
                        <Tooltip
                          content={action.caption}
                          animation="duration-500"
                          key={action.name}
                        >
                          {action.actionRenderer(row)}
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content={action.caption}
                          animation="duration-500"
                          key={action.name}
                        >
                          <Button
                            key={action.name}
                            onClick={() => action.handler?.(row)}
                            color={action.color ? action.color : "default"}
                            className={
                              action.className
                                ? `${action.className} transition-colors`
                                : "transition-colors"
                            }
                            disabled={
                              (typeof action.disabled === "function"
                                ? action.disabled(row)
                                : action.disabled) ||
                              (action.visibility?.disableOnDeleteStatus &&
                                row.status === CommonStatus.DELETED) ||
                              (action.visibility?.disableOnMultipleSelection &&
                                selectedIdsSize > 0) ||
                              (action.visibility?.disableOnNoSelection &&
                                selectedIdsSize === 0)
                            }
                            hidden={
                              (typeof action.hidden === "function"
                                ? action.hidden(row)
                                : action.hidden) ||
                              (action.visibility?.hiddenOnDeleteStatus &&
                                row.status === CommonStatus.DELETED) ||
                              (action.visibility?.hiddenOnMultipleSelection &&
                                selectedIdsSize > 0) ||
                              (action.visibility?.hiddenOnNoSelection &&
                                selectedIdsSize === 0)
                            }
                          >
                            {action.icon}
                          </Button>
                        </Tooltip>
                      )
                    )}
                  </ButtonGroup>
                </div>
              </TableCell>
            )}
            {dynamicTableCheckbox && (
              <TableCell className="py-3 px-4 w-12 text-center max-md:grid max-md:grid-cols-3 max-md:gap-2 max-md:items-center  max-md:before:font-semibold ">
                <div className="md:contents">
                  <Checkbox
                    checked={handleTable.handleSelect.selectedIds.has(
                      row[dynamicTableRowKey] as number
                    )}
                    onChange={() => {
                      if (dynamicTableCheckbox) {
                        handleTable.handleSelect.toggleRow(
                          row[dynamicTableRowKey] as number,

                          row
                        );
                      }
                    }}
                    aria-label={`Select row ${row[dynamicTableRowKey]}`}
                    className="mx-auto"
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
