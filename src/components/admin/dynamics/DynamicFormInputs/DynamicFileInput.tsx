import { IDynamicFileInputProps } from "@/interfaces/IDynamicInputField";
import { FileInput } from "flowbite-react";

export default function DynamicFileInput({
  id,
  name,
  disabled,
  className,
  color,
  multiple,
  readOnly,
}: IDynamicFileInputProps) {
  return (
    <>
      <FileInput
        id={id}
        disabled={disabled}
        className={className}
        color={color}
        multiple={multiple}
        name={name}
        readOnly={readOnly}
      />
    </>
  );
}
