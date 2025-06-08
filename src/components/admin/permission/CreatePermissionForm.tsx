"use client";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { FormikHelpers } from "formik";
import { CreatePermission } from "@/types/Permission";
import { usePermission } from "@/hooks/usePermission";
import { DataStatus } from "@/constants/data/DataStatus";
import { toast } from "sonner";
import {
  Actions,
  Assigned,
  TableNames,
} from "../../../constants/data/ManagePermissions";
import { createPermissionInitial } from "@/validations/admin/permission/createPermissionInitial";
import { createPermissionSchema } from "@/validations/admin/permission/cereatePermissionSchema";
import { PermissionFormEffects } from "./PermissionFormEffects";
import PermissionNameSync from "./PermissionNameSync";
import { useState } from "react";

export default function CreatePermissionForm({
  onCloseCreatePermissionModal,
}: {
  onCloseCreatePermissionModal: () => void;
}) {
  const {
    actions: { createPermission, fetchPermissions },
    loading,
    uniqueLoading,
    meta,
  } = usePermission();
  const [isUnique, setIsUnique] = useState<boolean>(true);

  const onSubmit = async (
    values: CreatePermission,
    { setSubmitting }: FormikHelpers<CreatePermission>
  ) => {
    try {
      await createPermission(values.permissionName);
      toast.success("مجوز با موفقیت ایجاد شد.");
      onCloseCreatePermissionModal();
      return await fetchPermissions(meta?.current_page, meta?.per_page);
    } catch (error) {
      console.error("Error creating permission:", error);
      toast.error("خطا در ایجاد نقش.");
    } finally {
      setSubmitting(false);
    }
  };

  const actionOptions = Object.entries(Actions).map(([key, value]) => ({
    id: key.toString(),
    name: value.toString(),
  }));

  const tableOptions = Object.entries(TableNames).map(([key, value]) => ({
    id: key.toString(),
    name: value.toString(),
  }));

  const assignOptions = Object.entries(Assigned).map(([key, value]) => ({
    id: key.toString(),
    name: value.toString(),
  }));

  const findNameById = (list: { id: string; name: string }[], id: string) =>
    list.find((opt) => opt.id === id)?.name ?? "";
  return (
    <DynamicForm
      initialValues={createPermissionInitial}
      validationSchema={createPermissionSchema(isUnique)}
      buttonTitle="ایجاد مجوز"
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      disabledButton={
        loading === DataStatus.PENDING ||
        uniqueLoading === DataStatus.PENDING ||
        !isUnique
      }
    >
      <DynamicInputField
        id="actionName"
        name="actionName"
        placeholder="نام عملیات"
        label="نام عملیات"
        type={InputType.SELECT}
        disabled={loading === DataStatus.PENDING}
        loading={uniqueLoading === DataStatus.PENDING}
        data={actionOptions}
      />

      <DynamicInputField
        id="tableName"
        name="tableName"
        placeholder="نام جدول"
        label="نام جدول"
        type={InputType.SELECT}
        disabled={loading === DataStatus.PENDING}
        loading={uniqueLoading === DataStatus.PENDING}
        data={tableOptions}
      />

      <DynamicInputField
        id="assignedName"
        name="assignedName"
        placeholder="تخصیص"
        label="تخصیص"
        type={InputType.SELECT}
        disabled={loading === DataStatus.PENDING}
        loading={uniqueLoading === DataStatus.PENDING}
        data={assignOptions}
      />

      <DynamicInputField
        id="permissionViewName"
        name="permissionViewName"
        placeholder="نام مجوز"
        label="نام مجوز"
        type={InputType.TEXT}
        readOnly={true}
        loading={uniqueLoading === DataStatus.PENDING}
      />

      <DynamicInputField
        id="permissionName"
        name="permissionName"
        type={InputType.HIDDEN}
      />

      <PermissionFormEffects setIsUnique={setIsUnique} />

      <PermissionNameSync
        actionOptions={actionOptions}
        tableOptions={tableOptions}
        assignOptions={assignOptions}
        findNameById={findNameById}
      />
    </DynamicForm>
  );
}
