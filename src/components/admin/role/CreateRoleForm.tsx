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
import { toast } from "sonner";

export default function CreateRoleForm({
  onCloseCreateRoleModal,
}: {
  onCloseCreateRoleModal: () => void;
}) {
  //const router = useRouter();
  const {
    actions: { createRole, roleNameIsUnique },
    statuses: { isCreating, isCheckingUniqueness },
  } = useRole();
  const onSubmit = async (
    values: CreateRole,
    { setSubmitting }: FormikHelpers<CreateRole>
  ) => {
    try {
      await createRole({name:values.name});
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
      disabledButton={isCheckingUniqueness || isCreating}
    >
      <DynamicInputField
        id="name"
        name="name"
        placeholder="نام نقش"
        label="نام نقش"
        type={InputType.TEXT}
        disabled={isCheckingUniqueness || isCreating}
        loading={isCheckingUniqueness || isCreating}
      />
    </DynamicForm>
  );
}
