import { ApiError } from "@/types/Api";
import { FormikHelpers } from "formik";

import * as Yup from "yup";

export default interface IDynamicForm<T extends object> {
  children: React.ReactNode;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<unknown>;
  apiError?: ApiError | null;
  buttonTitle: string;
  disabledButton?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  submitButtonColor?: string;
  submitButtonSize?: string;
  buttonClassName?: string;
  cancelButton?: boolean;
  cancelButtonOnClick?: () => void;
  cancelButtonClassName?: string;
  cancelButtonColor?: string;
  cancelButtonSize?: string;
  cancelButtonTitle?: string;
  disabledCancelButton?: boolean;
}
