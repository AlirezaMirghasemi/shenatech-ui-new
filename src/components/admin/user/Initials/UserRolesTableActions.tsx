import { Color } from "@/constants/data/Color";
import { User } from "@/types/User";
import { ActionRegistry } from "@/utils/ActionRegistry";
import { ModalType } from "@/constants/data/Modal";
import { ActionType } from "@/constants/data/ActionsButton";
import { Role } from "@/types/Role";

export const UserRolesTableActions = new ActionRegistry<Role, User>().register({
  id: ActionType.userRoleModalAction.assignRoles,
  label: "تخصیص نقش به کاربر",
  color: Color.success,
  visibility: {
    hidden: (role, context) =>
      context.parentData === undefined || context.selectedIds.size !== 0,
  },
  handler: (role, context) => {
    if (!context.parentData) return;
    const userId = context.parentData.id;
    context.openModal(ModalType.userRoleModalType.assignRoles, {
      userId,
      parentData: context.parentData,
    });
  },
});
