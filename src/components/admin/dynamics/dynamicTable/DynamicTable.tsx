import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ValidatingError from "@/components/common/ValidatingError";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Table } from "flowbite-react";
import DynamicTableHeader from "./DyanamicTableHeader";
import DynamicTableSearchable from "./DynamicTableSearchable";
import DynamicTableHead from "./DynamicTableHead";
import DynamicTableBody from "./DynamicTableBody";
import DynamicTablePagination from "./DynamicTablePagination";

export default function DynamicTable<T extends object>({
  dynamicTable,
  setPage,
}: {
  dynamicTable: IDynamicTable<T>;
  setPage?: (page: string) => void;
}) {
  if (dynamicTable.loading) return <LoadingSkeleton />;
  if (dynamicTable.error) return <ValidatingError error={dynamicTable.error} />;
  return (
    <>
      <div className="flex flex-col px-5">
        <div className="-m-1.5 overflow-x-auto">
          <div className=" min-w-full inline-block align-middle">
            <div className=" border  rounded-xl shadow-2xs overflow-hidden ">
              {dynamicTable.header && (
                <DynamicTableHeader dynamicTableHeader={dynamicTable.header} />
              )}
              {dynamicTable?.data.length < 1 &&
                !dynamicTable.searchableTable && (
                  <>
                    <EmptyState />
                  </>
                )}
              {dynamicTable.searchableTable && (
                <DynamicTableSearchable
                  dynamicTableSearchable={dynamicTable.searchableTable}
                />
              )}
              {dynamicTable?.data.length < 1 &&
                dynamicTable.searchableTable && (
                  <>
                    <EmptyState />
                  </>
                )}
              {dynamicTable?.data.length > 0 && (
                <Table hoverable>
                  <DynamicTableHead
                    dynamicTableColumns={dynamicTable.columns}
                    dynamicTableActions={dynamicTable.actions ?? []}
                    dynamicTableCheckbox={dynamicTable.checkboxTable}
                    dynamicTableData={dynamicTable.data}
                    dynamicTableRowKey={dynamicTable.rowKey}
                  />
                  <DynamicTableBody
                    dynamicTableData={dynamicTable.data}
                    dynamicTableRowKey={dynamicTable.rowKey}
                    dynamicTableClassName={dynamicTable.className}
                    dynamicTableCheckbox={dynamicTable.checkboxTable}
                    DynamicTableColumns={dynamicTable.columns}
                    dynamicTableActions={dynamicTable.actions}
                    actionCellClassName={dynamicTable.actionCellClassName}
                  />
                </Table>
              )}
              {dynamicTable.pagination &&
                setPage &&
                dynamicTable.data.length > 0 &&
                dynamicTable.pagination.last_page > 1 && (
                  <DynamicTablePagination
                    dynamicTablePagination={dynamicTable.pagination}
                    setPage={setPage}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
