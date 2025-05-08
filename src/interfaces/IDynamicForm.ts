import { ApiError } from "@/types/Api";
import { FormikHelpers } from "formik";

import { FormikValues } from "formik";
import * as Yup   from 'yup';

export default interface IDynamicForm{
    children: React.ReactNode;
    initialValues: FormikValues;
    validationSchema: Yup.ObjectSchema<FormikValues>;
    onSubmit: (
      values: FormikValues,
      formikHelpers: FormikHelpers<FormikValues>
    ) => void | Promise<unknown>;
    apiError?: ApiError | null;
    buttonTitle: string;
}
