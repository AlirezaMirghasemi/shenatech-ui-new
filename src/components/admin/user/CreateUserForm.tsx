"use client";
//import { useRouter } from "next/navigation";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { DataStatus } from "@/constants/data/DataStatus";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { CreateUser } from "@/types/User";
import { createUserInitial } from "@/validations/admin/user/createUserInitial";
import { createUserSchema } from "@/validations/admin/user/createUserSchema";
import { Gender } from "@/constants/data/Gender";
import { UserStatus } from "@/constants/data/UserStatus";
import FullNameSync from "./FullNameSync";
import React from "react";
import UserProfileUploader from "../dynamics/DynamicFormInputFile";

export default function CreateUserForm({
  onCloseCreateUserModal,
}: {
  onCloseCreateUserModal: () => void;
}) {
  const {
    actions: {
      createUser,
      fetchUsers,
      checkFieldIsUnique
      //emailIsUnique,
      //mobileIsUnique,
    },
    loading,
    uniqueLoading,
    meta,
  } = useUser();
  const onSubmit = async (
    values: CreateUser,
    { setSubmitting }: FormikHelpers<CreateUser>
  ) => {
    try {
      onCloseCreateUserModal();
      console.log(values);
      await createUser(values, values.profile_image as File | undefined);
      await fetchUsers(meta?.current_page, meta?.per_page);
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
              (fieldValue: string, fieldName: string) => checkFieldIsUnique({ fieldValue, fieldName })
            )}
            buttonTitle="ایجاد کاربر"
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={true}
            disabledButton={
              loading == DataStatus.PENDING
              || uniqueLoading == DataStatus.PENDING
            }
          >
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <DynamicInputField
                  id="username"
                  name="username"
                  placeholder="نام کاربری"
                  label="نام کاربری"
                  type={InputType.TEXT}
                  disabled={
                    loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
                  }
                  className="block w-full"
                   loading={uniqueLoading == DataStatus.PENDING}
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
                  disabled={loading == DataStatus.PENDING}
                  loading={uniqueLoading == DataStatus.PENDING}
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
                  disabled={loading == DataStatus.PENDING}
                  loading={uniqueLoading == DataStatus.PENDING}
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="full_name"
                  name="full_name"
                  placeholder="نام کامل"
                  label="نام کامل"
                  type={InputType.TEXT}
                  disabled={true}
                  loading={uniqueLoading == DataStatus.PENDING}
                  className="block w-full"
                />
              </div>

              <div className="col-span-2">
                <DynamicInputField
                  id="email"
                  name="email"
                  placeholder="ایمیل"
                  label="ایمیل"
                  type={InputType.EMAIL}
                  disabled={
                    loading == DataStatus.PENDING //|| uniqueLoading == DataStatus.PENDING
                  }
                    loading={uniqueLoading == DataStatus.PENDING}
                  className="block w-full"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="mobile"
                  name="mobile"
                  placeholder="شماره موبایل"
                  label="شماره موبایل"
                  type={InputType.TEXT}
                  disabled={
                    loading == DataStatus.PENDING //|| uniqueLoading == DataStatus.PENDING
                  }
                  className="block w-full"
                  loading={uniqueLoading == DataStatus.PENDING}
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
                    { id: Gender.Male, name: "مرد" },
                    { id: Gender.Female, name: "زن" },
                    { id: Gender.NotSpecified, name: "نامشخص" },
                  ]}
                  disabled={
                    loading == DataStatus.PENDING // || uniqueLoading == DataStatus.PENDING
                  }
                  loading={uniqueLoading == DataStatus.PENDING}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="password"
                  name="password"
                  placeholder="رمز عبور"
                  label="رمز عبور"
                  type={InputType.PASSWORD}
                  disabled={
                    loading == DataStatus.PENDING //|| uniqueLoading == DataStatus.PENDING
                  }
                  className="block w-full"
                  loading={uniqueLoading == DataStatus.PENDING}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="تکرار رمز عبور"
                  label="تکرار رمز عبور"
                  type={InputType.PASSWORD}
                  disabled={
                    loading == DataStatus.PENDING //|| uniqueLoading == DataStatus.PENDING
                  }
                  className="block w-full"
                  loading={uniqueLoading == DataStatus.PENDING}
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="bio"
                  name="bio"
                  placeholder="بیوگرافی"
                  label="بیوگرافی"
                  type={InputType.TEXTAREA}
                  disabled={
                    loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
                  }
                  className="block w-full"
                loading={uniqueLoading == DataStatus.PENDING}
                />
              </div>

              <UserProfileUploader
                loading={loading}
                uniqueLoading={uniqueLoading}
                fileInputFieldName="profile_image"
                dynamicInputFieldProps={{
                  id: "profile_image",
                  name: "profile_image",
                  placeholder: "عکس پروفایل",
                  label: "عکس پروفایل",
                }}
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
                    { id: UserStatus.PENDING, name: "در انتظار تایید" },
                    { id: UserStatus.ACTIVE, name: "فعال" },
                    { id: UserStatus.DEACTIVATED, name: "غیرفعال" },
                  ]}
                  disabled={
                    loading == DataStatus.PENDING || uniqueLoading == DataStatus.PENDING
                  }
                  loading={uniqueLoading == DataStatus.PENDING}
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
