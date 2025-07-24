// src/utils/ActionRegistry.ts
import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { ModalData, ModalType } from "@/constants/data/ModalType";
import { JSX, ReactNode } from "react";

export type ActionHandler<T extends object> = (
  item: T | null,
  context: ActionContext<T>
) => void;

export interface ActionContext<T extends object> {
  setSelectedIds: (ids: Set<number>) => void;
  selectedIds: Set<number>;
  setSelectedRows: (row: T[]) => void;
  selectedRows: T[];
  openModal: (modal: ModalType, data: ModalData<T>) => void;
}

export interface ActionConfig<T extends object> {
  id: ActionType;
  label: string;
  icon?: JSX.Element;
  color: Color;
  visibility?: {
    hidden?: (item: T | null, context: ActionContext<T>) => boolean;
    disabled?: (item: T | null, context: ActionContext<T>) => boolean;
  };
  handler: ActionHandler<T>;
  actionRender?: (row: T) => ReactNode;
}

export class ActionRegistry<T extends object> {
  private actions: Map<ActionType, ActionConfig<T>> = new Map();

  register(action: ActionConfig<T>): this {
    this.actions.set(action.id, action);
    return this;
  }

  getAction(id: ActionType): ActionConfig<T> | undefined {
    return this.actions.get(id);
  }

  getVisibleActions(
    item: T | null,
    context: ActionContext<T>
  ): ActionConfig<T>[] {
    return Array.from(this.actions.values()).filter((action) => {
      return !action.visibility?.hidden?.(item, context);
    });
  }
}
