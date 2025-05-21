import { CreatePermission } from "@/types/Permission";
import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function PermissionNameSync({
  actionOptions,
  tableOptions,
  assignOptions,
  findNameById,
}: {
  actionOptions: { id: string; name: string }[];
  tableOptions: { id: string; name: string }[];
  assignOptions: { id: string; name: string }[];
  findNameById: (list: { id: string; name: string }[], id: string) => string;
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
