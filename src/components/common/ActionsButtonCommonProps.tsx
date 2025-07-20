import { ActionType } from "@/constants/data/ActionsButton";
import { FaEye, FaPen, FaRecycle, FaTrashCan } from "react-icons/fa6";

export class ActionsButtonCommonProps {
  static getActionButtonProps(
    actionType: ActionType | string
  ) {
    switch (actionType) {
      case ActionType.CREATE:
        return {
          name: actionType,
          color: "success",
        };
      case ActionType.EDITS:
        return {
          name: actionType,
          color: "warning",
        };
      case ActionType.EDIT:
        return {
          name: actionType,
          color: "warning",
          icon: <FaPen />,
        };
      case ActionType.DELETE:
        return {
          name: actionType,
          color: "danger",
          icon: <FaTrashCan/>,
        };
      case ActionType.DELETES:
        return {
          name: actionType,
          color: "danger",
        };
      case ActionType.RESTORE:
        return {
          name: actionType,
          color: "warning",
          icon: <FaRecycle/>,
        };
      case ActionType.RESTORES:
        return {
          name: actionType,
          color: "warning",
        };
      case ActionType.DETAIL:
        return {
          //مشاهده ی جزییات یعنی جداول زیر مجموعه
          name: actionType,
          color: "info",
          icon: <FaEye/>,
        };
      default:
        throw new Error(`Unsupported action type: ${actionType}`);
    }
  }
}
