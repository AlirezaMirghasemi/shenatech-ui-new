// components/form/DynamicInputField.tsx
"use client";
import ValidatingError from "@/components/common/ValidatingError";
import { InputType } from "@/constants/data/InputType";
import { IDynamicInputField } from "@/interfaces/IDynamicInputField";
import { Spinner } from "flowbite-react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { FaEnvelope } from "react-icons/fa6";
import { useMemo } from "react";
import DynamicLabel from "./DynamicLabel";
import DynamicHiddenInput from "./DynamicHiddenInput";
import DynamicTextInput from "./DynamicTextInput";
import DynamicTextarea from "./DynamicTextarea";
import DynamicFileInput from "./DynamicFileInput";
import DynamicSelectInput from "./DynamicSelectInput";
import DynamicImageInputFile from "./DynamicImageInputFile";
import DynamicMultiTextInput from "./DynamicMultiTextInput";
// import DynamicRadioInput from "./DynamicToggleSwitch";
import DynamicToggleSwitch from "./DynamicToggleSwitch";
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
  //textInputProps = {},
  textareaProps = {},
  fileInputProps = {},
  toggleSwitchProps = {},
  hiddenInputProps = {},
  floatingLabelProps = {},
  checked,
  labelHidden = false,
  isSearchable = false,
  autoComplete,
  validationSchema,
}: IDynamicInputField) {
  const [field, meta, helpers] = useField(id);
  const formik = useFormikContext();
  const validateItem = async (item: string) => {
    try {
      // استفاده از schema ارسال شده یا schema اصلی فرم
      const schema = validationSchema || formik.validationSchema;

      if (!schema) return undefined;

      // دسترسی به schema اعتبارسنجی آیتم
      const itemSchema = schema.fields[name]?.innerType;

      if (itemSchema) {
        await itemSchema.validate(item);
      }

      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "خطای اعتبارسنجی";
    }
  };
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
          type === InputType.PASSWORD ||
          type === InputType.TOGGLE_SWITCH
        ) &&
          labelHidden === false && (
            <DynamicLabel htmlFor={id} color={color} label={label ?? ""} />
          )}
        {/* Hidden Field */}
        {type === InputType.HIDDEN && (
          <DynamicHiddenInput
            {...field}
            {...hiddenInputProps}
            id={id}
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
            {...floatingLabelProps}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            label={label}
            disabled={disabled}
            color={color}
            className={`w-full ${className}`}
            addon={loading ? <Spinner size="sm" color="warning" /> : undefined}
            rightIcon={type === InputType.EMAIL ? FaEnvelope : undefined}
            readOnly={readOnly}
            loading={loading}
            autoComplete={autoComplete}
          />
        )}

        {/* Textarea */}
        {type === InputType.TEXTAREA && (
          <DynamicTextarea
            {...field}
            {...textareaProps}
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
        {/*multi text input*/}
        {type === InputType.MULTI_TEXT_INPUT && (
          <DynamicMultiTextInput
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={className}
            value={field.value || []}
            onChange={async (options) => await helpers.setValue(options)}
            onBlur={() => field.onBlur}
            loading={loading}
            validateItem={validateItem}
          />
        )}
        {type === InputType.TOGGLE_SWITCH && (
          <DynamicToggleSwitch
            {...field}
            {...toggleSwitchProps}
            id={id}
            name={name}
            disabled={disabled}
            className={className}
            label={label}
            checked={checked}
            color={color}
          />
        )}

        <ErrorMessage name={id}>
          {(message) => {
            return <ValidatingError error={message} />;
          }}
        </ErrorMessage>
      </div>
    </>
  );
}
