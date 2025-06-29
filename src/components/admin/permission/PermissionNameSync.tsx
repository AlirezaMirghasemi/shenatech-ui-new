import { CreatePermission } from "@/types/Permission";
import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function PermissionNameSync({
  actionOptions,
  tableOptions,
  assignOptions,
  findNameById,
}: {
  actionOptions: { value: string; label: string }[];
  tableOptions: { value: string; label: string }[];
  assignOptions: { value: string; label: string }[];
  findNameById: (list: { value: string; label: string }[], value: string) => string;
}) {
  const { values: createFormValues, setFieldValue: setCreateFormValues } =
    useFormikContext<CreatePermission>();

  useEffect(() => {
    const keys = [
      createFormValues.actionName,
      createFormValues.assignedName?.toString() === "own"
        ? createFormValues.assignedName
        : "",
      createFormValues.tableName,
    ]
      .filter(Boolean)
      .join(" ");

    setCreateFormValues("permissionName", keys);

    const showNames = [
      findNameById(actionOptions, createFormValues.actionName ?? ""),
      findNameById(tableOptions, createFormValues.tableName ?? ""),
      findNameById(assignOptions, createFormValues.assignedName ?? ""),
    ]
      .filter(Boolean)
      .join(" ");

    setCreateFormValues("permissionViewName", showNames);
  }, [
    createFormValues,
    setCreateFormValues,
    actionOptions,
    tableOptions,
    assignOptions,
    findNameById,
  ]);

  return null;
}
