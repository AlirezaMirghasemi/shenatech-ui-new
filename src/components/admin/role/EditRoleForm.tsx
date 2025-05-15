"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { EditRole, Role } from "@/types/Role";
import { useRole } from "@/hooks/useRole";
import { DataStatus } from "@/constants/data/DataStatus";
import { toast } from "sonner";
import { editRoleInitial } from "@/validations/admin/role/editRoleInitial";
import { editRoleSchema } from "@/validations/admin/role/editRoleSchema";

export default function EditRoleForm({
  setEditRoleModal,
  role,
}: {
  setEditRoleModal: (value: boolean) => void;
  role: Role;
}) {
  //const router = useRouter();
  const {
    actions: { editRole, fetchRoles },
    loading,
    uniqueLoading,
    meta,
  } = useRole();
  const onSubmit = async (
    values: EditRole,
    { setSubmitting }: FormikHelpers<EditRole>
  ) => {
    try {
      setEditRoleModal(false);
      await editRole(role.id, values.roleName);
      await fetchRoles(meta?.current_page, meta?.per_page);
      toast.success("نقش با موفقیت ویرایش شد.");
    } catch (error) {
      console.error("Error editing role:", error);
      toast.error("خطا در ویرایش نقش.");
    } finally {
      setSubmitting(false);
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
      disabledButton={
        loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
      }
    >
      <DynamicInputField
        id={"roleName"}
        name={"roleName"}
        placeholder="نام نقش"
        label="نام نقش"
        type={InputType.TEXT}
        disabled={
          loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
        }
      />
    </DynamicForm>
  );
}
