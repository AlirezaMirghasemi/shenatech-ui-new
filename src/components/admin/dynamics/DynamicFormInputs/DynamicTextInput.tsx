import { IDynamicTextInputProps } from "@/interfaces/IDynamicInputField";
import { TextInput } from "flowbite-react";

export default function DynamicTextInput({
  id,
  name,
  value,
  type,
  placeholder,
  disabled,
  color,
  className,
  addon,
  rightIcon,
  readOnly,
  onChange,
  onBlur,
  autoComplete = "off",
}: IDynamicTextInputProps) {
  return (
    <>
      <TextInput
        value={value}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        color={color}
        className={`w-full  ${className}`}
        addon={addon}
        rightIcon={rightIcon}
        name={name}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
    </>
  );
}
