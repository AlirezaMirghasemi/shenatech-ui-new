// src/components/tables/DynamicTableActionCell.tsx
import React from "react";
import { Button, ButtonGroup, Tooltip } from "flowbite-react";
import { IDynamicTableActionCellProps } from "@/interfaces/IDynamicTable";

// src/components/tables/DynamicTableActionCell.tsx
export const DynamicTableActionCell = <T extends object>({
  item,
  actions,
  context,
}: IDynamicTableActionCellProps<T>) => {
  return (
    <ButtonGroup>
      {actions.map((action) => {
        const isDisabled = action.visibility?.disabled?.(item, context);
        const isHidden = action.visibility?.hidden?.(item, context);
        if (isHidden) return null;
        if (action.actionRender) {
          return (
            <Tooltip
              key={action.id}
              content={action.label}
              animation="duration-500"
            >
              {action.actionRender(item)}
            </Tooltip>
          );
        }

        return (
          <Tooltip
            key={action.id}
            content={action.label}
            animation="duration-500"
          >
            <Button
              onClick={() => action.handler(item, context)}
              disabled={isDisabled}
              color={action.color}
              className="transition-colors m-1"
            >
              {action.icon || action.label}
            </Button>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
};
