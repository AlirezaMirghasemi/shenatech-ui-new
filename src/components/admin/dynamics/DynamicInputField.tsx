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
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaEnvelope } from "react-icons/fa6";

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
}: IDynamicInputField) {
  const [field, meta] = useField(id);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      {type !== InputType.HIDDEN && (
        <Label
          htmlFor={id}
          className="block mb-2 text-sm font-medium"
          color={`${
            meta.error && meta.touched
              ? "danger"
              : !meta.error && meta.touched
              ? "success"
              : "default"
          }`}
        >
          {label}
        </Label>
      )}
      {type == InputType.HIDDEN && (
        <input
          {...field}
          name={name}
          id={id}
          type={type}
          value={defaultValue ?? undefined}
        />
      )}
      {(type == InputType.TEXT ||
        type == InputType.NUMBER ||
        type == InputType.EMAIL ||
        type == InputType.PASSWORD) && (
        <TextInput
          {...field}
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          color={`${
            meta.error && meta.touched
              ? "danger"
              : !meta.error && meta.touched
              ? "success"
              : "default"
          }`}
          className={className ? className : ""}
          rightIcon={type == InputType.EMAIL ? FaEnvelope : undefined}
        />
      )}
      {type == InputType.TEXTAREA && (
        <Textarea
          {...field}
          disabled={disabled}
          id={id}
          name={name}
          placeholder={placeholder}
          rows={4}
          className={className ? className : ""}
          color={`${
            meta.error && meta.touched
              ? "danger"
              : !meta.error && meta.touched
              ? "success"
              : "default"
          }`}
        />
      )}

      {type == InputType.FILE && (
        <FileInput
          id={id}
          name={name}
          onChange={(event) => {
            setFieldValue(name, event.target.files?.[0]);
          }}
          disabled={disabled}
          className={className}
        />
      )}
      {type == InputType.SELECT && (
        <Select
          {...field}
          id={id}
          disabled={disabled}
          className={className}
          name={name}
          color={`${
            meta.error && meta.touched
              ? "danger"
              : !meta.error && meta.touched
              ? "success"
              : "default"
          }`}
          multiple={multiple}
        >
          {data?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      )}
      {loading && <Spinner />}
      <ErrorMessage name={id}>
        {(message) => <ValidatingError error={message} />}
      </ErrorMessage>
    </>
  );
}
