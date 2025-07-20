import { CommonStatus } from "@/constants/data/CommonStatus";
import {
  ICheckBoxTable,
  IDynamicTableHeader,
} from "@/interfaces/IDynamicTable";
import { Button } from "flowbite-react";

export default function DynamicTableHeader<
  T extends { id: number; status: string | CommonStatus },
>({
  dynamicTableHeader,
  CheckboxTable,
}: {
  dynamicTableHeader: IDynamicTableHeader;
  CheckboxTable?: ICheckBoxTable<T>;
}) {
  const selectedIdsSize = CheckboxTable?.selectedIds.size || 0;
  return (
    <>
      {dynamicTableHeader && (
        <div
          className="px-4 py-3 md:px-6 md:py-4
      flex flex-col gap-3 md:flex-row md:justify-between md:items-center
      border-b "
        >
          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              {dynamicTableHeader.title}
            </h2>
            {dynamicTableHeader.description && (
              <p className="text-sm  mt-1">{dynamicTableHeader.description}</p>
            )}
          </div>
          {dynamicTableHeader.actions && (

              <div className="flex flex-wrap gap-2">
                {dynamicTableHeader.actions.map((action) => (
                  <Button
                    className={action.className ? `${action.className} transition-colors` : "transition-colors"}
                    key={action.name}
                    onClick={action.handler}
                    disabled={
                      (typeof action.disabled === "function"
                        ? action.disabled()
                        : action.disabled) ||
                      (action.visibility?.disableOnMultipleSelection
                        ? selectedIdsSize > 0
                        : false) ||
                      (action.visibility?.disableOnNoSelection
                        ? selectedIdsSize === 0
                        : false) ||
                      (action.visibility?.disableOnDeleteStatus
                        ? CheckboxTable?.selectedRows.some(
                            (row) => row.status === CommonStatus.DELETED
                          )
                        : false)
                    }
                    color={action.color ? action.color : "default"}
                    hidden={
                      (typeof action.hidden === "function"
                        ? action.hidden()
                        : action.hidden) ||
                      (action.visibility?.hiddenOnMultipleSelection
                        ? selectedIdsSize > 0
                        : false) ||
                      (action.visibility?.hiddenOnNoSelection
                        ? selectedIdsSize === 0
                        : false) ||
                      (action.visibility?.hiddenOnDeleteStatus
                        ? CheckboxTable?.selectedRows.some(
                            (row) => row.status === CommonStatus.DELETED
                          )
                        : false)
                    }
                  >
                    {action.icon ? action.icon : null}
                    {action.caption}
                  </Button>
                ))}
              </div>

          )}
        </div>
      )}
    </>
  );
}
