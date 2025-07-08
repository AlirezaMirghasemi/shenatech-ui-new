import { IDynamicTextInputProps } from "@/interfaces/IDynamicInputField";
import { FloatingLabel } from "flowbite-react";

export default function DynamicTextInput({
  id,
  name,
  value,
  type,
  placeholder,
  disabled,
  color,
  className,
  readOnly,
  onChange,
  onBlur,
  autoComplete = "off",
  label,
  loading,
}: IDynamicTextInputProps) {
  return (
    <>
      <FloatingLabel
        value={value}
        id={id}
        type={type}
        placeholder={label == "" ? placeholder : ""}
        disabled={disabled ? disabled : loading}
        label={label ?? ""}
        sizing="md"
        variant="standard"
        color={
          color == "error"
            ? "error"
            : color == "success"
              ? "success"
              : "default"
        }
        className={`w-full  ${className}`}
        name={name}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
    </>
  );
}
