import { AssignRoleToUsers, Role } from "@/types/Role";
import DynamicForm from "../dynamics/DynamicForm";
import { assignRoleToUsersInitial } from "@/validations/admin/role/assignRoleToUsersInitial";
import { assignRoleToUsersSchema } from "@/validations/admin/role/assignRoleToUsersSchema";
import { InputType } from "@/constants/data/InputType";
import { Badge } from "flowbite-react";
import { FormikHelpers } from "formik";
import { useUser } from "@/hooks/useUser";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { useRole } from "@/hooks/useRole";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { toast } from "sonner";

export default function AssignRoleToUsersForm({
  onCloseAssignRoleToUsersModal,
  role,
}: {
  onCloseAssignRoleToUsersModal: (role: Role) => void;
  role: Role;
}) {
  const {
    actions: { fetchUnAssignedRoleUsers },
    statuses: { isFetching },
  } = useUser();

  const {
    actions: { assignRoleToUsers },
    statuses: { isEditing },
  } = useRole();
  const  [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setFilteredUsers(await fetchUnAssignedRoleUsers(role.id));
    };
    fetchData();

  }, [role.id]);
  const onSubmit = async (
    values: AssignRoleToUsers,
    { setSubmitting }: FormikHelpers<AssignRoleToUsers>
  ) => {
    try {
      await assignRoleToUsers(role.id, values.userIds);
      toast.success("نقش با موفقیت به کاربران تخصیص داده شد.");
      await onCloseAssignRoleToUsersModal(role);
    } catch (error) {
      console.error("Error Assign Role To Users:", error);
      toast.error("خطا در تخصیص نقش به کاربران.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <DynamicForm
        initialValues={assignRoleToUsersInitial}
        validationSchema={assignRoleToUsersSchema}
        onSubmit={onSubmit}
        buttonTitle=" تخصیص نقش به کاربران"
        disabledButton={isFetching || isEditing}
        validateOnBlur={true}
        validateOnChange={true}
      >
        <Badge color="info" size="md" className="cursor-default mb-3">
          نام نقش
        </Badge>
        <br />
        <Badge color="light" className="cursor-default p-2 ">
          {role.name}
        </Badge>

        <DynamicInputField
          id="userIds"
          name="userIds"
          type={InputType.SELECT}
          placeholder="کاربران"
          label="کاربران"
          disabled={isFetching || isEditing}
          loading={isFetching}
          className="rounded-lg block w-full p-0.2 mb-2"
          multiple={true}
          data={filteredUsers.map((user) => ({
            value: user.id,
            label: user.username,
          }))}
          isSearchable
        />
      </DynamicForm>
    </>
  );
}
