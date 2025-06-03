import { CreateUser } from "@/types/User";
import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function FullNameSync() {
  const { values: createFormValues, setFieldValue: setCreateFormValues } =
    useFormikContext<CreateUser>();

  useEffect(() => {
    setCreateFormValues("full_name", `${createFormValues.first_name} ${createFormValues.last_name}`);
  }, [createFormValues, setCreateFormValues]);

  return null;
}
