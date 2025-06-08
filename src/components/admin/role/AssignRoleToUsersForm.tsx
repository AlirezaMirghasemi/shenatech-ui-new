import { AssignRoleToUsers, Role } from "@/types/Role";
import DynamicForm from "../dynamics/DynamicForm";
import { assignRoleToUsersInitial } from "@/validations/admin/role/assignRoleToUsersInitial";
import { assignRoleToUsersSchema } from "@/validations/admin/role/assignRoleToUsersSchema";
import { DataStatus } from "@/constants/data/DataStatus";
import { InputType } from "@/constants/data/InputType";
import { Badge, Popover, TextInput } from "flowbite-react";
import { FormikHelpers } from "formik";
import { useUser } from "@/hooks/useUser";
import DynamicInputField from "../dynamics/DynamicInputField";
import { useRole } from "@/hooks/useRole";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { toast } from "sonner";
import { FaInfo, FaMagnifyingGlass } from "react-icons/fa6";

export default function AssignRoleToUsersForm({
  onCloseAssignRoleToUsersModal,
  role,
  ShowRoleDetails,
}: {
  onCloseAssignRoleToUsersModal: (role: Role) => void;
  role: Role;
  ShowRoleDetails: (role: Role) => void;
}) {
  const {
    actions: { fetchUnAssignedRoleUsers, fetchRoleUsers },
    unassignedRoleUsers,
    loading: fetchUserLoading,
  } = useUser();
  const {
    actions: { fetchRoles, assignRoleToUsers },
    loading,
    meta,
  } = useRole();
  const [filteredUsers, setFilteredUsers] =
    useState<User[]>(unassignedRoleUsers);
  useEffect(() => {
    const fetchData = async () => {
      await fetchUnAssignedRoleUsers(role.id);
    };
    fetchData();
  }, [role.id]);

  // از یک useEffect جداگانه برای واکنش به تغییرات users استفاده کنید
  useEffect(() => {
    setFilteredUsers(unassignedRoleUsers);
  }, [unassignedRoleUsers]);
  const searchUser = async (query: string) => {
    await setFilteredUsers(
      unassignedRoleUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          (user.full_name?.toLowerCase().includes(query.toLowerCase()) ?? false)
      )
    );
    if (query.length === 0) {
      await setFilteredUsers(unassignedRoleUsers);
    }
    return filteredUsers;
  };
  const onSubmit = async (
    values: AssignRoleToUsers,
    { setSubmitting }: FormikHelpers<AssignRoleToUsers>
  ) => {
    try {
      await assignRoleToUsers(role.id, values.userIds);
      await fetchRoles(meta?.current_page, meta?.per_page);
      toast.success("نقش با موفقیت به کاربران تخصیص داده شد.");
      await onCloseAssignRoleToUsersModal(role);
      await ShowRoleDetails(role);
      return await fetchRoleUsers(role.id);
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
        disabledButton={
          loading === DataStatus.PENDING ||
          fetchUserLoading === DataStatus.PENDING
        }
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

        <Popover
          content={
            <div className="space-y-2 p-3 opacity-85">
              <h3 className="text-text-secondary">
                <Badge color="info" className="rounded-full p-1 ml-2">
                  <FaInfo />
                </Badge>
                جستجوی کاربران بر اساس ایمیل ، نام کاربری ، نام و نام خانوادگی
              </h3>
            </div>
          }
          trigger="hover"
          placement="top"
        >
          <TextInput
            className="w-full !block"
            rightIcon={FaMagnifyingGlass}
            type="search"
            placeholder="جستجوی کاربران"
            onChange={(e) => searchUser(e.target.value)}
            disabled={
              fetchUserLoading === DataStatus.PENDING ||
              loading === DataStatus.PENDING
            }
          />
        </Popover>

        <DynamicInputField
          id="userIds"
          name="userIds"
          type={InputType.SELECT}
          placeholder="کاربران"
          label="کاربران"
          disabled={
            loading === DataStatus.PENDING ||
            fetchUserLoading === DataStatus.PENDING
          }
          loading={fetchUserLoading === DataStatus.PENDING}
          className="rounded-lg block w-full p-0.2 mb-2"
          multiple={true}
          data={filteredUsers.map((user) => ({
            id: user.id,
            name: user.username,
          }))}
        />
      </DynamicForm>
    </>
  );
}
