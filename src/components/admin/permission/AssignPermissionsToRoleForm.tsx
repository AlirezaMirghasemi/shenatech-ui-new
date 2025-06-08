import { DataStatus } from "@/constants/data/DataStatus";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { assignPermissionsToRoleInitial } from "@/validations/admin/role/assignPermissionsToRoleInitial";
import { assignPermissionsToRoleSchema } from "@/validations/admin/role/assignPermissionsToRoleSchema";
import { AssignPermissionsToRole } from "@/types/Role";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { useEffect } from "react";
import { Permission } from "@/types/Permission";
import { Alert } from "flowbite-react";

export default function AssignPermissionsToRoleForm({
  onCloseAssignPermissionsToRoleModal,
  permissions,
  selectedIds,
}: {
  onCloseAssignPermissionsToRoleModal: () => void;
  permissions: Permission[];
  selectedIds: number[];
}) {
  const {
    actions: { fetchPermissions },
    loading,
    meta,
  } = usePermission();
  const {
    actions: { fetchRoles, assignRolePermissions },
    loading: roleLoading,
    roles: roleOptions,
  } = useRole();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRoles();
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchData();
  }, []);
  const filteredPermissions = permissions.filter((permission) =>
    selectedIds.includes(permission.id)
  );

  const onSubmit = async (
    values: AssignPermissionsToRole,
    { setSubmitting }: FormikHelpers<AssignPermissionsToRole>
  ) => {
    if (values.roleId) {
      try {
        await assignRolePermissions(values.roleId, selectedIds);
        onCloseAssignPermissionsToRoleModal();
        toast.success("مجوز ها با موفقیت تخصیص داده شدند.");
        return await fetchPermissions(meta?.current_page, meta?.per_page);
      } catch (error) {
        console.error("Error creating permission:", error);
        toast.error("خطا در تخصیص مجوز ها.");
      } finally {
        setSubmitting(false);
        onCloseAssignPermissionsToRoleModal();
      }
    }
  };

  return (
    <DynamicForm
      initialValues={assignPermissionsToRoleInitial}
      validationSchema={assignPermissionsToRoleSchema}
      buttonTitle="تخصیص مجوز"
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      disabledButton={
        loading === DataStatus.PENDING || roleLoading === DataStatus.PENDING
      }
    >
      <Alert color="warning">
        <span>مجوز های مد نظر برای انتصاب به نقش</span>
        <ul>
          {filteredPermissions.map((permission) => (
            <li key={permission.id}>{permission.name}</li>
          ))}
        </ul>
      </Alert>
      <DynamicInputField
        id="roleId"
        name="roleId"
        placeholder="نام نقش"
        label="نام نقش"
        type={InputType.SELECT}
        disabled={
          loading === DataStatus.PENDING || roleLoading === DataStatus.PENDING
        }
        loading={roleLoading === DataStatus.PENDING}
        data={roleOptions}
      />
    </DynamicForm>
  );
}
