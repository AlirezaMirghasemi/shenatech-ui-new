import { ActionPos, ActionType } from "@/constants/data/ActionsButton";
import { CommonStatus } from "@/constants/data/CommonStatus";

import { JSX } from "react";
import { FaEye, FaPen, FaRecycle, FaTrashCan } from "react-icons/fa6";

export default function DynamicActions<T extends object>({
  actionName,
  handler,
  caption,
  pos,
  selectedIds,
  name,
  icon,
  color,
  rowData,
  selectedRows,
}: {
  actionName: string;
  handler: (row?: T) => void;
  caption: string;
  pos: string;
  selectedIds?: Set<number>;
  name: string;
  icon?: JSX.Element;
  color?: string;
  rowData?: T;
  selectedRows?: T[];
}) {
  interface RowData {
    status: CommonStatus;
  }
  switch (actionName) {
    case ActionType.CREATE:
      return {
        name: name,
        caption: `ایجاد ${caption}`,
        handler: handler,
        color: "success",
      };
    case ActionType.EDIT:
      return {
        name: name,
        caption: `ویرایش`,
        handler: () => {
          if (handler) handler(rowData as T);
        },
        icon: <FaPen />,
        color: "warning",
        hidden: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status === CommonStatus.DELETED,
        disabled: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status === CommonStatus.DELETED,
      };
      break;
    case ActionType.DELETE:
      if (pos == ActionPos.HEADER)
        return {
          name,
          caption: `حذف ${caption} ها`,
          handler,
          color: "danger",
          hidden:
            selectedIds?.size == 0 ||
            (selectedRows &&
              (selectedRows as RowData[])?.filter(
                (row) => row.status === CommonStatus.DELETED
              ).length > 0),
          disabled: selectedIds?.size == 0,
        };
      else
        console.log(rowData)
        return {
          name: name,
          caption: `حذف`,
          handler: () => {
            if (handler && rowData) {
              (handler as (row: T) => void)(rowData as T);
            }
          },
          color: "danger",
          hidden:
            rowData && (rowData as RowData).status === CommonStatus.DELETED,
          disabled:
            rowData && (rowData as RowData).status === CommonStatus.DELETED,
          icon: <FaTrashCan />,
        };
      break;
    case ActionType.RESTORE:
      return {
        name: name,
        caption: `بازیابی`,
        handler: () => {
          if (handler) handler(rowData as T);
        },
        color: "warning",
        hidden: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status !== CommonStatus.DELETED,
        disabled: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status !== CommonStatus.DELETED,
        icon: <FaRecycle />,
      };
      break;
    case ActionType.DETAILS:
      return {
        name: name,
        caption: "مشاهده ی جزییات",
        handler: () => {
          if (handler) handler(rowData as T);
        },
        color: "info",
        icon: <FaEye />,
        hidden: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status === CommonStatus.DELETED,
        disabled: () =>
          selectedIds?.size !== 0 ||
          (rowData as RowData).status === CommonStatus.DELETED,
      };
      break;
    case ActionType.ASSIGN:
      if (pos == ActionPos.HEADER)
        return {
          name: name,
          caption: caption,
          handler: handler,
          color: "info",
          hidden: selectedIds?.size == 0,
          disabled: selectedIds?.size == 0,
        };
      else
        return {
          name: name,
          caption: caption,
          handler: () => {
            if (handler) handler(rowData as T);
          },
          color: "info",
          hidden: () =>
            selectedIds?.size !== 0 ||
            (rowData as RowData).status === CommonStatus.DELETED,
          disabled: () =>
            selectedIds?.size !== 0 ||
            (rowData as RowData).status === CommonStatus.DELETED,
          icon: icon,
        };
      break;
    default:
      if (pos == ActionPos.HEADER)
        return {
          name: name,
          caption: caption,
          handler: handler,
          color: color,
          hidden: selectedIds?.size == 0,
          disabled: selectedIds?.size == 0,
        };
      else
        return {
          name: name,
          caption: caption,
          handler: () => {
            if (handler) handler(rowData as T);
          },
          color: color,
          hidden: () =>
            selectedIds?.size !== 0 ||
            (rowData as RowData).status === CommonStatus.DELETED,
          disabled: () =>
            selectedIds?.size !== 0 ||
            (rowData as RowData).status === CommonStatus.DELETED,
          icon: icon,
        };
      break;
  }
}
