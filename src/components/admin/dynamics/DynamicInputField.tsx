// components/form/DynamicInputField.tsx
"use client";
import ValidatingError from "@/components/common/ValidatingError";
import { InputType } from "@/constants/data/InputType";
import IDynamicInputField from "@/interfaces/IDynamicInputField";
import {
  FileInput,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { ErrorMessage, useField } from "formik";
import { FaEnvelope } from "react-icons/fa6";
import { useMemo } from "react";

export default function DynamicInputField({
  id,
  name,
  type,
  placeholder,
  disabled,
  data,
  label,
  className,
  multiple,
  defaultValue,
  loading,
  readOnly = false,
  textInputProps = {},
  textareaProps = {},
  selectProps = {},
  fileInputProps = {},
  hiddenInputProps = {},
  ...rest
}: IDynamicInputField) {
  const [field, meta] = useField(id);
  //const { setFieldValue } = useFormikContext();

  const color = useMemo(() => {
    if (meta.error && meta.touched) return "danger";
    if (!meta.error && meta.touched) return "success";
    return "default";
  }, [meta]);

  return (
    <div className="mb-4">
      {type !== InputType.HIDDEN && (
        <Label
          htmlFor={id}
          className="block mb-2 text-sm font-medium"
          color={color}
        >
          {label}
        </Label>
      )}

      {/* Hidden Field */}
      {type === InputType.HIDDEN && (
        <input
          {...rest}
          {...field}
          {...hiddenInputProps}
          id={id}
          name={name}
          type="hidden"
          value={defaultValue ?? field.value}
          readOnly={readOnly}
        />
      )}

      {/* Text/Number/Email/Password */}
      {(type === InputType.TEXT ||
        type === InputType.NUMBER ||
        type === InputType.EMAIL ||
        type === InputType.PASSWORD) && (
        <TextInput
          {...rest}
          {...field}
          {...textInputProps}
          value={defaultValue ?? field.value}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          color={color}
          className={`w-full ${className}`}
          addon={loading ? <Spinner size="sm" color="warning" /> : undefined}
          rightIcon={type === InputType.EMAIL ? FaEnvelope : undefined}
          name={name}
          readOnly={readOnly}
        />
      )}

      {/* Textarea */}
      {type === InputType.TEXTAREA && (
        <Textarea
          {...rest}
          {...field}
          {...textareaProps}
          value={defaultValue ?? field.value}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          className={`w-full ${className}`}
          color={color}
          name={name}
          readOnly={readOnly}
        />
      )}

      {/* File Input */}
      {type === InputType.FILE && (
        <FileInput
          {...rest}
          {...fileInputProps}
          id={id}
          disabled={disabled}
          className={className}
          color="info"
          multiple={multiple}
          name={name}
          readOnly={readOnly}
        />
      )}

      {/* Select */}
      {type === InputType.SELECT && (
        <Select
          {...rest}
          {...field}
          {...selectProps}
          id={id}
          disabled={disabled || loading}
          className={`w-full ${className}`}
          color={color}
          multiple={multiple}
          value={field.value ?? defaultValue}
          name={name}
        >
          {loading ? (
            <option value="" disabled>
              در حال بارگذاری...
            </option>
          ) : data?.length === 0 ? (
            <option value="" disabled>
              محتوایی برای نمایش وجود ندارد
            </option>
          ) : (
            <>
              <option value="" disabled>
                {placeholder}
              </option>
              {data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </>
          )}
        </Select>
      )}

      <ErrorMessage name={id}>
        {(message) => <ValidatingError error={message} />}
      </ErrorMessage>
    </div>
  );
}
