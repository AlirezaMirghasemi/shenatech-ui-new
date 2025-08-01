import { Color } from "@/constants/data/Color";
import { ActionRegistry } from "@/utils/ActionRegistry";

import { ModalType } from "@/constants/data/Modal";
import { ActionType } from "@/constants/data/ActionsButton";
import { Role } from "@/types/Role";

export const UserRolesTableActions = new ActionRegistry<Role>().register({
  id: ActionType.userRoleModalAction.assignRoles,
  label: "تخصیص مجوز به کاربر",
  color: Color.success,
  visibility: {
    hidden: (item) => item !== null,
  },
 handler: (_, context) => {
    context.openModal(ModalType.userRoleModalType.assignRoles, {
      parentId: context.parentId,
    });
  },
});
