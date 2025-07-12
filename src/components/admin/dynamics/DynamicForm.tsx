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
  cancelButton,
  cancelButtonOnClick,
  cancelButtonClassName,
  cancelButtonColor="warning",
  cancelButtonSize="lg",
  cancelButtonTitle,
  disabledCancelButton,
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
              <div className="flex flex-row items-center justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || disabledButton}
                  color={submitButtonColor}
                  outline
                  size={submitButtonSize}
                  className={`items-center text-center rounded-lg cursor-pointer${
                    buttonClassName ?? ""
                  }`}
                >
                  {isSubmitting ? (
                    <Spinner size="sm" color="success" />
                  ) : (
                    buttonTitle
                  )}
                </Button>
                {cancelButton && (
                  <Button
                    onClick={cancelButtonOnClick}
                    color={cancelButtonColor}
                    size={cancelButtonSize}
                    outline
                    className={`items-center text-center rounded-lg cursor-pointer${
                      cancelButtonClassName ?? ""
                    }`}
                    disabled={isSubmitting || disabledCancelButton}
                  >
                    {cancelButtonTitle}
                  </Button>
                )}
              </div>
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
