import { IDynamicToggleSwitchProps } from "@/interfaces/IDynamicInputField";
import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";

export default function DynamicToggleSwitch({
  id,
  name,
  disabled,
  className,
  checked = false,
  label,
  size = "md",
  color,
  ref
}: IDynamicToggleSwitchProps) {
  const [value, setValue] = useState(checked);

  return (
    <>
      <ToggleSwitch
        id={id}
        name={name}
        disabled={disabled}
        className={className}
        checked={value}
        onChange={setValue}
        label={label}
        sizing={size}
        color={color}
        ref={ref}
      />
    </>
  );
}
