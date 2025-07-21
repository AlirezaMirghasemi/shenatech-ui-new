"use client";
import EmptyState from "@/components/common/EmptyState";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ValidatingError from "@/components/common/ValidatingError";
import {
  IDynamicTable,
  IDynamicTableAction,
  IDynamicTableColumn,
} from "@/interfaces/IDynamicTable";
import { Table } from "flowbite-react";
import DynamicTableHeader from "./DyanamicTableHeader";
import DynamicTableSearchable from "./DynamicTableSearchable";
import DynamicTableHead from "./DynamicTableHead";
import DynamicTableBody from "./DynamicTableBody";
import DynamicTablePagination from "./DynamicTablePagination";
import { useEffect } from "react";
import useTable from "@/hooks/useTable";
//TODO: change all table views on all model if use checkboxTable look like tags page
export default function DynamicTable<T extends { id: number; status: string }>({
  dynamicTable,
  setPage,
  handleTable,
}: {
  dynamicTable: IDynamicTable<T>;
  setPage?: (page: string) => void;
  handleTable: ReturnType<typeof useTable<T>>;
}) {
  useEffect(() => {
    if (dynamicTable.checkboxTable) {
      handleTable.handleSelect.clearSelection();
    }
  }, [dynamicTable.data]);
  if (dynamicTable.loading) return <LoadingSkeleton />;
  if (dynamicTable.error) return <ValidatingError error={dynamicTable.error} />;

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border border-border-default rounded-xl shadow-xs overflow-hidden ">
              {" "}
              {dynamicTable.header && (
                <DynamicTableHeader
                  dynamicTableHeader={dynamicTable.header}
                  handleTable={handleTable}
                />
              )}
              {dynamicTable?.data.length < 1 &&
                !dynamicTable.searchableTable && (
                  <>
                    <div className="py-12">
                      <EmptyState />
                    </div>
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
                    <div className="overflow-x-auto">
                      <EmptyState />
                    </div>
                  </>
                )}
              {dynamicTable?.data.length > 0 && (
                <div className="overflow-x-auto">
                  <Table hoverable className="min-w-full divide-y ">
                    <DynamicTableHead
                      dynamicTableColumns={
                        dynamicTable.columns as IDynamicTableColumn<{
                          id: number;
                          status: string;
                        }>[]
                      }
                      handleTable={
                        handleTable as unknown as ReturnType<typeof useTable<{ id: number; status: string; }>>
                      }
                      dynamicTableActions={
                        (dynamicTable.actions as IDynamicTableAction<{
                          id: number;
                          status: string;
                        }>[]) ?? []
                      }
                      dynamicTableCheckbox={dynamicTable.checkboxTable}
                      dynamicTableData={
                        dynamicTable.data as { id: number; status: string }[]
                      }
                    />
                    <DynamicTableBody
                      dynamicTableData={dynamicTable.data}
                      dynamicTableRowKey={dynamicTable.rowKey}
                      dynamicTableClassName={dynamicTable.className}
                      dynamicTableCheckbox={dynamicTable.checkboxTable}
                      DynamicTableColumns={dynamicTable.columns}
                      dynamicTableActions={dynamicTable.actions}
                      actionCellClassName={dynamicTable.actionCellClassName}
                      handleTable={handleTable}
                    />
                  </Table>
                </div>
              )}
              {dynamicTable.pagination &&
                setPage &&
                dynamicTable.data.length > 0 &&
                dynamicTable.pagination.last_page > 1 && (
                  <div className="border-t ">
                    <DynamicTablePagination
                      dynamicTablePagination={dynamicTable.pagination}
                      setPage={setPage}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
