"use client";
import React from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { Button, Spinner } from "flowbite-react";
import { ApiError } from "@/types/Api";
import ValidatingError from "@/components/common/ValidatingError";

interface DynamicFormProps {
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

export default function DynamicForm({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonTitle,
  apiError,
}: DynamicFormProps): React.JSX.Element {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <>

            <Form className="space-y-4 md:space-y-6">
              {children}
              <Button
                type="submit"
                disabled={isSubmitting}
                color="green"
                outline
              >
                {isSubmitting ? (
                  <Spinner size="sm" className="me-3" light />
                ) : (
                  buttonTitle
                )}
              </Button>
            </Form>
          </>
        )}
      </Formik>
      {apiError &&
        typeof apiError === "object" &&
        "errors" in apiError &&
        Object.values(apiError.errors).map((error: string[]) => (
          <ValidatingError error={error[0]} key={error[0]} />
        ))}
    </>
  );
}
