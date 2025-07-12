import { IDynamicToggleSwitchProps } from "@/interfaces/IDynamicInputField";
import { ToggleSwitch } from "flowbite-react";

export default function DynamicToggleSwitch({
  id,
  name,
  disabled,
  className,
  checked = false,
  label,
  size = "md",
  color,
  ref,
  onChange = () => {},
}: IDynamicToggleSwitchProps) {
  const handleChange = (isChecked: boolean) => {
    // ایجاد یک رویداد شبیه‌سازی شده برای Formik
    const fakeEvent = {
      target: {
        name: name || id,
        value: isChecked,
        type: "checkbox",
        checked: isChecked,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange?.(fakeEvent);
  };

  return (
    <>
      <ToggleSwitch
        id={id}
        name={name}
        disabled={disabled}
        className={className}
        checked={checked}
        onChange={handleChange}
        label={label}
        sizing={size}
        color={color}
        ref={ref}
      />
    </>
  );
}
