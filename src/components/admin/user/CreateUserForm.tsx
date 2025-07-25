"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { CreateUser } from "@/types/User";
import { createUserInitial } from "@/validations/admin/user/createUserInitial";
import { createUserSchema } from "@/validations/admin/user/createUserSchema";
import { Gender, GenderTitles } from "@/constants/data/Gender";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import FullNameSync from "./FullNameSync";
import React from "react";

export default function CreateUserForm({
  onCloseCreateUserModal,
}: {
  onCloseCreateUserModal: () => void;
}) {
  const {
    actions: { createUser, checkFieldIsUnique },
    statuses: { isCheckingUniqueness, isCreating },
  } = useUser();
  const onSubmit = async (
    values: CreateUser,
    { setSubmitting }: FormikHelpers<CreateUser>
  ) => {
    try {
      const profileImage =
        values.profile_image instanceof File ? values.profile_image : undefined;
      await createUser(values, profileImage);
      onCloseCreateUserModal();
      toast.success("کاربر با موفقیت ایجاد شد.");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("خطا در ایجاد کاربر.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-h-auto relative max-h-full w-full max-w-lg p-4">
        <div className="relative rounded-lg">
          <DynamicForm
            initialValues={createUserInitial}
            validationSchema={createUserSchema(
              (fieldValue: string, fieldName: string) =>
                checkFieldIsUnique({ fieldValue, fieldName })
            )}
            buttonTitle="ایجاد کاربر"
            onSubmit={onSubmit}
            buttonClassName="flex flex-row m-auto w-full cursor-pointer "
            validateOnChange={false}
            validateOnBlur={true}
            disabledButton={isCheckingUniqueness || isCreating}
          >
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <DynamicInputField
                  id="username"
                  name="username"
                  placeholder="نام کاربری"
                  label="نام کاربری"
                  type={InputType.TEXT}
                  disabled={isCheckingUniqueness || isCreating}
                  className="block w-full"
                  loading={isCheckingUniqueness || isCreating}
                  autoComplete="username"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="first_name"
                  name="first_name"
                  placeholder="نام کوچک"
                  label="نام کوچک"
                  type={InputType.TEXT}
                  className="block w-full"
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  autoComplete="given-name"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="last_name"
                  name="last_name"
                  placeholder="نام خانوادگی"
                  label="نام خانوادگی"
                  className="block w-full"
                  type={InputType.TEXT}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  autoComplete="family-name"
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="full_name"
                  name="full_name"
                  placeholder="نام کامل"
                  label="نام کامل"
                  type={InputType.TEXT}
                  readOnly
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className=" w-full"
                />
              </div>

              <div className="col-span-2">
                <DynamicInputField
                  id="email"
                  name="email"
                  placeholder="ایمیل"
                  label="ایمیل"
                  type={InputType.EMAIL}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className="block w-full"
                  autoComplete="email"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="mobile"
                  name="mobile"
                  placeholder="شماره موبایل"
                  label="شماره موبایل"
                  type={InputType.TEXT}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className="block w-full"
                  autoComplete="tel"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="gender"
                  name="gender"
                  placeholder="جنسیت"
                  label="جنسیت"
                  type={InputType.SELECT}
                  className="block w-full"
                  data={[
                    {
                      value: Gender.Male,
                      label: GenderTitles.getGenderTitle(Gender.Male),
                    },
                    {
                      value: Gender.Female,
                      label: GenderTitles.getGenderTitle(Gender.Female),
                    },
                    {
                      value: Gender.NotSpecified,
                      label: GenderTitles.getGenderTitle(Gender.NotSpecified),
                    },
                  ]}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="password"
                  name="password"
                  placeholder="رمز عبور"
                  label="رمز عبور"
                  type={InputType.PASSWORD}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className="block w-full"
                  autoComplete="new-password"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="تکرار رمز عبور"
                  label="تکرار رمز عبور"
                  type={InputType.PASSWORD}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className="block w-full"
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="bio"
                  name="bio"
                  placeholder="بیوگرافی"
                  label="بیوگرافی"
                  type={InputType.TEXTAREA}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                  className="block w-full"
                />
              </div>

              <DynamicInputField
                id="profile_image"
                name="profile_image"
                placeholder="عکس پروفایل"
                label="عکس پروفایل"
                type={InputType.IMAGE}
                className={"mb-5"}
                disabled={isCheckingUniqueness || isCreating}
                loading={isCheckingUniqueness || isCreating}
              />

              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="status"
                  name="status"
                  placeholder="وضعیت"
                  label="وضعیت"
                  className="block w-full"
                  type={InputType.SELECT}
                  data={[
                    {
                      value: UserStatus.PENDING,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.PENDING
                      ),
                    },
                    {
                      value: UserStatus.ACTIVE,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.ACTIVE
                      ),
                    },
                    {
                      value: UserStatus.DEACTIVATED,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.DEACTIVATED
                      ),
                    },
                    {
                      value: UserStatus.SUSPENDED,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.SUSPENDED
                      ),
                    },
                  ]}
                  disabled={isCheckingUniqueness || isCreating}
                  loading={isCheckingUniqueness || isCreating}
                />
              </div>
            </div>
            <FullNameSync />
          </DynamicForm>
        </div>
      </div>
    </>
  );
}
