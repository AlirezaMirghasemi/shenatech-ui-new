import {
  Button,
  ButtonGroup,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import { toggleRow } from "@/helpers/TableWithCheckBox";
import {
  ICheckBoxTable,
  IDynamicTableAction,
  IDynamicTableColumn,
} from "@/interfaces/IDynamicTable";
import { useAuth } from "@/hooks/useAuth";

export default function DynamicTableBody<T extends { id: number }>({
  dynamicTableData,
  dynamicTableRowKey,
  dynamicTableClassName,
  dynamicTableCheckbox,
  DynamicTableColumns,
  dynamicTableActions,
  actionCellClassName,
}: {
  dynamicTableData: T[];
  dynamicTableRowKey: keyof T;
  dynamicTableClassName?: (row: T) => string;
  dynamicTableCheckbox?: ICheckBoxTable<T>;
  DynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableActions?: IDynamicTableAction<T>[];
  actionCellClassName?: string;
}) {
  const { user } = useAuth();

  const userRolesName = (user && user.role_names) ?? [];
  return (
    <>
      <TableBody>
        {dynamicTableData.map((row) => (
          <TableRow
            key={String(row[dynamicTableRowKey])}
            className={`
    ${dynamicTableClassName?.(row) ?? ""}
    ${
      dynamicTableCheckbox &&
         dynamicTableCheckbox.selectedIds.has(
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
                    key={column.accessor.toString()}
                    className={column.className ? column.className : ""}
                  >
                    {column.cellRenderer
                      ? column.cellRenderer(row)
                      : String(row[column.accessor])}
                  </TableCell>
                )
            )}
            {dynamicTableActions && (
              <TableCell className={actionCellClassName ?? ""}>
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
                            action.className ? action.className : "mx-1"
                          }
                          disabled={
                            typeof action.disabled === "function"
                              ? action.disabled(row)
                              : action.disabled
                          }
                          hidden={
                            typeof action.hidden === "function"
                              ? action.hidden(row)
                              : action.hidden
                          }
                        >
                          {action.icon}
                        </Button>
                      </Tooltip>
                    )
                  )}
                </ButtonGroup>
              </TableCell>
            )}
            {dynamicTableCheckbox && (
              <TableCell className="w-4 text-center">
                <Checkbox
                  checked={dynamicTableCheckbox.selectedIds.has(
                    row[dynamicTableRowKey] as number
                  )}
                  onChange={() => {
                    if (
                      dynamicTableCheckbox &&
                      dynamicTableCheckbox.setSelectedIds
                    ) {
                      toggleRow({
                        id: row[dynamicTableRowKey] as number,
                        setSelectedIds: dynamicTableCheckbox.setSelectedIds,
                        setSelectedRows: dynamicTableCheckbox.setSelectedRows,
                        row: row,
                      });
                    }
                  }}
                  aria-label={`Select row ${row[dynamicTableRowKey]}`}
                  className="mx-auto"
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
