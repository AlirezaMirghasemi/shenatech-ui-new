// components/form/DynamicInputField.tsx
"use client";
import ValidatingError from "@/components/common/ValidatingError";
import { InputType } from "@/constants/data/InputType";
import IDynamicInputField from "@/interfaces/IDynamicInputField";
import {
  FileInput,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaEnvelope } from "react-icons/fa6";
import { useEffect, useMemo } from "react";
import Select from "react-select";
import { customSelectStyles } from "@/theme/SelectInputTheme";
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
  fileInputProps = {},
  hiddenInputProps = {},
  labelHidden = false,
  isSearchable = false,
  ...rest
}: IDynamicInputField) {
  const [field, meta] = useField(id);
  //const { setFieldValue } = useFormikContext();
  type SelectOption = { label: string; value: string | number };
  const { setFieldValue } = useFormikContext();
  const selectedOption = useMemo(() => {
    if (type !== InputType.SELECT) return null;

    if (multiple) {
      return data?.filter((option) =>
        (field.value || []).includes(option.value)
      );
    }
    return data?.find((option) => option.value === field.value) || null;
  }, [field.value, data, multiple, type]);
  const handleSelectChange = (option: SelectOption | SelectOption[] | null) => {
    if (multiple) {
      const values = Array.isArray(option)
        ? option.map((opt) => opt.value)
        : [];
      setFieldValue(field.name, values);
    } else {
      const value = (option as SelectOption)?.value ?? null;
      setFieldValue(field.name, value);
    }
  };

  // مقداردهی اولیه برای Select
  useEffect(() => {
    if (type === InputType.SELECT && defaultValue) {
      setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, type, field.name, setFieldValue]);
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
          hidden={labelHidden}
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
          value={selectedOption ?? field.value}
          onChange={handleSelectChange}
          options={data}
          isSearchable={isSearchable}
          name={name}
          id={id}
          placeholder={loading ? <><Spinner size="sm" color="warning" className="ml-2"/><span>در حال بارگذاری...</span></> : placeholder}
          noOptionsMessage={() => "محتوایی برای نمایش وجود ندارد"}
          isMulti={multiple}
          loadingMessage={() =>   "در حال بارگذاری..." }
          isDisabled={disabled || loading}
          menuPosition="absolute"
          styles={customSelectStyles}
          classNamePrefix="react-select"
          className={className?? ""}
        />
      )}

      <ErrorMessage name={id}>
        {(message) => <ValidatingError error={message} />}
      </ErrorMessage>
    </div>
  );
}
