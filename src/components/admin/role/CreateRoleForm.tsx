"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import { createRoleInitial } from "@/validations/admin/role/createRoleInitial";
import { createRoleSchema } from "@/validations/admin/role/createRoleSchema";
import DynamicInputField from "../dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { CreateRole } from "@/types/Role";
import { useRole } from "@/hooks/useRole";
import { DataStatus } from "@/constants/data/DataStatus";
import { toast } from "sonner";

export default function CreateRoleForm({
  setCreateRoleModal,
}: {
  setCreateRoleModal: (value: boolean) => void;
}) {
  //const router = useRouter();
  const {
    actions: { createRole, fetchRoles },
    loading,
    uniqueLoading,
    meta,
  } = useRole();
  const onSubmit = async (
    values: CreateRole,
    { setSubmitting }: FormikHelpers<CreateRole>
  ) => {
    try {
      setCreateRoleModal(false);
      console.log(values);
      await createRole(values.roleName);
      await fetchRoles(meta?.current_page, meta?.per_page);
      toast.success("نقش با موفقیت ایجاد شد.");
      //await router.push("/admin/dashboard/roles");
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("خطا در ایجاد نقش.");
    } finally {
      setSubmitting(false);
    }
  };
  const {
    actions: { roleNameIsUnique },
  } = useRole();
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
      />
    </DynamicForm>
  );
}
