import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Table } from "flowbite-react";
import DynamicTableSearchable from "./DynamicTableSearchable";
import DynamicTableHead from "./DynamicTableHead";
import DynamicTableBody from "./DynamicTableBody";
import DynamicTablePagination from "./DynamicTablePagination";
import { useEffect } from "react";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ValidatingError from "@/components/common/ValidatingError";
import EmptyState from "@/components/common/EmptyState";
import useTable from "@/hooks/useTable";
import { ActionContext } from "@/utils/ActionRegistry";
import DynamicTableHeader from "./DyanamicTableHeader";

export default function DynamicTable<T extends { id: number; status: string }>({
  dynamicTable,
  setPage,
  handleTable,
  actionContext,
}: {
  dynamicTable: IDynamicTable<T>;
  setPage?: (page: string) => void;
  handleTable: ReturnType<typeof useTable<T>>;
  actionContext?: ActionContext<T>;
}) {
  // Clear selection only when checkbox config changes
  useEffect(() => {
    if (dynamicTable.checkboxTable) {
      handleTable.handleSelect.clearSelection();
    }
  }, [dynamicTable.checkboxTable, handleTable.handleSelect.clearSelection]);

  if (dynamicTable.loading) return <LoadingSkeleton />;
  if (dynamicTable.error) return <ValidatingError error={dynamicTable.error} />;

  const hasRowActions = !!dynamicTable.getRowActions;
  const hasData = dynamicTable?.data?.length > 0;

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="border border-border-default rounded-xl shadow-xs overflow-hidden">
            {dynamicTable.header && (
              <DynamicTableHeader
                dynamicTableHeader={dynamicTable.header}
                handleTable={handleTable}
                actionContext={actionContext ?? ({} as ActionContext<T>)}
              />
            )}

            {dynamicTable.searchableTable && (
              <DynamicTableSearchable
                dynamicTableSearchable={dynamicTable.searchableTable}
              />
            )}

            {!hasData ? (
              <div className="py-12">
                <EmptyState />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table hoverable className="min-w-full divide-y">
                  <DynamicTableHead
                    dynamicTableColumns={dynamicTable.columns}
                    handleTable={handleTable}
                    dynamicTableCheckbox={dynamicTable.checkboxTable}
                    dynamicTableData={dynamicTable.data}
                    hasRowActions={hasRowActions}
                  />

                  <DynamicTableBody
                    dynamicTableData={dynamicTable.data}
                    dynamicTableRowKey={dynamicTable.rowKey}
                    dynamicTableClassName={dynamicTable.className}
                    dynamicTableCheckbox={dynamicTable.checkboxTable}
                    DynamicTableColumns={dynamicTable.columns}
                    getRowActions={dynamicTable.getRowActions}
                    actionCellClassName={dynamicTable.actionCellClassName}
                    handleTable={handleTable}
                    actionContext={actionContext ?? ({} as ActionContext<T>)}
                  />
                </Table>
              </div>
            )}

            {dynamicTable.pagination && setPage && hasData && (
              <div className="border-t">
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
  );
}
