import { Button } from "flowbite-react";
import { IDynamicTableHeader } from "@/interfaces/IDynamicTable";
import useTable from "@/hooks/useTable";
import { ActionContext } from "@/utils/ActionRegistry";
import { useMemo } from "react";

export default function DynamicTableHeader<
  T extends { id: number; status: string },
>({
  dynamicTableHeader,
  handleTable,
  actionContext,
}: {
  dynamicTableHeader: IDynamicTableHeader<T>;
  handleTable: ReturnType<typeof useTable<T>>;
  actionContext: ActionContext<T>;
}) {
  const selectedRows = handleTable.handleSelect.selectedRows;

  const visibleActions = useMemo(() => {
    return (
      dynamicTableHeader.actions?.filter((action) => {
        const isHidden = action.visibility?.hidden?.(null , {
          ...actionContext,
          selectedIds: handleTable.handleSelect.selectedIds,
          selectedRows,
        });

        return !isHidden;
      }) || []
    );
  }, [
    dynamicTableHeader.actions,
    actionContext,
    handleTable.handleSelect.selectedIds,
    selectedRows,
  ]);

  return (
    <div className="px-4 py-3 md:px-6 md:py-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-b">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">
          {dynamicTableHeader.title}
        </h2>
        {dynamicTableHeader.description && (
          <p className="text-sm mt-1">{dynamicTableHeader.description}</p>
        )}
      </div>

      {visibleActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {visibleActions.map((action) => {
            const isDisabled = action.visibility?.disabled?.(null , {
              ...actionContext,
              selectedIds: handleTable.handleSelect.selectedIds,
              selectedRows,
            });

            return (
              <Button
                key={action.id}
                className="transition-colors"
                onClick={() =>
                  action.handler(null , {
                    ...actionContext,
                    selectedIds: handleTable.handleSelect.selectedIds,
                    selectedRows,
                  })
                }
                disabled={isDisabled}
                color={action.color}
              >
                {action.icon || action.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
