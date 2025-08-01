import { Role } from "@/types/Role";
import DynamicForm from "../dynamics/DynamicForm";
import { InputType } from "@/constants/data/InputType";
import { Badge } from "flowbite-react";
import { FormikHelpers } from "formik";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { useEffect, useState } from "react";
import { AssignRolesToUser, User } from "@/types/User";
import { toast } from "sonner";
import { useUserRoles } from "@/hooks/useUserRoles";
import { assignUserRolesInitial } from "@/validations/admin/role/assignUserRolesInitial";
import { assignUserRolesSchema } from "@/validations/admin/role/assignUserRolesSchema";

export default function AssignRolesToUserForm({
  onCloseAssignRolesToUserModal,
  user,
}: {
  onCloseAssignRolesToUserModal: () => void;
  user: User;
}) {
  const {
    actions: { fetchUnAssignedUserRoles },
    statuses: { isFetching },
  } = useUserRoles();

  const {
    actions: { assignRolesToUser },
    statuses: { isEditing },
  } = useUserRoles();
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const unAssignedUserRoles = await fetchUnAssignedUserRoles(user.id);
      setFilteredRoles(unAssignedUserRoles || []);
    };
    fetchData();
  }, [user.id,fetchUnAssignedUserRoles]);
  const onSubmit = async (
    values: AssignRolesToUser,
    { setSubmitting }: FormikHelpers<AssignRolesToUser>
  ) => {
    try {
      await assignRolesToUser(values.roleIds, user.id);
      toast.success("نقش ها با موفقیت به کاربر تخصیص داده شدند.");
      await onCloseAssignRolesToUserModal();
    } catch (error) {
      console.error("Error Assign Role To Users:", error);
      toast.error("خطا در تخصیص نقش ها به کاربر.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <DynamicForm
        initialValues={assignUserRolesInitial}
        validationSchema={assignUserRolesSchema}
        onSubmit={onSubmit}
        buttonTitle=" تخصیص نقش به کاربر"
        disabledButton={isFetching || isEditing}
        validateOnBlur={true}
        validateOnChange={true}
      >
        <Badge color="info" size="md" className="cursor-default mb-3">
          نام کاربری کاربر
        </Badge>
        <br />
        <Badge color="light" className="cursor-default p-2 ">
          {user.username}
        </Badge>

        <DynamicInputField
          id="roleIds"
          name="roleIds"
          type={InputType.SELECT}
          placeholder="نقش ها"
          label="نقش ها"
          disabled={isFetching || isEditing}
          loading={isFetching}
          className="rounded-lg block w-full p-0.2 mb-2"
          multiple={true}
          data={filteredRoles.map((role) => ({
            value: role.id,
            label: role.name,
          }))}
          isSearchable
        />
      </DynamicForm>
    </>
  );
}
