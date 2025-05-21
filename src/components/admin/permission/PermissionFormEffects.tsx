import { useEffect } from "react";
import { useFormikContext } from "formik";
import { usePermission } from "@/hooks/usePermission";
import { CreatePermission } from "@/types/Permission";
import { useCallback } from "react";

export function PermissionFormEffects({
  setIsUnique,
}: {
  setIsUnique: (value: boolean) => void;
}) {
  const { values, errors, touched, setFieldTouched, validateForm } =
    useFormikContext<CreatePermission>();

  const {
    actions: { permissionNameIsUnique },
  } = usePermission();

  const checkPermissionNameIsUnique = useCallback(
    async (name: string) => {
      try {
        return await permissionNameIsUnique(name);
      } catch (error) {
        console.error("Error checking uniqueness:", error);
        return false;
      }
    },
    [permissionNameIsUnique]
  );

  useEffect(() => {


    const noErrors =
      !errors.actionName && !errors.tableName && !errors.assignedName;
    (async () => {
      if ( noErrors && values.permissionName) {
        const isUnique = await checkPermissionNameIsUnique(
          values.permissionName
        );
        if (!isUnique) {
          setIsUnique(false);
          setFieldTouched("permissionViewName", true, true);
          validateForm();
        } else {
          setIsUnique(true);
          setFieldTouched("permissionViewName", true, true);
        }
      }
    })();
  }, [values.permissionViewName, touched, checkPermissionNameIsUnique]);
  return null;
}
