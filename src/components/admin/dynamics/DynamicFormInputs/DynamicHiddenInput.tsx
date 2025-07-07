import { IDynamicHiddenInputProps } from "@/interfaces/IDynamicInputField";

export default function DynamicHiddenInput({
  id,
  name,
  value,
  readOnly,
}: IDynamicHiddenInputProps) {
  return (
    <>
      <input
        id={id}
        name={name}
        type="hidden"
        value={value}
        readOnly={readOnly}
      />
    </>
  );
}
