import { toggleAll } from "@/helpers/TableWithCheckBox";
import { useAuth } from "@/hooks/useAuth";
import {
  ICheckBoxTable,
  IDynamicTableAction,
  IDynamicTableColumn,
} from "@/interfaces/IDynamicTable";
import { Checkbox, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function DynamicTableHead<T extends { id: number }>({
  dynamicTableColumns,
  dynamicTableActions,
  dynamicTableCheckbox,
  dynamicTableData,
}: {
  dynamicTableColumns: IDynamicTableColumn<T>[];
  dynamicTableActions: IDynamicTableAction<T>[];
  dynamicTableCheckbox?: ICheckBoxTable<T>;
  dynamicTableData: T[];
}) {
  const { user } = useAuth();

  const userRolesName = (user && user.role_names) ?? [];
  //TODO: چک کردن اینکه کاربر دسترسی دارد یا نه
  return (
    <>
      <TableHead>
        <TableRow>
          {dynamicTableColumns.map(
            (column) =>
              (column.roles == null ||
                userRolesName.some((role) => column.roles?.includes(role))) && (
                <TableHeadCell
                  key={column.accessor.toString()}
                  className={
                    column.HeadCellClassName ? column.HeadCellClassName : ""
                  }
                  aria-label={column.ariaLabel || column.header.toString()}
                >
                  {column.header}
                </TableHeadCell>
              )
          )}
          {dynamicTableActions && <TableHeadCell>عملیات</TableHeadCell>}
          {dynamicTableCheckbox && (
            <TableHeadCell className={dynamicTableColumns[0].className ?? ""}>
              <Checkbox
                checked={
                  (dynamicTableCheckbox.selectedIds.size > 0) &&
                  (dynamicTableCheckbox.selectedIds.size ===
                    dynamicTableData.length)
                }
                indeterminate={
                  dynamicTableCheckbox.selectedIds.size > 0 &&
                  dynamicTableCheckbox.selectedIds.size <
                    dynamicTableData.length
                }
                onChange={(e) => {
                  if (dynamicTableData.length === 0) return;

                  if (dynamicTableCheckbox) {
                    toggleAll({
                      checked: e.target.checked,
                      setSelectedIds: dynamicTableCheckbox.setSelectedIds,
                      rows: dynamicTableData,
                      setSelectedRows: dynamicTableCheckbox.setSelectedRows,

                    });
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
