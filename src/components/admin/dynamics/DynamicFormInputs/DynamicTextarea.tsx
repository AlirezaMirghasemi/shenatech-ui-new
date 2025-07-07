import { IDynamicTextareaProps } from "@/interfaces/IDynamicInputField";
import { Textarea } from "flowbite-react";

export default function DynamicTextarea({
  id,
  name,
  value,
  placeholder,
  disabled,
  rows,
  className,
  color,
  readOnly,
  onChange,
  onBlur
}: IDynamicTextareaProps) {
      const sanitizedValue = value === null ? '' : value;

  return (
    <>
      <Textarea
        value={sanitizedValue}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full ${className}`}
        color={color}
        name={name}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}

      />
    </>
  );
}
