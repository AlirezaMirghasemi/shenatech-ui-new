"use client";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Spinner } from "flowbite-react";
import ValidatingError from "@/components/common/ValidatingError";
import IDynamicForm from "@/interfaces/IDynamicForm";

export default function DynamicForm<T extends object>({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonTitle,
  apiError,
  disabledButton = false,
  validateOnChange = false,
  validateOnBlur = true,
  submitButtonColor = "success",
  submitButtonSize = "lg",
  buttonClassName,
}: IDynamicForm<T>) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={validateOnChange}
        validateOnBlur={validateOnBlur}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="space-y-4  md:space-y-6 ">
              {children}
              <Button
                type="submit"
                disabled={isSubmitting || disabledButton}
                color={submitButtonColor}
                outline
                size={submitButtonSize}
                className={`items-center text-center rounded-lg ${
                  buttonClassName ?? ""
                }`}
              >
                {isSubmitting ? (
                  <Spinner size="sm" color="success" />
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
