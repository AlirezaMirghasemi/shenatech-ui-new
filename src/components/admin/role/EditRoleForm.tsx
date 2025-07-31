"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { EditRole, Role } from "@/types/Role";
import { useRole } from "@/hooks/useRole";
import { toast } from "sonner";
import { editRoleInitial } from "@/validations/admin/role/editRoleInitial";
import { editRoleSchema } from "@/validations/admin/role/editRoleSchema";
import { AxiosError } from "axios";
import { ApiError } from "@/types/Api";

export default function EditRoleForm({
  onCloseEditRoleModal,
  role,
}: {
  onCloseEditRoleModal: () => void;
  role: Role;
}) {
  //const router = useRouter();
  const {
    actions: { editRole },
    statuses: { isEditing, isCheckingUniqueness },
  } = useRole();
  const onSubmit = async (values: EditRole) => {
    try {
      await editRole(role.id, values.name);
      onCloseEditRoleModal();
      toast.success("نقش با موفقیت ویرایش شد.");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiError>;
      toast.error(axiosError.message);
    }
  };
  const {
    actions: { roleNameIsUnique },
  } = useRole();
  return (
    <DynamicForm
      initialValues={editRoleInitial({ roleName: role.name })}
      validationSchema={editRoleSchema(roleNameIsUnique, {
        currentRoleName: role.name,
      })}
      buttonTitle="ویرایش نقش"
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
      disabledButton={isEditing || isCheckingUniqueness}
    >
      <DynamicInputField
        id="name"
        name="name"
        placeholder="نام نقش"
        label="نام نقش"
        type={InputType.TEXT}
        disabled={isEditing || isCheckingUniqueness}
        loading={isEditing || isCheckingUniqueness}
      />
    </DynamicForm>
  );
}
