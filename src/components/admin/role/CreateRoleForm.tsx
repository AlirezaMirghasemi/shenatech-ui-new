"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import { createRoleInitial } from "@/validations/admin/role/createRoleInitial";
import { createRoleSchema } from "@/validations/admin/role/createRoleSchema";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { CreateRole } from "@/types/Role";
import { useRole } from "@/hooks/useRole";
import { DataStatus } from "@/constants/data/DataStatus";
import { toast } from "sonner";

export default function CreateRoleForm({
  onCloseCreateRoleModal,
}: {
  onCloseCreateRoleModal: () => void;
}) {
  //const router = useRouter();
  const {
    actions: { createRole, fetchRoles, roleNameIsUnique },
    loading,
    uniqueLoading,
    meta,
  } = useRole();
  const onSubmit = async (
    values: CreateRole,
    { setSubmitting }: FormikHelpers<CreateRole>
  ) => {
    try {
      await createRole(values.roleName);
      await fetchRoles(meta?.current_page, meta?.per_page);
      onCloseCreateRoleModal();
      toast.success("نقش با موفقیت ایجاد شد.");
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("خطا در ایجاد نقش.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DynamicForm
      initialValues={createRoleInitial}
      validationSchema={createRoleSchema(roleNameIsUnique)}
      buttonTitle="ایجاد نقش"
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
      disabledButton={
        loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
      }
    >
      <DynamicInputField
        id="roleName"
        name="roleName"
        placeholder="نام نقش"
        label="نام نقش"
        type={InputType.TEXT}
        disabled={
          loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
        }
        loading={uniqueLoading == DataStatus.PENDING}
      />
    </DynamicForm>
  );
}
