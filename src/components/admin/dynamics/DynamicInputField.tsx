// components/form/DynamicInputField.tsx
"use client";
import ValidatingError from "@/components/common/ValidatingError";
import { InputType } from "@/constants/data/InputType";
import { IDynamicInputField } from "@/interfaces/IDynamicInputField";
import { Spinner } from "flowbite-react";
import { ErrorMessage, useField } from "formik";
import { FaEnvelope } from "react-icons/fa6";
import { useMemo } from "react";
import DynamicLabel from "./DynamicFormInputs/DynamicLabel";
import DynamicHiddenInput from "./DynamicFormInputs/DynamicHiddenInput";
import DynamicTextInput from "./DynamicFormInputs/DynamicTextInput";
import DynamicTextarea from "./DynamicFormInputs/DynamicTextarea";
import DynamicFileInput from "./DynamicFormInputs/DynamicFileInput";
import DynamicSelectInput from "./DynamicFormInputs/DynamicSelectInput";
import DynamicImageInputFile from "./DynamicFormInputs/DynamicImageInputFile";
export default function DynamicInputField({
  id,
  name,
  type,
  placeholder,
  disabled = false,
  data,
  label,
  className,
  multiple = false,
  loading = false,
  readOnly = false,
  textInputProps = {},
  textareaProps = {},
  fileInputProps = {},
  hiddenInputProps = {},
  labelHidden = false,
  isSearchable = false,
  autoComplete,
}: IDynamicInputField) {
  const [field, meta] = useField(id);
  const color = useMemo(() => {
    if (meta.error && meta.touched) return "error";
    if (!meta.error && meta.touched) return "success";
    return "default";
  }, [meta]);

  return (
    <>
      <div className="mb-4">
        {!(
  type === InputType.TEXT ||
  type === InputType.NUMBER ||
  type === InputType.EMAIL ||
  type === InputType.PASSWORD
) && labelHidden === false &&
           (
            <DynamicLabel htmlFor={id} color={color} label={label ?? ""} />
          )}
        {/* Hidden Field */}
        {type === InputType.HIDDEN && (
          <DynamicHiddenInput
            {...field}
            {...hiddenInputProps}
            id={id}
            type={type}
            name={name}
            readOnly={readOnly}
          />
        )}

        {/* Text/Number/Email/Password */}
        {(type === InputType.TEXT ||
          type === InputType.NUMBER ||
          type === InputType.EMAIL ||
          type === InputType.PASSWORD) && (
          <DynamicTextInput
            {...field}
            {...textInputProps}
            //value={defaultValue ?? field.value}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            color={color}
            className={`w-full ${className}`}
            addon={loading ? <Spinner size="sm" color="warning" /> : undefined}
            rightIcon={type === InputType.EMAIL ? FaEnvelope : undefined}
            readOnly={readOnly}
            loading={loading}
            autoComplete={autoComplete}
            label={label ?? ""}
          />
        )}

        {/* Textarea */}
        {type === InputType.TEXTAREA && (
          <DynamicTextarea
            {...field}
            {...textareaProps}
            type={type}
            value={field.value}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
            className={`w-full ${className}`}
            color={color}
            readOnly={readOnly}
          />
        )}

        {/* File Input */}
        {type === InputType.FILE && (
          <DynamicFileInput
            {...fileInputProps}
            type={type}
            id={id}
            name={name}
            disabled={disabled}
            className={className}
            color="info"
            multiple={multiple}
            readOnly={readOnly}
            loading={loading}
            value={field.value}
          />
        )}
        {/* Image Input */}
        {type === InputType.IMAGE && (
          <DynamicImageInputFile
            {...fileInputProps}
            type={InputType.IMAGE}
            id={id}
            name={name}
            placeholder={placeholder}
            label={label}
            disabled={disabled}
            className={className}
            multiple={multiple}
            readOnly={readOnly}
            loading={loading}
            value={field.value}
          />
        )}

        {/* Select */}
        {type === InputType.SELECT && (
          <DynamicSelectInput
            {...field}
            type={type}
            id={id}
            name={name}
            data={data ?? []}
            isSearchable={isSearchable}
            placeholder={placeholder}
            multiple={multiple}
            loading={loading}
            disabled={disabled || loading}
            className={className}
          />
        )}

        <ErrorMessage name={id}>
          {(message) => {
            console.log(message);
            return <ValidatingError error={message} />;
          }}
        </ErrorMessage>
      </div>
    </>
  );
}
