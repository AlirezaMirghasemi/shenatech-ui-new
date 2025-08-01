// src/utils/ActionRegistry.ts
import { ActionTypeValue } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { ModalData, ModalTypeValue } from "@/constants/data/Modal";
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
  openModal: (modal: ModalTypeValue, data: ModalData<T>) => void;
  data: T;
  setData: (data: T) => void;
  parentId?: number;
  setParentId?: (id: number) => void;
}

export interface ActionConfig<T extends object> {
  id: ActionTypeValue;
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
  private actions: Map<ActionTypeValue, ActionConfig<T>> = new Map();

  register(action: ActionConfig<T>): this {
    this.actions.set(action.id, action);
    return this;
  }

  getAction(id: ActionTypeValue): ActionConfig<T> | undefined {
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
