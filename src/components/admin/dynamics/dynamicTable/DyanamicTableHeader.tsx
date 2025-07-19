import { IDynamicTableHeader } from "@/interfaces/IDynamicTable";
import { Button } from "flowbite-react";

export default function DynamicTableHeader({
  dynamicTableHeader,
}: {
  dynamicTableHeader: IDynamicTableHeader;
}) {
  return (
    <>
      {dynamicTableHeader && (
        <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b ">
          <div>
            <h2 className="text-xl font-semibold ">
              {dynamicTableHeader.title}
            </h2>
            {dynamicTableHeader.description && (
              <p>{dynamicTableHeader.description}</p>
            )}
          </div>
          {dynamicTableHeader.actions && (
            <div>
              <div className="inline-flex gap-x-2">
                {dynamicTableHeader.actions.map((action) => (
                  <Button
                    className={action.className ? action.className : ""}
                    key={action.name}
                    onClick={action.handler}
                    disabled={
                      typeof action.disabled === "function"
                        ? action.disabled()
                        : action.disabled
                    }
                    color={action.color ? action.color : "default"}
                    hidden={
                      typeof action.hidden === "function"
                        ? action.hidden()
                        : action.hidden
                    }
                  >
                    {action.icon ? action.icon : null}
                    {action.caption}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
