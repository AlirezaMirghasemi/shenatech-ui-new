import ValidatingError from "@/components/common/ValidatingError";
import { InputType } from "@/constants/data/InputType";
import IDynamicInputField from "@/interfaces/IDynamicInputField";
import { FileInput, Label, Select, Textarea, TextInput } from "flowbite-react";
import { ErrorMessage, useField, useFormikContext } from "formik";

export default function DynamicInputField({
  id,
  name,
  type,
  placeholder,
  disabled,
  data,
  label,
  className,
}: IDynamicInputField) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <Label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        color={`${
          meta.error && meta.touched
            ? "red"
            : !meta.error && !meta.touched
            ? "green"
            : "gray"
        }`}
      >
        {label}
      </Label>
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
          color={meta.error && meta.touched ? "red" : "green"}
          className={className ? className : ""}
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
          color={meta.error && meta.touched ? "red" : "green"}
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
          color={meta.error && meta.touched ? "red" : "green"}
        >
          {data?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      )}

      <ErrorMessage name={name}>
        {(message) => <ValidatingError error={message} />}
      </ErrorMessage>
    </>
  );
}
