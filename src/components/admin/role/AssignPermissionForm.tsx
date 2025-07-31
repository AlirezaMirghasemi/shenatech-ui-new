import DynamicForm from "@/components/admin/dynamics/DynamicForm";
import DynamicInputField from "@/components/admin/dynamics/dynamicFormInputs/DynamicInputField";
import { DataStatus } from "@/constants/data/DataStatus";
import { InputType } from "@/constants/data/InputType";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { Permission } from "@/types/Permission";
import { AssignPermission, Role } from "@/types/Role";
import { assignPermissionInitial } from "@/validations/admin/role/assignPermissionInitial";
import { assignPermissionSchema } from "@/validations/admin/role/assignPermissionSchema";
import { AxiosError } from "axios";
import { Badge } from "flowbite-react";
import { FormikHelpers } from "formik";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AssignPermissionForm({
  role,
  onCloseAssignPermissionModal,
}: {
  role: Role;
  onCloseAssignPermissionModal: (role: Role) => void;
}) {
  const [unAssignedPermissions, setUnAssignedPermissions] = useState<
    Permission[]
  >([]);
  //TODO : FIX UsePermission
  const {
    actions: { fetchRoleNotPermissions, fetchRolePermissions },
    loading,
    unassigned,
  } = usePermission();
  const {

    actions: { assignRolePermissions },
   statuses:{
    isEditing
   }
  } = useRole();

  useEffect(() => {
    (async () => {
      await fetchRoleNotPermissions(role.id);
    })();
  }, [role.id]);

  useEffect(() => {
    (async () => {
      setUnAssignedPermissions(unassigned);
    })();
  }, [unassigned]);

  const onSubmit = async (
    values: AssignPermission,
    { setSubmitting }: FormikHelpers<AssignPermission>
  ) => {
    try {
      await assignRolePermissions(role.id, values.permissionIds);
      await toast.success("مجوزها با موفقیت تخصیص داده شدند.");
      await onCloseAssignPermissionModal(role);
      return await fetchRolePermissions(role.id);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      console.error("assign-permissions error:", axiosError.response?.data);
      toast.error(axiosError.response?.data?.message || "خطای نامشخص");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <DynamicForm
        initialValues={assignPermissionInitial}
        validationSchema={assignPermissionSchema}
        onSubmit={onSubmit}
        buttonTitle="تخصیص مجوز"
        disabledButton={
         isEditing
        }
      >
        <Badge color="info" size="md" className="cursor-default mb-3">
          نام نقش
        </Badge>
        <br />
        <Badge color="light" className="cursor-default p-2 ">
          {role.name}
        </Badge>

        <DynamicInputField
          id="permissionIds"
          name="permissionIds"
          type={InputType.SELECT}
          placeholder="مجوز ها"
          label="مجوز ها"
          disabled={
            isEditing
          }
          className="rounded-lg block w-full p-0.2 mb-2"
          multiple={true}
          data={unAssignedPermissions.map((permission) => ({
            value: permission.id,
            label: permission.name,
          }))}
          loading={loading === DataStatus.PENDING}
          isSearchable

        />
      </DynamicForm>
    </>
  );
}
