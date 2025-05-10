"use client";
import React from "react";
import { Form, Formik } from "formik";
import { Button, Spinner } from "flowbite-react";
import ValidatingError from "@/components/common/ValidatingError";
import IDynamicForm from "@/interfaces/IDynamicForm";

export default function DynamicForm({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  buttonTitle,
  apiError,
}: IDynamicForm) {
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
                color="success"
                outline
                size="lg"
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
